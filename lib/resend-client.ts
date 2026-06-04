// Resend 클라이언트 — 빌드 시 API 키 없어도 모듈 로드 가능
import { Resend } from "resend"

let cached: Resend | null = null

export function getResendClient(): Resend | null {
    const key = process.env.RESEND_API_KEY
    if (!key) return null
    if (!cached) cached = new Resend(key)
    return cached
}
