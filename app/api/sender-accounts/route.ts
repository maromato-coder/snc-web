import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server-auth"

// ════════════════════════════════════════════════
// GET  /api/sender-accounts — 목록 조회
// POST /api/sender-accounts — 계정 추가
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
            .from("sender_accounts")
            .select("*")
            .order("created_at", { ascending: true })

        if (error) return NextResponse.json({ error: "조회 실패" }, { status: 500 })
        return NextResponse.json({ accounts: data })
    } catch (err) {
        console.error("[GET sender-accounts]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const authClient = await createClient()
        const { data: { user } } = await authClient.auth.getUser()
        if (!user?.email?.endsWith("@sncpc.com")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { email, display_name } = await req.json()
        if (!email?.trim() || !display_name?.trim()) {
            return NextResponse.json({ error: "이메일과 표시 이름은 필수입니다" }, { status: 400 })
        }
        if (!email.endsWith("@sncpc.com")) {
            return NextResponse.json({ error: "@sncpc.com 주소만 등록 가능합니다" }, { status: 400 })
        }

        const supabase = createServerSupabaseClient()
        const { data, error } = await supabase
            .from("sender_accounts")
            .insert({ email: email.trim(), display_name: display_name.trim(), created_by: user.email! })
            .select().single()

        if (error) {
            if (error.code === "23505") return NextResponse.json({ error: "이미 등록된 이메일입니다" }, { status: 409 })
            return NextResponse.json({ error: "저장 실패" }, { status: 500 })
        }
        return NextResponse.json({ success: true, account: data })
    } catch (err) {
        console.error("[POST sender-accounts]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const authClient = await createClient()
        const { data: { user } } = await authClient.auth.getUser()
        if (!user?.email?.endsWith("@sncpc.com")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id, is_active } = await req.json()
        const supabase = createServerSupabaseClient()
        const { error } = await supabase
            .from("sender_accounts")
            .update({ is_active })
            .eq("id", id)

        if (error) return NextResponse.json({ error: "업데이트 실패" }, { status: 500 })
        return NextResponse.json({ success: true })
    } catch (err) {
        console.error("[PATCH sender-accounts]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
