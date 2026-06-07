"use client"

// ════════════════════════════════════════════════
// SNCCare — Section 3. SNC Care
// 5가지 케어 서비스 아이콘 카드 UI
// ════════════════════════════════════════════════

const CARE_ITEMS = [
    {
        id: "warranty",
        title: "2년 무상 AS",
        desc: "구매 후 2년간 하드웨어 결함에 대한 무상 수리를 본사가 직접 보증합니다.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
        color: "#0066FF",
        bg: "#EEF4FF",
    },
    {
        id: "network",
        title: "전국 대리점 서비스",
        desc: "전국 106개 NODE 파트너 네트워크를 통해 어디서나 빠른 현장 서비스를 제공합니다.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
        ),
        color: "#00B8F0",
        bg: "#E8F9FF",
    },
    {
        id: "remote",
        title: "원격 기술 지원",
        desc: "전문 엔지니어가 원격으로 즉시 연결해 소프트웨어 문제를 빠르게 해결합니다.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
                <path d="M9 9l2 2 4-4" />
            </svg>
        ),
        color: "#003BB5",
        bg: "#EEF0FF",
    },
    {
        id: "install",
        title: "전문 설치 지원",
        desc: "구매한 PC를 전문 엔지니어가 직접 방문해 최적의 환경으로 설치해드립니다.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        color: "#059669",
        bg: "#ECFDF5",
    },
    {
        id: "guarantee",
        title: "구매처 폐업 시 본사 보증",
        desc: "대리점이 폐업하더라도 SNC 본사가 AS 책임을 이어받아 고객을 끝까지 지원합니다.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        color: "#7C3AED",
        bg: "#F5F0FF",
    },
]

interface Props {
    isMobile: boolean
}

export default function SNCCare({ isMobile }: Props) {
    return (
        <section
            id="snc-care"
            style={{
                background: "#F8FAFF",
                padding: isMobile ? "64px 20px" : "100px 80px",
            }}
        >
            <div style={{ maxWidth: 1440, margin: "0 auto" }}>

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
                            SNC Care
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
                        구매 이후까지<br />
                        <span style={{ color: "#0066FF" }}>책임지는 SNC Care</span>
                    </h2>

                    <p style={{ fontSize: isMobile ? 14 : 17, color: "#5A6A8A", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
                        제품을 판매하고 끝나는 것이 아닙니다.<br />
                        SNC는 고객의 PC 라이프사이클 전체를 함께합니다.
                    </p>
                </div>

                {/* 카드 그리드 */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                        gap: isMobile ? 12 : 20,
                        marginBottom: isMobile ? 32 : 48,
                    }}
                >
                    {CARE_ITEMS.map((item, i) => {
                        // 마지막 2개 아이템 데스크탑에서 가운데 정렬
                        const isLastRow = !isMobile && i >= 3
                        return (
                            <div
                                key={item.id}
                                style={{
                                    background: "#FFFFFF",
                                    border: "1.5px solid #E2E8F2",
                                    borderRadius: isMobile ? 16 : 20,
                                    padding: isMobile ? "24px 20px" : "32px 28px",
                                    display: "flex",
                                    flexDirection: isMobile ? "row" : "column",
                                    gap: isMobile ? 16 : 0,
                                    alignItems: isMobile ? "flex-start" : "flex-start",
                                    gridColumn: isLastRow && i === 3 ? "1 / 2" : undefined,
                                }}
                            >
                                {/* 아이콘 */}
                                <div
                                    style={{
                                        width: isMobile ? 44 : 52,
                                        height: isMobile ? 44 : 52,
                                        background: item.bg,
                                        borderRadius: 14,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: item.color,
                                        flexShrink: 0,
                                        marginBottom: isMobile ? 0 : 20,
                                    }}
                                >
                                    {item.icon}
                                </div>

                                <div>
                                    <div
                                        style={{
                                            fontSize: isMobile ? 15 : 17,
                                            fontWeight: 700,
                                            color: "#0A1733",
                                            marginBottom: 8,
                                            letterSpacing: -0.3,
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                    <p
                                        style={{
                                            fontSize: isMobile ? 13 : 14,
                                            color: "#5A6A8A",
                                            lineHeight: 1.65,
                                            margin: 0,
                                        }}
                                    >
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* 하단 강조 배너 */}
                <div
                    style={{
                        background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                        borderRadius: isMobile ? 16 : 20,
                        padding: isMobile ? "28px 24px" : "36px 48px",
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: isMobile ? "flex-start" : "center",
                        justifyContent: "space-between",
                        gap: isMobile ? 20 : 0,
                    }}
                >
                    <div>
                        <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 800, color: "#FFFFFF", marginBottom: 8, letterSpacing: -0.5 }}>
                            대리점이 폐업해도 걱정 없습니다.
                        </div>
                        <div style={{ fontSize: isMobile ? 13 : 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                            SNC 본사와 전국 네트워크가 고객을 끝까지 지원합니다.
                        </div>
                    </div>
                    <a
                        href="/enterprise"
                        style={{
                            background: "#FFFFFF",
                            color: "#0066FF",
                            padding: isMobile ? "12px 24px" : "14px 32px",
                            borderRadius: 10,
                            fontSize: isMobile ? 13 : 14,
                            fontWeight: 700,
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                        }}
                    >
                        SNC Care 자세히 보기
                    </a>
                </div>
            </div>
        </section>
    )
}