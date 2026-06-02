import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

const ALLOWED_DOMAIN = "sncpc.com"

/**
 * /admin 경로 보호 미들웨어
 *
 * 흐름:
 *   1. /admin/* 경로 접근 시 세션 확인
 *   2. 세션 없으면 → /admin/login으로 리다이렉트
 *   3. 세션 있는데 @sncpc.com이 아니면 → 로그아웃 + 거부 메시지
 *   4. 세션 + 올바른 도메인 → 통과
 *
 * /admin/login 자체는 보호하지 않음 (당연히)
 */
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 로그인 페이지는 무조건 통과
    if (pathname === "/admin/login") {
        return NextResponse.next()
    }

    // /admin 이 아닌 경로는 통과
    if (!pathname.startsWith("/admin")) {
        return NextResponse.next()
    }

    // 쿠키 세션 갱신용 응답 객체
    let response = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    response = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // 로그인 안 됨 → 로그인 페이지로
    if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = "/admin/login"
        return NextResponse.redirect(url)
    }

    // 도메인 검증 (defense in depth)
    if (!user.email?.endsWith(`@${ALLOWED_DOMAIN}`)) {
        await supabase.auth.signOut()
        const url = request.nextUrl.clone()
        url.pathname = "/admin/login"
        url.searchParams.set("error", "unauthorized_domain")
        return NextResponse.redirect(url)
    }

    return response
}

export const config = {
    matcher: ["/admin/:path*"],
}
