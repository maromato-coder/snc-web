"use client"

import * as React from "react"

interface Grade {
    name: string
    tier: number
    tagline: string
    requirement: string
    perks: string[]
    color: string
    isAce?: boolean
}

const grades: Grade[] = [
    {
        name: "FIXER CHIEF",
        tier: 4,
        tagline: "동료가 인정한 리더",
        requirement: "평점 4.8+ · 누적 500건+",
        perks: ["권역 신규 FIXER 멘토 권한", "프리미엄 케이스 우선권", "HUB 승격 우선 심사"],
        color: "#0046C0",
    },
    {
        name: "FIXER MASTER",
        tier: 3,
        tagline: "지역이 신뢰하는 기술자",
        requirement: "평점 4.6+ · 누적 200건+",
        perks: ["지역 케이스 우선 배정", "전문 교육 무료 수강", "고객 추천 가산점"],
        color: "#0066FF",
    },
    {
        name: "FIXER PRO",
        tier: 2,
        tagline: "실력을 입증한 단계",
        requirement: "평점 4.3+ · 누적 50건+",
        perks: ["정규 케이스 배정", "기술 교육 할인", "등급 뱃지 노출"],
        color: "#3385FF",
    },
    {
        name: "FIXER",
        tier: 1,
        tagline: "공식 SNC 엔지니어",
        requirement: "기본 인증 완료 · 가입 즉시",
        perks: ["공식 인증 자격 부여", "기본 케이스 배정", "플랫폼 정식 등록"],
        color: "#8A95AD",
    },
]

