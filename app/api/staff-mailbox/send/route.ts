import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"
import { getStaffMailboxAuth } from "@/lib/staff-mailbox-auth"
import nodemailer from "nodemailer"

// POST /api/staff-mailbox/send — 직원 본인 @sncpc.com 발송
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

        const auth = await getStaffMailboxAuth(email)
        if (!auth) {
            return NextResponse.json({ error: "mailbox_credentials_missing" }, { status: 403 })
        }

        const body = await req.json()
        const to = String(body?.to || "").trim()
        const subject = String(body?.subject || "").trim()
        const html = String(body?.html || "").trim()
        const text = String(body?.text || "").trim()
        if (!to || !subject || (!html && !text)) {
            return NextResponse.json({ error: "받는사람·제목·본문이 필요합니다" }, { status: 400 })
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth: { user: auth.user, pass: auth.pass },
        })

        await transporter.sendMail({
            from: auth.user,
            to,
            cc: body?.cc || undefined,
            subject,
            html: html || undefined,
            text: text || undefined,
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error("[POST /api/staff-mailbox/send]", err)
        return NextResponse.json({ error: "발송 실패" }, { status: 500 })
    }
}
