"use client"

import * as React from "react"

interface SystemCard {
    icon: "phone" | "wrench" | "book" | "shield" | "card" | "megaphone"
    title: string
    desc: string
    metric: string
}

const systems: SystemCard[] = [
    {
        icon: "phone",
        title: "콜 인입 · 배분",
        desc: "본사 대표번호로 들어온 수리 요청을 가까운 FIXER에게 자동 배분합니다.",
        metric: "월 1,500+ 콜",
    },
    {
        icon: "wrench",
        title: "고난도 기술 백업",
        desc: "현장에서 못 고치는 Tier 4 케이스는 본사 CORE가 받아 처리합니다.",
        metric: "CORE 직접 지원",
    },
    {
        icon: "book",
        title: "지속 교육",
        desc: "SNC LAB의 정기 교육으로 최신 기술과 자격을 계속 채워드립니다.",
        metric: "정기 무료 교육",
    },
    {
        icon: "shield",
        title: "CS · 클레임 대행",
        desc: "까다로운 고객 응대와 분쟁 조정을 본사 CS팀이 대신 맡습니다.",
        metric: "본사 CS팀 응대",
    },
    {
        icon: "card",
        title: "정산 · 결제",
        desc: "투명한 자동 정산 시스템으로 매출과 수수료를 실시간 확인합니다.",
        metric: "실시간 정산",
    },
    {
        icon: "megaphone",
        title: "브랜드 · 마케팅",
        desc: "전국 단위 SNC 브랜드와 디지털 마케팅으로 당신의 가게를 노출합니다.",
        metric: "전국 브랜드 노출",
    },
]

