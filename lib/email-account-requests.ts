// 업무앱·공개 API 공통 — @sncpc 이메일 계정 신청 DB 처리
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { getResendClient } from "@/lib/resend-client"
import { saveStaffMailboxAuth } from "@/lib/staff-mailbox-auth"

export type EmailRequestRow = {
    id: string
    requester_name: string
    requester_email: string
    requested_email: string
    department: string | null
    purpose: string | null
    status: string
    admin_memo: string | null
    issued_at: string | null
    created_at: string
    as_center_user_id?: number | null
    company_id?: number | null
    reviewer_email?: string | null
}

const STATUS_LABEL: Record<string, string> = {
    pending: "검토 중",
    approved: "승인됨",
    issued: "발급 완료",
    rejected: "거절됨",
}

function normalizeEmail(v: unknown): string {
    return String(v || "").trim().toLowerCase()
}

export function validateEmailRequestInput(body: {
    requester_name?: string
    requester_email?: string
    requested_email?: string
}) {
    const requester_name = String(body.requester_name || "").trim()
    const requester_email = normalizeEmail(body.requester_email)
    const requested_email = normalizeEmail(body.requested_email)

    if (!requester_name || !requester_email || !requested_email) {
        return { error: "필수 항목이 누락되었습니다", status: 400 as const }
    }
    if (!requested_email.endsWith("@sncpc.com")) {
        return { error: "@sncpc.com 주소만 신청 가능합니다", status: 400 as const }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(requester_email)) {
        return { error: "올바른 연락 이메일을 입력해주세요", status: 400 as const }
    }
    return {
        requester_name,
        requester_email,
        requested_email,
    }
}

export async function listEmailAccountRequests(status = "all") {
    const supabase = createServerSupabaseClient()
    let query = supabase
        .from("email_account_requests")
        .select("*")
        .order("created_at", { ascending: false })

    if (status !== "all") query = query.eq("status", status)

    const { data, error } = await query
    if (error) throw error
    return (data || []) as EmailRequestRow[]
}

export async function createEmailAccountRequest(input: {
    requester_name: string
    requester_email: string
    requested_email: string
    department?: string | null
    purpose?: string | null
    as_center_user_id?: number | null
    company_id?: number | null
    sendNotifications?: boolean
}) {
    const supabase = createServerSupabaseClient()

    const { data: existing } = await supabase
        .from("email_account_requests")
        .select("id, status")
        .eq("requested_email", input.requested_email)
        .in("status", ["pending", "approved", "issued"])
        .maybeSingle()

    if (existing) {
        return {
            error: `이미 신청된 주소입니다 (${STATUS_LABEL[existing.status] || existing.status})`,
            status: 409 as const,
        }
    }

    const baseRow: Record<string, unknown> = {
        requester_name: input.requester_name,
        requester_email: input.requester_email,
        requested_email: input.requested_email,
        department: input.department?.trim() || null,
        purpose: input.purpose?.trim() || null,
    }

    const withMeta: Record<string, unknown> = { ...baseRow }
    if (input.as_center_user_id != null) withMeta.as_center_user_id = input.as_center_user_id
    if (input.company_id != null) withMeta.company_id = input.company_id

    let inserted = await supabase.from("email_account_requests").insert(withMeta).select().single()
    if (inserted.error?.message?.includes("as_center_user_id")) {
        inserted = await supabase.from("email_account_requests").insert(baseRow).select().single()
        if (!inserted.error && inserted.data) {
            const meta = `[as_center user=${input.as_center_user_id ?? "-"} company=${input.company_id ?? "-"}]`
            const prev = String(inserted.data.purpose || "").trim()
            await supabase
                .from("email_account_requests")
                .update({ purpose: prev ? `${prev} ${meta}` : meta })
                .eq("id", inserted.data.id)
        }
    }

    if (inserted.error || !inserted.data) {
        console.error("[email-account-requests] insert", inserted.error)
        return { error: "저장 실패", status: 500 as const }
    }

    const row = inserted.data as EmailRequestRow

    const resend = getResendClient()
    if (input.sendNotifications !== false && resend) {
        await sendCreateNotifications(row).catch((e) =>
            console.error("[email-account-requests] notify", e)
        )
    }

    return { request: row }
}

