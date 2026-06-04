import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"

// ════════════════════════════════════════════════
// GET /api/gmail/auth
// Gmail OAuth 인증 시작 → Google 로그인 페이지로 리다이렉트
// ════════════════════════════════════════════════

const SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
].join(" ")

export async function GET() {
    // 관리자 인증 확인
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!isAdminEmail(user?.email)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const clientId = process.env.GOOGLE_CLIENT_ID!
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/gmail/callback`

    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth")
    url.searchParams.set("client_id", clientId)
    url.searchParams.set("redirect_uri", redirectUri)
    url.searchParams.set("response_type", "code")
    url.searchParams.set("scope", SCOPES)
    url.searchParams.set("access_type", "offline")
    url.searchParams.set("prompt", "consent")

    return NextResponse.redirect(url.toString())
}
