"use client"

import * as React from "react"

interface Pillar {
    num: string
    title: string
    tagline: string
    desc: string
    stat: string
}

const pillars: Pillar[] = [
    {
        num: "01",
        title: "전국 AS 네트워크",
        tagline: "한 번 부르면, 어디서든",
        desc: "PC·노트북·서버·CCTV·프린터 통합 출장 AS",
        stat: "106 NODE · 전국망",
    },
    {
        num: "02",
        title: "B2B 기업 유지보수",
        tagline: "사인 한 번, 다음 사고 걱정 끝",
        desc: "311개사가 선택한 SLA 기반 IT 인프라 위탁",
        stat: "311 기업계약",
    },
    {
        num: "03",
        title: "스마트 키오스크 & 클리닝",
        tagline: "24시간 무인 입출고",
        desc: "특허 출원 중인 무인 AS 시스템 + PC 클리닝 스테이션",
        stat: "특허 출원 중",
    },
    {
        num: "04",
        title: "IT 교육 & 자격",
        tagline: "FIXER가 되는 길",
        desc: "SNC LAB · 국비지원 · 민간자격 · 국가공인 추진",
        stat: "Tier 1~4 과정",
    },
    {
        num: "05",
        title: "MPS · CCTV 렌탈",
        tagline: "월정액 IT 인프라",
        desc: "프린터·CCTV 통합 관리 서비스 (전국망 기반)",
        stat: "월 구독형",
    },
]

export default function BusinessPillars() {
    return (
        <section
            style={{
                background: "#FFFFFF",
                padding: "120px 80px",
            }}
        >
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                {/* Heading */}
                <div style={{ marginBottom: 64, textAlign: "center" }}>
                    <div
                        style={{
                            fontSize: 13,
                            color: "#0046C0",
                            letterSpacing: 2,
                            fontWeight: 500,
                            marginBottom: 16,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        WHAT WE DO
                    </div>
                    <h2
                        style={{
                            fontSize: 44,
                            lineHeight: 1.25,
                            fontWeight: 500,
                            letterSpacing: -1.5,
                            color: "#0A1733",
                            margin: "0 0 16px 0",
                        }}
                    >
                        SNC가 하는 일
                    </h2>
                    <p
                        style={{
                            fontSize: 17,
                            lineHeight: 1.6,
                            color: "#5A6A8A",
                            margin: 0,
                        }}
                    >
                        25년의 손기술 위에, 다섯 개의 기둥을 세웁니다.
                    </p>
                </div>

                {/* Pillar Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        gap: 20,
                    }}
                >
                    {pillars.map((p) => (
                        <PillarCard key={p.num} {...p} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function PillarCard({ num, title, tagline, desc, stat }: Pillar) {
    const [hover, setHover] = React.useState(false)
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                background: hover ? "#F8FAFF" : "#FFFFFF",
                border: `1px solid ${hover ? "#0066FF" : "#E8ECF3"}`,
                borderRadius: 16,
                padding: "32px 24px",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "pointer",
                minHeight: 320,
                display: "flex",
                flexDirection: "column",
                transform: hover ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hover
                    ? "0 12px 28px rgba(0, 102, 255, 0.10)"
                    : "0 1px 2px rgba(10, 23, 51, 0.03)",
            }}
        >
            {/* Number */}
            <div
                style={{
                    fontSize: 32,
                    fontWeight: 500,
                    color: hover ? "#0066FF" : "#C5D0E5",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: -1,
                    marginBottom: 24,
                    transition: "color 0.3s ease",
                    lineHeight: 1,
                }}
            >
                {num}
            </div>

            {/* Title */}
            <h3
                style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#0A1733",
                    margin: "0 0 8px 0",
                    letterSpacing: -0.3,
                    lineHeight: 1.3,
                }}
            >
                {title}
            </h3>

            {/* Tagline */}
            <div
                style={{
                    fontSize: 13,
                    color: "#0046C0",
                    fontWeight: 500,
                    marginBottom: 14,
                    lineHeight: 1.4,
                }}
            >
                “{tagline}”
            </div>

            {/* Description */}
            <p
                style={{
                    fontSize: 13,
                    lineHeight: 1.65,
                    color: "#5A6A8A",
                    margin: 0,
                    flex: 1,
                }}
            >
                {desc}
            </p>

            {/* Stat Pill */}
            <div
                style={{
                    marginTop: 24,
                    paddingTop: 16,
                    borderTop: `1px solid ${hover ? "#E0EAFF" : "#F0F2F5"}`,
                    transition: "border-color 0.3s ease",
                }}
            >
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 11,
                        fontWeight: 500,
                        color: hover ? "#0066FF" : "#5A6A8A",
                        letterSpacing: 0.3,
                        transition: "color 0.3s ease",
                    }}
                >
                    <span
                        style={{
                            width: 5,
                            height: 5,
                            background: hover ? "#0066FF" : "#B8C5E0",
                            borderRadius: "50%",
                            display: "inline-block",
                            transition: "background 0.3s ease",
                        }}
                    />
                    {stat}
                </div>
            </div>
        </div>
    )
}
