import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * 서버 컴포넌트·Route Handler에서 사용하는 인증 클라이언트.
 *
 * 쿠키 기반으로 세션을 읽고 씁니다.
 * anon key를 사용하므로 RLS의 보호를 받습니다.
 *
 * ⚠️ 주의: 기존 `server.ts`는 service_role 키로 RLS를 우회합니다.
 *   목적이 다르므로 혼동하지 마세요.
 *   - server.ts (service role)  → 폼 제출 등 신뢰된 서버 작업
 *   - server-auth.ts (anon)     → 로그인 사용자 컨텍스트가 필요한 작업
 */
export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // Server Component에서는 쿠키 세팅 불가 — 무시
                    }
                },
            },
        }
    )
}
