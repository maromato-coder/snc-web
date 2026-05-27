"use client"

import * as React from "react"

export default function LPAHero() {
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
                minHeight: m ? "auto" : "100vh",
                padding: m ? "32px 20px 56px" : "0 80px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
            }}
        >
            {/* 배경 글로우 */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "radial-gradient(circle at 25% 40%, rgba(0, 102, 255, 0.22) 0%, transparent 50%), radial-gradient(circle at 75% 60%, rgba(0, 184, 240, 0.10) 0%, transparent 55%)",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    position: "relative",
                    maxWidth: 1440,
                    margin: "0 auto",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: m ? "1fr" : "1.15fr 1fr",
                    gap: m ? 40 : 96,
                    alignItems: "center",
                    padding: m ? "0" : "120px 0 80px",
                }}
            >
                {/* ── LEFT: Storytelling ── */}
                <div>
                    {/* Eyebrow */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            background: "rgba(51, 133, 255, 0.12)",
                            border: "1px solid rgba(51, 133, 255, 0.25)",
                            padding: m ? "6px 14px" : "8px 18px",
                            borderRadius: 100,
                            fontSize: m ? 11 : 13,
                            letterSpacing: 1.8,
                            color: "#66AAFF",
                            marginBottom: m ? 24 : 36,
                            fontWeight: 500,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        <span style={{ width: 7, height: 7, background: "#66AAFF", borderRadius: "50%" }} />
                        SNC NODE 가맹 모집
                    </div>

                    {/* Headline */}
                    <h1
                        style={{
                            fontSize: m ? 36 : 64,
                            lineHeight: 1.18,
                            fontWeight: 500,
                            letterSpacing: m ? -1 : -2,
                            color: "#FFFFFF",
                            margin: m ? "0 0 24px 0" : "0 0 32px 0",
                        }}
                    >
                        기술은 일류,
                        <br />
                        간판은 골목.
                        <br />
                        <span style={{ color: "#66AAFF" }}>
                            이제 'FIXER'라는 이름을
                            <br />
                            다십시오.
                        </span>
                    </h1>

                    {/* Subhead */}
                    <p
                        style={{
                            fontSize: m ? 15 : 18,
                            lineHeight: 1.7,
                            color: "rgba(255, 255, 255, 0.7)",
                            margin: m ? "0 0 32px 0" : "0 0 44px 0",
                            maxWidth: m ? "100%" : 560,
                        }}
                    >
                        25년 손기술이 동네에 묻혀있습니다.
                        <br />
                        SNC NODE가 그 손기술 위에{" "}
                        <strong style={{ color: "#FFFFFF", fontWeight: 500 }}>
                            전국이 인정하는 이름
                        </strong>
                        을 얹어드립니다.
                    </p>

                    {/* CTA Buttons */}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: m ? 28 : 44 }}>
                        <a
                            href="#apply"
                            style={{
                                background: "#0066FF",
                                color: "#FFFFFF",
                                padding: m ? "14px 24px" : "18px 32px",
                                borderRadius: 12,
                                fontSize: m ? 14 : 16,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                fontWeight: 500,
                                boxShadow: "0 16px 36px rgba(0, 102, 255, 0.35)",
                            }}
                        >
                            90일 무료로 시작하기
                            <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                        </a>
                        <a
                            href="tel:1566-8099"
                            style={{
                                background: "transparent",
                                color: "#FFFFFF",
                                padding: m ? "14px 22px" : "18px 28px",
                                borderRadius: 12,
                                fontSize: m ? 14 : 16,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                fontWeight: 500,
                                border: "1px solid rgba(255, 255, 255, 0.25)",
                            }}
                        >
                            <PhoneIcon />
                            1566-8099
                        </a>
                    </div>

                    {/* 3 Key Promises */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: m ? "1fr 1fr 1fr" : "repeat(3, auto)",
                            gap: m ? 8 : 32,
                            paddingTop: m ? 24 : 32,
                            borderTop: "1px solid rgba(255, 255, 255, 0.10)",
                        }}
                    >
                        {[
                            { num: "90일", label: "무료 트라이얼" },
                            { num: "10만원", label: "보증금만으로" },
                            { num: "전국", label: "본사가 백업" },
                        ].map((p) => (
                            <div key={p.label}>
                                <div
                                    style={{
                                        fontSize: m ? 16 : 22,
                                        fontWeight: 500,
                                        color: "#66AAFF",
                                        fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                                        letterSpacing: -0.5,
                                        lineHeight: 1,
                                        marginBottom: 6,
                                    }}
                                >
                                    {p.num}
                                </div>
                                <div style={{ fontSize: m ? 10 : 12, color: "rgba(255, 255, 255, 0.55)" }}>
                                    {p.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: FIXER ID Card ── */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        perspective: 1200,
                    }}
                >
                    <FixerIDCard isMobile={m} />
                </div>
            </div>
        </section>
    )
}

