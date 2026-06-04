// ════════════════════════════════════════════════
// lib/auth-check.ts
// 관리자 인증 확인 헬퍼
// @sncpc.com 도메인 또는 허용된 개인 계정
// ════════════════════════════════════════════════

const ALLOWED_DOMAIN = "sncpc.com"
const ALLOWED_EMAILS = ["maromato@gmail.com"]

function extraAllowedEmails(): string[] {
    const raw = process.env.AS_CENTER_SSO_EXTRA_EMAILS || ""
    return raw
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)
}

export function isAdminEmail(email: string | null | undefined): boolean {
    if (!email) return false
    const e = email.trim().toLowerCase()
    return (
        e.endsWith(`@${ALLOWED_DOMAIN}`) ||
        ALLOWED_EMAILS.includes(e) ||
        extraAllowedEmails().includes(e)
    )
}

/** 업무앱 Integration SSO — 본사·관리자 역할 */
export const AS_CENTER_SSO_ROLES = ["admin", "manager", "hq_admin", "superadmin"] as const

export function isAsCenterSsoRole(role: string | null | undefined): boolean {
    return AS_CENTER_SSO_ROLES.includes(
        String(role || "").toLowerCase() as (typeof AS_CENTER_SSO_ROLES)[number]
    )
}
