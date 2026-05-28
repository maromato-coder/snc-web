"use client"

import * as React from "react"

interface Pain {
    num: string
    label: string
    title: string
    scene: string
    points: string[]
    icon: "alert" | "scattered" | "burden"
}

const pains: Pain[] = [
    {
        num: "01",
        label: "장애 대응",
        title: "서버는 항상\n퇴근 후에 멈춥니다.",
        scene:
            "금요일 저녁 7시, 회식 자리에서 울리는 전화. \"부장님, 서버가 안 돼요.\" 외주 업체는 \"월요일에 가능합니다.\" 결국 당신이 새벽에 출근합니다.",
        points: [
            "야간·주말 장애에 즉시 대응할 인력이 없다",
            "외주는 다음 영업일에야 움직인다",
            "장애 시간만큼 업무가 마비된다",
        ],
        icon: "alert",
    },
    {
        num: "02",
        label: "업체 분산",
        title: "PC, 프린터, CCTV…\n업체가 다 다릅니다.",
        scene:
            "PC는 A업체, 프린터는 B업체, CCTV는 C업체, 네트워크는 또 다른 곳. 문제 하나에 어디로 전화할지부터 고민입니다. 책임은 서로 미룹니다.",
        points: [
            "장애 원인별로 연락처가 제각각이다",
            "업체 간 \"우리 문제 아니다\" 핑퐁",
            "계약·정산·관리 포인트가 너무 많다",
        ],
        icon: "scattered",
    },
    {
        num: "03",
        label: "책임 부담",
        title: "장애는 회사 탓,\n해결은 내 탓.",
        scene:
            "전국 지사의 모든 IT 자산이 당신 책임입니다. 잘 돌아갈 땐 아무도 모르고, 멈추면 모두가 당신을 봅니다. 휴가 중에도 마음이 편하지 않습니다.",
        points: [
            "전사 IT 자산을 혼자 떠안고 있다",
            "휴가·주말에도 장애 걱정을 놓지 못한다",
            "장애 발생 시 책임이 IT팀에 집중된다",
        ],
        icon: "burden",
    },
]

export default function LPBPain() {
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
                {/* Heading */}
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
                        THE REALITY
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
                        IT 담당자라면, 익숙한 장면들
                    </h2>
                    <p style={{ fontSize: m ? 15 : 18, lineHeight: 1.6, color: "#5A6A8A", margin: 0 }}>
                        규모가 커질수록 IT 관리의 무게는{" "}
                        <strong style={{ color: "#0A1733", fontWeight: 500 }}>한 사람에게</strong> 쏠립니다.
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

                {/* Bridge */}
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
                        THE SOLUTION
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
                        이 모든 걸 한 번에 끝내는 방법.
                        <br />
                        <span style={{ color: "#0066FF" }}>한 번의 계약, 한 통의 전화.</span>
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
                        SNC는 전국 모든 IT 자산을 한 계약으로 통합 관리합니다.
                        이제 당신은 한 곳에만 전화하면 됩니다.
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
            {/* Watermark number */}
            <div
                style={{
                    position: "absolute",
                    top: isMobile ? 16 : 24,
                    right: isMobile ? 20 : 28,
                    fontSize: isMobile ? 56 : 88,
                    fontWeight: 500,
                    color: "#F5F7FB",
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
                    background: "#FEF2F2",
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
                    color: "#DC2626",
                    fontWeight: 500,
                    marginBottom: 10,
                    fontFamily: "'Inter', sans-serif",
                    position: "relative",
                }}
            >
                {pain.label}
            </div>

            {/* Title */}
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

            {/* Scene */}
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

            {/* Points */}
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
                            !
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
        stroke: "#DC2626",
        strokeWidth: 1.7,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    }
    switch (name) {
        case "alert":
            return (
                <svg {...common}>
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
            )
        case "scattered":
            return (
                <svg {...common}>
                    <circle cx="5" cy="5" r="2" />
                    <circle cx="19" cy="5" r="2" />
                    <circle cx="5" cy="19" r="2" />
                    <circle cx="19" cy="19" r="2" />
                    <line x1="7" y1="7" x2="17" y2="17" />
                    <line x1="17" y1="7" x2="7" y2="17" />
                </svg>
            )
        case "burden":
            return (
                <svg {...common}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            )
    }
}
