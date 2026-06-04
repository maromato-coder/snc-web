import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"

// ════════════════════════════════════════════════
// GET /api/gmail/messages
// Gmail 받은메일함 목록 조회 (최신 20건)
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

async function getValidToken(supabase: ReturnType<typeof createServerSupabaseClient>) {
    const { data: tokenRow } = await supabase
        .from("gmail_tokens")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single()

    if (!tokenRow) return null

    // 만료 5분 전이면 갱신
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

// 메시지 헤더에서 값 추출
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
        const accessToken = await getValidToken(supabase)

        if (!accessToken) {
            return NextResponse.json({ error: "gmail_not_connected", messages: [] }, { status: 200 })
        }

        const { searchParams } = new URL(req.url)
        const maxResults = Number(searchParams.get("max") || 20)
        const query = searchParams.get("q") || "in:inbox"

        // 메시지 목록 조회
        const listRes = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}&q=${encodeURIComponent(query)}&labelIds=INBOX`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        const listData = await listRes.json()

        if (!listData.messages || listData.messages.length === 0) {
            return NextResponse.json({ messages: [], connected: true })
        }

        // 각 메시지 상세 조회 (병렬)
        const messageDetails = await Promise.all(
            listData.messages.map(async (msg: { id: string }) => {
                const detailRes = await fetch(
                    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Subject&metadataHeaders=Date`,
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                )
                const detail = await detailRes.json()
                const headers = detail.payload?.headers || []

                return {
                    id:       detail.id,
                    threadId: detail.threadId,
                    from:     getHeader(headers, "From"),
                    to:       getHeader(headers, "To"),
                    subject:  getHeader(headers, "Subject") || "(제목 없음)",
                    date:     getHeader(headers, "Date"),
                    snippet:  detail.snippet || "",
                    isRead:   !detail.labelIds?.includes("UNREAD"),
                    labels:   detail.labelIds || [],
                }
            })
        )

        return NextResponse.json({ messages: messageDetails, connected: true })
    } catch (err) {
        console.error("[GET /api/gmail/messages]", err)
        return NextResponse.json({ error: "서버 오류", messages: [] }, { status: 500 })
    }
}
