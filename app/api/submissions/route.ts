import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server-auth"

// ════════════════════════════════════════════════
// GET /api/submissions — 전체 목록 조회
// ════════════════════════════════════════════════

export async function GET() {
    try {
        const authClient = await createClient()
        const { data: { user } } = await authClient.auth.getUser()
        if (!user?.email?.endsWith("@sncpc.com")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const supabase = createServerSupabaseClient()
        const { data, error } = await supabase
            .from("submissions")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("[GET /api/submissions]", error)
            return NextResponse.json({ error: "조회 실패" }, { status: 500 })
        }

        return NextResponse.json({ submissions: data })
    } catch (error) {
        console.error("[GET /api/submissions] Unexpected:", error)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
