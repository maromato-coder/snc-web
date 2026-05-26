"use client"

import * as React from "react"
import SNCNetworkMobile from "./SNCNetworkMobile"

interface Node {
    id: string
    name: string
    nameKo: string
    role: string
    slogan: string
    level: "tier2" | "tier3"
    pos: { x: string; y: string }
}

const nodes: Node[] = [
    {
        id: "core",
        name: "SNC CORE",
        nameKo: "본사 리페어",
        role: "Tier 4 고난도 수리",
        slogan: "불가능은 없습니다",
        level: "tier2",
        pos: { x: "50%", y: "8%" },
    },
    {
        id: "lab",
        name: "SNC LAB",
        nameKo: "기술 교육장",
        role: "FIXER 양성",
        slogan: "기술의 미래를 만듭니다",
        level: "tier2",
        pos: { x: "84%", y: "30%" },
    },
    {
        id: "connect",
        name: "SNC CONNECT",
        nameKo: "B2B 전담",
        role: "기업 서비스 관리",
        slogan: "기업과 기술을 연결합니다",
        level: "tier2",
        pos: { x: "84%", y: "70%" },
    },
    {
        id: "hub",
        name: "SNC HUB",
        nameKo: "지역 거점",
        role: "권역 관리",
        slogan: "지역을 하나로 잇습니다",
        level: "tier2",
        pos: { x: "50%", y: "92%" },
    },
    {
        id: "nodepro",
        name: "SNC NODE PRO",
        nameKo: "인증 파트너",
        role: "우수 대리점",
        slogan: "검증된 실력이 다릅니다",
        level: "tier3",
        pos: { x: "16%", y: "70%" },
    },
    {
        id: "node",
        name: "SNC NODE",
        nameKo: "공식 파트너",
        role: "네트워크 시작점",
        slogan: "여기서 시작됩니다",
        level: "tier3",
        pos: { x: "16%", y: "30%" },
    },
]

export default function SNCNetwork() {
    // ── 모바일 감지 분기 ──
    const [isMobile, setIsMobile] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    // SSR 깜빡임 방지 — 마운트 전엔 데스크탑 기본
    if (mounted && isMobile) return <SNCNetworkMobile />

    // ── 이하 기존 데스크탑 코드 (변경 없음) ──
    return (
        <section style={{ background: "#F8FAFF", padding: "140px 80px" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 80 }}>
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
                        SNC NETWORK
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
                        모든 연결의 중심,
                        <br />
                        <span style={{ color: "#0066FF" }}>SNC 네트워크</span>
                    </h2>
                    <p
                        style={{
                            fontSize: 17,
                            lineHeight: 1.6,
                            color: "#5A6A8A",
                            margin: 0,
                        }}
                    >
                        하나의 본사, 전국의 거점, 그리고 당신.
                    </p>
                </div>

                <div
                    style={{
                        position: "relative",
                        maxWidth: 1000,
                        margin: "0 auto",
                        aspectRatio: "10 / 7",
                    }}
                >
                    <svg
                        viewBox="0 0 1000 700"
                        preserveAspectRatio="none"
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            pointerEvents: "none",
                        }}
                    >
                        <defs>
                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0066FF" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#0066FF" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>
                        <line x1="500" y1="350" x2="500" y2="56" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5 5" />
                        <line x1="500" y1="350" x2="840" y2="210" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5 5" />
                        <line x1="500" y1="350" x2="840" y2="490" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5 5" />
                        <line x1="500" y1="350" x2="500" y2="644" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5 5" />
                        <line x1="500" y1="350" x2="160" y2="490" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5 5" />
                        <line x1="500" y1="350" x2="160" y2="210" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="5 5" />
                    </svg>

                    <NexusCard />

                    {nodes.map((n) => (
                        <NodeCard key={n.id} node={n} />
                    ))}
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 60, flexWrap: "wrap" }}>
                    <LegendItem color="#0066FF" label="본사 직속" />
                    <LegendItem color="#3385FF" label="전문 거점" hollow />
                    <LegendItem color="#B8C5E0" label="대리점 네트워크" hollow />
                </div>
            </div>
        </section>
    )
}

function NexusCard() {
    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 20,
            }}
        >
            <div
                style={{
                    width: 240,
                    background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                    borderRadius: 16,
                    padding: "24px 24px",
                    boxShadow: "0 20px 48px rgba(0, 102, 255, 0.35)",
                    color: "#FFFFFF",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -30,
                        right: -30,
                        width: 120,
                        height: 120,
                        background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, position: "relative" }}>
                    <span
                        style={{
                            width: 12,
                            height: 12,
                            background: "#FFFFFF",
                            borderRadius: "50%",
                            boxShadow: "0 0 12px rgba(255, 255, 255, 0.8)",
                        }}
                    />
                    <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: -0.3, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
                        SNC NEXUS
                    </div>
                </div>
                <div style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.75)", marginBottom: 12, position: "relative" }}>
                    본사 · 모든 연결의 중심
                </div>
                <div style={{ fontSize: 12, color: "#FFFFFF", fontWeight: 500, fontStyle: "italic", position: "relative" }}>
                    "모든 연결의 중심입니다"
                </div>
            </div>
        </div>
    )
}

function NodeCard({ node }: { node: Node }) {
    const [hover, setHover] = React.useState(false)
    const isTier3 = node.level === "tier3"

    return (
        <div
            style={{
                position: "absolute",
                top: node.pos.y,
                left: node.pos.x,
                transform: "translate(-50%, -50%)",
                zIndex: 10,
            }}
        >
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    width: 200,
                    background: "#FFFFFF",
                    border: `2px solid ${hover ? "#0066FF" : isTier3 ? "#D6DCE8" : "#3385FF"}`,
                    borderRadius: 12,
                    padding: "16px 18px",
                    boxShadow: hover ? "0 16px 32px rgba(0, 102, 255, 0.18)" : "0 4px 12px rgba(10, 23, 51, 0.06)",
                    transform: hover ? "translateY(-6px)" : "translateY(0)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "default",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span
                        style={{
                            width: 8,
                            height: 8,
                            background: isTier3 ? "#B8C5E0" : "#0066FF",
                            borderRadius: "50%",
                            flexShrink: 0,
                        }}
                    />
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#0A1733", fontFamily: "'Inter', sans-serif", letterSpacing: -0.2, lineHeight: 1.2 }}>
                        {node.name}
                    </div>
                </div>
                <div style={{ fontSize: 11, color: "#5A6A8A", marginBottom: 8, lineHeight: 1.4 }}>
                    {node.nameKo} · {node.role}
                </div>
                <div style={{ fontSize: 11, color: "#0046C0", fontWeight: 500, fontStyle: "italic", lineHeight: 1.4 }}>
                    "{node.slogan}"
                </div>
            </div>
        </div>
    )
}

function LegendItem({ color, label, hollow }: { color: string; label: string; hollow?: boolean }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
                style={{
                    width: 10,
                    height: 10,
                    background: hollow ? "transparent" : color,
                    border: `2px solid ${color}`,
                    borderRadius: "50%",
                    display: "inline-block",
                }}
            />
            <span style={{ fontSize: 13, color: "#5A6A8A" }}>{label}</span>
        </div>
    )
}
