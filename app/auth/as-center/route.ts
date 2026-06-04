import { NextRequest, NextResponse } from "next/server"
import { establishAdminSession, verifySsoToken } from "@/lib/integration-sso"

// GET /auth/as-center?token=...&redirect=/admin — 업무앱 SSO 소비

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const token = searchParams.get("token")
    const redirect = searchParams.get("redirect") || "/admin"

    if (!token) {
        return NextResponse.redirect(`${origin}/admin/login?error=missing_token`)
    }

    try {
        const payload = verifySsoToken(token)
        const target = redirect || payload.redirect || "/admin"
        return await establishAdminSession(payload.email, target, origin)
    } catch (err: unknown) {
        const e = err as { message?: string; status?: number }
        console.error("[auth/as-center]", err)
        const code = e.status === 401 ? "token_expired" : "sso_failed"
        return NextResponse.redirect(
            `${origin}/admin/login?error=${code}&msg=${encodeURIComponent(e.message || "SSO 실패")}`
        )
    }
}
