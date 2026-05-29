"use client"

import * as React from "react"

interface Node {
    id: string
    name: string
    nameKo: string
    role: string
    slogan: string
    level: "tier2" | "tier3"
}

const nodes: Node[] = [
    {
        id: "core",
        name: "SNC CORE",
        nameKo: "본사 리페어",
        role: "Tier 4 고난도 수리",
        slogan: "불가능은 없습니다",
        level: "tier2",
    },
    {
        id: "lab",
        name: "SNC LAB",
        nameKo: "기술 교육장",
        role: "FIXER 양성",
        slogan: "기술의 미래를 만듭니다",
        level: "tier2",
    },
    {
        id: "connect",
        name: "SNC CONNECT",
        nameKo: "B2B 전담",
        role: "기업 서비스 관리",
        slogan: "기업과 기술을 연결합니다",
        level: "tier2",
    },
    {
        id: "hub",
        name: "SNC HUB",
        nameKo: "지역 거점",
        role: "권역 관리",
        slogan: "지역을 하나로 잇습니다",
        level: "tier2",
    },
    {
        id: "nodepro",
        name: "SNC NODE PRO",
        nameKo: "인증 파트너",
        role: "우수 대리점",
        slogan: "검증된 실력이 다릅니다",
        level: "tier3",
    },
    {
        id: "node",
        name: "SNC NODE",
        nameKo: "공식 파트너",
        role: "네트워크 시작점",
        slogan: "여기서 시작됩니다",
        level: "tier3",
    },
]

export default function SNCNetworkMobile() {
    return (
        <section id="network" style={{ background: "#F8FAFF", padding: "72px 20px" }}>
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
                {/* Heading */}
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                    <div
                        style={{
                            fontSize: 12,
                            color: "#0046C0",
                            letterSpacing: 2,
                            fontWeight: 500,
                            marginBottom: 12,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        SNC NETWORK
                    </div>
                    <h2
                        style={{
                            fontSize: 26,
                            lineHeight: 1.3,
                            fontWeight: 500,
                            letterSpacing: -0.8,
                            color: "#0A1733",
                            margin: "0 0 12px 0",
                        }}
                    >
                        모든 연결의 중심,
                        <br />
                        <span style={{ color: "#0066FF" }}>SNC 네트워크</span>
                    </h2>
                    <p
                        style={{
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: "#5A6A8A",
                            margin: 0,
                        }}
                    >
                        하나의 본사, 전국의 거점, 그리고 당신.
                    </p>
                </div>

                {/* NEXUS Card - Top */}
                <div
                    style={{
                        background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                        borderRadius: 14,
                        padding: "20px 22px",
                        boxShadow: "0 16px 36px rgba(0, 102, 255, 0.30)",
                        color: "#FFFFFF",
                        position: "relative",
                        overflow: "hidden",
                        marginBottom: 4,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: -30,
                            right: -30,
                            width: 100,
                            height: 100,
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                            pointerEvents: "none",
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 8,
                            position: "relative",
                        }}
                    >
                        <span
                            style={{
                                width: 11,
                                height: 11,
                                background: "#FFFFFF",
                                borderRadius: "50%",
                                boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                            }}
                        />
                        <div
                            style={{
                                fontSize: 18,
                                fontWeight: 500,
                                letterSpacing: -0.3,
                                fontFamily: "'Inter', sans-serif",
                                lineHeight: 1,
                            }}
                        >
                            SNC NEXUS
                        </div>
                    </div>
                    <div
                        style={{
                            fontSize: 12,
                            color: "rgba(255, 255, 255, 0.8)",
                            marginBottom: 8,
                            position: "relative",
                        }}
                    >
                        본사 · 모든 연결의 중심
                    </div>
                    <div
                        style={{
                            fontSize: 11,
                            color: "#FFFFFF",
                            fontWeight: 500,
                            fontStyle: "italic",
                            position: "relative",
                        }}
                    >
                        "모든 연결의 중심입니다"
                    </div>
                </div>

                {/* Down arrow connector */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "8px 0",
                    }}
                >
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                        <line
                            x1="10"
                            y1="0"
                            x2="10"
                            y2="18"
                            stroke="#C5D0E5"
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                        />
                        <path
                            d="M5 16L10 22L15 16"
                            stroke="#0066FF"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    </svg>
                </div>

                {/* Nodes - Vertical List */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {nodes.map((n) => (
                        <NodeRow key={n.id} node={n} />
                    ))}
                </div>

                {/* Legend */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 16,
                        marginTop: 32,
                        flexWrap: "wrap",
                    }}
                >
                    <LegendItem color="#0066FF" label="본사 직속" />
                    <LegendItem color="#3385FF" label="전문 거점" hollow />
                    <LegendItem color="#B8C5E0" label="대리점" hollow />
                </div>
            </div>
        </section>
    )
}

function NodeRow({ node }: { node: Node }) {
    const isTier3 = node.level === "tier3"
    return (
        <div
            style={{
                background: "#FFFFFF",
                border: `1.5px solid ${isTier3 ? "#D6DCE8" : "#3385FF"}`,
                borderRadius: 12,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                boxShadow: "0 2px 8px rgba(10, 23, 51, 0.04)",
            }}
        >
            {/* Color Dot */}
            <span
                style={{
                    width: 12,
                    height: 12,
                    background: isTier3 ? "#B8C5E0" : "#0066FF",
                    borderRadius: "50%",
                    flexShrink: 0,
                    boxShadow: isTier3
                        ? "none"
                        : "0 0 0 4px rgba(0, 102, 255, 0.15)",
                }}
            />

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div
                    style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#0A1733",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: -0.2,
                        lineHeight: 1.2,
                        marginBottom: 3,
                    }}
                >
                    {node.name}
                </div>
                <div
                    style={{
                        fontSize: 11,
                        color: "#5A6A8A",
                        lineHeight: 1.4,
                        marginBottom: 4,
                    }}
                >
                    {node.nameKo} · {node.role}
                </div>
                <div
                    style={{
                        fontSize: 10.5,
                        color: "#0046C0",
                        fontWeight: 500,
                        fontStyle: "italic",
                        lineHeight: 1.3,
                    }}
                >
                    "{node.slogan}"
                </div>
            </div>
        </div>
    )
}

function LegendItem({
    color,
    label,
    hollow,
}: {
    color: string
    label: string
    hollow?: boolean
}) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
                style={{
                    width: 9,
                    height: 9,
                    background: hollow ? "transparent" : color,
                    border: `2px solid ${color}`,
                    borderRadius: "50%",
                    display: "inline-block",
                }}
            />
            <span style={{ fontSize: 11, color: "#5A6A8A" }}>{label}</span>
        </div>
    )
}
