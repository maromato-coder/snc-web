"use client"

import * as React from "react"

interface Pain {
    num: string
    label: string
    title: string
    scene: string
    points: string[]
    icon: "store" | "ghost" | "clock"
}

const pains: Pain[] = [
    {
        num: "01",
        label: "오늘의 풍경",
        title: "기술은 일류인데,\n손님은 동네 5명뿐.",
        scene:
            "당신은 메인보드를 1시간 만에 진단합니다. 그런데 그 손기술을 알아주는 손님은 동네 5km 안의 사람들뿐입니다.",
        points: [
            "단골 외 신규 유입이 거의 없다",
            "기술력 대비 매출이 정체된 지 오래다",
            "검색해 봐도 우리 가게는 잘 안 나온다",
        ],
        icon: "store",
    },
    {
        num: "02",
        label: "자존감의 벽",
        title: "“그냥 동네 가게”라\n불리는 게 익숙해졌다.",
        scene:
            "25년 손기술이 \"수리집 아저씨\" 한 마디로 정리됩니다. 큰 기업·기관은 당신의 이름 대신 대기업 SI를 부릅니다.",
        points: [
            "전문성을 증명할 공식 인증이 없다",
            "기업 고객이 신뢰할 \"등급\"이 없다",
            "동네 단위를 넘는 자기 브랜드가 없다",
        ],
        icon: "ghost",
    },
    {
        num: "03",
        label: "다가오는 미래",
        title: "딸·아들에게\n물려주기엔 너무 작다.",
        scene:
            "당신의 25년이 동네에서 끝납니다. 자녀에게 가게를 물려주자는 말이 차마 입에서 나오지 않습니다.",
        points: [
            "은퇴 후 자산 가치가 \"권리금\"뿐이다",
            "후계자에게 자랑스럽게 줄 시스템이 없다",
            "디지털·플랫폼 변화 속에서 외롭다",
        ],
        icon: "clock",
    },
]

