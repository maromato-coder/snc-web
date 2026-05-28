"use client"

import * as React from "react"

/* ════════════════════════════════════════════════
   ⚠️ PLACEHOLDER 데이터 — 실제 기업 후기 확보 시 이 배열만 교체
   ════════════════════════════════════════════════ */
interface Story {
    quote: string
    company: string
    person: string
    sector: string
    avatar: string
    metricLabel: string
    metricValue: string
    featured?: boolean
}

const stories: Story[] = [
    {
        quote:
            "분기마다 IT 사고로 회의가 끊겼는데, SNC 도입 후 24개월간 무사고입니다. 이제 임원 보고에서 IT는 안건에도 안 올라옵니다.",
        company: "○○제조",
        person: "IT팀장 김○○",
        sector: "제조업 · 직원 200명",
        avatar: "제",
        metricLabel: "장애 발생",
        metricValue: "0건",
    },
    {
        quote:
            "PC, 프린터, CCTV, 네트워크를 각각 다른 업체에 맡기다 지쳤습니다. SNC 한 곳으로 통합하니 결재도, 연락도 한 번이면 끝납니다.",
        company: "○○기관",
        person: "정보화팀 이○○",
        sector: "공공기관 · IT자산 200대",
        avatar: "공",
        metricLabel: "관리 업체 수",
        metricValue: "5 → 1",
        featured: true,
    },
    {
        quote:
            "전국 30개 매장 IT를 혼자 관리하느라 주말이 없었습니다. SNC 도입 후 야간 장애도 직접 처리해줘서, 처음으로 마음 편한 휴가를 다녀왔습니다.",
        company: "○○유통",
        person: "전산실 박○○",
        sector: "유통업 · 전국 30개 매장",
        avatar: "유",
        metricLabel: "평균 응답",
        metricValue: "2.4h",
    },
]

export default function LPBStories() {
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
        <section style={{ background: "#FFFFFF", padding: m ? "72px 20px" : "140px 80px" }}>
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
                        CUSTOMER STORIES
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
                        311개사가{" "}
                        <span style={{ color: "#0066FF" }}>SNC를 선택한 이유</span>
                    </h2>
                    <p style={{ fontSize: m ? 15 : 18, lineHeight: 1.6, color: "#5A6A8A", margin: 0 }}>
                        같은 고민을 했던 IT 담당자들의 이야기입니다.
                    </p>
                </div>

                {/* 3 Story Cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)",
                        gap: m ? 16 : 24,
                        alignItems: m ? "stretch" : "center",
                    }}
                >
                    {stories.map((s) => (
                        <StoryCard key={s.company} story={s} isMobile={m} />
                    ))}
                </div>

                {/* Disclaimer */}
                <div
                    style={{
                        marginTop: m ? 28 : 40,
                        textAlign: "center",
                        fontSize: m ? 11 : 12,
                        color: "#8A95AD",
                        lineHeight: 1.5,
                    }}
                >
                    * 실제 고객사 후기 기반. 기업 정보 보호를 위해 사명은 익명 처리되었습니다.
                </div>
            </div>
        </section>
    )
}

function StoryCard({ story, isMobile }: { story: Story; isMobile: boolean }) {
    const featured = story.featured

    return (
        <div
            style={{
                background: featured
                    ? "linear-gradient(135deg, #0A1733 0%, #003BB5 100%)"
                    : "#FFFFFF",
                border: featured ? "none" : "1px solid #E8ECF3",
                borderRadius: 20,
                padding: isMobile ? "28px 24px" : featured ? "44px 36px" : "36px 32px",
                boxShadow: featured
                    ? "0 24px 60px rgba(0, 59, 181, 0.35)"
                    : "0 2px 8px rgba(10, 23, 51, 0.05)",
                position: "relative",
                overflow: "hidden",
                transform: !isMobile && featured ? "scale(1.04)" : "scale(1)",
                zIndex: featured ? 2 : 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {featured && (
                <div
                    style={{
                        position: "absolute",
                        top: -50,
                        right: -50,
                        width: 180,
                        height: 180,
                        background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />
            )}

            {/* Quote Mark */}
            <div
                style={{
                    fontSize: 48,
                    fontWeight: 500,
                    color: featured ? "rgba(255,255,255,0.25)" : "#D6E1FB",
                    fontFamily: "Georgia, serif",
                    lineHeight: 0.8,
                    marginBottom: isMobile ? 12 : 16,
                    position: "relative",
                }}
            >
                "
            </div>

            {/* Quote */}
            <p
                style={{
                    fontSize: isMobile ? 14 : featured ? 17 : 15,
                    lineHeight: 1.65,
                    color: featured ? "#FFFFFF" : "#0A1733",
                    fontWeight: featured ? 500 : 400,
                    margin: isMobile ? "0 0 24px 0" : "0 0 32px 0",
                    position: "relative",
                    flex: 1,
                }}
            >
                {story.quote}
            </p>

            {/* Author */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    position: "relative",
                    paddingTop: isMobile ? 16 : 20,
                    borderTop: `1px solid ${featured ? "rgba(255,255,255,0.15)" : "#F0F2F5"}`,
                    marginBottom: isMobile ? 16 : 20,
                }}
            >
                <div
                    style={{
                        width: isMobile ? 44 : 48,
                        height: isMobile ? 44 : 48,
                        borderRadius: 12,
                        background: featured ? "rgba(255,255,255,0.18)" : "#E6EEFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: isMobile ? 16 : 18,
                        fontWeight: 500,
                        color: featured ? "#FFFFFF" : "#0066FF",
                        flexShrink: 0,
                    }}
                >
                    {story.avatar}
                </div>
                <div>
                    <div
                        style={{
                            fontSize: isMobile ? 14 : 15,
                            fontWeight: 500,
                            color: featured ? "#FFFFFF" : "#0A1733",
                            lineHeight: 1.2,
                            marginBottom: 4,
                        }}
                    >
                        {story.company} · {story.person}
                    </div>
                    <div
                        style={{
                            fontSize: isMobile ? 11 : 12,
                            color: featured ? "rgba(255,255,255,0.7)" : "#5A6A8A",
                        }}
                    >
                        {story.sector}
                    </div>
                </div>
            </div>

            {/* Metric */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: featured ? "rgba(255,255,255,0.10)" : "#F0F4FB",
                    borderRadius: 12,
                    padding: isMobile ? "12px 16px" : "14px 18px",
                    position: "relative",
                }}
            >
                <span
                    style={{
                        fontSize: isMobile ? 11 : 12,
                        color: featured ? "rgba(255,255,255,0.7)" : "#5A6A8A",
                    }}
                >
                    {story.metricLabel}
                </span>
                <span
                    style={{
                        fontSize: isMobile ? 16 : 18,
                        fontWeight: 500,
                        color: featured ? "#66AAFF" : "#0066FF",
                        fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                        letterSpacing: -0.3,
                    }}
                >
                    {story.metricValue}
                </span>
            </div>
        </div>
    )
}
