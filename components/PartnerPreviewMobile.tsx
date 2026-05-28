"use client"

import * as React from "react"

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

export default function PartnerPreviewMobile() {
    return (
        <section style={{ background: "#FFFFFF", padding: "72px 20px" }}>
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
                {/* Eyebrow */}
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#E6EEFF",
                        padding: "6px 14px",
                        borderRadius: 100,
                        fontSize: 11,
                        letterSpacing: 1.5,
                        color: "#0046C0",
                        marginBottom: 24,
                        fontWeight: 500,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    <span style={{ width: 6, height: 6, background: "#0066FF", borderRadius: "50%" }} />
                    FOR PARTNERS
                </div>

                {/* Headline */}
                <h2
                    style={{
                        fontSize: 28,
                        lineHeight: 1.25,
                        fontWeight: 500,
                        letterSpacing: -0.8,
                        color: "#0A1733",
                        margin: "0 0 18px 0",
                    }}
                >
                    기술은 일류,
                    <br />
                    간판은 골목.
                    <br />
                    <span style={{ color: "#0066FF" }}>
                        이제 'FIXER'라는 이름을 다십시오.
                    </span>
                </h2>

                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#0A1733", opacity: 0.75, margin: "0 0 16px 0" }}>
                    손기술이 곧 이름이 되는 세계, SNC가 만듭니다.
                </p>

                <p style={{ fontSize: 13, lineHeight: 1.7, color: "#5A6A8A", margin: "0 0 24px 0" }}>
                    SNC NODE에서 당신은 가게 사장이 아니라 FIXER MASTER입니다. 손님이
                    동네 가게가 아니라 당신의 등급을 찾아옵니다.
                </p>

                {/* Mini Stats */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        gap: 12,
                        paddingTop: 20,
                        paddingBottom: 24,
                        borderTop: "1px solid #E8ECF3",
                        borderBottom: "1px solid #E8ECF3",
                        marginBottom: 24,
                    }}
                >
                    {[
                        { num: "106", label: "전국 NODE" },
                        { num: "1,500", label: "월평균 콜" },
                        { num: "90일", label: "무료 트라이얼" },
                    ].map((s) => (
                        <div key={s.label} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 18, fontWeight: 500, color: "#0066FF", letterSpacing: -0.5, fontFamily: "'Inter', 'Pretendard Variable', sans-serif", lineHeight: 1 }}>
                                {s.num}
                            </div>
                            <div style={{ fontSize: 11, color: "#5A6A8A", marginTop: 5 }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <a
                    href="/join"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#0066FF",
                        color: "#FFFFFF",
                        padding: "12px 22px",
                        borderRadius: 10,
                        fontSize: 13,
                        textDecoration: "none",
                        fontWeight: 500,
                        marginBottom: 40,
                    }}
                >
                    가맹 안내 자세히 보기
                    <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                </a>

                {/* FIXER Grade Section */}
                <div
                    style={{
                        fontSize: 11,
                        letterSpacing: 1.5,
                        color: "#5A6A8A",
                        fontWeight: 500,
                        marginBottom: 14,
                        fontFamily: "'Inter', sans-serif",
                        textAlign: "center",
                    }}
                >
                    FIXER GRADE SYSTEM
                </div>

                {/* ACE Card */}
                <div
                    style={{
                        background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                        borderRadius: 14,
                        padding: "20px 22px",
                        marginBottom: 14,
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: "0 14px 28px rgba(0, 102, 255, 0.25)",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: -30,
                            right: -30,
                            width: 120,
                            height: 120,
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                            pointerEvents: "none",
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 12,
                            position: "relative",
                            flexWrap: "wrap",
                            gap: 6,
                        }}
                    >
                        <div style={{ fontSize: 10, letterSpacing: 1.2, color: "rgba(255, 255, 255, 0.75)", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                            HIGHEST GRADE
                        </div>
                        <div style={{ fontSize: 9, color: "#FFFFFF", background: "rgba(255, 255, 255, 0.18)", padding: "3px 8px", borderRadius: 100, letterSpacing: 0.3 }}>
                            연 10명 한정
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, position: "relative" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L4 9L12 22L20 9L12 2Z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(255, 255, 255, 0.15)" />
                            <path d="M4 9H20" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
                            <path d="M9 9L12 2L15 9L12 22L9 9Z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
                        </svg>
                        <div style={{ fontSize: 22, fontWeight: 500, color: "#FFFFFF", letterSpacing: -0.3, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
                            FIXER ACE
                        </div>
                    </div>

                    <div style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.85)", position: "relative", lineHeight: 1.5 }}>
                        전국이 인정한 전설 · 최상위 0.5%
                    </div>
                </div>

                {/* Rank Rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {ranks.map((r) => (
                        <RankRow key={r.name} {...r} />
                    ))}
                </div>

                {/* Footer Note */}
                <div
                    style={{
                        marginTop: 18,
                        padding: "12px 14px",
                        background: "#F8FAFF",
                        border: "1px dashed #C5D0E5",
                        borderRadius: 10,
                        fontSize: 11,
                        color: "#5A6A8A",
                        textAlign: "center",
                        lineHeight: 1.5,
                    }}
                >
                    등급은 가맹점이 아닌{" "}
                    <strong style={{ color: "#0A1733", fontWeight: 500 }}>개인 역량 기준</strong>으로 따라다닙니다.
                </div>
            </div>
        </section>
    )
}

function RankRow({ name, color, desc, stat }: Rank) {
    return (
        <div
            style={{
                background: "#FFFFFF",
                border: "1px solid #E8ECF3",
                borderRadius: 10,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 12,
            }}
        >
            <span
                style={{
                    width: 11,
                    height: 11,
                    background: color,
                    borderRadius: "50%",
                    flexShrink: 0,
                    boxShadow: `0 0 0 3px ${color}1A`,
                }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#0A1733", fontFamily: "'Inter', sans-serif", letterSpacing: -0.2, lineHeight: 1.2 }}>
                    {name}
                </div>
                <div style={{ fontSize: 10.5, color: "#5A6A8A", marginTop: 2 }}>
                    {desc}
                </div>
            </div>
            <div style={{ fontSize: 9.5, color: "#8A95AD", textAlign: "right", flexShrink: 0, fontFamily: "'Inter', sans-serif", lineHeight: 1.3 }}>
                {stat}
            </div>
        </div>
    )
}
