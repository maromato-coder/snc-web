import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server-auth"

// ════════════════════════════════════════════════
// PATCH /api/submissions/[id]
// 상태(status) 변경
// ════════════════════════════════════════════════

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // 인증 확인
        const authClient = await createClient()
        const { data: { user } } = await authClient.auth.getUser()
        if (!user?.email?.endsWith("@sncpc.com")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await req.json()
        const { status } = body

        // 유효한 상태값 검증
        const validStatuses = ["new", "contacted", "completed", "declined"]
        if (status && !validStatuses.includes(status)) {
            return NextResponse.json({ error: "잘못된 상태값" }, { status: 400 })
        }

        const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }
        if (status) updateData.status = status

        const supabase = createServerSupabaseClient()
        const { data, error } = await supabase
            .from("submissions")
            .update(updateData)
            .eq("id", id)
            .select()
            .single()

        if (error) {
            console.error("[PATCH /api/submissions/[id]] DB error:", error)
            return NextResponse.json({ error: "업데이트 실패" }, { status: 500 })
        }

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error("[PATCH /api/submissions/[id]] Unexpected:", error)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