export default function LPANewIdentity() {
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
        <section
            style={{
                background: "#050E1F",
                color: "#FFFFFF",
                padding: m ? "72px 20px" : "140px 80px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 배경 글로우 */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "radial-gradient(circle at 50% 0%, rgba(0, 102, 255, 0.18) 0%, transparent 50%)",
                    pointerEvents: "none",
                }}
            />

            <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto" }}>
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
                            color: "#66AAFF",
                            letterSpacing: 2,
                            fontWeight: 500,
                            marginBottom: m ? 12 : 16,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        NEW IDENTITY
                    </div>
                    <h2
                        style={{
                            fontSize: m ? 28 : 48,
                            lineHeight: 1.25,
                            fontWeight: 500,
                            letterSpacing: m ? -1 : -1.8,
                            color: "#FFFFFF",
                            margin: m ? "0 0 16px 0" : "0 0 20px 0",
                        }}
                    >
                        이제 당신은{" "}
                        <span style={{ color: "#66AAFF" }}>FIXER</span>입니다.
                    </h2>
                    <p
                        style={{
                            fontSize: m ? 15 : 18,
                            lineHeight: 1.6,
                            color: "rgba(255, 255, 255, 0.65)",
                            margin: 0,
                        }}
                    >
                        5개의 이름, 하나의 길. 등급은 가게가 아니라{" "}
                        <strong style={{ color: "#FFFFFF", fontWeight: 500 }}>
                            당신의 실력을 따라
                        </strong>{" "}
                        움직입니다.
                    </p>
                </div>

                {/* ACE Card - 정점 강조 */}
                <AceCard isMobile={m} />

                {/* 사다리 연결선 */}
                <div style={{ display: "flex", justifyContent: "center", padding: m ? "10px 0" : "16px 0" }}>
                    <svg width="20" height={m ? 24 : 32} viewBox="0 0 20 32" fill="none">
                        <line x1="10" y1="0" x2="10" y2={m ? 18 : 26} stroke="rgba(102, 170, 255, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                        <path d={m ? "M5 16L10 22L15 16" : "M5 24L10 30L15 24"} stroke="#66AAFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                </div>

                {/* 4 Grade Ladder */}
                <div style={{ display: "flex", flexDirection: "column", gap: m ? 12 : 16, maxWidth: 900, margin: "0 auto" }}>
                    {grades.map((g) => (
                        <GradeRow key={g.name} grade={g} isMobile={m} />
                    ))}
                </div>

                {/* Bottom Note */}
                <div
                    style={{
                        marginTop: m ? 36 : 56,
                        textAlign: "center",
                        fontSize: m ? 13 : 15,
                        color: "rgba(255, 255, 255, 0.6)",
                        lineHeight: 1.6,
                        maxWidth: 640,
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    가입 즉시 <strong style={{ color: "#66AAFF", fontWeight: 500 }}>FIXER</strong> 자격이 부여됩니다.
                    실적과 평점이 쌓이면 자동으로 등급이 올라가고,
                    <br />
                    <strong style={{ color: "#FFFFFF", fontWeight: 500 }}>그 등급은 가게를 옮겨도 당신을 따라갑니다.</strong>
                </div>
            </div>
        </section>
    )
}

function AceCard({ isMobile }: { isMobile: boolean }) {
    return (
        <div
            style={{
                maxWidth: 900,
                margin: "0 auto",
                background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                borderRadius: 20,
                padding: isMobile ? "28px 24px" : "40px 48px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0, 102, 255, 0.35)",
            }}
        >
            {/* 배경 장식 */}
            <div
                style={{
                    position: "absolute",
                    top: -60,
                    right: -40,
                    width: 200,
                    height: 200,
                    background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    display: isMobile ? "block" : "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 32,
                    position: "relative",
                }}
            >
                {/* Left: Title */}
                <div style={{ flex: isMobile ? "none" : 1, marginBottom: isMobile ? 24 : 0 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 14,
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                letterSpacing: 1.5,
                                color: "rgba(255, 255, 255, 0.8)",
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 500,
                            }}
                        >
                            HIGHEST GRADE
                        </div>
                        <div
                            style={{
                                fontSize: 10,
                                color: "#FFFFFF",
                                background: "rgba(255, 255, 255, 0.18)",
                                padding: "4px 10px",
                                borderRadius: 100,
                                letterSpacing: 0.3,
                            }}
                        >
                            연 10명 한정 · 최상위 0.5%
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                        <svg width={isMobile ? 36 : 44} height={isMobile ? 36 : 44} viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L4 9L12 22L20 9L12 2Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(255, 255, 255, 0.18)" />
                            <path d="M4 9H20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M9 9L12 2L15 9L12 22L9 9Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        <div
                            style={{
                                fontSize: isMobile ? 28 : 38,
                                fontWeight: 500,
                                color: "#FFFFFF",
                                letterSpacing: -0.5,
                                fontFamily: "'Inter', sans-serif",
                                lineHeight: 1,
                            }}
                        >
                            FIXER ACE
                        </div>
                    </div>

                    <div style={{ fontSize: isMobile ? 14 : 16, color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.5 }}>
                        전국이 인정한 전설. 본사가 직접 모십니다.
                    </div>
                </div>

                {/* Right: Perks */}
                <div
                    style={{
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        minWidth: isMobile ? "auto" : 280,
                    }}
                >
                    {["전국구 고난도 케이스 우선 배정", "본사 기술 자문위원 위촉", "미디어·교육 노출 지원"].map((perk) => (
                        <div
                            key={perk}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                fontSize: isMobile ? 13 : 14,
                                color: "#FFFFFF",
                            }}
                        >
                            <span
                                style={{
                                    flexShrink: 0,
                                    width: 18,
                                    height: 18,
                                    borderRadius: "50%",
                                    background: "rgba(255, 255, 255, 0.2)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 11,
                                }}
                            >
                                ✓
                            </span>
                            {perk}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function GradeRow({ grade, isMobile }: { grade: Grade; isMobile: boolean }) {
    return (
        <div
            style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.10)",
                borderRadius: 16,
                padding: isMobile ? "20px 18px" : "24px 28px",
                display: isMobile ? "block" : "flex",
                alignItems: "center",
                gap: 28,
            }}
        >
            {/* Left: Tier + Name */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    flexShrink: 0,
                    minWidth: isMobile ? "auto" : 240,
                    marginBottom: isMobile ? 16 : 0,
                }}
            >
                {/* Tier indicator */}
                <div
                    style={{
                        width: isMobile ? 40 : 48,
                        height: isMobile ? 40 : 48,
                        borderRadius: 12,
                        background: `${grade.color}22`,
                        border: `1.5px solid ${grade.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <span
                        style={{
                            fontSize: isMobile ? 16 : 18,
                            fontWeight: 500,
                            color: grade.color === "#8A95AD" ? "#B8C5E0" : "#66AAFF",
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        {grade.tier}
                    </span>
                </div>

                <div>
                    <div
                        style={{
                            fontSize: isMobile ? 16 : 18,
                            fontWeight: 500,
                            color: "#FFFFFF",
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: -0.2,
                            lineHeight: 1.2,
                            marginBottom: 4,
                        }}
                    >
                        {grade.name}
                    </div>
                    <div style={{ fontSize: isMobile ? 12 : 13, color: "rgba(255, 255, 255, 0.6)" }}>
                        {grade.tagline}
                    </div>
                </div>
            </div>

            {/* Middle: Requirement */}
            <div
                style={{
                    flexShrink: 0,
                    minWidth: isMobile ? "auto" : 180,
                    marginBottom: isMobile ? 14 : 0,
                    paddingBottom: isMobile ? 14 : 0,
                    borderBottom: isMobile ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                }}
            >
                <div
                    style={{
                        fontSize: 10,
                        letterSpacing: 1,
                        color: "rgba(255, 255, 255, 0.4)",
                        marginBottom: 5,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    자격 조건
                </div>
                <div style={{ fontSize: isMobile ? 13 : 14, color: "#FFFFFF", fontWeight: 500 }}>
                    {grade.requirement}
                </div>
            </div>

            {/* Right: Perks */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                {grade.perks.map((perk) => (
                    <div
                        key={perk}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: isMobile ? 12 : 13,
                            color: "rgba(255, 255, 255, 0.8)",
                        }}
                    >
                        <span
                            style={{
                                flexShrink: 0,
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: grade.color === "#8A95AD" ? "#B8C5E0" : "#66AAFF",
                            }}
                        />
                        {perk}
                    </div>
                ))}
            </div>
        </div>
    )
}
