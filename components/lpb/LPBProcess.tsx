"use client"

import * as React from "react"

interface Step {
    num: string
    title: string
    desc: string
    detail: string
    icon: "search" | "doc" | "sign" | "manage"
    badge?: string
}

const steps: Step[] = [
    {
        num: "01",
        title: "무료 진단",
        desc: "현재 IT 자산과 문제점을 무료로 진단합니다.",
        detail: "보유 장비·네트워크·취약점 점검",
        icon: "search",
        badge: "무료",
    },
    {
        num: "02",
        title: "맞춤 견적",
        desc: "기업 규모에 맞는 SLA 수준과 비용을 제안합니다.",
        detail: "투명한 비용 구조 · 약정 조건 협의",
        icon: "doc",
    },
    {
        num: "03",
        title: "계약 체결",
        desc: "응답 시간·복구 기준을 명시한 SLA 계약을 맺습니다.",
        detail: "책임 범위가 명확한 계약서",
        icon: "sign",
    },
    {
        num: "04",
        title: "통합 관리 시작",
        desc: "전담 매니저가 배정되고 즉시 운영을 시작합니다.",
        detail: "단일 창구 · 정기 리포트 제공",
        icon: "manage",
    },
]

export default function LPBProcess() {
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
                        HOW IT WORKS
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
                        도입은 간단합니다.{" "}
                        <span style={{ color: "#0066FF" }}>4단계면 끝.</span>
                    </h2>
                    <p style={{ fontSize: m ? 15 : 18, lineHeight: 1.6, color: "#5A6A8A", margin: 0 }}>
                        복잡한 절차 없이, 무료 진단부터 시작하세요.
                    </p>
                </div>

                {/* Steps */}
                {m ? (
                    /* 모바일: 세로 타임라인 */
                    <div style={{ position: "relative", paddingLeft: 4 }}>
                        {steps.map((s, i) => (
                            <StepCardMobile key={s.num} step={s} isLast={i === steps.length - 1} />
                        ))}
                    </div>
                ) : (
                    /* 데스크탑: 가로 4단계 */
                    <div style={{ position: "relative" }}>
                        {/* 연결선 */}
                        <div
                            style={{
                                position: "absolute",
                                top: 28,
                                left: "12.5%",
                                right: "12.5%",
                                height: 2,
                                background: "linear-gradient(90deg, #0066FF 0%, #C5D0E5 100%)",
                                zIndex: 0,
                            }}
                        />
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)",
                                gap: 24,
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            {steps.map((s) => (
                                <StepCard key={s.num} step={s} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom CTA */}
                <div style={{ textAlign: "center", marginTop: m ? 40 : 64 }}>
                    <a
                        href="#consult"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            background: "#0066FF",
                            color: "#FFFFFF",
                            padding: m ? "14px 28px" : "16px 36px",
                            borderRadius: 12,
                            fontSize: m ? 15 : 16,
                            textDecoration: "none",
                            fontWeight: 500,
                            boxShadow: "0 12px 28px rgba(0, 102, 255, 0.25)",
                        }}
                    >
                        무료 진단 신청하기
                        <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                    </a>
                    <div style={{ fontSize: m ? 12 : 13, color: "#8A95AD", marginTop: 14 }}>
                        진단은 무료이며, 부담 없이 상담만 받으셔도 됩니다.
                    </div>
                </div>
            </div>
        </section>
    )
}

