import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"
import { getStaffMailboxAuth, hasStaffMailboxAuth, saveStaffMailboxAuth } from "@/lib/staff-mailbox-auth"

// GET — 등록 여부 / POST — Zoho IMAP 비밀번호 1회 저장
export async function GET() {
    try {
        const authClient = await createClient()
        const {
            data: { user },
        } = await authClient.auth.getUser()
        const email = user?.email?.trim().toLowerCase()
        if (!email || !isAdminEmail(email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const configured = await hasStaffMailboxAuth(email)
        return NextResponse.json({ email, configured })
    } catch (err) {
        console.error("[GET staff-mailbox/credentials]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const authClient = await createClient()
        const {
            data: { user },
        } = await authClient.auth.getUser()
        const email = user?.email?.trim().toLowerCase()
        if (!email || !isAdminEmail(email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const password = String(body?.password || "").trim()
        if (!password) {
            return NextResponse.json({ error: "비밀번호를 입력하세요" }, { status: 400 })
        }

        await saveStaffMailboxAuth(email, password, user!.email!)
        const ok = await getStaffMailboxAuth(email)
        if (!ok) {
            return NextResponse.json({ error: "저장 후 인증 확인 실패" }, { status: 500 })
        }

        return NextResponse.json({ success: true, email })
    } catch (err: unknown) {
        const e = err as { status?: number; message?: string }
        console.error("[POST staff-mailbox/credentials]", err)
        return NextResponse.json({ error: e.message || "저장 실패" }, { status: e.status || 500 })
    }
}
