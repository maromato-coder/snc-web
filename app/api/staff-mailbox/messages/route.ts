import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"
import { getStaffMailboxAuth } from "@/lib/staff-mailbox-auth"
import { listStaffZohoMessages } from "@/lib/staff-zoho-imap"

// GET /api/staff-mailbox/messages — 로그인 직원 본인 Zoho INBOX
export async function GET(req: NextRequest) {
    try {
        const authClient = await createClient()
        const {
            data: { user },
        } = await authClient.auth.getUser()
        const email = user?.email?.trim().toLowerCase()
        if (!email || !isAdminEmail(email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const auth = await getStaffMailboxAuth(email)
        if (!auth) {
            return NextResponse.json(
                {
                    error: "mailbox_credentials_missing",
                    connected: false,
                    messages: [],
                    hint: "Zoho 메일 비밀번호(또는 앱 비밀번호)를 등록해야 합니다. 관리자 발급완료 처리 또는 아래에서 1회 입력하세요.",
                },
                { status: 200 }
            )
        }

        const { searchParams } = new URL(req.url)
        const data = await listStaffZohoMessages(auth, {
            limit: Number(searchParams.get("limit") || 20),
            page: Number(searchParams.get("page") || 1),
            query: searchParams.get("q") || "",
        })

        return NextResponse.json(data)
    } catch (err) {
        console.error("[GET /api/staff-mailbox/messages]", err)
        return NextResponse.json(
            { error: "zoho_connection_failed", connected: false, messages: [], hint: "Zoho IMAP 연결 실패. 비밀번호·계정 활성화를 확인하세요." },
            { status: 200 }
        )
    }
}