function StepCard({ step }: { step: Step }) {
    return (
        <div style={{ textAlign: "center" }}>
            {/* Number circle */}
            <div
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: step.num === "01" ? "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)" : "#FFFFFF",
                    border: step.num === "01" ? "none" : "2px solid #D6E1FB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    boxShadow: step.num === "01" ? "0 12px 28px rgba(0, 102, 255, 0.3)" : "0 2px 8px rgba(10, 23, 51, 0.06)",
                    position: "relative",
                }}
            >
                <span
                    style={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: step.num === "01" ? "#FFFFFF" : "#0066FF",
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    {step.num}
                </span>
            </div>

            {/* Card */}
            <div
                style={{
                    background: "#FFFFFF",
                    border: "1px solid #E8ECF3",
                    borderRadius: 16,
                    padding: "28px 24px",
                    minHeight: 200,
                    boxShadow: "0 2px 8px rgba(10, 23, 51, 0.04)",
                }}
            >
                <div
                    style={{
                        width: 44,
                        height: 44,
                        background: "#E6EEFF",
                        borderRadius: 11,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                    }}
                >
                    <StepIcon name={step.icon} size={22} />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 500, color: "#0A1733", margin: 0, letterSpacing: -0.3 }}>
                        {step.title}
                    </h3>
                    {step.badge && (
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: 500,
                                color: "#00A878",
                                background: "#E6F7F1",
                                padding: "2px 8px",
                                borderRadius: 100,
                            }}
                        >
                            {step.badge}
                        </span>
                    )}
                </div>

                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#5A6A8A", margin: "0 0 12px 0" }}>
                    {step.desc}
                </p>
                <div
                    style={{
                        fontSize: 12,
                        color: "#0046C0",
                        background: "#F0F4FB",
                        borderRadius: 8,
                        padding: "8px 12px",
                        lineHeight: 1.4,
                    }}
                >
                    {step.detail}
                </div>
            </div>
        </div>
    )
}

function StepCardMobile({ step, isLast }: { step: Step; isLast: boolean }) {
    return (
        <div style={{ position: "relative", paddingLeft: 56, paddingBottom: isLast ? 0 : 24 }}>
            {/* 세로 연결선 */}
            {!isLast && (
                <div
                    style={{
                        position: "absolute",
                        left: 23,
                        top: 48,
                        bottom: 0,
                        width: 2,
                        background: "#D6E1FB",
                    }}
                />
            )}

            {/* Number circle */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: step.num === "01" ? "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)" : "#FFFFFF",
                    border: step.num === "01" ? "none" : "2px solid #D6E1FB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: step.num === "01" ? "0 8px 20px rgba(0, 102, 255, 0.3)" : "none",
                    zIndex: 2,
                }}
            >
                <span
                    style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: step.num === "01" ? "#FFFFFF" : "#0066FF",
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    {step.num}
                </span>
            </div>

            {/* Card */}
            <div
                style={{
                    background: "#FFFFFF",
                    border: "1px solid #E8ECF3",
                    borderRadius: 14,
                    padding: "18px 20px",
                    boxShadow: "0 1px 4px rgba(10, 23, 51, 0.04)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 500, color: "#0A1733", margin: 0, letterSpacing: -0.3 }}>
                        {step.title}
                    </h3>
                    {step.badge && (
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: 500,
                                color: "#00A878",
                                background: "#E6F7F1",
                                padding: "2px 8px",
                                borderRadius: 100,
                            }}
                        >
                            {step.badge}
                        </span>
                    )}
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#5A6A8A", margin: "0 0 10px 0" }}>
                    {step.desc}
                </p>
                <div
                    style={{
                        fontSize: 11.5,
                        color: "#0046C0",
                        background: "#F0F4FB",
                        borderRadius: 8,
                        padding: "7px 11px",
                        lineHeight: 1.4,
                        display: "inline-block",
                    }}
                >
                    {step.detail}
                </div>
            </div>
        </div>
    )
}

function StepIcon({ name, size }: { name: Step["icon"]; size: number }) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "#0066FF",
        strokeWidth: 1.7,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    }
    switch (name) {
        case "search":
            return (
                <svg {...common}>
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            )
        case "doc":
            return (
                <svg {...common}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="13" y2="17" />
                </svg>
            )
        case "sign":
            return (
                <svg {...common}>
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <line x1="2" y1="2" x2="9.5" y2="9.5" />
                    <circle cx="11" cy="11" r="2" />
                </svg>
            )
        case "manage":
            return (
                <svg {...common}>
                    <path d="M3 3v18h18" />
                    <path d="M7 14l4-4 3 3 5-5" />
                </svg>
            )
    }
}
