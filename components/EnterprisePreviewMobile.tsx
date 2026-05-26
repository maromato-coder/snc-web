"use client"

import * as React from "react"

export default function EnterprisePreviewMobile() {
    return (
        <section
            style={{
                background: "#0A1733",
                padding: "72px 20px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "radial-gradient(circle at 20% 30%, rgba(0, 102, 255, 0.10) 0%, transparent 50%)",
                    pointerEvents: "none",
                }}
            />

            <div style={{ position: "relative", maxWidth: 480, margin: "0 auto" }}>
                {/* Eyebrow */}
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "rgba(51, 133, 255, 0.12)",
                        border: "1px solid rgba(51, 133, 255, 0.25)",
                        padding: "6px 14px",
                        borderRadius: 100,
                        fontSize: 11,
                        letterSpacing: 1.5,
                        color: "#66AAFF",
                        marginBottom: 24,
                        fontWeight: 500,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    <span style={{ width: 6, height: 6, background: "#66AAFF", borderRadius: "50%" }} />
                    FOR ENTERPRISE
                </div>

                {/* Headline */}
                <h2
                    style={{
                        fontSize: 28,
                        lineHeight: 1.25,
                        fontWeight: 500,
                        letterSpacing: -0.8,
                        color: "#FFFFFF",
                        margin: "0 0 18px 0",
                    }}
                >
                    회사 PC 한 대가 멈추면,
                    <br />
                    <span style={{ color: "#66AAFF" }}>당신의 휴식도 멈춥니다.</span>
                </h2>

                <p
                    style={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "rgba(255, 255, 255, 0.7)",
                        margin: "0 0 16px 0",
                    }}
                >
                    본사·지사·전국 영업소. 모든 IT 자산이 당신의 책임입니다.
                </p>

                <p
                    style={{
                        fontSize: 13,
                        lineHeight: 1.7,
                        color: "rgba(255, 255, 255, 0.55)",
                        margin: "0 0 28px 0",
                    }}
                >
                    외주는 늘 다음 날에 옵니다. SNC는 25년의 손기술과 전국 NODE
                    네트워크로 한 번의 계약, 한 통의 전화로 끝내는 IT 유지보수를
                    제공합니다.
                </p>

                {/* CTA */}
                <a
                    href="#"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#0066FF",
                        color: "#FFFFFF",
                        padding: "12px 22px",
                        borderRadius: 10,
                        fontSize: 13,
                        textDecoration: "none",
                        fontWeight: 500,
                        marginBottom: 36,
                    }}
                >
                    B2B 솔루션 자세히 보기
                    <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                </a>

                {/* SLA Card - Full Width */}
                <div
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(0, 102, 255, 0.08) 0%, rgba(0, 184, 240, 0.04) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: 16,
                        padding: 24,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 22,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                letterSpacing: 1.2,
                                color: "#66AAFF",
                                fontWeight: 500,
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            ENTERPRISE SLA
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                                fontSize: 10,
                                color: "rgba(255, 255, 255, 0.5)",
                            }}
                        >
                            <span
                                style={{
                                    width: 5,
                                    height: 5,
                                    background: "#00E0B8",
                                    borderRadius: "50%",
                                    boxShadow: "0 0 6px rgba(0, 224, 184, 0.6)",
                                }}
                            />
                            LIVE
                        </div>
                    </div>

                    <div style={{ display: "grid", gap: 20 }}>
                        <StatRow num="311" label="기업 유지보수 계약" pct={100} />
                        <StatRow num="99.2%" label="평균 SLA 달성률" pct={99} />
                        <StatRow num="96%" label="연간 재계약율" pct={96} />
                    </div>

                    <div
                        style={{
                            marginTop: 24,
                            paddingTop: 20,
                            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 16,
                        }}
                    >
                        <div>
                            <div style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.4)", letterSpacing: 0.5, marginBottom: 5 }}>
                                평균 응답시간
                            </div>
                            <div style={{ fontSize: 20, fontWeight: 500, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
                                2.4h
                            </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.4)", letterSpacing: 0.5, marginBottom: 5 }}>
                                출동 권역
                            </div>
                            <div style={{ fontSize: 20, fontWeight: 500, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
                                전국
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function StatRow({ num, label, pct }: { num: string; label: string; pct: number }) {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <div
                    style={{
                        fontSize: 26,
                        fontWeight: 500,
                        color: "#FFFFFF",
                        letterSpacing: -0.8,
                        fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                        lineHeight: 1,
                    }}
                >
                    {num}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255, 255, 255, 0.55)" }}>{label}</div>
            </div>
            <div style={{ height: 3, background: "rgba(255, 255, 255, 0.06)", borderRadius: 2, overflow: "hidden" }}>
                <div
                    style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #0066FF 0%, #66AAFF 100%)",
                        borderRadius: 2,
                    }}
                />
            </div>
        </div>
    )
}
