// 사내메일 IMAP 비밀번호 암·복호화 (서버 전용)
import crypto from "node:crypto"

const ALGO = "aes-256-gcm"

function deriveKey(): Buffer {
    const raw = process.env.MAIL_CREDENTIAL_SECRET || process.env.INTEGRATION_API_KEY
    if (!raw) throw new Error("MAIL_CREDENTIAL_SECRET 또는 INTEGRATION_API_KEY 미설정")
    return crypto.createHash("sha256").update(raw).digest()
}

export function encryptMailboxSecret(plain: string): string {
    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv(ALGO, deriveKey(), iv)
    const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()])
    const tag = cipher.getAuthTag()
    return `${iv.toString("base64url")}.${tag.toString("base64url")}.${enc.toString("base64url")}`
}

export function decryptMailboxSecret(blob: string): string {
    const [ivB, tagB, dataB] = blob.split(".")
    if (!ivB || !tagB || !dataB) throw new Error("잘못된 암호문")
    const decipher = crypto.createDecipheriv(ALGO, deriveKey(), Buffer.from(ivB, "base64url"))
    decipher.setAuthTag(Buffer.from(tagB, "base64url"))
    return Buffer.concat([
        decipher.update(Buffer.from(dataB, "base64url")),
        decipher.final(),
    ]).toString("utf8")
}
