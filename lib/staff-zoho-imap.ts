// 직원 사서함 Zoho IMAP 목록·본문 조회
import { ImapFlow } from "imapflow"
import type { MailboxAuth } from "@/lib/staff-mailbox-auth"

export type StaffMailListItem = {
    id: string
    uid: number
    from: string
    to: string
    subject: string
    date: string
    snippet: string
    isRead: boolean
}

function makeClient(auth: MailboxAuth) {
    return new ImapFlow({
        host: "imap.zoho.com",
        port: 993,
        secure: true,
        auth: { user: auth.user, pass: auth.pass },
        logger: false,
    })
}

export async function listStaffZohoMessages(
    auth: MailboxAuth,
    opts: { limit?: number; page?: number; query?: string } = {}
) {
    const limit = Math.min(Number(opts.limit || 20), 50)
    const page = Math.max(Number(opts.page || 1), 1)
    const query = String(opts.query || "").trim()

    const client = makeClient(auth)
    await client.connect()

    const messages: StaffMailListItem[] = []
    let totalCount = 0

    try {
        const lock = await client.getMailboxLock("INBOX")
        try {
            const status = await client.status("INBOX", { messages: true, unseen: true })
            totalCount = status.messages || 0

            if (totalCount > 0) {
                let uids: number[] = []
                if (query) {
                    const searchResult = await client.search(
                        { or: [{ subject: query }, { from: query }, { body: query }] },
                        { uid: true }
                    )
                    uids = (searchResult as number[]).sort((a, b) => b - a).slice((page - 1) * limit, page * limit)
                } else {
                    const fromSeq = Math.max(1, totalCount - page * limit + 1)
                    const toSeq = Math.max(1, totalCount - (page - 1) * limit)
                    const seqResult = await client.search({ seq: `${fromSeq}:${toSeq}` }, { uid: true })
                    uids = (seqResult as number[]).sort((a, b) => b - a)
                }

                if (uids.length > 0) {
                    for await (const msg of client.fetch(
                        uids.join(","),
                        { uid: true, flags: true, envelope: true, bodyParts: ["1"] },
                        { uid: true }
                    )) {
                        const envelope = msg.envelope
                        const fromAddr = envelope?.from?.[0]
                        const fromStr = fromAddr
                            ? fromAddr.name
                                ? `${fromAddr.name} <${fromAddr.address}>`
                                : fromAddr.address || ""
                            : ""
                        const toAddr = envelope?.to?.[0]
                        const toStr = toAddr?.address || ""

                        let snippet = ""
                        try {
                            const part = msg.bodyParts?.get("1")
                            if (part) {
                                snippet = Buffer.from(part)
                                    .toString("utf-8")
                                    .replace(/\r?\n/g, " ")
                                    .replace(/\s+/g, " ")
                                    .trim()
                                    .slice(0, 150)
                            }
                        } catch {
                            snippet = ""
                        }

                        messages.push({
                            id: String(msg.uid),
                            uid: msg.uid!,
                            from: fromStr,
                            to: toStr,
                            subject: envelope?.subject || "(제목 없음)",
                            date: envelope?.date?.toISOString() || new Date().toISOString(),
                            snippet,
                            isRead: msg.flags?.has("\\Seen") || false,
                        })
                    }
                }
            }
        } finally {
            lock.release()
        }
    } finally {
        await client.logout()
    }

    messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const hasMore = query ? false : page * limit < totalCount

    return { messages, total: totalCount, hasMore, page, connected: true as const }
}

export async function getStaffZohoMessage(auth: MailboxAuth, uid: number) {
    const client = makeClient(auth)
    await client.connect()

    try {
        const lock = await client.getMailboxLock("INBOX")
        try {
            let detail: {
                id: string
                from: string
                to: string
                subject: string
                date: string
                html: string | null
                text: string | null
                snippet: string
            } | null = null

            for await (const msg of client.fetch(
                String(uid),
                { uid: true, envelope: true, source: true },
                { uid: true }
            )) {
                const envelope = msg.envelope
                const fromAddr = envelope?.from?.[0]
                const fromStr = fromAddr
                    ? fromAddr.name
                        ? `${fromAddr.name} <${fromAddr.address}>`
                        : fromAddr.address || ""
                    : ""
                const toAddr = envelope?.to?.[0]
                const toStr = toAddr?.address || ""
                const raw = msg.source ? Buffer.from(msg.source).toString("utf-8") : ""
                detail = {
                    id: String(msg.uid),
                    from: fromStr,
                    to: toStr,
                    subject: envelope?.subject || "(제목 없음)",
                    date: envelope?.date?.toISOString() || new Date().toISOString(),
                    html: null,
                    text: raw.slice(0, 20000) || null,
                    snippet: raw.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim().slice(0, 200),
                }
            }

            if (!detail) throw Object.assign(new Error("메일을 찾을 수 없습니다"), { status: 404 })
            return detail
        } finally {
            lock.release()
        }
    } finally {
        await client.logout()
    }
}