export default function LPASystem() {
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

    return (
        <section style={{ background: "#F8FAFF", padding: m ? "72px 20px" : "140px 80px" }}>
            <div style={{ maxWidth: 1440, margin: "0 auto" }}>
                {/* Section Heading */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: m ? 48 : 80,
                        maxWidth: 760,
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    <div
                        style={{
                            fontSize: m ? 12 : 13,
                            color: "#0046C0",
                            letterSpacing: 2,
                            fontWeight: 500,
                            marginBottom: m ? 12 : 16,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        THE SYSTEM
                    </div>
                    <h2
                        style={{
                            fontSize: m ? 28 : 48,
                            lineHeight: 1.25,
                            fontWeight: 500,
                            letterSpacing: m ? -1 : -1.8,
                            color: "#0A1733",
                            margin: m ? "0 0 16px 0" : "0 0 20px 0",
                        }}
                    >
                        당신은 손기술에만 집중하세요.
                        <br />
                        <span style={{ color: "#0066FF" }}>나머지는 본사가 받칩니다.</span>
                    </h2>
                    <p
                        style={{
                            fontSize: m ? 15 : 18,
                            lineHeight: 1.6,
                            color: "#5A6A8A",
                            margin: 0,
                        }}
                    >
                        가맹하면 혼자 다 떠안는다고요? SNC는 정반대입니다.
                        <br />
                        25년간 쌓은 본사 인프라가 당신의 뒤를 6가지로 받칩니다.
                    </p>
                </div>

                {/* 6 System Cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)",
                        gap: m ? 14 : 24,
                    }}
                >
                    {systems.map((s) => (
                        <SystemCardBox key={s.title} card={s} isMobile={m} />
                    ))}
                </div>

                {/* Bottom Reassurance Bar */}
                <div
                    style={{
                        marginTop: m ? 36 : 56,
                        background: "#0A1733",
                        borderRadius: 20,
                        padding: m ? "28px 24px" : "40px 56px",
                        display: m ? "block" : "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 32,
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: -40,
                            right: -40,
                            width: 160,
                            height: 160,
                            background: "radial-gradient(circle, rgba(0, 102, 255, 0.25) 0%, transparent 70%)",
                            pointerEvents: "none",
                        }}
                    />
                    <div style={{ position: "relative", marginBottom: m ? 20 : 0 }}>
                        <div
                            style={{
                                fontSize: m ? 18 : 24,
                                fontWeight: 500,
                                color: "#FFFFFF",
                                letterSpacing: -0.5,
                                lineHeight: 1.3,
                                marginBottom: 8,
                            }}
                        >
                            혼자였다면 25년이 걸렸을 일을,
                        </div>
                        <div style={{ fontSize: m ? 14 : 16, color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.5 }}>
                            본사 시스템 위에서는 가입 첫날부터 시작합니다.
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: m ? 20 : 40, position: "relative", flexShrink: 0 }}>
                        {[
                            { num: "25년", lbl: "본사 노하우" },
                            { num: "11만+", lbl: "누적 AS" },
                            { num: "311", lbl: "기업 계약" },
                        ].map((s) => (
                            <div key={s.lbl}>
                                <div
                                    style={{
                                        fontSize: m ? 20 : 28,
                                        fontWeight: 500,
                                        color: "#66AAFF",
                                        fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                                        letterSpacing: -0.5,
                                        lineHeight: 1,
                                        marginBottom: 6,
                                    }}
                                >
                                    {s.num}
                                </div>
                                <div style={{ fontSize: m ? 11 : 12, color: "rgba(255, 255, 255, 0.55)" }}>
                                    {s.lbl}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function SystemCardBox({ card, isMobile }: { card: SystemCard; isMobile: boolean }) {
    const [hover, setHover] = React.useState(false)

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                background: "#FFFFFF",
                border: `1px solid ${hover ? "#0066FF" : "#E8ECF3"}`,
                borderRadius: 18,
                padding: isMobile ? "24px 22px" : "32px 28px",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: hover ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hover ? "0 16px 36px rgba(0, 102, 255, 0.12)" : "0 2px 8px rgba(10, 23, 51, 0.04)",
                display: isMobile ? "grid" : "block",
                gridTemplateColumns: isMobile ? "auto 1fr" : undefined,
                gap: isMobile ? 16 : undefined,
                alignItems: isMobile ? "flex-start" : undefined,
            }}
        >
            {/* Icon */}
            <div
                style={{
                    width: isMobile ? 44 : 52,
                    height: isMobile ? 44 : 52,
                    background: hover ? "#0066FF" : "#E6EEFF",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: isMobile ? 0 : 24,
                    transition: "background 0.3s ease",
                    flexShrink: 0,
                }}
            >
                <SystemIcon name={card.icon} color={hover ? "#FFFFFF" : "#0066FF"} size={isMobile ? 22 : 26} />
            </div>

            <div>
                <h3
                    style={{
                        fontSize: isMobile ? 16 : 19,
                        fontWeight: 500,
                        color: "#0A1733",
                        letterSpacing: -0.3,
                        margin: isMobile ? "0 0 6px 0" : "0 0 12px 0",
                        lineHeight: 1.3,
                    }}
                >
                    {card.title}
                </h3>

                <p
                    style={{
                        fontSize: isMobile ? 13 : 14,
                        lineHeight: 1.65,
                        color: "#5A6A8A",
                        margin: isMobile ? "0 0 12px 0" : "0 0 20px 0",
                    }}
                >
                    {card.desc}
                </p>

                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        fontSize: isMobile ? 11 : 12,
                        fontWeight: 500,
                        color: hover ? "#0066FF" : "#0046C0",
                        background: hover ? "#E6EEFF" : "#F0F4FB",
                        padding: "6px 12px",
                        borderRadius: 100,
                        letterSpacing: 0.2,
                        transition: "all 0.3s ease",
                    }}
                >
                    <span
                        style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: "#0066FF",
                            display: "inline-block",
                        }}
                    />
                    {card.metric}
                </div>
            </div>
        </div>
    )
}

function SystemIcon({ name, color, size }: { name: SystemCard["icon"]; color: string; size: number }) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: 1.7,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    }
    switch (name) {
        case "phone":
            return (
                <svg {...common}>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                </svg>
            )
        case "wrench":
            return (
                <svg {...common}>
                    <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.7 2.7-2.4-.3-.3-2.4 2.7-2.7z" />
                </svg>
            )
        case "book":
            return (
                <svg {...common}>
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
            )
        case "shield":
            return (
                <svg {...common}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                </svg>
            )
        case "card":
            return (
                <svg {...common}>
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
            )
        case "megaphone":
            return (
                <svg {...common}>
                    <path d="M3 11l18-5v12L3 14v-3z" />
                    <path d="M11.6 16.8a3 3 0 11-5.8-1.6" />
                </svg>
            )
    }
}
