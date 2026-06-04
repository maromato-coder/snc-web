import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"

// ════════════════════════════════════════════════
// GET /api/gmail/messages/[id]
// Gmail 메시지 전체 본문 조회
// ════════════════════════════════════════════════

async function getValidToken(supabase: ReturnType<typeof createServerSupabaseClient>) {
    const { data: tokenRow } = await supabase
        .from("gmail_tokens")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single()

    if (!tokenRow) return null

    const isExpired = tokenRow.expiry_date < Date.now() + 5 * 60 * 1000
    if (isExpired && tokenRow.refresh_token) {
        const res = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                refresh_token: tokenRow.refresh_token,
                client_id:     process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                grant_type:    "refresh_token",
            }),
        })
        const data = await res.json()
        if (data.access_token) {
            await supabase.from("gmail_tokens").update({
                access_token: data.access_token,
                expiry_date:  Date.now() + 3600 * 1000,
                updated_at:   new Date().toISOString(),
            }).eq("email", tokenRow.email)
            return data.access_token
        }
    }
    return tokenRow.access_token
}

// base64url 디코딩
function decodeBase64(str: string): string {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/")
    try {
        return Buffer.from(base64, "base64").toString("utf-8")
    } catch {
        return ""
    }
}

// 파트에서 body 추출 (재귀)
function extractBody(payload: {
    mimeType?: string
    body?: { data?: string }
    parts?: unknown[]
}): { html: string | null; text: string | null } {
    let html: string | null = null
    let text: string | null = null

    if (payload.mimeType === "text/html" && payload.body?.data) {
        html = decodeBase64(payload.body.data)
    } else if (payload.mimeType === "text/plain" && payload.body?.data) {
        text = decodeBase64(payload.body.data)
    } else if (payload.parts) {
        for (const part of payload.parts as typeof payload[]) {
            const result = extractBody(part)
            if (result.html) html = result.html
            if (result.text) text = result.text
        }
    }

    return { html, text }
}

export async function GET(
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
        const supabase = createServerSupabaseClient()
        const accessToken = await getValidToken(supabase)

        if (!accessToken) {
            return NextResponse.json({ error: "gmail_not_connected" }, { status: 200 })
        }

        const res = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        const detail = await res.json()

        if (!detail.id) {
            return NextResponse.json({ error: "메시지를 찾을 수 없습니다" }, { status: 404 })
        }

        const headers = detail.payload?.headers || []
        const getHeader = (name: string) =>
            headers.find((h: { name: string; value: string }) =>
                h.name.toLowerCase() === name.toLowerCase()
            )?.value || ""

        const { html, text } = extractBody(detail.payload || {})

        return NextResponse.json({
            message: {
                id: detail.id,
                threadId: detail.threadId,
                from: getHeader("From"),
                to: getHeader("To"),
                subject: getHeader("Subject") || "(제목 없음)",
                date: getHeader("Date"),
                html,
                text,
                snippet: detail.snippet || "",
                isRead: !detail.labelIds?.includes("UNREAD"),
            }
        })
    } catch (err) {
        console.error("[GET /api/gmail/messages/[id]]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
