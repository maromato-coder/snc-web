"use client"

import { useState, useRef, useEffect } from "react"

// ════════════════════════════════════════════════
// MainHeader — 메인 홈페이지 헤더
// 드롭다운 4개 그룹: 브랜드PC, 서비스, 회사, 지원
// ════════════════════════════════════════════════

interface MenuItem {
    label: string
    href: string
    desc?: string
}

interface MenuGroup {
    label: string
    items: MenuItem[]
}

const MENU_GROUPS: MenuGroup[] = [
    {
        label: "브랜드 PC",
        items: [
            { label: "SNC Gaming", href: "#brand-pc", desc: "고성능 게이밍" },
            { label: "SNC Business", href: "#brand-pc", desc: "기업 안정성" },
            { label: "SNC Creator", href: "#brand-pc", desc: "전문가 고사양" },
            { label: "SNC Office", href: "#brand-pc", desc: "합리적 업무용" },
        ],
    },
    {
        label: "서비스",
        items: [
            { label: "기업 IT 유지보수", href: "/enterprise", desc: "311개사 운영중" },
            { label: "네트워크 구축", href: "/enterprise", desc: "전문 엔지니어" },
            { label: "보안 솔루션", href: "/enterprise", desc: "안전한 운영" },
            { label: "SNC Care", href: "#snc-care", desc: "2년 무상 AS" },
        ],
    },
    {
        label: "회사",
        items: [
            { label: "SNC 소개", href: "#about", desc: "2001년부터 25년" },
            { label: "연혁", href: "#about", desc: "주요 성장 기록" },
            { label: "전국 네트워크", href: "#network", desc: "106개 NODE 파트너" },
            { label: "파트너 모집", href: "/join", desc: "공식 가맹 문의" },
        ],
    },
    {
        label: "지원",
        items: [
            { label: "AS 접수", href: "/enterprise", desc: "전국 어디서나" },
            { label: "원격 지원", href: "/enterprise", desc: "즉시 연결" },
            { label: "FAQ", href: "/enterprise", desc: "자주 묻는 질문" },
            { label: "문의하기", href: "/enterprise", desc: "1566-8099" },
        ],
    },
]

interface Props {
    isMobile: boolean
    onMenuOpen: () => void
}

export default function MainHeader({ isMobile, onMenuOpen }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const closeTimer = useRef<NodeJS.Timeout | null>(null)

    // 호버 진입 — 닫기 타이머 취소 후 즉시 열기
    const handleEnter = (i: number) => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current)
            closeTimer.current = null
        }
        setOpenIndex(i)
    }

    // 호버 떠남 — 150ms 후 닫기 (드롭다운 영역으로 이동 가능하게)
    const handleLeave = () => {
        closeTimer.current = setTimeout(() => {
            setOpenIndex(null)
        }, 150)
    }

    useEffect(() => {
        return () => {
            if (closeTimer.current) clearTimeout(closeTimer.current)
        }
    }, [])

    return (
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: isMobile ? "16px 20px" : "24px 80px",
                borderBottom: "1px solid #F0F2F5",
                background: "#FFFFFF",
                position: "sticky",
                top: 0,
                zIndex: 100,
            }}
        >
            {/* 로고 */}
            
            <a
                href="/"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    textDecoration: "none",
                }}
            >
                <div
                    style={{
                        width: isMobile ? 36 : 44,
                        height: isMobile ? 36 : 44,
                        background: "#0066FF",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontWeight: 800,
                        fontSize: isMobile ? 14 : 18,
                        letterSpacing: -0.5,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    SNC
                </div>
                {!isMobile && (
                    <span style={{ fontSize: 17, fontWeight: 700, color: "#0A1733", letterSpacing: -0.3 }}>
                        에스엔씨
                    </span>
                )}
            </a>

            {/* 데스크탑 GNB — 드롭다운 */}
            {!isMobile && (
                <ul
                    style={{
                        display: "flex",
                        gap: 4,
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    {MENU_GROUPS.map((group, i) => (
                        <li
                            key={group.label}
                            onMouseEnter={() => handleEnter(i)}
                            onMouseLeave={handleLeave}
                            style={{ position: "relative" }}
                        >
                            {/* 메뉴 버튼 */}
                            <button
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4,
                                    padding: "10px 16px",
                                    background: "transparent",
                                    border: "none",
                                    fontSize: 15,
                                    fontWeight: 500,
                                    color: openIndex === i ? "#0066FF" : "#5A6A8A",
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                    transition: "color 0.15s",
                                }}
                            >
                                {group.label}
                                <svg
                                    width="11"
                                    height="11"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                        transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.2s",
                                    }}
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>

                            {/* 드롭다운 */}
                            {openIndex === i && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "calc(100% + 8px)",
                                        left: 0,
                                        minWidth: 260,
                                        background: "#FFFFFF",
                                        border: "1px solid #E2E8F2",
                                        borderRadius: 14,
                                        padding: 8,
                                        boxShadow: "0 12px 40px rgba(10,23,51,0.1)",
                                        animation: "dropdownFadeIn 0.18s ease-out",
                                    }}
                                >
                                    {group.items.map((item) => (
                                        
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                padding: "10px 12px",
                                                borderRadius: 8,
                                                textDecoration: "none",
                                                transition: "background 0.12s",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = "#F8FAFF"
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = "transparent"
                                            }}
                                        >
                                            <span style={{ fontSize: 14, fontWeight: 600, color: "#0A1733", marginBottom: 2 }}>
                                                {item.label}
                                            </span>
                                            {item.desc && (
                                                <span style={{ fontSize: 12, color: "#8A9AB8" }}>
                                                    {item.desc}
                                                </span>
                                            )}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {/* 우측 버튼 */}
            {isMobile ? (
                <button
                    onClick={onMenuOpen}
                    aria-label="메뉴 열기"
                    style={{
                        width: 44,
                        height: 44,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                    }}
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <line x1="3" y1="7" x2="21" y2="7" stroke="#0A1733" strokeWidth="2" strokeLinecap="round" />
                        <line x1="3" y1="12" x2="21" y2="12" stroke="#0A1733" strokeWidth="2" strokeLinecap="round" />
                        <line x1="3" y1="17" x2="21" y2="17" stroke="#0A1733" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            ) : (
                <a
                    href="/enterprise"
                    style={{
                        background: "#0066FF",
                        color: "#FFFFFF",
                        padding: "13px 28px",
                        borderRadius: 8,
                        fontSize: 14,
                        border: "none",
                        fontWeight: 500,
                        fontFamily: "inherit",
                        cursor: "pointer",
                        textDecoration: "none",
                    }}
                >
                    상담 신청
                </a>
            )}

            {/* 드롭다운 페이드인 애니메이션 */}
            <style>{`
                @keyframes dropdownFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-4px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </nav>
    )
}