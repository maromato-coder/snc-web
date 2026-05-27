"use client"

import * as React from "react"

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
}

const menuItems = [
    { label: "Solutions", desc: "SNC가 하는 일", href: "#solutions" },
    { label: "Network", desc: "전국 NODE 네트워크", href: "#network" },
    { label: "Customers", desc: "도입 사례 · 인터뷰", href: "#customers" },
    { label: "About", desc: "회사 소개 · 연혁", href: "#about" },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    // 메뉴 열렸을 때 body 스크롤 잠금
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "#FFFFFF",
                zIndex: 200,
                display: "flex",
                flexDirection: "column",
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? "auto" : "none",
                transition: "opacity 0.25s ease",
            }}
        >
            {/* Header - Logo + Close */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    borderBottom: "1px solid #F0F2F5",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            background: "#0066FF",
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FFFFFF",
                            fontWeight: 500,
                            fontSize: 16,
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: 0.5,
                        }}
                    >
                        S
                    </div>
                    <div>
                        <div style={{ fontSize: 18, fontWeight: 500, color: "#0A1733", letterSpacing: 1.2, lineHeight: 1 }}>SNC</div>
                        <div style={{ fontSize: 11, color: "#8A95AD", marginTop: 4, lineHeight: 1 }}>에스엔씨</div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    aria-label="메뉴 닫기"
                    style={{
                        width: 40,
                        height: 40,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                    }}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <line x1="6" y1="6" x2="18" y2="18" stroke="#0A1733" strokeWidth="2" strokeLinecap="round" />
                        <line x1="18" y1="6" x2="6" y2="18" stroke="#0A1733" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            {/* Menu Items */}
            <nav
                style={{
                    flex: 1,
                    padding: "32px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                }}
            >
                {menuItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        onClick={onClose}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "18px 0",
                            borderBottom: "1px solid #F0F2F5",
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontSize: 22,
                                    fontWeight: 500,
                                    color: "#0A1733",
                                    letterSpacing: -0.3,
                                    fontFamily: "'Inter', sans-serif",
                                    lineHeight: 1.2,
                                    marginBottom: 4,
                                }}
                            >
                                {item.label}
                            </div>
                            <div style={{ fontSize: 12, color: "#5A6A8A", lineHeight: 1.3 }}>
                                {item.desc}
                            </div>
                        </div>
                        <span
                            style={{
                                fontSize: 20,
                                color: "#8A95AD",
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            →
                        </span>
                    </a>
                ))}
            </nav>

            {/* Bottom CTA Block */}
            <div
                style={{
                    padding: "20px 20px 32px",
                    background: "#F8FAFF",
                    borderTop: "1px solid #E8ECF3",
                }}
            >
                <a
                    href="#"
                    onClick={onClose}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        background: "#0066FF",
                        color: "#FFFFFF",
                        padding: "16px 24px",
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: 500,
                        textDecoration: "none",
                        marginBottom: 14,
                        boxShadow: "0 8px 20px rgba(0, 102, 255, 0.25)",
                    }}
                >
                    무료 상담 신청
                    <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                </a>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 16,
                        fontSize: 12,
                        color: "#5A6A8A",
                    }}
                >
                    <a
                        href="tel:1566-8099"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            color: "#0A1733",
                            textDecoration: "none",
                            fontWeight: 500,
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
                    <span style={{ color: "#D6DCE8" }}>·</span>
                    <span>평일 09:00~18:00</span>
                </div>
            </div>
        </div>
    )
}
