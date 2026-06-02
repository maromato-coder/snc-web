import { createClient } from "@supabase/supabase-js"

/**
 * 서버 전용 Supabase 클라이언트
 *
 * ⚠️ service_role 키를 사용하므로 RLS를 우회합니다.
 * 절대 클라이언트(브라우저)에서 import 하지 마세요.
 * API Route, Server Component, Server Action에서만 사용.
 */
export function createServerSupabaseClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !serviceKey) {
        throw new Error(
            "Supabase 환경변수 누락: NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY"
        )
    }

    return createClient(url, serviceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    })
}
