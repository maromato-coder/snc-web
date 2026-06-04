import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"

// ════════════════════════════════════════════════
// POST /api/submissions/[id]/reply
// 신청자에게 답장 발송 (발신자 선택 가능)
// 발송 내역 → submission_notes + reply_logs 자동 기록
// ════════════════════════════════════════════════

const resend = new Resend(process.env.RESEND_API_KEY)

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
        const { from_email, to_email, subject, body: emailBody } = body

        // 입력 검증
        if (!from_email?.trim() || !to_email?.trim() || !subject?.trim() || !emailBody?.trim()) {
            return NextResponse.json({ error: "필수 항목이 누락되었습니다" }, { status: 400 })
        }

        // 발신 계정 유효성 확인
        const supabase = createServerSupabaseClient()
        const { data: sender } = await supabase
            .from("sender_accounts")
            .select("email, display_name, is_active")
            .eq("email", from_email)
            .eq("is_active", true)
            .single()

        if (!sender) {
            return NextResponse.json({ error: "유효하지 않은 발신 계정입니다" }, { status: 400 })
        }

        // Resend로 발송
        const { error: sendError } = await resend.emails.send({
            from:    `${sender.display_name} <${sender.email}>`,
            to:      [to_email],
            subject,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Pretendard Variable', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #0A1733;">
                    ${emailBody.replace(/\n/g, "<br>")}
                    <hr style="margin: 32px 0; border: none; border-top: 1px solid #E2E8F2;" />
                    <p style="font-size: 12px; color: #8A9AB8; margin: 0;">
                        ${sender.display_name} · SNC<br>
                        📞 1566-8099 · ✉ ${sender.email}
                    </p>
                </div>
            `,
            replyTo: sender.email,
        })

        if (sendError) {
            console.error("[reply] Resend error:", sendError)
            return NextResponse.json({ error: "메일 발송 실패" }, { status: 500 })
        }

        const now = new Date().toISOString()
        const noteContent = `📤 답장 발송\n수신: ${to_email}\n제목: ${subject}\n발신: ${sender.display_name} <${sender.email}>`

        // submission_notes에 자동 기록
        await supabase.from("submission_notes").insert({
            submission_id: id,
            author_email:  user!.email!,
            content:       noteContent,
        })

        // reply_logs에 발송 이력 저장
        await supabase.from("reply_logs").insert({
            submission_id: id,
            from_email:    sender.email,
            to_email,
            subject,
            body:          emailBody,
            sent_by:       user!.email!,
            sent_at:       now,
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error("[POST reply] Unexpected:", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