export async function patchEmailAccountRequest(
    id: string,
    input: {
        status: string
        admin_memo?: string | null
        reviewer_email?: string | null
        temp_password?: string | null
    }
) {
    const validStatuses = ["pending", "approved", "issued", "rejected"]
    if (!validStatuses.includes(input.status)) {
        return { error: "잘못된 상태값", status: 400 as const }
    }

    const supabase = createServerSupabaseClient()

    const { data: current, error: loadErr } = await supabase
        .from("email_account_requests")
        .select("*")
        .eq("id", id)
        .single()

    if (loadErr || !current) {
        return { error: "찾을 수 없음", status: 404 as const }
    }

    const memoParts: string[] = []
    if (input.admin_memo) memoParts.push(String(input.admin_memo).trim())
    if (input.reviewer_email) memoParts.push(`[검토자 ${input.reviewer_email}]`)
    if (input.temp_password) memoParts.push(`[임시비밀번호 기록됨]`)

    const updateData: Record<string, unknown> = {
        status: input.status,
        updated_at: new Date().toISOString(),
    }
    if (memoParts.length) {
        const prev = String(current.admin_memo || "").trim()
        updateData.admin_memo = prev ? `${prev}\n${memoParts.join(" ")}` : memoParts.join(" ")
    }
    if (input.status === "issued") updateData.issued_at = new Date().toISOString()

    const patchMeta: Record<string, unknown> = { ...updateData }
    if (input.reviewer_email) patchMeta.reviewer_email = input.reviewer_email

    let updated = await supabase
        .from("email_account_requests")
        .update(patchMeta)
        .eq("id", id)
        .select()
        .single()

    if (updated.error?.message?.includes("reviewer_email")) {
        updated = await supabase
            .from("email_account_requests")
            .update(updateData)
            .eq("id", id)
            .select()
            .single()
    }

    if (updated.error || !updated.data) {
        console.error("[email-account-requests] patch", updated.error)
        return { error: "업데이트 실패", status: 500 as const }
    }

    const data = updated.data as EmailRequestRow

    if (input.status === "issued" && data.requested_email) {
        await supabase
            .from("sender_accounts")
            .upsert(
                {
                    email: data.requested_email,
                    display_name: data.requester_name,
                    is_active: true,
                    created_by: input.reviewer_email || "as-center-integration",
                },
                { onConflict: "email" }
            )
            .then(({ error }) => {
                if (error) console.error("[email-account-requests] sender_accounts", error)
            })

        if (input.temp_password) {
            await saveStaffMailboxAuth(data.requested_email, input.temp_password, input.reviewer_email || undefined).catch(
                (e) => console.error("[email-account-requests] staff_mailbox_credentials", e)
            )
        }
    }

    const resendAfter = getResendClient()
    if (resendAfter && (input.status === "issued" || input.status === "rejected") && data.requester_email) {
        await sendStatusNotification(data, input.status, updateData.admin_memo as string | undefined, resendAfter).catch(
            (e) => console.error("[email-account-requests] status mail", e)
        )
    }

    return { request: data }
}

async function sendCreateNotifications(row: EmailRequestRow) {
    const resend = getResendClient()
    if (!resend) return
    await resend.emails.send({
        from: "SNC <noreply@sncpc.com>",
        to: [row.requester_email],
        subject: "[SNC] 이메일 계정 신청이 접수되었습니다",
        html: `<p>${row.requester_name}님, <strong>${row.requested_email}</strong> 신청이 접수되었습니다.</p>`,
    })
    await resend.emails.send({
        from: "SNC 알림 <noreply@sncpc.com>",
        to: [process.env.RECIPIENT_EMAIL || "maromato@gmail.com"],
        subject: `[SNC] 새 이메일 계정 신청 — ${row.requested_email}`,
        html: `<p>신청자: ${row.requester_name} · ${row.requested_email}</p>`,
    })
}

async function sendStatusNotification(
    data: EmailRequestRow,
    status: string,
    admin_memo?: string,
    resend = getResendClient()
) {
    if (!resend) return
    const isIssued = status === "issued"
    await resend.emails.send({
        from: "SNC <noreply@sncpc.com>",
        to: [data.requester_email],
        subject: `[SNC] 이메일 계정 신청 ${isIssued ? "발급 완료" : "거절"} 안내`,
        html: `<p>${data.requester_name}님, ${data.requested_email} — ${isIssued ? "발급 완료" : "거절"}${admin_memo ? `<br/>${admin_memo}` : ""}</p>`,
    })
}

export function mapRequestForIntegration(row: EmailRequestRow) {
    let as_center_user_id = row.as_center_user_id ?? null
    let company_id = row.company_id ?? null
    if (as_center_user_id == null && row.purpose) {
        const m = row.purpose.match(/as_center user=(\d+)/)
        if (m) as_center_user_id = Number(m[1])
        const c = row.purpose.match(/company=(\d+)/)
        if (c) company_id = Number(c[1])
    }
    return {
        id: row.id,
        requester_name: row.requester_name,
        requester_email: row.requester_email,
        requested_email: row.requested_email,
        department: row.department,
        status: row.status,
        issued_at: row.issued_at,
        created_at: row.created_at,
        as_center_user_id,
        company_id,
    }
}
