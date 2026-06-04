import { NextRequest, NextResponse } from "next/server"
import { verifyIntegrationKey, integrationUnauthorized } from "@/lib/integration-auth"
import {
    createEmailAccountRequest,
    listEmailAccountRequests,
    mapRequestForIntegration,
    validateEmailRequestInput,
} from "@/lib/email-account-requests"

// GET  /api/integration/email-requests — 목록
// POST /api/integration/email-requests — 업무앱 신청 생성

export async function GET(req: NextRequest) {
    if (!verifyIntegrationKey(req)) return integrationUnauthorized()

    try {
        const { searchParams } = new URL(req.url)
        const status = searchParams.get("status") || "all"
        const rows = await listEmailAccountRequests(status)
        return NextResponse.json({
            requests: rows.map(mapRequestForIntegration),
        })
    } catch (err) {
        console.error("[GET integration email-requests]", err)
        return NextResponse.json({ error: "조회 실패" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    if (!verifyIntegrationKey(req)) return integrationUnauthorized()

    try {
        let body: Record<string, unknown>
        try {
            body = await req.json()
        } catch {
            return NextResponse.json(
                { error: "JSON 형식이 올바르지 않습니다. PowerShell은 Invoke-RestMethod 또는 body 파일을 사용하세요." },
                { status: 400 }
            )
        }
        const validated = validateEmailRequestInput(body)
        if ("error" in validated) {
            return NextResponse.json({ error: validated.error }, { status: validated.status })
        }

        const result = await createEmailAccountRequest({
            ...validated,
            department: body.department != null ? String(body.department) : undefined,
            purpose: body.purpose != null ? String(body.purpose) : undefined,
            as_center_user_id:
                body.as_center_user_id != null ? Number(body.as_center_user_id) : undefined,
            company_id: body.company_id != null ? Number(body.company_id) : undefined,
            sendNotifications: true,
        })

        if ("error" in result) {
            return NextResponse.json({ error: result.error }, { status: result.status })
        }

        return NextResponse.json({
            request: mapRequestForIntegration(result.request),
        })
    } catch (err) {
        console.error("[POST integration email-requests]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
