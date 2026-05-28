"use client"

import * as React from "react"

interface LPHeaderProps {
    /** 'dark' = Navy 배경 위 (흰 글씨), 'light' = 흰 배경 위 (검은 글씨) */
    variant?: "dark" | "light"
}

export default function LPHeader({ variant = "dark" }: LPHeaderProps) {
    const [isMobile, setIsMobile] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    const m = mounted && isMobile
    const isDark = variant === "dark"

    const textColor = isDark ? "#FFFFFF" : "#0A1733"
    const subColor = isDark ? "rgba(255,255,255,0.6)" : "#8A95AD"
    const borderColor = isDark ? "rgba(255,255,255,0.10)" : "#F0F2F5"
    const bg = isDark ? "rgba(5, 14, 31, 0.85)" : "rgba(255, 255, 255, 0.85)"

    return (
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: m ? "14px 20px" : "18px 80px",
                borderBottom: `1px solid ${borderColor}`,
                background: bg,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                position: "sticky",
                top: 0,
                zIndex: 100,
            }}
        >
            {/* Logo → 메인으로 */}
            <a
                href="/"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    textDecoration: "none",
                }}
            >
                <div
                    style={{
                        width: m ? 34 : 40,
                        height: m ? 34 : 40,
                        background: "#0066FF",
                        borderRadius: 9,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontWeight: 500,
                        fontSize: m ? 15 : 18,
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: 0.5,
                    }}
                >
                    S
                </div>
                <div>
                    <div style={{ fontSize: m ? 16 : 19, fontWeight: 500, letterSpacing: 1, lineHeight: 1, color: textColor }}>
                        SNC
                    </div>
                    <div style={{ fontSize: m ? 10 : 11, color: subColor, marginTop: 3, lineHeight: 1 }}>
                        에스엔씨
                    </div>
                </div>
            </a>

            {/* Right: 홈 + 전화 */}
            <div style={{ display: "flex", alignItems: "center", gap: m ? 8 : 16 }}>
                {!m && (
                    <a
                        href="/"
                        style={{
                            fontSize: 14,
                            color: subColor,
                            textDecoration: "none",
                            fontWeight: 500,
                        }}
                    >
                        홈으로
                    </a>
                )}
                <a
                    href="tel:1566-8099"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: isDark ? "rgba(255,255,255,0.10)" : "#0066FF",
                        border: isDark ? "1px solid rgba(255,255,255,0.20)" : "none",
                        color: "#FFFFFF",
                        padding: m ? "9px 14px" : "11px 20px",
                        borderRadius: 9,
                        fontSize: m ? 13 : 14,
                        textDecoration: "none",
                        fontWeight: 500,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"
                            stroke="#FFFFFF"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    1566-8099
                </a>
            </div>
        </nav>
    )
}
