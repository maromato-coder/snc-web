"use client"

import * as React from "react"
import TimelineMobile from "./TimelineMobile"

interface Milestone {
    year: number
    title: string
    subtitle: string
    status: "past" | "current" | "future"
    position: "top" | "bottom"
}

const milestones: Milestone[] = [
    { year: 2001, title: "강동 1호점 창업", subtitle: "한 평의 컴퓨터 가게", status: "past", position: "top" },
    { year: 2010, title: "주연테크 공식대리점", subtitle: "정통 채널 등극", status: "past", position: "bottom" },
    { year: 2015, title: "누적 AS 5만 건 돌파", subtitle: "강동의 PC 지킴이", status: "past", position: "top" },
    { year: 2020, title: "KOSA 정회원 가입", subtitle: "IT 솔루션 기업 인증", status: "past", position: "bottom" },
    { year: 2024, title: "CI·BI 리뉴얼", subtitle: "악수의 의미를 담다", status: "past", position: "top" },
    { year: 2026, title: "NODE 네트워크 출범", subtitle: "전국 106개 거점", status: "current", position: "bottom" },
    { year: 2027, title: "특허·VAN 확장", subtitle: "플랫폼 전환", status: "future", position: "top" },
    { year: 2030, title: "30,000 NODE 비전", subtitle: "한국판 Geek Squad", status: "future", position: "bottom" },
]

const currentIdx = milestones.findIndex((m) => m.status === "current")
const totalSegments = milestones.length - 1
const pastRatio = currentIdx / totalSegments

export default function Timeline() {
    const [isMobile, setIsMobile] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    if (mounted && isMobile) return <TimelineMobile />

    return (
        <section id="about" style={{ background: "#FFFFFF", padding: "140px 80px" }}>
            <div style={{ maxWidth: 1440, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <div style={{ fontSize: 13, color: "#0046C0", letterSpacing: 2, fontWeight: 500, marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
                        OUR JOURNEY
                    </div>
                    <h2 style={{ fontSize: 44, lineHeight: 1.25, fontWeight: 500, letterSpacing: -1.5, color: "#0A1733", margin: "0 0 16px 0" }}>
                        25년의 발자취, <span style={{ color: "#0066FF" }}>그리고 다음 5년</span>
                    </h2>
                    <p style={{ fontSize: 17, lineHeight: 1.6, color: "#5A6A8A", margin: 0 }}>
                        한 평의 가게에서 시작해, 30,000개의 NODE로.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gridTemplateRows: "180px 60px 180px", position: "relative", columnGap: 0 }}>
                    {milestones.map((m, i) => (
                        <div key={`t-${m.year}`} style={{ gridRow: 1, gridColumn: i + 1, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "24px 8px" }}>
                            {m.position === "top" && <MilestoneCard milestone={m} />}
                        </div>
                    ))}

                    <div style={{ gridRow: 2, gridColumn: "1 / -1", position: "relative", display: "grid", gridTemplateColumns: "repeat(8, 1fr)", alignItems: "center" }}>
                        <svg viewBox="0 0 700 4" preserveAspectRatio="none" style={{ position: "absolute", top: "50%", left: "calc(100% / 16)", width: "calc(100% - 100% / 8)", height: 4, transform: "translateY(-50%)", pointerEvents: "none" }}>
                            <line x1="0" y1="2" x2={pastRatio * 700} y2="2" stroke="#0066FF" strokeWidth="2" />
                            <line x1={pastRatio * 700} y1="2" x2="700" y2="2" stroke="#C5D0E5" strokeWidth="2" strokeDasharray="6 6" />
                        </svg>
                        {milestones.map((m) => (
                            <div key={`d-${m.year}`} style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 2 }}>
                                <Dot status={m.status} />
                            </div>
                        ))}
                    </div>

                    {milestones.map((m, i) => (
                        <div key={`b-${m.year}`} style={{ gridRow: 3, gridColumn: i + 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "24px 8px" }}>
                            {m.position === "bottom" && <MilestoneCard milestone={m} />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function MilestoneCard({ milestone }: { milestone: Milestone }) {
    const isFuture = milestone.status === "future"
    const isCurrent = milestone.status === "current"
    const [hover, setHover] = React.useState(false)

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                background: isCurrent ? "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)" : "#FFFFFF",
                border: isCurrent ? "none" : isFuture ? "1px dashed #C5D0E5" : "1px solid #E8ECF3",
                borderRadius: 12,
                padding: "14px 16px",
                width: "100%",
                maxWidth: 160,
                boxShadow: isCurrent ? "0 16px 36px rgba(0, 102, 255, 0.30)" : hover ? "0 8px 20px rgba(10, 23, 51, 0.08)" : "0 2px 6px rgba(10, 23, 51, 0.04)",
                transform: hover ? "translateY(-4px)" : "translateY(0)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: isFuture ? 0.92 : 1,
                position: "relative",
            }}
        >
            {isCurrent && (
                <div style={{ position: "absolute", top: -10, right: 12, background: "#FFFFFF", color: "#0066FF", fontSize: 10, fontWeight: 500, padding: "3px 10px", borderRadius: 100, letterSpacing: 0.5, fontFamily: "'Inter', sans-serif", boxShadow: "0 4px 12px rgba(0, 102, 255, 0.25)" }}>
                    NOW
                </div>
            )}
            <div style={{ fontSize: 22, fontWeight: 500, color: isCurrent ? "#FFFFFF" : "#0066FF", fontFamily: "'Inter', sans-serif", lineHeight: 1, marginBottom: 10, letterSpacing: -0.5 }}>
                {milestone.year}
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: isCurrent ? "#FFFFFF" : "#0A1733", lineHeight: 1.3, marginBottom: 6, letterSpacing: -0.2 }}>
                {milestone.title}
            </div>
            <div style={{ fontSize: 11, color: isCurrent ? "rgba(255, 255, 255, 0.8)" : "#5A6A8A", lineHeight: 1.4, fontStyle: "italic" }}>
                "{milestone.subtitle}"
            </div>
        </div>
    )
}

function Dot({ status }: { status: Milestone["status"] }) {
    if (status === "current") {
        return (
            <div style={{ position: "relative", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(0, 102, 255, 0.15)", borderRadius: "50%" }} />
                <div style={{ width: 14, height: 14, background: "#0066FF", borderRadius: "50%", boxShadow: "0 0 0 4px #FFFFFF, 0 0 0 6px #0066FF", position: "relative", zIndex: 1 }} />
            </div>
        )
    }
    if (status === "future") {
        return <div style={{ width: 10, height: 10, background: "#FFFFFF", border: "2px solid #C5D0E5", borderRadius: "50%" }} />
    }
    return <div style={{ width: 10, height: 10, background: "#0066FF", borderRadius: "50%" }} />
}
