import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"
import { ImapFlow } from "imapflow"
import { simpleParser } from "mailparser"

// ════════════════════════════════════════════════
// GET /api/zoho/messages/[uid]
// Zoho 메시지 전체 본문 조회
// ════════════════════════════════════════════════

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ uid: string }> }
) {
    try {
        const authClient = await createClient()
        const { data: { user } } = await authClient.auth.getUser()
        if (!isAdminEmail(user?.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { uid } = await params

        const client = new ImapFlow({
            host: "imap.zoho.com",
            port: 993,
            secure: true,
            auth: {
                user: process.env.ZOHO_IMAP_USER!,
                pass: process.env.ZOHO_IMAP_PASSWORD!,
            },
            logger: false,
        })

        await client.connect()

        let messageData: {
            uid: string
            from: string
            to: string
            subject: string
            date: string
            html: string | null
            text: string | null
            attachments: { filename: string; size: number }[]
        } | null = null

        const lock = await client.getMailboxLock("INBOX")
        try {
            const msg = await client.fetchOne(
                `${uid}`,
                { source: true },
                { uid: true }
            )

            if (msg && 'source' in msg && msg.source) {
                const parsed = await simpleParser(msg.source as Buffer)
                const fromAddr = parsed.from?.value?.[0]
                const fromStr = fromAddr
                    ? fromAddr.name
                        ? `${fromAddr.name} <${fromAddr.address}>`
                        : fromAddr.address || ""
                    : ""

                messageData = {
                    uid,
                    from: fromStr,
                    to: Array.isArray(parsed.to) ? parsed.to.map(a => a.text).join(", ") : (parsed.to?.text || ""),
                    subject: parsed.subject || "(제목 없음)",
                    date: parsed.date?.toISOString() || new Date().toISOString(),
                    html: parsed.html || null,
                    text: parsed.text || null,
                    attachments: (parsed.attachments || []).map(a => ({
                        filename: a.filename || "첨부파일",
                        size: a.size || 0,
                    })),
                }
            }
        } finally {
            lock.release()
        }

        await client.logout()

        if (!messageData) {
            return NextResponse.json({ error: "메시지를 찾을 수 없습니다" }, { status: 404 })
        }

        return NextResponse.json({ message: messageData })
    } catch (err) {
        console.error("[GET /api/zoho/messages/[uid]]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
