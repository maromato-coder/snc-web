"use client"

import * as React from "react"

const includedItems = [
    "공식 FIXER 인증 + ID 카드 발급",
    "본사 콜 인입·자동 배분 (월 1,500+ 콜)",
    "고난도 케이스 CORE 기술 백업",
    "SNC LAB 정기 교육 수강권",
    "CS·클레임 본사 대행",
    "전국 SNC 브랜드 · 마케팅 노출",
    "실시간 정산 시스템 접근",
    "NODE → HUB 성장 사다리 자격",
]

export default function LPAPricing() {
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
                        "radial-gradient(circle at 50% 30%, rgba(0, 102, 255, 0.20) 0%, transparent 55%)",
                    pointerEvents: "none",
                }}
            />

            <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto" }}>
                {/* Heading */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: m ? 40 : 64,
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
                        PRICING
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
                        일단,{" "}
                        <span style={{ color: "#66AAFF" }}>90일 동안 무료로</span>
                        <br />
                        해보고 결정하세요.
                    </h2>
                    <p
                        style={{
                            fontSize: m ? 15 : 18,
                            lineHeight: 1.6,
                            color: "rgba(255, 255, 255, 0.65)",
                            margin: 0,
                        }}
                    >
                        가입비 0원. 보증금 10만 원만으로 모든 시스템을 씁니다.
                    </p>
                </div>

                {/* Pricing Card */}
                <div
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: 24,
                        padding: m ? "32px 24px" : "48px 56px",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    {/* Top: Price highlight */}
                    <div
                        style={{
                            display: m ? "block" : "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 32,
                            paddingBottom: m ? 28 : 36,
                            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                            marginBottom: m ? 28 : 36,
                        }}
                    >
                        <div style={{ marginBottom: m ? 24 : 0 }}>
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    background: "rgba(0, 224, 184, 0.12)",
                                    border: "1px solid rgba(0, 224, 184, 0.3)",
                                    padding: "6px 14px",
                                    borderRadius: 100,
                                    fontSize: 12,
                                    color: "#00E0B8",
                                    fontWeight: 500,
                                    marginBottom: 16,
                                    fontFamily: "'Inter', sans-serif",
                                    letterSpacing: 0.5,
                                }}
                            >
                                <span style={{ width: 6, height: 6, background: "#00E0B8", borderRadius: "50%" }} />
                                90일 무료 트라이얼
                            </div>
                            <div
                                style={{
                                    fontSize: m ? 40 : 56,
                                    fontWeight: 500,
                                    color: "#FFFFFF",
                                    letterSpacing: -2,
                                    lineHeight: 1,
                                    fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                                    marginBottom: 12,
                                }}
                            >
                                0<span style={{ fontSize: m ? 20 : 28 }}>원</span>
                                <span style={{ fontSize: m ? 16 : 20, color: "rgba(255,255,255,0.5)", fontWeight: 400, marginLeft: 8 }}>
                                    / 첫 90일
                                </span>
                            </div>
                            <div style={{ fontSize: m ? 13 : 15, color: "rgba(255, 255, 255, 0.6)" }}>
                                이후에도 보증금 <strong style={{ color: "#FFFFFF", fontWeight: 500 }}>10만 원</strong>만. 가입비·위약금 없음.
                            </div>
                        </div>

                        {/* Deposit highlight box */}
                        <div
                            style={{
                                background: "rgba(0, 102, 255, 0.15)",
                                border: "1px solid rgba(51, 133, 255, 0.3)",
                                borderRadius: 16,
                                padding: m ? "20px 24px" : "24px 32px",
                                textAlign: "center",
                                flexShrink: 0,
                            }}
                        >
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 8, letterSpacing: 0.5 }}>
                                보증금 (환급 가능)
                            </div>
                            <div
                                style={{
                                    fontSize: m ? 28 : 36,
                                    fontWeight: 500,
                                    color: "#66AAFF",
                                    letterSpacing: -1,
                                    lineHeight: 1,
                                    fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                                }}
                            >
                                10만원
                            </div>
                        </div>
                    </div>

                    {/* Included items */}
                    <div style={{ marginBottom: m ? 28 : 36 }}>
                        <div
                            style={{
                                fontSize: m ? 13 : 14,
                                fontWeight: 500,
                                color: "#FFFFFF",
                                marginBottom: m ? 16 : 20,
                            }}
                        >
                            가입 즉시 포함되는 모든 것
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: m ? "1fr" : "1fr 1fr",
                                gap: m ? 12 : 14,
                            }}
                        >
                            {includedItems.map((item) => (
                                <div
                                    key={item}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 10,
                                        fontSize: m ? 13 : 14,
                                        color: "rgba(255, 255, 255, 0.85)",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    <span
                                        style={{
                                            flexShrink: 0,
                                            width: 18,
                                            height: 18,
                                            borderRadius: "50%",
                                            background: "rgba(0, 224, 184, 0.15)",
                                            color: "#00E0B8",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 11,
                                            marginTop: 1,
                                        }}
                                    >
                                        ✓
                                    </span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <a
                        href="#apply"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                            background: "#0066FF",
                            color: "#FFFFFF",
                            padding: m ? "16px 24px" : "18px 32px",
                            borderRadius: 12,
                            fontSize: m ? 15 : 17,
                            textDecoration: "none",
                            fontWeight: 500,
                            boxShadow: "0 16px 36px rgba(0, 102, 255, 0.4)",
                        }}
                    >
                        90일 무료로 시작하기
                        <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                    </a>

                    <div
                        style={{
                            textAlign: "center",
                            fontSize: m ? 12 : 13,
                            color: "rgba(255, 255, 255, 0.5)",
                            marginTop: 16,
                        }}
                    >
                        신용카드 등록 불필요 · 90일 내 언제든 해지 가능
                    </div>
                </div>
            </div>
        </section>
    )
}
