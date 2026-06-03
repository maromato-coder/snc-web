import { createClient } from "@/lib/supabase/server-auth"
import { redirect } from "next/navigation"
import Sidebar from "@/components/admin/Sidebar"

export default async function AdminAppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect("/admin/login")

    return (
        <>
            {/* 모바일/데스크탑 반응형 레이아웃 */}
            <style>{`
                .admin-shell {
                    display: flex;
                    min-height: 100vh;
                    background: #F8FAFF;
                    font-family: 'Pretendard Variable', 'Inter', sans-serif;
                }
                .admin-sidebar {
                    display: flex;
                    flex-shrink: 0;
                }
                .admin-main {
                    flex: 1;
                    min-width: 0;
                    overflow-x: auto;
                }
                /* 모바일: 사이드바 숨기고 상단 바로 전환 */
                @media (max-width: 768px) {
                    .admin-shell { flex-direction: column; }
                    .admin-sidebar { display: none; }
                    .admin-mobile-bar { display: flex !important; }
                    .admin-main { padding-bottom: 80px; }
                }
            `}</style>

            <div className="admin-shell">
                {/* 데스크탑 사이드바 */}
                <div className="admin-sidebar">
                    <Sidebar userEmail={user.email ?? ""} />
                </div>

                {/* 모바일 상단 바 (기본 숨김) */}
                <div
                    className="admin-mobile-bar"
                    style={{
                        display: "none",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 20px",
                        background: "#FFFFFF",
                        borderBottom: "1px solid #E2E8F2",
                        position: "sticky",
                        top: 0,
                        zIndex: 30,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{
                            width: 26, height: 26,
                            background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                            borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <span style={{ color: "#FFF", fontSize: 9, fontWeight: 700, fontFamily: "Inter, sans-serif" }}>SNC</span>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#0A1733" }}>운영 콘솔</span>
                    </div>
                    <MobileNav />
                </div>

                <main className="admin-main">
                    {children}
                </main>
            </div>
        </>
    )
}

// 모바일 하단 네비게이션
function MobileNav() {
    return (
        <style>{`
            .admin-mobile-bottom {
                display: none;
                position: fixed;
                bottom: 0; left: 0; right: 0;
                background: #FFFFFF;
                border-top: 1px solid #E2E8F2;
                padding: 8px 0 12px;
                z-index: 30;
                justify-content: space-around;
            }
            @media (max-width: 768px) {
                .admin-mobile-bottom { display: flex !important; }
            }
            .mobile-nav-item {
                display: flex; flex-direction: column;
                align-items: center; gap: 3px;
                text-decoration: none;
                color: #8A9AB8; font-size: 10px; font-weight: 500;
                padding: 4px 12px;
            }
            .mobile-nav-item.active { color: #0066FF; }
        `}</style>
    )
}
