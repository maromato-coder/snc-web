"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
    label: string
    href: string
    icon: keyof typeof icons
    badge?: string
    soon?: boolean
}

const mainNav: NavItem[] = [
    { label: "대시보드", href: "/admin", icon: "dashboard" },
    { label: "신청 관리", href: "/admin/submissions", icon: "inbox" },
]

const orgNav: NavItem[] = [
    { label: "사이트", href: "/admin/sites", icon: "globe", soon: true },
    { label: "사용자", href: "/admin/users", icon: "users", soon: true },
    { label: "설정", href: "/admin/settings", icon: "settings", soon: true },
]

export default function Sidebar({ userEmail }: { userEmail: string }) {
    const pathname = usePathname()

    return (
        <aside
            style={{
                width: 240,
                background: "#FFFFFF",
                borderRight: "1px solid #E8ECF3",
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                position: "sticky",
                top: 0,
            }}
        >
            {/* Brand */}
            <div
                style={{
                    padding: "20px 20px 24px",
                    borderBottom: "1px solid #F0F2F5",
                }}
            >
                <Link
                    href="/admin"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        textDecoration: "none",
                    }}
                >
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            background:
                                "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                            borderRadius: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FFFFFF",
                            fontWeight: 500,
                            fontSize: 15,
                            fontFamily: "'Inter', sans-serif",
                            boxShadow: "0 4px 10px rgba(0, 102, 255, 0.25)",
                        }}
                    >
                        S
                    </div>
                    <div>
                        <div
                            style={{
                                fontSize: 14,
                                fontWeight: 500,
                                color: "#0A1733",
                                lineHeight: 1.2,
                                letterSpacing: -0.2,
                            }}
                        >
                            SNC 운영 콘솔
                        </div>
                        <div
                            style={{
                                fontSize: 10.5,
                                color: "#8A95AD",
                                marginTop: 2,
                                letterSpacing: 0.3,
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            Operations
                        </div>
                    </div>
                </Link>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
                <NavSection label="MAIN" items={mainNav} pathname={pathname} />
                <NavSection
                    label="ORGANIZATION"
                    items={orgNav}
                    pathname={pathname}
                />
            </nav>

            {/* User */}
            <div
                style={{
                    padding: "16px 16px",
                    borderTop: "1px solid #F0F2F5",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <div
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background:
                            "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 500,
                        flexShrink: 0,
                    }}
                >
                    {userEmail[0]?.toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                        style={{
                            fontSize: 12.5,
                            color: "#0A1733",
                            fontWeight: 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            lineHeight: 1.3,
                        }}
                        title={userEmail}
                    >
                        {userEmail}
                    </div>
                    <form
                        action="/auth/signout"
                        method="post"
                        style={{ marginTop: 2 }}
                    >
                        <button
                            type="submit"
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                color: "#8A95AD",
                                fontSize: 11.5,
                                cursor: "pointer",
                                fontFamily: "inherit",
                            }}
                        >
                            로그아웃 ↗
                        </button>
                    </form>
                </div>
            </div>
        </aside>
    )
}

function NavSection({
    label,
    items,
    pathname,
}: {
    label: string
    items: NavItem[]
    pathname: string
}) {
    return (
        <div style={{ marginBottom: 20 }}>
            <div
                style={{
                    fontSize: 10.5,
                    color: "#8A95AD",
                    letterSpacing: 1.3,
                    fontWeight: 500,
                    padding: "0 12px 8px",
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                {label}
            </div>
            {items.map((item) => {
                const active =
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href))
                return (
                    <Link
                        key={item.href}
                        href={item.soon ? "#" : item.href}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "8px 12px",
                            borderRadius: 7,
                            color: active ? "#0066FF" : "#5A6A8A",
                            background: active ? "#F0F4FB" : "transparent",
                            fontSize: 13,
                            fontWeight: active ? 500 : 400,
                            textDecoration: "none",
                            marginBottom: 2,
                            opacity: item.soon ? 0.55 : 1,
                            cursor: item.soon ? "not-allowed" : "pointer",
                        }}
                        onClick={(e) => item.soon && e.preventDefault()}
                    >
                        <NavIcon name={item.icon} color={active ? "#0066FF" : "#8A95AD"} />
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {item.soon && (
                            <span
                                style={{
                                    fontSize: 9.5,
                                    color: "#8A95AD",
                                    background: "#F0F2F5",
                                    padding: "2px 6px",
                                    borderRadius: 100,
                                    fontFamily: "'Inter', sans-serif",
                                    letterSpacing: 0.5,
                                }}
                            >
                                SOON
                            </span>
                        )}
                    </Link>
                )
            })}
        </div>
    )
}

const icons = {
    dashboard: (color: string) => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1.2" stroke={color} strokeWidth="1.7" />
            <rect x="14" y="3" width="7" height="7" rx="1.2" stroke={color} strokeWidth="1.7" />
            <rect x="3" y="14" width="7" height="7" rx="1.2" stroke={color} strokeWidth="1.7" />
            <rect x="14" y="14" width="7" height="7" rx="1.2" stroke={color} strokeWidth="1.7" />
        </svg>
    ),
    inbox: (color: string) => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 12h-6l-2 3h-4l-2-3H2" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    globe: (color: string) => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.7" />
            <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.7" />
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={color} strokeWidth="1.7" />
        </svg>
    ),
    users: (color: string) => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.7" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    settings: (color: string) => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.7" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
} as const

function NavIcon({ name, color }: { name: keyof typeof icons; color: string }) {
    return icons[name](color)
}
