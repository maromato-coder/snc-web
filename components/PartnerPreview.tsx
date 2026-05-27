"use client"

import * as React from "react"
import PartnerPreviewMobile from "./PartnerPreviewMobile"

interface Rank {
    name: string
    color: string
    desc: string
    stat: string
}

const ranks: Rank[] = [
    { name: "FIXER CHIEF", color: "#0046C0", desc: "동료가 인정한 리더", stat: "평점 4.8+ · 500건+" },
    { name: "FIXER MASTER", color: "#0066FF", desc: "지역 신뢰 기술자", stat: "평점 4.6+ · 200건+" },
    { name: "FIXER PRO", color: "#3385FF", desc: "실력 입증 단계", stat: "평점 4.3+ · 50건+" },
    { name: "FIXER", color: "#B8C5E0", desc: "기본 인증 완료", stat: "공식 SNC 엔지니어" },
]

export default function PartnerPreview() {
    const [isMobile, setIsMobile] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    if (mounted && isMobile) return <PartnerPreviewMobile />

    return (
        <section style={{ background: "#FFFFFF", padding: "140px 80px" }}>
            <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 96, alignItems: "center" }}>
                <div>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            background: "#E6EEFF",
                            padding: "8px 18px",
                            borderRadius: 100,
                            fontSize: 13,
                            letterSpacing: 1.8,
                            color: "#0046C0",
                            marginBottom: 36,
                            fontWeight: 500,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        <span style={{ width: 7, height: 7, background: "#0066FF", borderRadius: "50%" }} />
                        FOR PARTNERS
                    </div>

                    <h2 style={{ fontSize: 52, lineHeight: 1.2, fontWeight: 500, letterSpacing: -1.5, color: "#0A1733", margin: "0 0 28px 0" }}>
                        기술은 일류,
                        <br />
                        간판은 골목.
                        <br />
                        <span style={{ color: "#0066FF" }}>이제 'FIXER'라는 이름을 다십시오.</span>
                    </h2>

                    <p style={{ fontSize: 18, lineHeight: 1.7, color: "#0A1733", margin: "0 0 24px 0", opacity: 0.75 }}>
                        손기술이 곧 이름이 되는 세계,
                        <br />
                        SNC가 만듭니다.
                    </p>

                    <p style={{ fontSize: 15, lineHeight: 1.8, color: "#5A6A8A", margin: "0 0 36px 0" }}>
                        SNC NODE에서 당신은 가게 사장이 아니라 FIXER MASTER입니다.
                        손님이 동네 가게가 아니라 당신의 등급을 찾아옵니다. 90일
                        무료 트라이얼, 보증금 10만 원으로 시작하세요.
                    </p>

                    <div style={{ display: "flex", gap: 36, paddingTop: 28, paddingBottom: 36, borderTop: "1px solid #E8ECF3", borderBottom: "1px solid #E8ECF3", marginBottom: 36 }}>
                        {[
                            { num: "106", label: "전국 NODE" },
                            { num: "1,500", label: "월평균 콜" },
                            { num: "90일", label: "무료 트라이얼" },
                        ].map((s) => (
                            <div key={s.label}>
                                <div style={{ fontSize: 24, fontWeight: 500, color: "#0066FF", letterSpacing: -0.8, fontFamily: "'Inter', 'Pretendard Variable', sans-serif", lineHeight: 1 }}>
                                    {s.num}
                                </div>
                                <div style={{ fontSize: 12, color: "#5A6A8A", marginTop: 6 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    <a
                        href="#"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            background: "#0066FF",
                            color: "#FFFFFF",
                            padding: "16px 32px",
                            borderRadius: 10,
                            fontSize: 15,
                            textDecoration: "none",
                            fontWeight: 500,
                        }}
                    >
                        가맹 안내 자세히 보기
                        <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                    </a>
                </div>

                <div>
                    <div style={{ fontSize: 12, letterSpacing: 1.5, color: "#5A6A8A", fontWeight: 500, marginBottom: 16, fontFamily: "'Inter', sans-serif", textAlign: "center" }}>
                        FIXER GRADE SYSTEM
                    </div>

                    <div
                        style={{
                            background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                            borderRadius: 16,
                            padding: "28px 28px",
                            marginBottom: 16,
                            position: "relative",
                            overflow: "hidden",
                            boxShadow: "0 16px 36px rgba(0, 102, 255, 0.25)",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: -40,
                                right: -40,
                                width: 160,
                                height: 160,
                                background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                                pointerEvents: "none",
                            }}
                        />

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, position: "relative" }}>
                            <div style={{ fontSize: 11, letterSpacing: 1.2, color: "rgba(255, 255, 255, 0.75)", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                                HIGHEST GRADE
                            </div>
                            <div style={{ fontSize: 10, color: "#FFFFFF", background: "rgba(255, 255, 255, 0.18)", padding: "4px 10px", borderRadius: 100, letterSpacing: 0.3 }}>
                                연 10명 한정 선발
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12, position: "relative" }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L4 9L12 22L20 9L12 2Z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(255, 255, 255, 0.15)" />
                                <path d="M4 9H20" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
                                <path d="M9 9L12 2L15 9L12 22L9 9Z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
                            </svg>
                            <div style={{ fontSize: 28, fontWeight: 500, color: "#FFFFFF", letterSpacing: -0.5, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
                                FIXER ACE
                            </div>
                        </div>

                        <div style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.85)", position: "relative", lineHeight: 1.5 }}>
                            전국이 인정한 전설 · 최상위 0.5%
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {ranks.map((r) => (
                            <RankRow key={r.name} {...r} />
                        ))}
                    </div>

                    <div style={{ marginTop: 20, padding: "14px 16px", background: "#F8FAFF", border: "1px dashed #C5D0E5", borderRadius: 10, fontSize: 12, color: "#5A6A8A", textAlign: "center", lineHeight: 1.5 }}>
                        등급은 가맹점이 아닌{" "}
                        <strong style={{ color: "#0A1733", fontWeight: 500 }}>개인 역량 기준</strong>으로 따라다닙니다.
                    </div>
                </div>
            </div>
        </section>
    )
}

function RankRow({ name, color, desc, stat }: Rank) {
    return (
        <div style={{ background: "#FFFFFF", border: "1px solid #E8ECF3", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ width: 14, height: 14, background: color, borderRadius: "50%", flexShrink: 0, boxShadow: `0 0 0 4px ${color}1A` }} />
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#0A1733", fontFamily: "'Inter', sans-serif", letterSpacing: -0.2, lineHeight: 1.2 }}>
                    {name}
                </div>
                <div style={{ fontSize: 12, color: "#5A6A8A", marginTop: 3 }}>
                    {desc}
                </div>
            </div>
            <div style={{ fontSize: 11, color: "#8A95AD", textAlign: "right", flexShrink: 0, fontFamily: "'Inter', sans-serif" }}>
                {stat}
            </div>
        </div>
    )
}
