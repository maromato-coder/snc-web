"use client"

import * as React from "react"

interface Solution {
    num: string
    title: string
    desc: string
    icon: "clock" | "hub" | "shield"
    pain: string
}

const solutions: Solution[] = [
    {
        num: "01",
        title: "24/7 즉시 대응",
        desc: "전국 NODE 네트워크가 야간·주말에도 가장 가까운 곳에서 출동합니다. 더 이상 새벽 출근은 없습니다.",
        icon: "clock",
        pain: "장애는 퇴근 후에",
    },
    {
        num: "02",
        title: "단일 창구 통합",
        desc: "PC·프린터·CCTV·네트워크까지 한 번호로. 어디로 전화할지 고민할 필요도, 업체 간 핑퐁도 사라집니다.",
        icon: "hub",
        pain: "업체가 다 다름",
    },
    {
        num: "03",
        title: "SLA 계약 보장",
        desc: "응답 시간과 복구 기준을 계약서에 명시합니다. 책임을 본사가 함께 집니다. 이제 휴가 중에도 편합니다.",
        icon: "shield",
        pain: "책임은 내 탓",
    },
]

const integratedItems = ["PC · 노트북", "서버 · 네트워크", "프린터 · 복합기", "CCTV · 보안", "소프트웨어", "주변기기"]

export default function LPBSolution() {
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
                {/* Heading */}
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
                        ONE CONTRACT
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
                        흩어진 모든 IT를,{" "}
                        <span style={{ color: "#0066FF" }}>SNC 하나로.</span>
                    </h2>
                    <p style={{ fontSize: m ? 15 : 18, lineHeight: 1.6, color: "#5A6A8A", margin: 0 }}>
                        여러 업체, 여러 계약, 여러 연락처를 하나로 통합합니다.
                    </p>
                </div>

                {/* Body: 통합 개념도 + 3 솔루션 */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: m ? "1fr" : "0.85fr 1.15fr",
                        gap: m ? 32 : 64,
                        alignItems: "center",
                    }}
                >
                    {/* LEFT: 통합 개념도 */}
                    <IntegrationDiagram items={integratedItems} isMobile={m} />

                    {/* RIGHT: 3 솔루션 */}
                    <div style={{ display: "flex", flexDirection: "column", gap: m ? 14 : 18 }}>
                        {solutions.map((s) => (
                            <SolutionRow key={s.num} solution={s} isMobile={m} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function IntegrationDiagram({ items, isMobile }: { items: string[]; isMobile: boolean }) {
    return (
        <div
            style={{
                background: "#FFFFFF",
                borderRadius: 24,
                padding: isMobile ? "32px 24px" : "44px 36px",
                boxShadow: "0 16px 48px rgba(10, 23, 51, 0.08)",
                border: "1px solid #EEF2F8",
            }}
        >
            {/* 흩어진 항목들 */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                    marginBottom: isMobile ? 20 : 28,
                }}
            >
                {items.map((item) => (
                    <div
                        key={item}
                        style={{
                            background: "#F8FAFF",
                            border: "1px solid #E8ECF3",
                            borderRadius: 10,
                            padding: isMobile ? "12px 14px" : "14px 16px",
                            fontSize: isMobile ? 12 : 13,
                            color: "#5A6A8A",
                            fontWeight: 500,
                            textAlign: "center",
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>

            {/* 화살표 (모으기) */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: isMobile ? 16 : 20 }}>
                <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
                    <path d="M8 2 L20 14 L32 2" stroke="#C5D0E5" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <path d="M20 8 L20 24" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" />
                    <path d="M15 19 L20 25 L25 19" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
            </div>

            {/* SNC 통합 박스 */}
            <div
                style={{
                    background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                    borderRadius: 16,
                    padding: isMobile ? "20px 24px" : "24px 28px",
                    textAlign: "center",
                    boxShadow: "0 12px 28px rgba(0, 102, 255, 0.30)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -30,
                        right: -30,
                        width: 100,
                        height: 100,
                        background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        fontSize: isMobile ? 11 : 12,
                        color: "rgba(255,255,255,0.8)",
                        letterSpacing: 1,
                        marginBottom: 6,
                        fontFamily: "'Inter', sans-serif",
                        position: "relative",
                    }}
                >
                    ONE PARTNER
                </div>
                <div
                    style={{
                        fontSize: isMobile ? 22 : 26,
                        fontWeight: 500,
                        color: "#FFFFFF",
                        letterSpacing: -0.5,
                        fontFamily: "'Inter', sans-serif",
                        lineHeight: 1,
                        position: "relative",
                    }}
                >
                    SNC 통합 관리
                </div>
            </div>
        </div>
    )
}

function SolutionRow({ solution, isMobile }: { solution: Solution; isMobile: boolean }) {
    const [hover, setHover] = React.useState(false)

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                background: "#FFFFFF",
                border: `1px solid ${hover ? "#0066FF" : "#E8ECF3"}`,
                borderRadius: 16,
                padding: isMobile ? "20px 18px" : "24px 28px",
                display: "flex",
                gap: isMobile ? 16 : 20,
                alignItems: "flex-start",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: hover ? "translateX(6px)" : "translateX(0)",
                boxShadow: hover ? "0 12px 28px rgba(0, 102, 255, 0.10)" : "0 1px 3px rgba(10, 23, 51, 0.04)",
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
                    flexShrink: 0,
                    transition: "background 0.3s ease",
                }}
            >
                <SolutionIcon name={solution.icon} color={hover ? "#FFFFFF" : "#0066FF"} size={isMobile ? 22 : 26} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
                {/* Pain → Solution 표시 */}
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 10,
                        color: "#8A95AD",
                        marginBottom: 8,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    <span style={{ textDecoration: "line-through", color: "#C5354A" }}>{solution.pain}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", color: "#0066FF" }}>→ 해결</span>
                </div>

                <h3
                    style={{
                        fontSize: isMobile ? 16 : 19,
                        fontWeight: 500,
                        color: "#0A1733",
                        letterSpacing: -0.3,
                        margin: "0 0 8px 0",
                        lineHeight: 1.3,
                    }}
                >
                    {solution.title}
                </h3>
                <p
                    style={{
                        fontSize: isMobile ? 13 : 14,
                        lineHeight: 1.65,
                        color: "#5A6A8A",
                        margin: 0,
                    }}
                >
                    {solution.desc}
                </p>
            </div>
        </div>
    )
}

function SolutionIcon({ name, color, size }: { name: Solution["icon"]; color: string; size: number }) {
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
        case "clock":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            )
        case "hub":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="5" cy="5" r="1.5" />
                    <circle cx="19" cy="5" r="1.5" />
                    <circle cx="5" cy="19" r="1.5" />
                    <circle cx="19" cy="19" r="1.5" />
                    <line x1="10" y1="10" x2="6" y2="6" />
                    <line x1="14" y1="10" x2="18" y2="6" />
                    <line x1="10" y1="14" x2="6" y2="18" />
                    <line x1="14" y1="14" x2="18" y2="18" />
                </svg>
            )
        case "shield":
            return (
                <svg {...common}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                </svg>
            )
    }
}
