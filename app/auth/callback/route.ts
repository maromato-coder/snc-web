import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const ALLOWED_DOMAIN = "sncpc.com"
const ALLOWED_EMAILS = ["maromato@gmail.com"]

/**
 * Google OAuth 콜백 핸들러
 *
 * Google 로그인 성공 후 사용자가 이 경로로 리다이렉트됨.
 * code를 받아서 Supabase 세션으로 교환하고, 도메인을 한 번 더 검증.
 */
export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") || "/admin"

    if (!code) {
        return NextResponse.redirect(
            `${origin}/admin/login?error=callback_failed`
        )
    }

    const cookieStore = await cookies()

    // 응답 객체 — 콜백 처리 후 next 페이지로 리다이렉트
    const response = NextResponse.redirect(`${origin}${next}`)

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // code를 session으로 교환
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error || !data?.user) {
        return NextResponse.redirect(
            `${origin}/admin/login?error=callback_failed`
        )
    }

    // 도메인 검증 (Google "Internal" 설정으로 1차 차단되지만, 한 번 더)
    if (!data.user.email?.endsWith(`@${ALLOWED_DOMAIN}`) && !ALLOWED_EMAILS.includes(data.user.email || "")) {
        await supabase.auth.signOut()
        return NextResponse.redirect(
            `${origin}/admin/login?error=unauthorized_domain`
        )
    }

    return response
}
