import { createClient } from "@/lib/supabase/server-auth"
import { redirect } from "next/navigation"
import Sidebar from "@/components/admin/Sidebar"

export const metadata = {
    title: "SNC 운영 콘솔",
}

/**
 * /admin/(app) 그룹용 레이아웃 — 사이드바 셸 + 인증 가드
 *
 * /admin/login은 이 레이아웃을 거치지 않습니다 ((app) 그룹 밖에 있어서).
 * 그래서 무한 리다이렉트 루프가 발생하지 않습니다.
 */
export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/admin/login")
    }

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#F8FAFF",
                fontFamily: "'Pretendard Variable', 'Inter', sans-serif",
            }}
        >
            <Sidebar userEmail={user.email || ""} />
            <main
                style={{
                    flex: 1,
                    overflow: "auto",
                    minWidth: 0,
                }}
            >
                {children}
            </main>
        </div>
    )
}