function FixerIDCard({ isMobile }: { isMobile: boolean }) {
    const w = isMobile ? 280 : 380
    const h = isMobile ? 380 : 520

    return (
        <div
            style={{
                width: w,
                height: h,
                background: "linear-gradient(135deg, #FFFFFF 0%, #F0F4FB 100%)",
                borderRadius: 24,
                padding: isMobile ? 24 : 32,
                boxShadow:
                    "0 32px 80px rgba(0, 102, 255, 0.30), 0 16px 36px rgba(10, 23, 51, 0.40)",
                transform: isMobile ? "none" : "rotateY(-8deg) rotateX(4deg)",
                transformStyle: "preserve-3d",
                position: "relative",
                overflow: "hidden",
                color: "#0A1733",
            }}
        >
            {/* 배경 장식 */}
            <div
                style={{
                    position: "absolute",
                    top: -60,
                    right: -60,
                    width: 180,
                    height: 180,
                    background: "radial-gradient(circle, rgba(0, 102, 255, 0.12) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: isMobile ? 24 : 36,
                    position: "relative",
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: 10,
                            letterSpacing: 1.5,
                            color: "#0046C0",
                            fontWeight: 500,
                            fontFamily: "'Inter', sans-serif",
                            marginBottom: 6,
                        }}
                    >
                        SNC FIXER ID
                    </div>
                    <div style={{ fontSize: 10, color: "#8A95AD", fontFamily: "'Inter', sans-serif" }}>
                        OFFICIAL CERTIFICATION
                    </div>
                </div>
                <div
                    style={{
                        width: 36,
                        height: 36,
                        background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                        borderRadius: 9,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontWeight: 500,
                        fontSize: 16,
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: 0.5,
                    }}
                >
                    S
                </div>
            </div>

            {/* Big Diamond Icon */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: isMobile ? 16 : 24,
                    position: "relative",
                }}
            >
                <svg
                    width={isMobile ? 72 : 96}
                    height={isMobile ? 72 : 96}
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <defs>
                        <linearGradient id="diamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0066FF" />
                            <stop offset="100%" stopColor="#003BB5" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M12 2L4 9L12 22L20 9L12 2Z"
                        stroke="url(#diamGrad)"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                        fill="rgba(0, 102, 255, 0.08)"
                    />
                    <path d="M4 9H20" stroke="url(#diamGrad)" strokeWidth="1.4" strokeLinejoin="round" />
                    <path
                        d="M9 9L12 2L15 9L12 22L9 9Z"
                        stroke="url(#diamGrad)"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Name + Grade */}
            <div style={{ textAlign: "center", marginBottom: isMobile ? 24 : 36, position: "relative" }}>
                <div
                    style={{
                        fontSize: isMobile ? 18 : 22,
                        fontWeight: 500,
                        color: "#0A1733",
                        letterSpacing: -0.3,
                        marginBottom: 8,
                        lineHeight: 1.2,
                    }}
                >
                    당신의 이름
                </div>
                <div
                    style={{
                        display: "inline-block",
                        fontSize: isMobile ? 13 : 15,
                        fontWeight: 500,
                        color: "#FFFFFF",
                        background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                        padding: isMobile ? "6px 14px" : "8px 18px",
                        borderRadius: 100,
                        letterSpacing: 1,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    FIXER · MASTER
                </div>
            </div>

            {/* Stats Footer */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 8,
                    paddingTop: isMobile ? 16 : 24,
                    borderTop: "1px solid #E2E8F2",
                    position: "relative",
                }}
            >
                {[
                    { num: "4.9", lbl: "평점" },
                    { num: "847", lbl: "완료" },
                    { num: "43", lbl: "추천" },
                ].map((s) => (
                    <div key={s.lbl} style={{ textAlign: "center" }}>
                        <div
                            style={{
                                fontSize: isMobile ? 16 : 20,
                                fontWeight: 500,
                                color: "#0066FF",
                                fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                                lineHeight: 1,
                                marginBottom: 4,
                                letterSpacing: -0.3,
                            }}
                        >
                            {s.num}
                        </div>
                        <div style={{ fontSize: isMobile ? 9 : 10, color: "#5A6A8A" }}>{s.lbl}</div>
                    </div>
                ))}
            </div>

            {/* Watermark Number */}
            <div
                style={{
                    position: "absolute",
                    bottom: isMobile ? 12 : 16,
                    right: isMobile ? 14 : 20,
                    fontSize: 9,
                    color: "#B8C5E0",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: 0.5,
                }}
            >
                NODE-2026-XXX
            </div>
        </div>
    )
}

function PhoneIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
