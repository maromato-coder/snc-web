import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { verifyIntegrationKey, integrationUnauthorized } from "@/lib/integration-auth"

// ════════════════════════════════════════════════
// GET  /api/integration/submissions/[id]/notes
// POST /api/integration/submissions/[id]/notes
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
            .from("submission_notes")
            .select("*")
            .eq("submission_id", id)
            .order("created_at", { ascending: true })

        if (error) return NextResponse.json({ error: "조회 실패" }, { status: 500 })
        return NextResponse.json({ notes: data })
    } catch (err) {
        console.error("[GET integration notes]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!verifyIntegrationKey(req)) return integrationUnauthorized()

    try {
        const { id } = await params
        const { content, author_email } = await req.json()

        if (!content?.trim() || !author_email?.trim()) {
            return NextResponse.json({ error: "content, author_email 필수" }, { status: 400 })
        }

        const supabase = createServerSupabaseClient()
        const { data, error } = await supabase
            .from("submission_notes")
            .insert({ submission_id: id, author_email, content: content.trim() })
            .select()
            .single()

        if (error) return NextResponse.json({ error: "저장 실패" }, { status: 500 })
        return NextResponse.json({ success: true, note: data })
    } catch (err) {
        console.error("[POST integration notes]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
