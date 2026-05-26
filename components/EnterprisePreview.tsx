"use client"

import * as React from "react"
import EnterprisePreviewMobile from "./EnterprisePreviewMobile"

export default function EnterprisePreview() {
    const [isMobile, setIsMobile] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    if (mounted && isMobile) return <EnterprisePreviewMobile />

    return (
        <section
            style={{
                background: "#0A1733",
                padding: "140px 80px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage:
                        "radial-gradient(circle at 20% 30%, rgba(0, 102, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 184, 240, 0.06) 0%, transparent 50%)",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "1.1fr 1fr",
                    gap: 96,
                    alignItems: "center",
                    position: "relative",
                }}
            >
                <div>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            background: "rgba(51, 133, 255, 0.12)",
                            border: "1px solid rgba(51, 133, 255, 0.25)",
                            padding: "8px 18px",
                            borderRadius: 100,
                            fontSize: 13,
                            letterSpacing: 1.8,
                            color: "#66AAFF",
                            marginBottom: 36,
                            fontWeight: 500,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        <span style={{ width: 7, height: 7, background: "#66AAFF", borderRadius: "50%" }} />
                        FOR ENTERPRISE
                    </div>

                    <h2 style={{ fontSize: 52, lineHeight: 1.2, fontWeight: 500, letterSpacing: -1.5, color: "#FFFFFF", margin: "0 0 28px 0" }}>
                        회사 PC 한 대가 멈추면,
                        <br />
                        <span style={{ color: "#66AAFF" }}>당신의 휴식도 멈춥니다.</span>
                    </h2>

                    <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255, 255, 255, 0.7)", margin: "0 0 24px 0" }}>
                        본사·지사·전국 영업소.
                        <br />
                        모든 IT 자산이 당신의 책임입니다.
                    </p>

                    <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255, 255, 255, 0.55)", margin: "0 0 44px 0" }}>
                        외주는 늘 다음 날에 옵니다. SNC는 25년의 손기술과 전국 NODE
                        네트워크로 한 번의 계약, 한 통의 전화로 끝내는 IT
                        유지보수를 제공합니다.
                    </p>

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
                        B2B 솔루션 자세히 보기
                        <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                    </a>
                </div>

                <div>
                    <div
                        style={{
                            background: "linear-gradient(135deg, rgba(0, 102, 255, 0.08) 0%, rgba(0, 184, 240, 0.04) 100%)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: 20,
                            padding: 36,
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                            <div style={{ fontSize: 12, letterSpacing: 1.5, color: "#66AAFF", fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                                ENTERPRISE SLA
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255, 255, 255, 0.5)" }}>
                                <span style={{ width: 6, height: 6, background: "#00E0B8", borderRadius: "50%", boxShadow: "0 0 8px rgba(0, 224, 184, 0.6)" }} />
                                LIVE
                            </div>
                        </div>

                        <div style={{ display: "grid", gap: 28 }}>
                            <StatRow num="311" label="기업 유지보수 계약" pct={100} />
                            <StatRow num="99.2%" label="평균 SLA 달성률" pct={99} />
                            <StatRow num="96%" label="연간 재계약율" pct={96} />
                        </div>

                        <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <div style={{ fontSize: 11, color: "rgba(255, 255, 255, 0.4)", letterSpacing: 0.5, marginBottom: 6 }}>평균 응답시간</div>
                                <div style={{ fontSize: 22, fontWeight: 500, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>2.4h</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 11, color: "rgba(255, 255, 255, 0.4)", letterSpacing: 0.5, marginBottom: 6, textAlign: "right" }}>출동 권역</div>
                                <div style={{ fontSize: 22, fontWeight: 500, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1, textAlign: "right" }}>전국</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function StatRow({ num, label, pct }: { num: string; label: string; pct: number }) {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                <div style={{ fontSize: 36, fontWeight: 500, color: "#FFFFFF", letterSpacing: -1, fontFamily: "'Inter', 'Pretendard Variable', sans-serif", lineHeight: 1 }}>
                    {num}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.55)" }}>{label}</div>
            </div>
            <div style={{ height: 3, background: "rgba(255, 255, 255, 0.06)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #0066FF 0%, #66AAFF 100%)", borderRadius: 2 }} />
            </div>
        </div>
    )
}
