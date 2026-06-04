import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { verifyIntegrationKey, integrationUnauthorized } from "@/lib/integration-auth"

// ════════════════════════════════════════════════
// GET   /api/integration/submissions/[id] — 상세
// PATCH /api/integration/submissions/[id] — 상태 변경
// ════════════════════════════════════════════════

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!verifyIntegrationKey(req)) return integrationUnauthorized()

    try {
        const { id } = await params
        const supabase = createServerSupabaseClient()
        const { data, error } = await supabase
            .from("submissions")
            .select("*")
            .eq("id", id)
            .single()

        if (error || !data) return NextResponse.json({ error: "찾을 수 없음" }, { status: 404 })
        return NextResponse.json({ submission: data })
    } catch (err) {
        console.error("[GET /api/integration/submissions/[id]]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!verifyIntegrationKey(req)) return integrationUnauthorized()

    try {
        const { id } = await params
        const body = await req.json()
        const { status, user_email } = body

        const validStatuses = ["new", "contacted", "completed", "declined"]
        if (status && !validStatuses.includes(status)) {
            return NextResponse.json({ error: "잘못된 상태값" }, { status: 400 })
        }

        const supabase = createServerSupabaseClient()
        const updateData: Record<string, unknown> = {
            updated_at: new Date().toISOString(),
        }
        if (status) updateData.status = status

        const { data, error } = await supabase
            .from("submissions")
            .update(updateData)
            .eq("id", id)
            .select()
            .single()

        if (error) return NextResponse.json({ error: "업데이트 실패" }, { status: 500 })

        // 상태 변경 시 자동 메모 기록
        if (status && user_email) {
            const STATUS_LABEL: Record<string, string> = {
                new: "신규", contacted: "연락중", completed: "완료", declined: "거절",
            }
            await supabase.from("submission_notes").insert({
                submission_id: id,
                author_email: user_email,
                content: `🔄 상태 변경: ${STATUS_LABEL[status] || status} (as_center에서)`,
            })
        }

        return NextResponse.json({ success: true, submission: data })
    } catch (err) {
        console.error("[PATCH /api/integration/submissions/[id]]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
