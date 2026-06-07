"use client"

import { useState } from "react"

// ════════════════════════════════════════════════
// BrandPC — Section 2. SNC 브랜드 PC
// 4종 라인업 카드 (Gaming / Business / Creator / Office)
// ════════════════════════════════════════════════

const LINEUP = [
    {
        id: "gaming",
        name: "SNC Gaming",
        tag: "고성능",
        tagColor: "#FF4D4D",
        tagBg: "#FFF0F0",
        desc: "고성능 게이밍 환경을 위한 최적의 구성",
        points: ["최신 GPU 탑재", "고속 NVMe SSD", "고주사율 최적화"],
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M12 12h.01M8 10v4M10 12H6" />
                <circle cx="16" cy="12" r="1" />
                <circle cx="18" cy="10" r="1" />
            </svg>
        ),
        accentColor: "#FF4D4D",
        gradientFrom: "#FFF5F5",
        gradientTo: "#FFFFFF",
    },
    {
        id: "business",
        name: "SNC Business",
        tag: "추천",
        tagColor: "#0066FF",
        tagBg: "#EEF4FF",
        desc: "안정성과 생산성을 위한 기업용 솔루션",
        points: ["기업 보안 인증", "장기 안정 운용", "대량 구매 할인"],
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        ),
        accentColor: "#0066FF",
        gradientFrom: "#F0F6FF",
        gradientTo: "#FFFFFF",
    },
    {
        id: "creator",
        name: "SNC Creator",
        tag: "고사양",
        tagColor: "#7C3AED",
        tagBg: "#F5F0FF",
        desc: "영상 편집 및 디자인 전문가를 위한 고성능 시스템",
        points: ["전문가급 GPU", "대용량 RAM", "색정확도 최적화"],
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
        ),
        accentColor: "#7C3AED",
        gradientFrom: "#F8F4FF",
        gradientTo: "#FFFFFF",
    },
    {
        id: "office",
        name: "SNC Office",
        tag: "합리적",
        tagColor: "#059669",
        tagBg: "#ECFDF5",
        desc: "합리적 가격의 업무용 PC",
        points: ["가성비 최적 구성", "저소음 설계", "SNC Care 포함"],
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        accentColor: "#059669",
        gradientFrom: "#F0FDF8",
        gradientTo: "#FFFFFF",
    },
]

interface Props {
    isMobile: boolean
}

export default function BrandPC({ isMobile }: Props) {
    const [hovered, setHovered] = useState<string | null>(null)

    return (
        <section
            id="brand-pc"
            style={{
                padding: isMobile ? "64px 20px" : "100px 80px",
                maxWidth: 1440,
                margin: "0 auto",
            }}
        >
            {/* 섹션 헤더 */}
            <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#EEF4FF",
                        borderRadius: 20,
                        padding: "6px 14px",
                        marginBottom: 16,
                    }}
                >
                    <span style={{ width: 7, height: 7, background: "#0066FF", borderRadius: "50%", display: "inline-block" }} />
                    <span style={{ fontSize: 13, color: "#0066FF", fontWeight: 600, letterSpacing: 0.3 }}>
                        SNC 브랜드 PC
                    </span>
                </div>

                <h2
                    style={{
                        fontSize: isMobile ? 28 : 44,
                        fontWeight: 800,
                        color: "#0A1733",
                        letterSpacing: -1,
                        lineHeight: 1.2,
                        marginBottom: 16,
                    }}
                >
                    당신의 목적에 맞는<br />
                    <span style={{ color: "#0066FF" }}>완벽한 PC</span>
                </h2>

                <p style={{ fontSize: isMobile ? 14 : 17, color: "#5A6A8A", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
                    SNC가 직접 설계하고 제조합니다.<br />
                    구매부터 AS까지 본사가 끝까지 책임집니다.
                </p>
            </div>

            {/* 카드 그리드 */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
                    gap: isMobile ? 12 : 20,
                    marginBottom: isMobile ? 32 : 48,
                }}
            >
                {LINEUP.map((item) => {
                    const isHovered = hovered === item.id
                    return (
                        <div
                            key={item.id}
                            onMouseEnter={() => setHovered(item.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                background: isHovered ? `linear-gradient(160deg, ${item.gradientFrom} 0%, #FFFFFF 100%)` : "#FFFFFF",
                                border: isHovered ? `1.5px solid ${item.accentColor}30` : "1.5px solid #E2E8F2",
                                borderRadius: isMobile ? 16 : 20,
                                padding: isMobile ? "20px 16px" : "32px 28px",
                                cursor: "pointer",
                                transition: "all 0.25s ease",
                                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                                boxShadow: isHovered ? `0 12px 40px ${item.accentColor}15` : "0 2px 8px rgba(10,23,51,0.04)",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* 준비중 배지 */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: isMobile ? 10 : 14,
                                    right: isMobile ? 10 : 14,
                                    background: "#F1F5F9",
                                    color: "#8A9AB8",
                                    fontSize: 10,
                                    fontWeight: 600,
                                    padding: "3px 8px",
                                    borderRadius: 6,
                                    letterSpacing: 0.3,
                                }}
                            >
                                준비중
                            </div>

                            {/* 아이콘 */}
                            <div
                                style={{
                                    width: isMobile ? 44 : 52,
                                    height: isMobile ? 44 : 52,
                                    background: isHovered ? `${item.accentColor}12` : "#F8FAFF",
                                    borderRadius: 14,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: isHovered ? item.accentColor : "#5A6A8A",
                                    marginBottom: isMobile ? 14 : 20,
                                    transition: "all 0.25s ease",
                                }}
                            >
                                {item.icon}
                            </div>

                            {/* 태그 */}
                            <div
                                style={{
                                    display: "inline-block",
                                    background: item.tagBg,
                                    color: item.tagColor,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    padding: "3px 9px",
                                    borderRadius: 6,
                                    marginBottom: 10,
                                    letterSpacing: 0.3,
                                }}
                            >
                                {item.tag}
                            </div>

                            {/* 이름 */}
                            <div style={{ fontSize: isMobile ? 15 : 18, fontWeight: 700, color: "#0A1733", marginBottom: 8, letterSpacing: -0.3 }}>
                                {item.name}
                            </div>

                            {/* 설명 */}
                            <p style={{ fontSize: isMobile ? 12 : 13, color: "#5A6A8A", lineHeight: 1.6, marginBottom: isMobile ? 14 : 20 }}>
                                {item.desc}
                            </p>

                            {/* 포인트 (모바일 숨김) */}
                            {!isMobile && (
                                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                                    {item.points.map((point) => (
                                        <li key={point} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#5A6A8A" }}>
                                            <span style={{ width: 5, height: 5, background: item.accentColor, borderRadius: "50%", flexShrink: 0, opacity: 0.6 }} />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* 하단 CTA */}
            <div style={{ textAlign: "center" }}>
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#F8FAFF",
                        border: "1px solid #E2E8F2",
                        borderRadius: 10,
                        padding: isMobile ? "12px 20px" : "14px 28px",
                        fontSize: isMobile ? 13 : 14,
                        color: "#5A6A8A",
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>
                        브랜드 PC 라인업은 현재 준비 중입니다.{" "}
                        <a href="/enterprise" style={{ color: "#0066FF", fontWeight: 600, textDecoration: "none" }}>
                            사전 문의하기 →
                        </a>
                    </span>
                </div>
            </div>
        </section>
    )
}