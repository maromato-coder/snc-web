"use client"

import * as React from "react"

interface Stage {
    step: string
    name: string
    nameKo: string
    slogan: string
    role: string
    scale: string
    revenue: string
    level: number // 0=base, 1=mid, 2=top
}

const stages: Stage[] = [
    {
        step: "STAGE 1",
        name: "NODE",
        nameKo: "공식 파트너",
        slogan: "여기서 시작합니다",
        role: "동네 단위 출장 AS · 본사 콜 배분",
        scale: "1인 ~ 소규모",
        revenue: "건당 수익 + 본사 콜",
        level: 0,
    },
    {
        step: "STAGE 2",
        name: "NODE PRO",
        nameKo: "인증 파트너",
        slogan: "실력을 인증받습니다",
        role: "검증된 우수 대리점 · 기업 케이스 우선",
        scale: "팀 단위 운영",
        revenue: "높은 수수료율 + 기업 계약",
        level: 1,
    },
    {
        step: "STAGE 3",
        name: "HUB",
        nameKo: "지역 거점",
        slogan: "지역의 중심이 됩니다",
        role: "권역 관리 · 하위 NODE 총괄",
        scale: "다수 FIXER 관리",
        revenue: "권역 수익 셰어 + 관리 수수료",
        level: 2,
    },
]

export default function LPAGrowth() {
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
                            color: "#0046C0",
                            letterSpacing: 2,
                            fontWeight: 500,
                            marginBottom: m ? 12 : 16,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        GROWTH PATH
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
                        동네 가게에서{" "}
                        <span style={{ color: "#0066FF" }}>권역의 중심</span>까지.
                    </h2>
                    <p
                        style={{
                            fontSize: m ? 15 : 18,
                            lineHeight: 1.6,
                            color: "#5A6A8A",
                            margin: 0,
                        }}
                    >
                        SNC NODE는 멈춰있는 가맹점이 아닙니다.
                        <br />
                        당신의 사업은 3단계로 계속 커집니다.
                    </p>
                </div>

                {/* Growth Stages */}
                {m ? (
                    /* 모바일: 세로 스택 */
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {stages.map((s, i) => (
                            <React.Fragment key={s.name}>
                                <StageCard stage={s} isMobile />
                                {i < stages.length - 1 && <VerticalArrow />}
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    /* 데스크탑: 계단식 가로 정렬 */
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 24,
                            alignItems: "flex-end",
                        }}
                    >
                        {stages.map((s) => (
                            <StageCard key={s.name} stage={s} isMobile={false} />
                        ))}
                    </div>
                )}

                {/* Bottom CTA Hint */}
                <div
                    style={{
                        marginTop: m ? 40 : 64,
                        textAlign: "center",
                        fontSize: m ? 14 : 17,
                        color: "#5A6A8A",
                        lineHeight: 1.6,
                    }}
                >
                    현재 전국 <strong style={{ color: "#0066FF", fontWeight: 500 }}>106개 NODE</strong>가 이 길을 함께 걷고 있습니다.
                    <br />
                    <strong style={{ color: "#0A1733", fontWeight: 500 }}>다음 HUB는 당신의 지역일 수 있습니다.</strong>
                </div>
            </div>
        </section>
    )
}

function StageCard({ stage, isMobile }: { stage: Stage; isMobile: boolean }) {
    const isTop = stage.level === 2
    const isMid = stage.level === 1

    // 계단 효과: 데스크탑에서 level에 따라 높이 차등
    const minH = isMobile ? "auto" : isTop ? 420 : isMid ? 380 : 340

    const bg = isTop
        ? "linear-gradient(135deg, #0A1733 0%, #003BB5 100%)"
        : isMid
        ? "linear-gradient(135deg, #0066FF 0%, #0052CC 100%)"
        : "#FFFFFF"

    const textColor = stage.level === 0 ? "#0A1733" : "#FFFFFF"
    const subColor = stage.level === 0 ? "#5A6A8A" : "rgba(255, 255, 255, 0.75)"
    const border = stage.level === 0 ? "1px solid #E2E8F2" : "none"

    return (
        <div
            style={{
                background: bg,
                border,
                borderRadius: 20,
                padding: isMobile ? "28px 24px" : "36px 32px",
                minHeight: minH,
                display: "flex",
                flexDirection: "column",
                boxShadow: isTop
                    ? "0 24px 60px rgba(0, 59, 181, 0.35)"
                    : isMid
                    ? "0 16px 40px rgba(0, 102, 255, 0.28)"
                    : "0 2px 8px rgba(10, 23, 51, 0.05)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {(isTop || isMid) && (
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

            {/* Step Badge */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: isMobile ? 16 : 24,
                    position: "relative",
                }}
            >
                <div
                    style={{
                        fontSize: 11,
                        letterSpacing: 1.5,
                        color: stage.level === 0 ? "#0046C0" : "rgba(255, 255, 255, 0.7)",
                        fontWeight: 500,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    {stage.step}
                </div>
                {isTop && (
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
                        최종 목표
                    </div>
                )}
            </div>

            {/* Name */}
            <div style={{ position: "relative", marginBottom: isMobile ? 6 : 8 }}>
                <div
                    style={{
                        fontSize: isMobile ? 26 : 30,
                        fontWeight: 500,
                        color: textColor,
                        letterSpacing: -0.5,
                        fontFamily: "'Inter', sans-serif",
                        lineHeight: 1,
                        marginBottom: 6,
                    }}
                >
                    {stage.name}
                </div>
                <div style={{ fontSize: isMobile ? 13 : 14, color: subColor }}>
                    {stage.nameKo}
                </div>
            </div>

            {/* Slogan */}
            <div
                style={{
                    fontSize: isMobile ? 14 : 16,
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: stage.level === 0 ? "#0066FF" : "#FFFFFF",
                    margin: isMobile ? "12px 0 20px" : "16px 0 28px",
                    position: "relative",
                }}
            >
                "{stage.slogan}"
            </div>

            {/* Detail Rows */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: isMobile ? 12 : 16,
                    position: "relative",
                    marginTop: "auto",
                    paddingTop: isMobile ? 16 : 20,
                    borderTop: `1px solid ${stage.level === 0 ? "#F0F2F5" : "rgba(255, 255, 255, 0.15)"}`,
                }}
            >
                <DetailRow label="역할" value={stage.role} textColor={textColor} subColor={subColor} />
                <DetailRow label="규모" value={stage.scale} textColor={textColor} subColor={subColor} />
                <DetailRow label="수익" value={stage.revenue} textColor={textColor} subColor={subColor} />
            </div>
        </div>
    )
}

function DetailRow({
    label,
    value,
    textColor,
    subColor,
}: {
    label: string
    value: string
    textColor: string
    subColor: string
}) {
    return (
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div
                style={{
                    fontSize: 11,
                    color: subColor,
                    fontWeight: 500,
                    flexShrink: 0,
                    width: 32,
                    paddingTop: 1,
                }}
            >
                {label}
            </div>
            <div style={{ fontSize: 13, color: textColor, lineHeight: 1.5, fontWeight: 400 }}>
                {value}
            </div>
        </div>
    )
}

function VerticalArrow() {
    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0" }}>
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
                <line x1="10" y1="0" x2="10" y2="20" stroke="#C5D0E5" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M5 18L10 24L15 18" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
        </div>
    )
}
