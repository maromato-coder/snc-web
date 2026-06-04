// 업무앱(as-center) → 운영콘솔 1회용 SSO 토큰 발급·검증
import crypto from "node:crypto"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/auth-check"

const TTL_SEC = 60

export type SsoTokenPayload = {
    as_center_user_id?: number
    username?: string
    name?: string
    email: string
    role?: string
    company_id?: number
    redirect: string
    exp: number
}

function ssoSecret(): string {
    const key = process.env.INTEGRATION_API_KEY
    if (!key) throw new Error("INTEGRATION_API_KEY 미설정")
    return key
}

export function issueSsoToken(body: {
    as_center_user_id?: number
    username?: string
    name?: string
    email?: string
    role?: string
    company_id?: number
    redirect?: string
}): { token: string; expires_at: string; redirect: string } {
    const email = String(body.email || "").trim().toLowerCase()
    if (!email || !isAdminEmail(email)) {
        throw Object.assign(new Error("SSO 대상 이메일이 운영콘솔 관리자 권한이 없습니다."), {
            status: 403,
        })
    }

    const redirect = String(body.redirect || "/admin").slice(0, 200)
    const exp = Math.floor(Date.now() / 1000) + TTL_SEC
    const payload: SsoTokenPayload = {
        as_center_user_id: body.as_center_user_id,
        username: body.username,
        name: body.name,
        email,
        role: body.role,
        company_id: body.company_id,
        redirect: redirect.startsWith("/") ? redirect : `/${redirect}`,
        exp,
    }

    const json = JSON.stringify(payload)
    const sig = crypto.createHmac("sha256", ssoSecret()).update(json).digest("base64url")
    const token = `${Buffer.from(json, "utf8").toString("base64url")}.${sig}`
    return {
        token,
        expires_at: new Date(exp * 1000).toISOString(),
        redirect: payload.redirect,
    }
}

export function verifySsoToken(token: string): SsoTokenPayload {
    const parts = token.split(".")
    if (parts.length !== 2) throw Object.assign(new Error("잘못된 토큰"), { status: 400 })

    const json = Buffer.from(parts[0], "base64url").toString("utf8")
    const expected = crypto.createHmac("sha256", ssoSecret()).update(json).digest("base64url")
    if (expected !== parts[1]) throw Object.assign(new Error("토큰 서명 불일치"), { status: 401 })

    const payload = JSON.parse(json) as SsoTokenPayload
    if (!payload.email || !payload.exp) throw Object.assign(new Error("토큰 데이터 오류"), { status: 400 })
    if (payload.exp < Math.floor(Date.now() / 1000)) {
        throw Object.assign(new Error("토큰이 만료되었습니다. 운영콘솔 버튼을 다시 눌러주세요."), {
            status: 401,
        })
    }
    if (!isAdminEmail(payload.email)) {
        throw Object.assign(new Error("관리자 이메일이 아닙니다."), { status: 403 })
    }
    return payload
}

/** Supabase 세션 쿠키를 설정하고 리다이렉트 응답 반환 */
export async function establishAdminSession(email: string, redirectPath: string, origin: string) {
    const admin = createServerSupabaseClient()

    const { error: createErr } = await admin.auth.admin.createUser({
        email,
        email_confirm: true,
    })
    if (createErr && !String(createErr.message || "").toLowerCase().includes("already")) {
        console.error("[SSO] createUser", createErr)
    }

    const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
        type: "magiclink",
        email,
        options: { redirectTo: `${origin}${redirectPath}` },
    })

    if (linkErr || !linkData?.properties?.hashed_token) {
        console.error("[SSO] generateLink", linkErr)
        throw Object.assign(new Error("로그인 링크 생성 실패"), { status: 500 })
    }

    const cookieStore = await cookies()
    const safe = redirectPath.startsWith("/") ? redirectPath : "/admin"
    const response = NextResponse.redirect(`${origin}${safe}`)

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const { error: verifyErr } = await supabase.auth.verifyOtp({
        type: "magiclink",
        token_hash: linkData.properties.hashed_token,
    })

    if (verifyErr) {
        console.error("[SSO] verifyOtp", verifyErr)
        throw Object.assign(new Error("세션 생성 실패"), { status: 500 })
    }

    return response
}
