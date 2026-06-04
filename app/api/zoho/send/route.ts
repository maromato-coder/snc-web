import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server-auth"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/auth-check"
import nodemailer from "nodemailer"

// ════════════════════════════════════════════════
// POST /api/zoho/send
// 파일 첨부 지원 Zoho SMTP 발송
// ════════════════════════════════════════════════

interface AttachmentInput {
    filename: string
    content: string  // base64
    contentType: string
    size: number
}

export async function POST(req: NextRequest) {
    try {
        const authClient = await createClient()
        const { data: { user } } = await authClient.auth.getUser()
        if (!isAdminEmail(user?.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const {
            to, cc, bcc, subject, html, text,
            from_name, from_email,
            submission_id, in_reply_to,
            attachments = [] as AttachmentInput[],
        } = body

        if (!to?.trim() || !subject?.trim() || (!html?.trim() && !text?.trim())) {
            return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 })
        }

        // 첨부 총 용량 검사 (10MB)
        const totalSize = attachments.reduce((s: number, a: AttachmentInput) => s + (a.size || 0), 0)
        if (totalSize > 10 * 1024 * 1024) {
            return NextResponse.json({ error: "첨부 파일 총 크기는 10MB 이하여야 합니다" }, { status: 400 })
        }

        const senderEmail = from_email || process.env.ZOHO_SMTP_USER!
        const senderName  = from_name  || "SNC"

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.ZOHO_SMTP_USER!,
                pass: process.env.ZOHO_SMTP_PASSWORD!,
            },
        })

        const mailOptions: nodemailer.SendMailOptions = {
            from:    `${senderName} <${senderEmail}>`,
            to,
            cc:      cc || undefined,
            bcc:     bcc || undefined,
            subject,
            html:    html || undefined,
            text:    text || undefined,
            replyTo: senderEmail,
            attachments: attachments.map((a: AttachmentInput) => ({
                filename:    a.filename,
                content:     Buffer.from(a.content, "base64"),
                contentType: a.contentType,
            })),
        }

        if (in_reply_to) {
            mailOptions.inReplyTo = in_reply_to
            mailOptions.references = in_reply_to
        }

        await transporter.sendMail(mailOptions)

        // submission_id 있으면 자동 기록
        if (submission_id) {
            const supabase = createServerSupabaseClient()
            const attachNames = attachments.map((a: AttachmentInput) => a.filename).join(", ")
            const noteContent = [
                `📤 Zoho 메일 발송`,
                `수신: ${to}`,
                `제목: ${subject}`,
                attachNames ? `첨부: ${attachNames}` : "",
            ].filter(Boolean).join("\n")

            await Promise.all([
                supabase.from("submission_notes").insert({
                    submission_id,
                    author_email: user!.email!,
                    content: noteContent,
                }),
                supabase.from("reply_logs").insert({
                    submission_id,
                    from_email: senderEmail,
                    to_email: to,
                    subject,
                    body: text || html || "",
                    sent_by: user!.email!,
                }),
            ])
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error("[POST /api/zoho/send]", err)
        const msg = err instanceof Error ? err.message : "발송 실패"
        return NextResponse.json({ error: msg }, { status: 500 })
    }
}
