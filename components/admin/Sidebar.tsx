"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

// ════════════════════════════════════════════════
// Sidebar — 관리자 콘솔 좌측 사이드바 (Linear 톤)
// ════════════════════════════════════════════════

const NAV_ITEMS = [
    {
        href: "/admin",
        label: "대시보드",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        ),
    },
    {
        href: "/admin/submissions",
        label: "신청 관리",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
        ),
    },
    {
        href: "/admin/mail",
        label: "통합 메일함",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
    {
        href: "/admin/email-requests",
        label: "계정 신청 관리",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
        ),
    },
    {
        href: "/admin/email",
        label: "이메일 관리",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
            </svg>
        ),
    },
    {
        href: "/admin/sites",
        label: "사이트 관리",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
        ),
        comingSoon: true,
    },
    {
        href: "/admin/users",
        label: "사용자 관리",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
        comingSoon: true,
    },
    {
        href: "/admin/settings",
        label: "설정",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
        ),
        comingSoon: true,
    },
]

interface SidebarProps {
    userEmail: string
}

export default function Sidebar({ userEmail }: SidebarProps) {
    const pathname = usePathname()
    const initial = userEmail?.[0]?.toUpperCase() ?? "A"

    return (
        <aside
            style={{
                width: 220,
                flexShrink: 0,
                background: "#FFFFFF",
                borderRight: "1px solid #E2E8F2",
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                position: "sticky",
                top: 0,
                overflowY: "auto",
            }}
        >
            {/* 로고 */}
            <div
                style={{
                    padding: "20px 20px 16px",
                    borderBottom: "1px solid #F0F2F8",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                        style={{
                            width: 28,
                            height: 28,
                            background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                            borderRadius: 7,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <span style={{ color: "#FFF", fontSize: 11, fontWeight: 700, fontFamily: "Inter, sans-serif" }}>
                            SNC
                        </span>
                    </div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1733", lineHeight: 1.2 }}>운영 콘솔</div>
                        <div style={{ fontSize: 10, color: "#5A6A8A", letterSpacing: 0.5 }}>OPERATIONS</div>
                    </div>
                </div>
            </div>

            {/* 내비게이션 */}
            <nav style={{ padding: "12px 10px", flex: 1 }}>
                {NAV_ITEMS.map((item) => {
                    const isActive =
                        item.href === "/admin"
                            ? pathname === "/admin"
                            : pathname.startsWith(item.href)

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 9,
                                padding: "7px 10px",
                                borderRadius: 7,
                                marginBottom: 2,
                                textDecoration: "none",
                                fontSize: 13,
                                fontWeight: isActive ? 600 : 400,
                                color: isActive ? "#0046C0" : "#374B6B",
                                background: isActive ? "#EEF5FF" : "transparent",
                                transition: "background 0.15s, color 0.15s",
                            }}
                        >
                            <span
                                style={{
                                    color: isActive ? "#0066FF" : "#8A9AB8",
                                    display: "flex",
                                    flexShrink: 0,
                                }}
                            >
                                {item.icon}
                            </span>
                            <span style={{ flex: 1 }}>{item.label}</span>
                            {item.comingSoon && (
                                <span
                                    style={{
                                        fontSize: 9,
                                        fontWeight: 600,
                                        color: "#8A9AB8",
                                        background: "#F0F2F8",
                                        borderRadius: 4,
                                        padding: "2px 5px",
                                        letterSpacing: 0.3,
                                    }}
                                >
                                    SOON
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* 사용자 프로필 + 로그아웃 */}
            <div
                style={{
                    padding: "14px 16px",
                    borderTop: "1px solid #F0F2F8",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 9,
                        marginBottom: 10,
                    }}
                >
                    <div
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                            color: "#FFF",
                            fontSize: 12,
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        {initial}
                    </div>
                    <span
                        style={{
                            fontSize: 12,
                            color: "#374B6B",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {userEmail}
                    </span>
                </div>
                <form action="/auth/signout" method="post">
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            background: "transparent",
                            color: "#8A9AB8",
                            border: "1px solid #E2E8F2",
                            padding: "7px 12px",
                            borderRadius: 7,
                            fontSize: 12,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            fontWeight: 500,
                            textAlign: "center",
                            transition: "background 0.15s",
                        }}
                    >
                        로그아웃
                    </button>
                </form>
            </div>
        </aside>
    )
}
