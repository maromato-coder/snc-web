import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"

// ════════════════════════════════════════════════
// GET  /api/submissions/[id]/notes  — 메모 목록 조회
// POST /api/submissions/[id]/notes  — 메모 추가
// ════════════════════════════════════════════════

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authClient = await createClient()
        const { data: { user } } = await authClient.auth.getUser()
        if (!isAdminEmail(user?.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const supabase = createServerSupabaseClient()
        const { data, error } = await supabase
            .from("submission_notes")
            .select("*")
            .eq("submission_id", id)
            .order("created_at", { ascending: true })

        if (error) {
            console.error("[GET notes]", error)
            return NextResponse.json({ error: "조회 실패" }, { status: 500 })
        }

        return NextResponse.json({ notes: data })
    } catch (error) {
        console.error("[GET notes] Unexpected:", error)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authClient = await createClient()
        const { data: { user } } = await authClient.auth.getUser()
        if (!isAdminEmail(user?.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await req.json()
        const content = body.content?.trim()

        if (!content) {
            return NextResponse.json({ error: "내용을 입력해주세요" }, { status: 400 })
        }

        const supabase = createServerSupabaseClient()
        const { data, error } = await supabase
            .from("submission_notes")
            .insert({
                submission_id: id,
                author_email: user!.email!,
                content,
            })
            .select()
            .single()

        if (error) {
            console.error("[POST notes]", error)
            return NextResponse.json({ error: "메모 저장 실패" }, { status: 500 })
        }

        return NextResponse.json({ success: true, note: data })
    } catch (error) {
        console.error("[POST notes] Unexpected:", error)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
