import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// ════════════════════════════════════════════════
// GET /api/gmail/callback
// Google OAuth 콜백 → 토큰 저장 → /admin/mail 리다이렉트
// ════════════════════════════════════════════════

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get("code")
    const error = searchParams.get("error")
    const appUrl = process.env.NEXT_PUBLIC_APP_URL!

    if (error || !code) {
        return NextResponse.redirect(`${appUrl}/admin/mail?gmail_error=${error || "no_code"}`)
    }

    try {
        // code → tokens 교환
        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id:     process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri:  `${appUrl}/api/gmail/callback`,
                grant_type:    "authorization_code",
            }),
        })

        const tokens = await tokenRes.json()
        if (!tokens.access_token) {
            console.error("[Gmail callback] Token exchange failed:", tokens)
            return NextResponse.redirect(`${appUrl}/admin/mail?gmail_error=token_exchange_failed`)
        }

        // 연결된 Gmail 계정 확인
        const profileRes = await fetch("https://www.googleapis.com/gmail/v1/users/me/profile", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        })
        const profile = await profileRes.json()
        const gmailEmail = profile.emailAddress

        // Supabase에 토큰 저장
        const supabase = createServerSupabaseClient()
        await supabase.from("gmail_tokens").upsert({
            email:         gmailEmail,
            access_token:  tokens.access_token,
            refresh_token: tokens.refresh_token || "",
            expiry_date:   Date.now() + (tokens.expires_in || 3600) * 1000,
            updated_at:    new Date().toISOString(),
        }, { onConflict: "email" })

        return NextResponse.redirect(`${appUrl}/admin/mail?gmail_connected=1`)
    } catch (err) {
        console.error("[Gmail callback] Unexpected:", err)
        return NextResponse.redirect(`${appUrl}/admin/mail?gmail_error=unexpected`)
    }
}
