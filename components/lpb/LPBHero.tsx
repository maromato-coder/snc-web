"use client"

import * as React from "react"

export default function LPBHero() {
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
                background: "#F8FAFF",
                color: "#0A1733",
                minHeight: m ? "auto" : "100vh",
                padding: m ? "48px 20px 56px" : "0 80px",
                display: "flex",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "relative",
                    maxWidth: 1440,
                    margin: "0 auto",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: m ? "1fr" : "1.05fr 1fr",
                    gap: m ? 40 : 80,
                    alignItems: "center",
                    padding: m ? "0" : "120px 0 80px",
                }}
            >
                {/* ── LEFT ── */}
                <div>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            background: "#E6EEFF",
                            padding: m ? "6px 14px" : "8px 18px",
                            borderRadius: 100,
                            fontSize: m ? 11 : 13,
                            letterSpacing: 1.5,
                            color: "#0046C0",
                            marginBottom: m ? 24 : 36,
                            fontWeight: 500,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        <span style={{ width: 7, height: 7, background: "#0066FF", borderRadius: "50%" }} />
                        FOR ENTERPRISE · 기업 IT 유지보수
                    </div>

                    <h1
                        style={{
                            fontSize: m ? 34 : 60,
                            lineHeight: 1.2,
                            fontWeight: 500,
                            letterSpacing: m ? -1 : -2,
                            color: "#0A1733",
                            margin: m ? "0 0 20px 0" : "0 0 28px 0",
                        }}
                    >
                        회사 PC 한 대가 멈추면,
                        <br />
                        <span style={{ color: "#0066FF" }}>당신의 휴식도 멈춥니다.</span>
                    </h1>

                    <p
                        style={{
                            fontSize: m ? 15 : 18,
                            lineHeight: 1.7,
                            color: "#5A6A8A",
                            margin: m ? "0 0 32px 0" : "0 0 44px 0",
                            maxWidth: m ? "100%" : 540,
                        }}
                    >
                        본사·지사·전국 영업소의 모든 IT 자산이 당신의 책임입니다.
                        SNC는 25년 손기술과 전국 NODE 네트워크로,{" "}
                        <strong style={{ color: "#0A1733", fontWeight: 500 }}>
                            한 번의 계약, 한 통의 전화
                        </strong>
                        로 끝내는 IT 유지보수를 제공합니다.
                    </p>

                    {/* CTA */}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: m ? 28 : 44 }}>
                        <a
                            href="#consult"
                            style={{
                                background: "#0066FF",
                                color: "#FFFFFF",
                                padding: m ? "14px 24px" : "16px 32px",
                                borderRadius: 12,
                                fontSize: m ? 14 : 16,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                fontWeight: 500,
                                boxShadow: "0 12px 28px rgba(0, 102, 255, 0.25)",
                            }}
                        >
                            무료 IT 진단 신청
                            <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                        </a>
                        <a
                            href="tel:1566-8099"
                            style={{
                                background: "#FFFFFF",
                                color: "#0A1733",
                                padding: m ? "14px 22px" : "16px 28px",
                                borderRadius: 12,
                                fontSize: m ? 14 : 16,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                fontWeight: 500,
                                border: "1px solid #D6DCE8",
                            }}
                        >
                            <PhoneIcon />
                            1566-8099
                        </a>
                    </div>

                    {/* Trust numbers */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, auto)",
                            gap: m ? 24 : 40,
                            paddingTop: m ? 24 : 32,
                            borderTop: "1px solid #E2E8F2",
                        }}
                    >
                        {[
                            { num: "311", label: "기업 유지보수 계약" },
                            { num: "99.2%", label: "평균 SLA 달성률" },
                            { num: "96%", label: "연간 재계약율" },
                        ].map((s) => (
                            <div key={s.label}>
                                <div
                                    style={{
                                        fontSize: m ? 20 : 28,
                                        fontWeight: 500,
                                        color: "#0066FF",
                                        fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                                        letterSpacing: -0.5,
                                        lineHeight: 1,
                                        marginBottom: 6,
                                    }}
                                >
                                    {s.num}
                                </div>
                                <div style={{ fontSize: m ? 11 : 12, color: "#5A6A8A" }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: SLA Dashboard ── */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <SLADashboard isMobile={m} />
                </div>
            </div>
        </section>
    )
}

function SLADashboard({ isMobile }: { isMobile: boolean }) {
    return (
        <div
            style={{
                width: "100%",
                maxWidth: isMobile ? "100%" : 460,
                background: "#FFFFFF",
                borderRadius: 24,
                padding: isMobile ? 24 : 32,
                boxShadow: "0 32px 80px rgba(10, 23, 51, 0.12), 0 8px 24px rgba(10, 23, 51, 0.06)",
                border: "1px solid #EEF2F8",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: isMobile ? 24 : 28,
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: 11,
                            letterSpacing: 1.2,
                            color: "#0046C0",
                            fontWeight: 500,
                            fontFamily: "'Inter', sans-serif",
                            marginBottom: 6,
                        }}
                    >
                        ENTERPRISE SLA
                    </div>
                    <div style={{ fontSize: isMobile ? 15 : 17, fontWeight: 500, color: "#0A1733" }}>
                        실시간 운영 현황
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 11,
                        color: "#00A878",
                        background: "#E6F7F1",
                        padding: "6px 12px",
                        borderRadius: 100,
                        fontWeight: 500,
                    }}
                >
                    <span
                        style={{
                            width: 6,
                            height: 6,
                            background: "#00C896",
                            borderRadius: "50%",
                            boxShadow: "0 0 6px rgba(0, 200, 150, 0.6)",
                        }}
                    />
                    LIVE
                </div>
            </div>

            {/* SLA Bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 18 : 22, marginBottom: isMobile ? 24 : 28 }}>
                <SLABar label="평균 SLA 달성률" value="99.2%" pct={99} />
                <SLABar label="평균 응답시간" value="2.4h" pct={88} />
                <SLABar label="연간 재계약율" value="96%" pct={96} />
            </div>

            {/* Bottom stats */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    paddingTop: isMobile ? 20 : 24,
                    borderTop: "1px solid #EEF2F8",
                }}
            >
                <div
                    style={{
                        background: "#F8FAFF",
                        borderRadius: 12,
                        padding: isMobile ? "14px 16px" : "16px 18px",
                    }}
                >
                    <div style={{ fontSize: 11, color: "#5A6A8A", marginBottom: 6 }}>관리 중인 기업</div>
                    <div
                        style={{
                            fontSize: isMobile ? 22 : 26,
                            fontWeight: 500,
                            color: "#0A1733",
                            fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                            lineHeight: 1,
                            letterSpacing: -0.5,
                        }}
                    >
                        311<span style={{ fontSize: 14, color: "#5A6A8A" }}>개사</span>
                    </div>
                </div>
                <div
                    style={{
                        background: "#F8FAFF",
                        borderRadius: 12,
                        padding: isMobile ? "14px 16px" : "16px 18px",
                    }}
                >
                    <div style={{ fontSize: 11, color: "#5A6A8A", marginBottom: 6 }}>출동 권역</div>
                    <div
                        style={{
                            fontSize: isMobile ? 22 : 26,
                            fontWeight: 500,
                            color: "#0A1733",
                            fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                            lineHeight: 1,
                            letterSpacing: -0.5,
                        }}
                    >
                        전국
                    </div>
                </div>
            </div>
        </div>
    )
}

function SLABar({ label, value, pct }: { label: string; value: string; pct: number }) {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#5A6A8A" }}>{label}</span>
                <span
                    style={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: "#0A1733",
                        fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                        letterSpacing: -0.3,
                    }}
                >
                    {value}
                </span>
            </div>
            <div style={{ height: 6, background: "#EEF2F8", borderRadius: 3, overflow: "hidden" }}>
                <div
                    style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #0066FF 0%, #00B8F0 100%)",
                        borderRadius: 3,
                    }}
                />
            </div>
        </div>
    )
}

function PhoneIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"
                stroke="#0066FF"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
