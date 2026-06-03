import { createClient } from "@/lib/supabase/server-auth"
import { redirect } from "next/navigation"
import Sidebar from "@/components/admin/Sidebar"

// ════════════════════════════════════════════════
// admin/(app)/layout.tsx
// 인증 확인 + 사이드바 레이아웃
// ════════════════════════════════════════════════

export default async function AdminAppLayout({
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
            <Sidebar userEmail={user.email ?? ""} />
            <main style={{ flex: 1, minWidth: 0, overflowX: "auto" }}>
                {children}
            </main>
        </div>
    )
}
