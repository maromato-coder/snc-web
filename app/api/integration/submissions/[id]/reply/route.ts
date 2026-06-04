import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { verifyIntegrationKey, integrationUnauthorized } from "@/lib/integration-auth"
import { getResendClient } from "@/lib/resend-client"

// ════════════════════════════════════════════════
// POST /api/integration/submissions/[id]/reply
// as_center에서 폼메일 신청자에게 답장
// ════════════════════════════════════════════════

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!verifyIntegrationKey(req)) return integrationUnauthorized()

    try {
        const { id } = await params
        const { from_email, to_email, subject, body, sent_by } = await req.json()

        if (!from_email?.trim() || !to_email?.trim() || !subject?.trim() || !body?.trim()) {
            return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 })
        }

        // 발신 계정 유효성 확인
        const supabase = createServerSupabaseClient()
        const { data: sender } = await supabase
            .from("sender_accounts")
            .select("email, display_name")
            .eq("email", from_email)
            .eq("is_active", true)
            .single()

        if (!sender) {
            return NextResponse.json({ error: "유효하지 않은 발신 계정" }, { status: 400 })
        }

        const resend = getResendClient()
        if (!resend) {
            return NextResponse.json({ error: "메일 발송 설정(RESEND_API_KEY)이 없습니다" }, { status: 503 })
        }

        const { error: sendError } = await resend.emails.send({
            from: `${sender.display_name} <${sender.email}>`,
            to: [to_email],
            subject,
            html: `<div style="font-family: sans-serif; max-width: 600px; padding: 24px; color: #0A1733;">
                ${body.replace(/\n/g, "<br>")}
                <hr style="margin: 24px 0; border: none; border-top: 1px solid #E2E8F2;"/>
                <p style="font-size: 12px; color: #8A9AB8;">${sender.display_name} · SNC · 1566-8099</p>
            </div>`,
            replyTo: sender.email,
        })

        if (sendError) return NextResponse.json({ error: "메일 발송 실패" }, { status: 500 })

        // 자동 기록
        const authorEmail = sent_by || from_email
        await Promise.all([
            supabase.from("submission_notes").insert({
                submission_id: id,
                author_email: authorEmail,
                content: `📤 답장 발송 (as_center)\n수신: ${to_email}\n제목: ${subject}`,
            }),
            supabase.from("reply_logs").insert({
                submission_id: id,
                from_email: sender.email,
                to_email,
                subject,
                body,
                sent_by: authorEmail,
            }),
        ])

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error("[POST integration reply]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
