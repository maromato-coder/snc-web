import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { verifyIntegrationKey, integrationUnauthorized } from "@/lib/integration-auth"

// ════════════════════════════════════════════════
// GET /api/integration/email-requests
// as_center에서 이메일 계정 신청 목록 조회
// ════════════════════════════════════════════════

export async function GET(req: NextRequest) {
    if (!verifyIntegrationKey(req)) return integrationUnauthorized()

    try {
        const { searchParams } = new URL(req.url)
        const status = searchParams.get("status") || "all"

        const supabase = createServerSupabaseClient()
        let query = supabase
            .from("email_account_requests")
            .select("id, requester_name, requester_email, requested_email, department, status, issued_at, created_at")
            .order("created_at", { ascending: false })

        if (status !== "all") query = query.eq("status", status)

        const { data, error } = await query
        if (error) return NextResponse.json({ error: "조회 실패" }, { status: 500 })

        return NextResponse.json({ requests: data })
    } catch (err) {
        console.error("[GET integration email-requests]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
