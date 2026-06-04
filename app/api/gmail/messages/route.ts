import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"

// ════════════════════════════════════════════════
// GET /api/gmail/messages
// 검색·페이지네이션·스레드 지원
// ════════════════════════════════════════════════

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
    const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            refresh_token: refreshToken,
            client_id:     process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            grant_type:    "refresh_token",
        }),
    })
    const data = await res.json()
    return data.access_token || null
}

export async function getValidGmailToken(supabase: ReturnType<typeof createServerSupabaseClient>) {
    const { data: tokenRow } = await supabase
        .from("gmail_tokens")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single()

    if (!tokenRow) return null

    const isExpired = tokenRow.expiry_date < Date.now() + 5 * 60 * 1000
    if (isExpired && tokenRow.refresh_token) {
        const newToken = await refreshAccessToken(tokenRow.refresh_token)
        if (newToken) {
            await supabase.from("gmail_tokens").update({
                access_token: newToken,
                expiry_date:  Date.now() + 3600 * 1000,
                updated_at:   new Date().toISOString(),
            }).eq("email", tokenRow.email)
            return newToken
        }
    }
    return tokenRow.access_token
}

function getHeader(headers: { name: string; value: string }[], name: string): string {
    return headers.find(h => h.name.toLowerCase() === name.toLowerCase())?.value || ""
}

export async function GET(req: NextRequest) {
    try {
        const authClient = await createClient()
        const { data: { user } } = await authClient.auth.getUser()
        if (!isAdminEmail(user?.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const supabase = createServerSupabaseClient()
        const accessToken = await getValidGmailToken(supabase)
        if (!accessToken) {
            return NextResponse.json({ error: "gmail_not_connected", messages: [], threads: [] }, { status: 200 })
        }

        const { searchParams } = new URL(req.url)
        const maxResults = Math.min(Number(searchParams.get("max") || 20), 50)
        const pageToken = searchParams.get("pageToken") || ""
        const query = searchParams.get("q") || "in:inbox"
        const threadMode = searchParams.get("threads") === "1"

        // ── 스레드 모드 ──
        if (threadMode) {
            const url = new URL("https://gmail.googleapis.com/gmail/v1/users/me/threads")
            url.searchParams.set("maxResults", String(maxResults))
            url.searchParams.set("q", query)
            if (pageToken) url.searchParams.set("pageToken", pageToken)

            const listRes = await fetch(url.toString(), { headers: { Authorization: `Bearer ${accessToken}` } })
            const listData = await listRes.json()

            if (!listData.threads?.length) {
                return NextResponse.json({ threads: [], connected: true, nextPageToken: null })
            }

            const threads = await Promise.all(
                listData.threads.map(async (t: { id: string }) => {
                    const tRes = await fetch(
                        `https://gmail.googleapis.com/gmail/v1/users/me/threads/${t.id}?format=metadata&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Subject&metadataHeaders=Date`,
                        { headers: { Authorization: `Bearer ${accessToken}` } }
                    )
                    const tData = await tRes.json()
                    const msgs = tData.messages || []
                    const first = msgs[0]
                    const last = msgs[msgs.length - 1]
                    const headers = first?.payload?.headers || []
                    const lastHeaders = last?.payload?.headers || []

                    return {
                        threadId:     t.id,
                        subject:      getHeader(headers, "Subject") || "(제목 없음)",
                        from:         getHeader(headers, "From"),
                        lastFrom:     getHeader(lastHeaders, "From"),
                        date:         getHeader(lastHeaders, "Date"),
                        snippet:      last?.snippet || "",
                        messageCount: msgs.length,
                        isRead:       !msgs.some((m: { labelIds?: string[] }) => m.labelIds?.includes("UNREAD")),
                        messageIds:   msgs.map((m: { id: string }) => m.id),
                    }
                })
            )

            return NextResponse.json({
                threads,
                connected: true,
                nextPageToken: listData.nextPageToken || null,
            })
        }

        // ── 일반 메시지 모드 ──
        const url = new URL("https://gmail.googleapis.com/gmail/v1/users/me/messages")
        url.searchParams.set("maxResults", String(maxResults))
        url.searchParams.set("q", query)
        url.searchParams.set("labelIds", "INBOX")
        if (pageToken) url.searchParams.set("pageToken", pageToken)

        const listRes = await fetch(url.toString(), { headers: { Authorization: `Bearer ${accessToken}` } })
        const listData = await listRes.json()

        if (!listData.messages?.length) {
            return NextResponse.json({ messages: [], connected: true, nextPageToken: null })
        }

        const messageDetails = await Promise.all(
            listData.messages.map(async (msg: { id: string }) => {
                const detailRes = await fetch(
                    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Subject&metadataHeaders=Date`,
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                )
                const detail = await detailRes.json()
                const headers = detail.payload?.headers || []
                return {
                    id:          detail.id,
                    threadId:    detail.threadId,
                    from:        getHeader(headers, "From"),
                    to:          getHeader(headers, "To"),
                    subject:     getHeader(headers, "Subject") || "(제목 없음)",
                    date:        getHeader(headers, "Date"),
                    snippet:     detail.snippet || "",
                    isRead:      !detail.labelIds?.includes("UNREAD"),
                    labels:      detail.labelIds || [],
                    _source:     "gmail",
                }
            })
        )

        return NextResponse.json({
            messages: messageDetails,
            connected: true,
            nextPageToken: listData.nextPageToken || null,
        })
    } catch (err) {
        console.error("[GET /api/gmail/messages]", err)
        return NextResponse.json({ error: "서버 오류", messages: [] }, { status: 500 })
    }
}
