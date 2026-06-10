import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"
import { getStaffMailboxAuth } from "@/lib/staff-mailbox-auth"
import { getStaffZohoMessage } from "@/lib/staff-zoho-imap"

// GET /api/staff-mailbox/messages/[uid]
export async function GET(_req: NextRequest, ctx: { params: Promise<{ uid: string }> }) {
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
            return NextResponse.json({ error: "mailbox_credentials_missing" }, { status: 403 })
        }

        const { uid } = await ctx.params
        const detail = await getStaffZohoMessage(auth, Number(uid))
        return NextResponse.json({ detail })
    } catch (err: unknown) {
        const e = err as { status?: number; message?: string }
        console.error("[GET /api/staff-mailbox/messages/uid]", err)
        return NextResponse.json({ error: e.message || "조회 실패" }, { status: e.status || 500 })
    }
}
