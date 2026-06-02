"use client"

import { createBrowserClient } from "@supabase/ssr"

/**
 * 브라우저 전용 Supabase 클라이언트
 *
 * 로그인 페이지나 클라이언트 컴포넌트에서 사용.
 * anon key를 사용하므로 RLS의 보호를 받음.
 */
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
