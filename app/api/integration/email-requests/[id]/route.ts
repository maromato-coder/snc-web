import { NextRequest, NextResponse } from "next/server"
import { verifyIntegrationKey, integrationUnauthorized } from "@/lib/integration-auth"
import { mapRequestForIntegration, patchEmailAccountRequest } from "@/lib/email-account-requests"

// PATCH /api/integration/email-requests/[id] — 승인·반려·발급

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!verifyIntegrationKey(req)) return integrationUnauthorized()

    try {
        const { id } = await params
        const body = await req.json()
        const status = String(body.status || "").toLowerCase()
        if (!status) {
            return NextResponse.json({ error: "status가 필요합니다" }, { status: 400 })
        }

        const result = await patchEmailAccountRequest(id, {
            status,
            admin_memo: body.note ?? body.admin_memo ?? null,
            reviewer_email: body.reviewer_email ?? null,
            temp_password: body.temp_password ?? null,
        })

        if ("error" in result) {
            return NextResponse.json({ error: result.error }, { status: result.status })
        }

        return NextResponse.json({
            success: true,
            request: mapRequestForIntegration(result.request),
        })
    } catch (err) {
        console.error("[PATCH integration email-requests]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
