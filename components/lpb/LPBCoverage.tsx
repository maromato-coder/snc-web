"use client"

import * as React from "react"

interface Region {
    name: string
    nodes: string
    cities: string
}

const regions: Region[] = [
    { name: "수도권", nodes: "48", cities: "서울 · 경기 · 인천" },
    { name: "영남권", nodes: "22", cities: "부산 · 대구 · 울산 · 경상" },
    { name: "충청권", nodes: "16", cities: "대전 · 세종 · 충청" },
    { name: "호남권", nodes: "14", cities: "광주 · 전라" },
    { name: "강원권", nodes: "4", cities: "춘천 · 원주 · 강릉" },
    { name: "제주권", nodes: "2", cities: "제주 · 서귀포" },
]

export default function LPBCoverage() {
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
                        NATIONWIDE COVERAGE
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
                        본사부터 지방 지사까지,{" "}
                        <span style={{ color: "#0066FF" }}>전국 어디든.</span>
                    </h2>
                    <p style={{ fontSize: m ? 15 : 18, lineHeight: 1.6, color: "#5A6A8A", margin: 0 }}>
                        전국 106개 NODE 네트워크가 가장 가까운 곳에서 출동합니다.
                    </p>
                </div>

                {/* Body */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: m ? "1fr" : "1.2fr 0.8fr",
                        gap: m ? 32 : 56,
                        alignItems: "stretch",
                    }}
                >
                    {/* LEFT: 권역별 NODE 분포 */}
                    <div
                        style={{
                            background: "#F8FAFF",
                            borderRadius: 24,
                            padding: m ? "28px 24px" : "40px 36px",
                            border: "1px solid #EEF2F8",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: m ? 24 : 28,
                            }}
                        >
                            <div style={{ fontSize: m ? 15 : 17, fontWeight: 500, color: "#0A1733" }}>
                                권역별 NODE 분포
                            </div>
                            <div
                                style={{
                                    fontSize: m ? 13 : 14,
                                    fontWeight: 500,
                                    color: "#0066FF",
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            >
                                총 106개
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: m ? 14 : 18 }}>
                            {regions.map((r) => (
                                <RegionBar key={r.name} region={r} max={48} isMobile={m} />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: 대응 프로세스 */}
                    <div style={{ display: "flex", flexDirection: "column", gap: m ? 14 : 18 }}>
                        <CoverageStat
                            big="106"
                            unit="개"
                            label="전국 NODE 거점"
                            desc="계속 늘어나는 네트워크"
                            isMobile={m}
                            highlight
                        />
                        <CoverageStat
                            big="6"
                            unit="대권역"
                            label="전국 커버리지"
                            desc="수도권·영남·충청·호남·강원·제주"
                            isMobile={m}
                        />
                        <CoverageStat
                            big="2.4"
                            unit="h"
                            label="평균 출동 시간"
                            desc="접수 후 현장 도착까지"
                            isMobile={m}
                        />
                    </div>
                </div>

                {/* Bottom note */}
                <div
                    style={{
                        marginTop: m ? 36 : 56,
                        textAlign: "center",
                        padding: m ? "24px 20px" : "32px 48px",
                        background: "linear-gradient(135deg, #F0F4FB 0%, #E6EEFF 100%)",
                        borderRadius: 16,
                        border: "1px solid #D6E1FB",
                        fontSize: m ? 14 : 16,
                        lineHeight: 1.6,
                        color: "#0A1733",
                    }}
                >
                    전국에 지사가 흩어져 있어도{" "}
                    <strong style={{ color: "#0066FF", fontWeight: 500 }}>계약은 하나, 관리도 하나.</strong>
                    <br style={{ display: m ? "block" : "none" }} />
                    {" "}본사에서 전국 모든 거점의 IT를 한눈에 관리합니다.
                </div>
            </div>
        </section>
    )
}

function RegionBar({ region, max, isMobile }: { region: Region; max: number; isMobile: boolean }) {
    const pct = (parseInt(region.nodes) / max) * 100

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontSize: isMobile ? 14 : 15, fontWeight: 500, color: "#0A1733" }}>
                        {region.name}
                    </span>
                    <span style={{ fontSize: isMobile ? 11 : 12, color: "#8A95AD" }}>
                        {region.cities}
                    </span>
                </div>
                <span
                    style={{
                        fontSize: isMobile ? 15 : 17,
                        fontWeight: 500,
                        color: "#0066FF",
                        fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                        letterSpacing: -0.3,
                    }}
                >
                    {region.nodes}
                </span>
            </div>
            <div style={{ height: 8, background: "#E2E8F2", borderRadius: 4, overflow: "hidden" }}>
                <div
                    style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #0066FF 0%, #00B8F0 100%)",
                        borderRadius: 4,
                    }}
                />
            </div>
        </div>
    )
}

function CoverageStat({
    big,
    unit,
    label,
    desc,
    isMobile,
    highlight,
}: {
    big: string
    unit: string
    label: string
    desc: string
    isMobile: boolean
    highlight?: boolean
}) {
    return (
        <div
            style={{
                flex: 1,
                background: highlight
                    ? "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)"
                    : "#FFFFFF",
                border: highlight ? "none" : "1px solid #E8ECF3",
                borderRadius: 18,
                padding: isMobile ? "20px 22px" : "24px 28px",
                boxShadow: highlight
                    ? "0 16px 36px rgba(0, 102, 255, 0.28)"
                    : "0 1px 3px rgba(10, 23, 51, 0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {highlight && (
                <div
                    style={{
                        position: "absolute",
                        top: -40,
                        right: -40,
                        width: 140,
                        height: 140,
                        background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />
            )}
            <div
                style={{
                    fontSize: isMobile ? 32 : 40,
                    fontWeight: 500,
                    color: highlight ? "#FFFFFF" : "#0A1733",
                    letterSpacing: -1.5,
                    lineHeight: 1,
                    fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                    marginBottom: isMobile ? 8 : 12,
                    position: "relative",
                }}
            >
                {big}
                <span style={{ fontSize: isMobile ? 16 : 20, color: highlight ? "rgba(255,255,255,0.8)" : "#5A6A8A" }}>
                    {unit}
                </span>
            </div>
            <div
                style={{
                    fontSize: isMobile ? 14 : 15,
                    fontWeight: 500,
                    color: highlight ? "#FFFFFF" : "#0A1733",
                    marginBottom: 4,
                    position: "relative",
                }}
            >
                {label}
            </div>
            <div
                style={{
                    fontSize: isMobile ? 11 : 12,
                    color: highlight ? "rgba(255,255,255,0.7)" : "#8A95AD",
                    position: "relative",
                }}
            >
                {desc}
            </div>
        </div>
    )
}
