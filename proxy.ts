import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

const ALLOWED_DOMAIN = "sncpc.com"

/**
 * /admin 경로 보호 프록시 (Next.js 16 proxy 방식)
 */
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (pathname === "/admin/login") {
        return NextResponse.next()
    }

    if (!pathname.startsWith("/admin")) {
        return NextResponse.next()
    }

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

    if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = "/admin/login"
        return NextResponse.redirect(url)
    }

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
