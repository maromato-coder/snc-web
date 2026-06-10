// 직원 @sncpc.com 사서함 IMAP 인증 정보 조회·저장
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { decryptMailboxSecret, encryptMailboxSecret } from "@/lib/mailbox-crypto"

export type MailboxAuth = { user: string; pass: string }

function normalizeEmail(v: unknown): string {
    return String(v || "").trim().toLowerCase()
}

export async function getStaffMailboxAuth(email: string): Promise<MailboxAuth | null> {
    const mailbox = normalizeEmail(email)
    if (!mailbox.endsWith("@sncpc.com")) return null

    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
        .from("staff_mailbox_credentials")
        .select("imap_secret")
        .eq("email", mailbox)
        .maybeSingle()

    if (error?.code === "42P01") return null
    if (error) throw error

    if (data?.imap_secret) {
        return { user: mailbox, pass: decryptMailboxSecret(data.imap_secret) }
    }

    const sharedUser = normalizeEmail(process.env.ZOHO_IMAP_USER)
    if (sharedUser && mailbox === sharedUser && process.env.ZOHO_IMAP_PASSWORD) {
        return { user: sharedUser, pass: process.env.ZOHO_IMAP_PASSWORD }
    }

    return null
}

export async function saveStaffMailboxAuth(email: string, password: string, updatedBy?: string) {
    const mailbox = normalizeEmail(email)
    const pass = String(password || "").trim()
    if (!mailbox.endsWith("@sncpc.com") || !pass) {
        throw Object.assign(new Error("이메일·비밀번호가 필요합니다"), { status: 400 })
    }

    const supabase = createServerSupabaseClient()
    const row = {
        email: mailbox,
        imap_secret: encryptMailboxSecret(pass),
        updated_by: updatedBy || null,
        updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from("staff_mailbox_credentials").upsert(row, { onConflict: "email" })
    if (error?.code === "42P01") {
        throw Object.assign(new Error("staff_mailbox_credentials 테이블이 없습니다. Supabase 마이그레이션을 적용하세요."), {
            status: 503,
        })
    }
    if (error) throw error
}

export async function hasStaffMailboxAuth(email: string): Promise<boolean> {
    return !!(await getStaffMailboxAuth(email))
}
