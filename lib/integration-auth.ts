// ════════════════════════════════════════════════
// lib/integration-auth.ts
// as_center → snc-web API 호출 시 인증 검증
// ════════════════════════════════════════════════

import { NextRequest } from "next/server"

export function verifyIntegrationKey(req: NextRequest): boolean {
    const apiKey = process.env.INTEGRATION_API_KEY
    if (!apiKey) return false

    const authHeader = req.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) return false

    const providedKey = authHeader.slice(7)
    return providedKey === apiKey
}

export function integrationUnauthorized() {
    return Response.json({ error: "Unauthorized — API Key 필요" }, { status: 401 })
}
