// ════════════════════════════════════════════════
// lib/auth-check.ts
// 관리자 인증 확인 헬퍼
// @sncpc.com 도메인 또는 허용된 개인 계정
// ════════════════════════════════════════════════

const ALLOWED_DOMAIN = "sncpc.com"
const ALLOWED_EMAILS = ["maromato@gmail.com"]

export function isAdminEmail(email: string | null | undefined): boolean {
    if (!email) return false
    return email.endsWith(`@${ALLOWED_DOMAIN}`) || ALLOWED_EMAILS.includes(email)
}
