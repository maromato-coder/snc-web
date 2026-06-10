import { createClient } from "@/lib/supabase/server-auth"
import { redirect } from "next/navigation"
import { isAdminEmail } from "@/lib/auth-check"

// 직원 사내메일함 레이아웃 — @sncpc.com 로그인 필수
export default async function StaffMailLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user?.email || !isAdminEmail(user.email)) {
        redirect("/admin/login?redirect=/mail")
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#F8FAFF",
                fontFamily: "'Pretendard Variable', 'Inter', sans-serif",
            }}
        >
            {children}
        </div>
    )
}
