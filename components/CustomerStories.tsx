"use client"

import * as React from "react"

interface Story {
    category: string
    quote: string
    name: string
    role: string
    company: string
    metric: { label: string; value: string; direction: "up" | "down" }
    theme: "blue" | "navy" | "light"
}

const stories: Story[] = [
    {
        category: "제조업 · 직원 200명",
        quote:
            "분기마다 IT 사고로 회의가 끊겼는데, SNC 도입 후 24개월간 무사고입니다.",
        name: "IT팀장 ○○○",
        role: "정보화 책임자",
        company: "○○제조",
        metric: { label: "평균 응답시간", value: "73%", direction: "down" },
        theme: "blue",
    },
    {
        category: "강남 SNC NODE 가맹점주",
        quote:
            "동네 가게에서 권역 HUB가 되기까지 18개월. 매출은 2.3배, 자부심은 그 이상입니다.",
        name: "FIXER CHIEF 박○○",
        role: "강남 NODE 대표",
        company: "SNC NODE 강남",
        metric: { label: "매출 성장", value: "2.3배", direction: "up" },
        theme: "navy",
    },
    {
        category: "공공기관 · IT 자산 200대",
        quote:
            "보안 컴플라이언스부터 정기점검까지, 한 곳에서 끝나서 결재 한 번이면 됩니다.",
        name: "정보화팀 ○○○",
        role: "운영 책임자",
        company: "○○기관",
        metric: { label: "외주 업체 수", value: "5→1", direction: "down" },
        theme: "light",
    },
]

