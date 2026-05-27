"use client"

import * as React from "react"

export default function StickyBottomCTA() {
    const [isMobile, setIsMobile] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    if (!mounted || !isMobile) return null

    return (
        <>
            {/* Sticky CTA Bar */}
            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "#FFFFFF",
                    borderTop: "1px solid #E8ECF3",
                    padding: "10px 12px",
                    paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
                    display: "flex",
                    gap: 8,
                    zIndex: 90,
                    boxShadow: "0 -8px 20px rgba(10, 23, 51, 0.06)",
                }}
            >
                {/* Phone Button */}
                <a
                    href="tel:1566-8099"
                    style={{
                        flex: "0 0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        background: "#F0F4FB",
                        color: "#0A1733",
                        padding: "12px 16px",
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 500,
                        textDecoration: "none",
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"
                            stroke="#0066FF"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    1566-8099
                </a>

                {/* Consult Button */}
                <a
                    href="#"
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        background: "#0066FF",
                        color: "#FFFFFF",
                        padding: "12px 16px",
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: 500,
                        textDecoration: "none",
                    }}
                >
                    무료 상담 신청
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15 }}>→</span>
                </a>
            </div>

            {/* Spacer - 페이지 콘텐츠가 가려지지 않도록 */}
            <div style={{ height: 68 }} aria-hidden />
        </>
    )
}
