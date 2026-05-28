"use client"

import * as React from "react"

/* ════════════════════════════════════════════════
   ⚠️ PLACEHOLDER 데이터 — 실제 인터뷰 확보 시 이 배열만 교체
   각 항목: 인용문 / 이름 / 등급 / 지역 / 성과 지표
   ════════════════════════════════════════════════ */
interface Story {
    quote: string
    name: string
    grade: string
    region: string
    avatar: string
    metricLabel: string
    metricValue: string
    featured?: boolean
}

const stories: Story[] = [
    {
        quote:
            "동네에서 25년 했는데, NODE 들어온 뒤로 강남 기업 케이스까지 받습니다. 같은 손기술인데 받는 일이 달라졌어요.",
        name: "김○○",
        grade: "FIXER MASTER",
        region: "강동 NODE",
        avatar: "김",
        metricLabel: "월 매출",
        metricValue: "2.1배",
    },
    {
        quote:
            "“수리집 아저씨”에서 FIXER CHIEF가 됐습니다. 명함을 받은 손주가 “할아버지 회사 다녀?”라고 묻더군요. 그 한마디에 25년이 보상받았습니다.",
        name: "박○○",
        grade: "FIXER CHIEF",
        region: "송파 HUB",
        avatar: "박",
        metricLabel: "등급 성장",
        metricValue: "HUB 승격",
        featured: true,
    },
    {
        quote:
            "30대에 맨손으로 창업했는데, 본사 콜 배분 덕에 6개월 만에 자리 잡았어요. 혼자였으면 손님 0명으로 망했을 겁니다.",
        name: "이○○",
        grade: "FIXER PRO",
        region: "분당 NODE",
        avatar: "이",
        metricLabel: "안착 기간",
        metricValue: "6개월",
    },
]

export default function LPAStories() {
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
                        FIXER STORIES
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
                        먼저 시작한 FIXER들의 이야기
                    </h2>
                    <p style={{ fontSize: m ? 15 : 18, lineHeight: 1.6, color: "#5A6A8A", margin: 0 }}>
                        당신과 같은 자리에서 출발한 분들입니다.
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
                        <StoryCard key={s.name} story={s} isMobile={m} />
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
                    * 실제 가맹점주 인터뷰 기반. 개인정보 보호를 위해 이름은 익명 처리되었습니다.
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
                        borderRadius: "50%",
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
                        {story.name}
                    </div>
                    <div
                        style={{
                            fontSize: isMobile ? 11 : 12,
                            color: featured ? "rgba(255,255,255,0.7)" : "#5A6A8A",
                        }}
                    >
                        {story.grade} · {story.region}
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
