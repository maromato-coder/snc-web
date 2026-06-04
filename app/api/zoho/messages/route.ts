import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"
import { ImapFlow } from "imapflow"

// ════════════════════════════════════════════════
// GET /api/zoho/messages
// 검색·페이지네이션·스레드 지원
// ════════════════════════════════════════════════

function makeImapClient() {
    return new ImapFlow({
        host: "imap.zoho.com",
        port: 993,
        secure: true,
        auth: {
            user: process.env.ZOHO_IMAP_USER!,
            pass: process.env.ZOHO_IMAP_PASSWORD!,
        },
        logger: false,
    })
}

export async function GET(req: NextRequest) {
    try {
        const authClient = await createClient()
        const { data: { user } } = await authClient.auth.getUser()
        if (!isAdminEmail(user?.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const limit = Math.min(Number(searchParams.get("limit") || 20), 50)
        const page = Math.max(Number(searchParams.get("page") || 1), 1)
        const query = searchParams.get("q") || ""
        const threadMode = searchParams.get("threads") === "1"

        const client = makeImapClient()
        await client.connect()

        const messages: {
            id: string
            uid: number
            from: string
            to: string
            subject: string
            date: string
            snippet: string
            isRead: boolean
            threadKey: string
        }[] = []

        let totalCount = 0

        const lock = await client.getMailboxLock("INBOX")
        try {
            const status = await client.status("INBOX", { messages: true, unseen: true })
            totalCount = status.messages || 0

            if (totalCount > 0) {
                let uids: number[] = []

                if (query) {
                    // IMAP SEARCH로 검색
                    const searchResult = await client.search({
                        or: [
                            { subject: query },
                            { from: query },
                            { body: query },
                        ]
                    }, { uid: true })
                    uids = (searchResult as number[]).sort((a, b) => b - a).slice((page - 1) * limit, page * limit)
                } else {
                    // 페이지 기반 최신순
                    const fromSeq = Math.max(1, totalCount - (page * limit) + 1)
                    const toSeq = Math.max(1, totalCount - ((page - 1) * limit))
                    const seqResult = await client.search({ seq: `${fromSeq}:${toSeq}` }, { uid: true })
                    uids = (seqResult as number[]).sort((a, b) => b - a)
                }

                if (uids.length > 0) {
                    const uidSet = uids.join(",")
                    for await (const msg of client.fetch(
                        uidSet,
                        { uid: true, flags: true, envelope: true, bodyParts: ["1"] },
                        { uid: true }
                    )) {
                        const envelope = msg.envelope
                        const fromAddr = envelope?.from?.[0]
                        const fromStr = fromAddr
                            ? fromAddr.name ? `${fromAddr.name} <${fromAddr.address}>` : fromAddr.address || ""
                            : ""
                        const toAddr = envelope?.to?.[0]
                        const toStr = toAddr?.address || ""

                        let snippet = ""
                        try {
                            const part = msg.bodyParts?.get("1")
                            if (part) {
                                snippet = Buffer.from(part).toString("utf-8")
                                    .replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim().slice(0, 150)
                            }
                        } catch { snippet = "" }

                        const subject = envelope?.subject || "(제목 없음)"
                        const threadKey = subject.replace(/^(Re:|Fwd:|FW:|RE:|FWD:)\s*/gi, "").trim().toLowerCase()

                        messages.push({
                            id: String(msg.uid),
                            uid: msg.uid,
                            from: fromStr,
                            to: toStr,
                            subject,
                            date: envelope?.date?.toISOString() || new Date().toISOString(),
                            snippet,
                            isRead: msg.flags?.has("\\Seen") || false,
                            threadKey,
                        })
                    }
                }
            }
        } finally {
            lock.release()
        }

        await client.logout()

        messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        const hasMore = query
            ? false
            : (page * limit) < totalCount

        // ── 스레드 모드: 제목 기준 그룹핑 ──
        if (threadMode) {
            const threadMap = new Map<string, {
                threadKey: string
                subject: string
                messages: typeof messages
                lastDate: string
                isRead: boolean
            }>()

            for (const msg of messages) {
                const key = msg.threadKey
                if (!threadMap.has(key)) {
                    threadMap.set(key, {
                        threadKey: key,
                        subject: msg.subject,
                        messages: [],
                        lastDate: msg.date,
                        isRead: msg.isRead,
                    })
                }
                const thread = threadMap.get(key)!
                thread.messages.push(msg)
                if (new Date(msg.date) > new Date(thread.lastDate)) thread.lastDate = msg.date
                if (!msg.isRead) thread.isRead = false
            }

            const threads = [...threadMap.values()].map(t => ({
                threadKey: t.threadKey,
                subject: t.subject,
                messageCount: t.messages.length,
                lastDate: t.lastDate,
                isRead: t.isRead,
                from: t.messages[t.messages.length - 1].from,
                snippet: t.messages[t.messages.length - 1].snippet,
                messageIds: t.messages.map(m => m.id),
                firstId: t.messages[0].id,
            })).sort((a, b) => new Date(b.lastDate).getTime() - new Date(a.lastDate).getTime())

            return NextResponse.json({ threads, connected: true, hasMore, total: totalCount, page })
        }

        return NextResponse.json({
            messages,
            connected: true,
            hasMore,
            total: totalCount,
            page,
        })
    } catch (err) {
        console.error("[GET /api/zoho/messages]", err)
        return NextResponse.json({ error: "zoho_connection_failed", messages: [], connected: false }, { status: 200 })
    }
}
