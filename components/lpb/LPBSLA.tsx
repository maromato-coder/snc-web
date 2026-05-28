"use client"

import * as React from "react"

interface Stat {
    value: string
    suffix?: string
    label: string
    desc: string
}

const mainStat: Stat = {
    value: "96",
    suffix: "%",
    label: "연간 재계약율",
    desc: "한 번 맡긴 기업의 96%가 다시 SNC를 선택합니다. 이것이 우리가 증명하는 가장 정직한 신뢰입니다.",
}

const subStats: Stat[] = [
    { value: "311", suffix: "개사", label: "기업 유지보수 계약", desc: "현재 관리 중" },
    { value: "99.2", suffix: "%", label: "평균 SLA 달성률", desc: "약속한 기준 이행" },
    { value: "2.4", suffix: "h", label: "평균 응답시간", desc: "장애 접수 → 대응" },
    { value: "11", suffix: "만+", label: "누적 AS 처리", desc: "25년간 쌓은 경험" },
]

export default function LPBSLA() {
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
                        "radial-gradient(circle at 70% 30%, rgba(0, 102, 255, 0.18) 0%, transparent 50%)",
                    pointerEvents: "none",
                }}
            />

            <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto" }}>
                {/* Heading */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: m ? 48 : 72,
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
                        PROVEN BY NUMBERS
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
                        말이 아니라,{" "}
                        <span style={{ color: "#66AAFF" }}>숫자로 증명합니다.</span>
                    </h2>
                    <p
                        style={{
                            fontSize: m ? 15 : 18,
                            lineHeight: 1.6,
                            color: "rgba(255, 255, 255, 0.65)",
                            margin: 0,
                        }}
                    >
                        25년 동안 쌓아온 신뢰는 결국 데이터로 남습니다.
                    </p>
                </div>

                {/* Body: 메인 수치 + 보조 그리드 */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: m ? "1fr" : "1fr 1fr",
                        gap: m ? 16 : 24,
                    }}
                >
                    {/* 메인 수치 카드 (재계약율 96%) */}
                    <div
                        style={{
                            background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                            borderRadius: 24,
                            padding: m ? "32px 28px" : "48px 44px",
                            position: "relative",
                            overflow: "hidden",
                            boxShadow: "0 24px 60px rgba(0, 59, 181, 0.35)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: -60,
                                right: -60,
                                width: 220,
                                height: 220,
                                background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                                pointerEvents: "none",
                            }}
                        />
                        <div
                            style={{
                                fontSize: 12,
                                letterSpacing: 1.5,
                                color: "rgba(255, 255, 255, 0.8)",
                                fontWeight: 500,
                                fontFamily: "'Inter', sans-serif",
                                marginBottom: m ? 16 : 24,
                                position: "relative",
                            }}
                        >
                            {mainStat.label}
                        </div>
                        <div
                            style={{
                                fontSize: m ? 72 : 120,
                                fontWeight: 500,
                                color: "#FFFFFF",
                                letterSpacing: -4,
                                lineHeight: 0.9,
                                fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                                marginBottom: m ? 16 : 24,
                                position: "relative",
                            }}
                        >
                            {mainStat.value}
                            <span style={{ fontSize: m ? 36 : 56 }}>{mainStat.suffix}</span>
                        </div>
                        <p
                            style={{
                                fontSize: m ? 14 : 16,
                                lineHeight: 1.6,
                                color: "rgba(255, 255, 255, 0.85)",
                                margin: 0,
                                position: "relative",
                            }}
                        >
                            {mainStat.desc}
                        </p>
                    </div>

                    {/* 보조 수치 2x2 그리드 */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: m ? 12 : 16,
                        }}
                    >
                        {subStats.map((s) => (
                            <SubStatCard key={s.label} stat={s} isMobile={m} />
                        ))}
                    </div>
                </div>

                {/* Bottom trust line */}
                <div
                    style={{
                        marginTop: m ? 36 : 56,
                        textAlign: "center",
                        fontSize: m ? 13 : 15,
                        color: "rgba(255, 255, 255, 0.6)",
                        lineHeight: 1.6,
                    }}
                >
                    KOSA 정회원 · 주연테크 공식대리점 · 통신판매업 등록 ·{" "}
                    <strong style={{ color: "#66AAFF", fontWeight: 500 }}>SLA 계약 기반 운영</strong>
                </div>
            </div>
        </section>
    )
}

function SubStatCard({ stat, isMobile }: { stat: Stat; isMobile: boolean }) {
    return (
        <div
            style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.10)",
                borderRadius: 18,
                padding: isMobile ? "20px 18px" : "28px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    fontSize: isMobile ? 32 : 44,
                    fontWeight: 500,
                    color: "#FFFFFF",
                    letterSpacing: -1.5,
                    lineHeight: 1,
                    fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                    marginBottom: isMobile ? 10 : 14,
                }}
            >
                {stat.value}
                <span style={{ fontSize: isMobile ? 16 : 22, color: "#66AAFF" }}>{stat.suffix}</span>
            </div>
            <div
                style={{
                    fontSize: isMobile ? 13 : 14,
                    fontWeight: 500,
                    color: "#FFFFFF",
                    marginBottom: 4,
                    lineHeight: 1.3,
                }}
            >
                {stat.label}
            </div>
            <div style={{ fontSize: isMobile ? 11 : 12, color: "rgba(255, 255, 255, 0.5)" }}>
                {stat.desc}
            </div>
        </div>
    )
}
