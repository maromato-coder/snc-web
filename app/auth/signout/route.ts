import { createClient } from "@/lib/supabase/server-auth"
import { NextResponse } from "next/server"

/**
 * 로그아웃 라우트
 * 세션을 정리하고 로그인 페이지로 리다이렉트.
 */
export async function POST(request: Request) {
    const supabase = await createClient()
    await supabase.auth.signOut()

    const url = new URL(request.url)
    return NextResponse.redirect(`${url.origin}/admin/login`, {
        status: 303, // POST → GET 리다이렉트
    })
}
