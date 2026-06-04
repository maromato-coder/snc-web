import { NextRequest, NextResponse } from "next/server"
import { verifyIntegrationKey, integrationUnauthorized } from "@/lib/integration-auth"
import { issueSsoToken } from "@/lib/integration-sso"

// POST /api/integration/sso-token — 업무앱 운영콘솔 SSO 1회용 토큰

export async function POST(req: NextRequest) {
    if (!verifyIntegrationKey(req)) return integrationUnauthorized()

    try {
        const body = await req.json()
        const issued = issueSsoToken(body)
        return NextResponse.json({
            token: issued.token,
            sso_token: issued.token,
            expires_at: issued.expires_at,
            redirect: issued.redirect,
        })
    } catch (err: unknown) {
        const e = err as { message?: string; status?: number }
        console.error("[POST integration sso-token]", err)
        return NextResponse.json(
            { error: e.message || "SSO 토큰 발급 실패" },
            { status: e.status || 500 }
        )
    }
}