export default function LPAPain() {
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
                <div style={{ textAlign: "center", marginBottom: m ? 48 : 80, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
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
                        REAL TALK
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
                        솔직히 말해도 될까요?
                    </h2>
                    <p
                        style={{
                            fontSize: m ? 15 : 18,
                            lineHeight: 1.6,
                            color: "#5A6A8A",
                            margin: 0,
                        }}
                    >
                        25년 컴퓨터 자영업, <strong style={{ color: "#0A1733", fontWeight: 500 }}>이런 순간들이</strong> 한 번쯤은 있었을 겁니다.
                    </p>
                </div>

                {/* 3 Pain Cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)",
                        gap: m ? 16 : 24,
                    }}
                >
                    {pains.map((p) => (
                        <PainCard key={p.num} pain={p} isMobile={m} />
                    ))}
                </div>

                {/* Bridge - Transition to Solution */}
                <div
                    style={{
                        marginTop: m ? 48 : 80,
                        textAlign: "center",
                        padding: m ? "32px 20px" : "48px 64px",
                        background: "linear-gradient(135deg, #F0F4FB 0%, #E6EEFF 100%)",
                        borderRadius: 20,
                        border: "1px solid #D6E1FB",
                    }}
                >
                    <div
                        style={{
                            fontSize: m ? 11 : 12,
                            letterSpacing: 1.5,
                            color: "#0046C0",
                            fontWeight: 500,
                            marginBottom: m ? 12 : 16,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        BUT, HERE'S THE THING
                    </div>
                    <h3
                        style={{
                            fontSize: m ? 22 : 32,
                            lineHeight: 1.3,
                            fontWeight: 500,
                            letterSpacing: m ? -0.6 : -1,
                            color: "#0A1733",
                            margin: m ? "0 0 12px 0" : "0 0 16px 0",
                        }}
                    >
                        문제는 당신의 기술이 아닙니다.
                        <br />
                        <span style={{ color: "#0066FF" }}>당신을 담을 그릇이 없었을 뿐.</span>
                    </h3>
                    <p
                        style={{
                            fontSize: m ? 13 : 15,
                            lineHeight: 1.6,
                            color: "#5A6A8A",
                            margin: 0,
                            maxWidth: 600,
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        SNC가 그 그릇이 됩니다. 25년 손기술을{" "}
                        <strong style={{ color: "#0A1733", fontWeight: 500 }}>
                            전국이 인정하는 등급
                        </strong>
                        으로 바꿔드립니다.
                    </p>
                </div>
            </div>
        </section>
    )
}

function PainCard({ pain, isMobile }: { pain: Pain; isMobile: boolean }) {
    return (
        <div
            style={{
                background: "#FFFFFF",
                border: "1px solid #E8ECF3",
                borderRadius: 18,
                padding: isMobile ? "28px 24px" : "36px 32px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(10, 23, 51, 0.04)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Big number on top-right (decoration) */}
            <div
                style={{
                    position: "absolute",
                    top: isMobile ? 16 : 24,
                    right: isMobile ? 20 : 28,
                    fontSize: isMobile ? 56 : 88,
                    fontWeight: 500,
                    color: "#F0F4FB",
                    lineHeight: 1,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: -3,
                    pointerEvents: "none",
                }}
            >
                {pain.num}
            </div>

            {/* Icon */}
            <div
                style={{
                    width: isMobile ? 44 : 52,
                    height: isMobile ? 44 : 52,
                    background: "#E6EEFF",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: isMobile ? 20 : 28,
                    position: "relative",
                }}
            >
                <PainIcon name={pain.icon} size={isMobile ? 22 : 26} />
            </div>

            {/* Label */}
            <div
                style={{
                    fontSize: 11,
                    letterSpacing: 1.5,
                    color: "#0046C0",
                    fontWeight: 500,
                    marginBottom: 10,
                    fontFamily: "'Inter', sans-serif",
                    position: "relative",
                }}
            >
                {pain.label}
            </div>

            {/* Title - Big Punch Quote */}
            <h3
                style={{
                    fontSize: isMobile ? 18 : 22,
                    fontWeight: 500,
                    color: "#0A1733",
                    lineHeight: 1.35,
                    letterSpacing: -0.5,
                    margin: isMobile ? "0 0 16px 0" : "0 0 20px 0",
                    whiteSpace: "pre-line",
                    position: "relative",
                }}
            >
                {pain.title}
            </h3>

            {/* Scene Paragraph */}
            <p
                style={{
                    fontSize: isMobile ? 13 : 14,
                    lineHeight: 1.7,
                    color: "#5A6A8A",
                    margin: isMobile ? "0 0 20px 0" : "0 0 24px 0",
                    position: "relative",
                }}
            >
                {pain.scene}
            </p>

            {/* Points List */}
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: isMobile ? 8 : 10,
                    position: "relative",
                    paddingTop: isMobile ? 16 : 20,
                    borderTop: "1px solid #F0F2F5",
                }}
            >
                {pain.points.map((point, i) => (
                    <li
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            fontSize: isMobile ? 12 : 13,
                            color: "#0A1733",
                            lineHeight: 1.5,
                        }}
                    >
                        <span
                            style={{
                                flexShrink: 0,
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                background: "#FEF2F2",
                                color: "#DC2626",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 10,
                                marginTop: 2,
                                fontWeight: 500,
                            }}
                        >
                            ✕
                        </span>
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function PainIcon({ name, size }: { name: Pain["icon"]; size: number }) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "#0066FF",
        strokeWidth: 1.7,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    }
    switch (name) {
        case "store":
            return (
                <svg {...common}>
                    <path d="M3 9l1.5-5h15L21 9" />
                    <path d="M4 9v11h16V9" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                </svg>
            )
        case "ghost":
            return (
                <svg {...common}>
                    <path d="M9 10h.01M15 10h.01M12 2a8 8 0 00-8 8v12l3-3 3 3 2-2 2 2 3-3 3 3V10a8 8 0 00-8-8z" />
                </svg>
            )
        case "clock":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            )
    }
}
