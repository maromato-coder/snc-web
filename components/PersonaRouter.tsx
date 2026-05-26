"use client"

import * as React from "react"

interface CardData {
    title: string
    desc: string
    cta: string
    icon: "building" | "store" | "shopping" | "education"
}

const cards: CardData[] = [
    {
        title: "기업 IT 담당자",
        desc: "회사 PC·서버 관리에 지치셨나요?",
        cta: "B2B 솔루션 보기",
        icon: "building",
    },
    {
        title: "가맹 희망자",
        desc: "컴퓨터 자영업의 다음 단계가 궁금하신가요?",
        cta: "NODE 가맹 안내",
        icon: "store",
    },
    {
        title: "일반 소비자",
        desc: "PC 구매·수리·중고가 필요하신가요?",
        cta: "SNC 쇼핑몰로",
        icon: "shopping",
    },
    {
        title: "교육·자격",
        desc: "FIXER가 되고 싶으신가요?",
        cta: "SNC LAB 안내",
        icon: "education",
    },
]

export default function PersonaRouter() {
    return (
        <section
            style={{
                background: "#F8FAFF",
                padding: "120px 80px",
            }}
        >
            <div
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                }}
            >
                {/* Heading */}
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                    <h2
                        style={{
                            fontSize: 44,
                            lineHeight: 1.25,
                            fontWeight: 500,
                            letterSpacing: -1.5,
                            color: "#0A1733",
                            margin: "0 0 16px 0",
                        }}
                    >
                        어떤 일로 SNC를 찾아오셨나요?
                    </h2>
                    <p
                        style={{
                            fontSize: 17,
                            lineHeight: 1.6,
                            color: "#5A6A8A",
                            margin: 0,
                        }}
                    >
                        가장 가까운 답을 골라 주세요. 5초면 충분합니다.
                    </p>
                </div>

                {/* Card Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 24,
                    }}
                >
                    {cards.map((c) => (
                        <PersonaCard key={c.title} {...c} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function PersonaCard({ title, desc, cta, icon }: CardData) {
    const [hover, setHover] = React.useState(false)
    return (
        <a
            href="#"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                background: "#FFFFFF",
                border: `1px solid ${hover ? "#0066FF" : "#E8ECF3"}`,
                borderRadius: 16,
                padding: "36px 28px",
                textDecoration: "none",
                color: "inherit",
                boxShadow: hover
                    ? "0 16px 36px rgba(0, 102, 255, 0.12)"
                    : "0 1px 3px rgba(10, 23, 51, 0.04)",
                transform: hover ? "translateY(-6px)" : "translateY(0)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "pointer",
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <div>
                {/* Icon */}
                <div
                    style={{
                        width: 56,
                        height: 56,
                        background: hover ? "#0066FF" : "#E6EEFF",
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 28,
                        transition: "background 0.3s ease",
                    }}
                >
                    <PersonaIcon name={icon} color={hover ? "#FFFFFF" : "#0066FF"} />
                </div>

                {/* Title */}
                <h3
                    style={{
                        fontSize: 20,
                        fontWeight: 500,
                        color: "#0A1733",
                        margin: "0 0 10px 0",
                        letterSpacing: -0.5,
                    }}
                >
                    {title}
                </h3>

                {/* Description */}
                <p
                    style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "#5A6A8A",
                        margin: 0,
                    }}
                >
                    {desc}
                </p>
            </div>

            {/* CTA Row */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 32,
                    paddingTop: 20,
                    borderTop: `1px solid ${hover ? "#E0EAFF" : "#F0F2F5"}`,
                    transition: "border-color 0.3s ease",
                }}
            >
                <span
                    style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: hover ? "#0066FF" : "#0A1733",
                        transition: "color 0.3s ease",
                    }}
                >
                    {cta}
                </span>
                <span
                    style={{
                        fontSize: 18,
                        color: hover ? "#0066FF" : "#5A6A8A",
                        transform: hover ? "translateX(4px)" : "translateX(0)",
                        transition: "all 0.3s ease",
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    →
                </span>
            </div>
        </a>
    )
}

function PersonaIcon({ name, color }: { name: CardData["icon"]; color: string }) {
    const common = {
        width: 28,
        height: 28,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    }

    switch (name) {
        case "building":
            return (
                <svg {...common}>
                    <rect x="4" y="3" width="16" height="18" rx="1.5" />
                    <path d="M10 21v-6h4v6" />
                    <line x1="8" y1="7" x2="8" y2="7.01" />
                    <line x1="12" y1="7" x2="12" y2="7.01" />
                    <line x1="16" y1="7" x2="16" y2="7.01" />
                    <line x1="8" y1="11" x2="8" y2="11.01" />
                    <line x1="16" y1="11" x2="16" y2="11.01" />
                </svg>
            )
        case "store":
            return (
                <svg {...common}>
                    <path d="M3 9l1.5-5h15L21 9" />
                    <path d="M4 9v11h16V9" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                </svg>
            )
        case "shopping":
            return (
                <svg {...common}>
                    <path d="M5 7h14l-1.5 13h-11L5 7z" />
                    <path d="M9 7V5a3 3 0 016 0v2" />
                </svg>
            )
        case "education":
            return (
                <svg {...common}>
                    <path d="M22 10L12 5 2 10l10 5 10-5z" />
                    <path d="M6 12v4.5c0 1 2.5 3 6 3s6-2 6-3V12" />
                    <line x1="22" y1="10" x2="22" y2="14" />
                </svg>
            )
    }
}