export default function CustomerStories() {
    return (
        <section style={{ background: "#F8FAFF", padding: "140px 80px" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                {/* Heading */}
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <div
                        style={{
                            fontSize: 13,
                            color: "#0046C0",
                            letterSpacing: 2,
                            fontWeight: 500,
                            marginBottom: 16,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        CUSTOMER STORIES
                    </div>
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
                        311개사가{" "}
                        <span style={{ color: "#0066FF" }}>SNC를 선택한 이유</span>
                    </h2>
                    <p
                        style={{
                            fontSize: 17,
                            lineHeight: 1.6,
                            color: "#5A6A8A",
                            margin: 0,
                        }}
                    >
                        우리가 말하지 않아도, 그분들이 우리를 말합니다.
                    </p>
                </div>

                {/* Story Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 24,
                        marginBottom: 56,
                    }}
                >
                    {stories.map((s, i) => (
                        <StoryCard key={i} story={s} />
                    ))}
                </div>

                {/* Footer CTA */}
                <div style={{ textAlign: "center" }}>
                    <a
                        href="#"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            color: "#0066FF",
                            fontSize: 15,
                            fontWeight: 500,
                            textDecoration: "none",
                            padding: "12px 20px",
                            borderRadius: 8,
                            transition: "background 0.2s ease",
                        }}
                    >
                        전체 도입 사례 보기
                        <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

function StoryCard({ story }: { story: Story }) {
    const [hover, setHover] = React.useState(false)

    const themes = {
        blue: {
            cardBg: "#FFFFFF",
            quoteColor: "#0A1733",
            quoteMark: "#0066FF",
            metricBg: "#E6EEFF",
            metricValue: "#0046C0",
            border: hover ? "#0066FF" : "#E8ECF3",
        },
        navy: {
            cardBg: "linear-gradient(135deg, #0A1733 0%, #1A2A4A 100%)",
            quoteColor: "#FFFFFF",
            quoteMark: "#66AAFF",
            metricBg: "rgba(102, 170, 255, 0.15)",
            metricValue: "#66AAFF",
            border: hover ? "#3385FF" : "#0A1733",
        },
        light: {
            cardBg: "#FFFFFF",
            quoteColor: "#0A1733",
            quoteMark: "#00B8F0",
            metricBg: "#E0F4FB",
            metricValue: "#0094BC",
            border: hover ? "#00B8F0" : "#E8ECF3",
        },
    }
    const t = themes[story.theme]
    const isDark = story.theme === "navy"

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                background: t.cardBg,
                border: `1px solid ${t.border}`,
                borderRadius: 20,
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: hover ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hover
                    ? isDark
                        ? "0 20px 40px rgba(10, 23, 51, 0.3)"
                        : "0 16px 32px rgba(0, 102, 255, 0.10)"
                    : "0 2px 6px rgba(10, 23, 51, 0.04)",
                display: "flex",
                flexDirection: "column",
                minHeight: 440,
            }}
        >
            {/* Decorative big quote mark */}
            <div
                style={{
                    position: "absolute",
                    top: 20,
                    right: 24,
                    fontSize: 120,
                    lineHeight: 1,
                    color: t.quoteMark,
                    opacity: 0.15,
                    fontFamily: "Georgia, serif",
                    fontWeight: 700,
                    pointerEvents: "none",
                }}
            >
                ”
            </div>

            {/* Category Pill */}
            <div
                style={{
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    fontSize: 11,
                    letterSpacing: 0.5,
                    color: isDark ? "rgba(255,255,255,0.6)" : "#5A6A8A",
                    background: isDark ? "rgba(255,255,255,0.08)" : "#F0F4FB",
                    padding: "5px 12px",
                    borderRadius: 100,
                    marginBottom: 28,
                    fontWeight: 500,
                    position: "relative",
                }}
            >
                {story.category}
            </div>

            {/* Quote */}
            <p
                style={{
                    fontSize: 18,
                    lineHeight: 1.6,
                    color: t.quoteColor,
                    fontWeight: 500,
                    letterSpacing: -0.3,
                    margin: "0 0 32px 0",
                    position: "relative",
                    flex: 1,
                }}
            >
                “{story.quote}”
            </p>

            {/* Speaker */}
            <div
                style={{
                    paddingBottom: 24,
                    marginBottom: 24,
                    borderBottom: `1px solid ${
                        isDark ? "rgba(255,255,255,0.1)" : "#F0F2F5"
                    }`,
                }}
            >
                <div
                    style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: isDark ? "#FFFFFF" : "#0A1733",
                        marginBottom: 4,
                    }}
                >
                    {story.name}
                </div>
                <div
                    style={{
                        fontSize: 12,
                        color: isDark ? "rgba(255,255,255,0.6)" : "#5A6A8A",
                    }}
                >
                    {story.role} · {story.company}
                </div>
            </div>

            {/* ROI Metric Block */}
            <div
                style={{
                    background: t.metricBg,
                    borderRadius: 12,
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: 11,
                            color: isDark ? "rgba(255,255,255,0.6)" : "#5A6A8A",
                            letterSpacing: 0.3,
                            marginBottom: 4,
                        }}
                    >
                        {story.metric.label}
                    </div>
                    <div
                        style={{
                            fontSize: 22,
                            fontWeight: 500,
                            color: t.metricValue,
                            fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                            lineHeight: 1,
                            letterSpacing: -0.5,
                        }}
                    >
                        {story.metric.value}
                        <span
                            style={{
                                fontSize: 14,
                                marginLeft: 6,
                                fontWeight: 500,
                            }}
                        >
                            {story.metric.direction === "up" ? "↑" : "↓"}
                        </span>
                    </div>
                </div>
                <div
                    style={{
                        width: 36,
                        height: 36,
                        background:
                            story.metric.direction === "up"
                                ? isDark
                                    ? "rgba(0, 224, 184, 0.18)"
                                    : "#D1FAE5"
                                : isDark
                                ? "rgba(102, 170, 255, 0.2)"
                                : "#DBEAFE",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <TrendIcon
                        direction={story.metric.direction}
                        color={
                            story.metric.direction === "up"
                                ? isDark
                                    ? "#00E0B8"
                                    : "#10B981"
                                : isDark
                                ? "#66AAFF"
                                : "#3B82F6"
                        }
                    />
                </div>
            </div>
        </div>
    )
}

function TrendIcon({ direction, color }: { direction: "up" | "down"; color: string }) {
    if (direction === "up") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                    d="M4 14L10 8L14 12L20 6"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M14 6H20V12"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )
    }
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d="M4 10L10 16L14 12L20 18"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14 18H20V12"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
