"use client"

import * as React from "react"

interface Milestone {
    year: number
    title: string
    subtitle: string
    status: "past" | "current" | "future"
}

const milestones: Milestone[] = [
    { year: 2001, title: "강동 1호점 창업", subtitle: "한 평의 컴퓨터 가게", status: "past" },
    { year: 2010, title: "주연테크 공식대리점", subtitle: "정통 채널 등극", status: "past" },
    { year: 2015, title: "누적 AS 5만 건 돌파", subtitle: "강동의 PC 지킴이", status: "past" },
    { year: 2020, title: "KOSA 정회원 가입", subtitle: "IT 솔루션 기업 인증", status: "past" },
    { year: 2024, title: "CI·BI 리뉴얼", subtitle: "악수의 의미를 담다", status: "past" },
    { year: 2026, title: "NODE 네트워크 출범", subtitle: "전국 106개 거점", status: "current" },
    { year: 2027, title: "특허·VAN 확장", subtitle: "플랫폼 전환", status: "future" },
    { year: 2030, title: "30,000 NODE 비전", subtitle: "한국판 Geek Squad", status: "future" },
]

export default function TimelineMobile() {
    return (
        <section style={{ background: "#FFFFFF", padding: "72px 20px" }}>
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
                {/* Heading */}
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                    <div
                        style={{
                            fontSize: 12,
                            color: "#0046C0",
                            letterSpacing: 2,
                            fontWeight: 500,
                            marginBottom: 12,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        OUR JOURNEY
                    </div>
                    <h2
                        style={{
                            fontSize: 26,
                            lineHeight: 1.3,
                            fontWeight: 500,
                            letterSpacing: -0.8,
                            color: "#0A1733",
                            margin: "0 0 12px 0",
                        }}
                    >
                        25년의 발자취,{" "}
                        <span style={{ color: "#0066FF" }}>그리고 다음 5년</span>
                    </h2>
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: "#5A6A8A", margin: 0 }}>
                        한 평의 가게에서 시작해, 30,000개의 NODE로.
                    </p>
                </div>

                {/* Vertical Timeline */}
                <div style={{ position: "relative", paddingLeft: 28 }}>
                    {/* 세로 라인 */}
                    <div
                        style={{
                            position: "absolute",
                            left: 9,
                            top: 8,
                            bottom: 8,
                            width: 2,
                            background:
                                "linear-gradient(to bottom, #0066FF 0%, #0066FF 65%, #C5D0E5 65%, #C5D0E5 100%)",
                        }}
                    />

                    {milestones.map((m) => (
                        <MilestoneRow key={m.year} milestone={m} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function MilestoneRow({ milestone }: { milestone: Milestone }) {
    const isFuture = milestone.status === "future"
    const isCurrent = milestone.status === "current"

    return (
        <div style={{ position: "relative", marginBottom: 18 }}>
            {/* Dot on timeline */}
            <div
                style={{
                    position: "absolute",
                    left: -28,
                    top: 14,
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                }}
            >
                {isCurrent ? (
                    <>
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "rgba(0, 102, 255, 0.18)",
                                borderRadius: "50%",
                            }}
                        />
                        <div
                            style={{
                                width: 12,
                                height: 12,
                                background: "#0066FF",
                                borderRadius: "50%",
                                boxShadow: "0 0 0 3px #FFFFFF, 0 0 0 5px #0066FF",
                                zIndex: 1,
                            }}
                        />
                    </>
                ) : isFuture ? (
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            background: "#FFFFFF",
                            border: "2px solid #C5D0E5",
                            borderRadius: "50%",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            background: "#0066FF",
                            borderRadius: "50%",
                        }}
                    />
                )}
            </div>

            {/* Card */}
            <div
                style={{
                    background: isCurrent
                        ? "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)"
                        : "#FFFFFF",
                    border: isCurrent
                        ? "none"
                        : isFuture
                        ? "1px dashed #C5D0E5"
                        : "1px solid #E8ECF3",
                    borderRadius: 12,
                    padding: "14px 16px",
                    boxShadow: isCurrent
                        ? "0 12px 28px rgba(0, 102, 255, 0.28)"
                        : "0 1px 4px rgba(10, 23, 51, 0.04)",
                    opacity: isFuture ? 0.95 : 1,
                    position: "relative",
                }}
            >
                {isCurrent && (
                    <div
                        style={{
                            position: "absolute",
                            top: -8,
                            right: 12,
                            background: "#FFFFFF",
                            color: "#0066FF",
                            fontSize: 9,
                            fontWeight: 500,
                            padding: "2px 8px",
                            borderRadius: 100,
                            letterSpacing: 0.5,
                            fontFamily: "'Inter', sans-serif",
                            boxShadow: "0 3px 10px rgba(0, 102, 255, 0.25)",
                        }}
                    >
                        NOW
                    </div>
                )}
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
                            color: isCurrent ? "#FFFFFF" : "#0066FF",
                            fontFamily: "'Inter', sans-serif",
                            lineHeight: 1,
                            letterSpacing: -0.3,
                        }}
                    >
                        {milestone.year}
                    </div>
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: isCurrent ? "#FFFFFF" : "#0A1733",
                            lineHeight: 1.3,
                            letterSpacing: -0.2,
                        }}
                    >
                        {milestone.title}
                    </div>
                </div>
                <div
                    style={{
                        fontSize: 11,
                        color: isCurrent ? "rgba(255, 255, 255, 0.8)" : "#5A6A8A",
                        lineHeight: 1.4,
                        fontStyle: "italic",
                    }}
                >
                    "{milestone.subtitle}"
                </div>
            </div>
        </div>
    )
}
