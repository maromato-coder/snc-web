import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { verifyIntegrationKey, integrationUnauthorized } from "@/lib/integration-auth"

// ════════════════════════════════════════════════
// GET  /api/integration/submissions — 신청 목록
// POST /api/integration/submissions — 웹훅 테스트
// ════════════════════════════════════════════════

export async function GET(req: NextRequest) {
    if (!verifyIntegrationKey(req)) return integrationUnauthorized()

    try {
        const { searchParams } = new URL(req.url)
        const status     = searchParams.get("status") || "all"
        const type       = searchParams.get("type") || "all"
        const limit      = Math.min(Number(searchParams.get("limit") || 20), 50)
        const page       = Math.max(Number(searchParams.get("page") || 1), 1)
        const company_id = searchParams.get("company_id") || ""
        const q          = searchParams.get("q") || ""

        const supabase = createServerSupabaseClient()
        let query = supabase
            .from("submissions")
            .select("id, type, name, phone, email, company, region, size, message, status, site_id, channel, created_at, updated_at", { count: "exact" })
            .order("created_at", { ascending: false })
            .range((page - 1) * limit, page * limit - 1)

        if (status !== "all") query = query.eq("status", status)
        if (type !== "all")   query = query.eq("type", type)
        if (q) {
            query = query.or(`name.ilike.%${q}%,phone.ilike.%${q}%,company.ilike.%${q}%,email.ilike.%${q}%`)
        }
        // company_id는 향후 멀티테넌트 대비 — 현재는 site_id로 필터
        if (company_id) query = query.eq("site_id", company_id)

        const { data, error, count } = await query
        if (error) return NextResponse.json({ error: "조회 실패" }, { status: 500 })

        return NextResponse.json({
            submissions: data,
            total: count || 0,
            page,
            limit,
            hasMore: (page * limit) < (count || 0),
        })
    } catch (err) {
        console.error("[GET /api/integration/submissions]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
