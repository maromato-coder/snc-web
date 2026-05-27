"use client"

import SNCRotatingCube from "@/components/SNCRotatingCube"
import TrustBar from "@/components/TrustBar"
import PersonaRouter from "@/components/PersonaRouter"
import BusinessPillars from "@/components/BusinessPillars"
import EnterprisePreview from "@/components/EnterprisePreview"
import PartnerPreview from "@/components/PartnerPreview"
import SNCNetwork from "@/components/SNCNetwork"
import Timeline from "@/components/Timeline"
import CustomerStories from "@/components/CustomerStories"
import NewsAndFamily from "@/components/NewsAndFamily"
import FinalCTAFooter from "@/components/FinalCTAFooter"
import MobileMenu from "@/components/MobileMenu"
import StickyBottomCTA from "@/components/StickyBottomCTA"
import * as React from "react"

export default function Home() {
    const [isMobile, setIsMobile] = React.useState(false)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    return (
        <>
            <main style={{ background: "#FFFFFF", minHeight: "100vh", color: "#0A1733" }}>
                {/* ────────── NAVIGATION ────────── */}
                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: isMobile ? "16px 20px" : "24px 80px",
                        borderBottom: "1px solid #F0F2F5",
                        background: "#FFFFFF",
                        position: "sticky",
                        top: 0,
                        zIndex: 100,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div
                            style={{
                                width: isMobile ? 36 : 44,
                                height: isMobile ? 36 : 44,
                                background: "#0066FF",
                                borderRadius: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#FFFFFF",
                                fontWeight: 500,
                                fontSize: isMobile ? 16 : 20,
                                fontFamily: "'Inter', sans-serif",
                                letterSpacing: 0.5,
                            }}
                        >
                            S
                        </div>
                        <div>
                            <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 500, letterSpacing: 1.2, lineHeight: 1, color: "#0A1733" }}>SNC</div>
                            <div style={{ fontSize: isMobile ? 11 : 13, color: "#8A95AD", marginTop: 4, lineHeight: 1 }}>에스엔씨</div>
                        </div>
                    </div>

                    {!isMobile && (
                        <ul style={{ display: "flex", gap: 40, listStyle: "none", margin: 0, padding: 0 }}>
                            <li><a href="#" style={navLinkStyle}>Solutions</a></li>
                            <li><a href="#" style={navLinkStyle}>Network</a></li>
                            <li><a href="#" style={navLinkStyle}>Customers</a></li>
                            <li><a href="#" style={navLinkStyle}>About</a></li>
                        </ul>
                    )}

                    {isMobile ? (
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="메뉴 열기"
                            style={{
                                width: 40,
                                height: 40,
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 0,
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <line x1="4" y1="7" x2="20" y2="7" stroke="#0A1733" strokeWidth="2" strokeLinecap="round" />
                                <line x1="4" y1="12" x2="20" y2="12" stroke="#0A1733" strokeWidth="2" strokeLinecap="round" />
                                <line x1="4" y1="17" x2="20" y2="17" stroke="#0A1733" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            style={{
                                background: "#0066FF",
                                color: "#FFFFFF",
                                padding: "13px 28px",
                                borderRadius: 8,
                                fontSize: 14,
                                border: "none",
                                fontWeight: 500,
                                fontFamily: "inherit",
                                cursor: "pointer",
                            }}
                        >
                            상담 신청
                        </button>
                    )}
                </nav>

                {/* ────────── HERO BODY ────────── */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1.15fr 1fr",
                        gap: isMobile ? 40 : 80,
                        padding: isMobile ? "60px 20px 40px" : "120px 80px 100px",
                        alignItems: "center",
                        background: "#F8FAFF",
                        maxWidth: 1440,
                        margin: "0 auto",
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                background: "#E6EEFF",
                                padding: isMobile ? "6px 14px" : "8px 18px",
                                borderRadius: 100,
                                fontSize: isMobile ? 11 : 13,
                                letterSpacing: 1.5,
                                color: "#0046C0",
                                marginBottom: isMobile ? 24 : 36,
                                fontWeight: 500,
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            <span style={{ width: 7, height: 7, background: "#0066FF", borderRadius: "50%", display: "inline-block" }} />
                            SINCE 2001 · KOREA IT SERVICE PLATFORM
                        </div>

                        <h1
                            style={{
                                fontSize: isMobile ? 36 : 68,
                                lineHeight: 1.15,
                                fontWeight: 500,
                                letterSpacing: isMobile ? -1 : -2,
                                color: "#0A1733",
                                margin: isMobile ? "0 0 20px 0" : "0 0 28px 0",
                            }}
                        >
                            전국 IT 서비스를
                            <br />
                            <b style={{ color: "#0066FF", fontWeight: 500 }}>다시 연결합니다.</b>
                        </h1>

                        <p style={{
                            fontSize: isMobile ? 15 : 18,
                            lineHeight: 1.7,
                            color: "#5A6A8A",
                            margin: isMobile ? "0 0 32px 0" : "0 0 44px 0"
                        }}>
                            2001년부터 25년, SNC는 고객의 손을 놓지 않습니다.
                            <br />
                            누적 AS 11만 건 · 기업 311개사가 신뢰한 IT 서비스 파트너.
                        </p>

                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                            <a
                                href="#"
                                style={{
                                    background: "#0066FF",
                                    color: "#FFFFFF",
                                    padding: isMobile ? "14px 22px" : "16px 28px",
                                    borderRadius: 10,
                                    fontSize: isMobile ? 14 : 15,
                                    textDecoration: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    fontWeight: 500,
                                }}
                            >
                                솔루션 알아보기 →
                            </a>
                            <a
                                href="#"
                                style={{
                                    background: "#FFFFFF",
                                    color: "#0A1733",
                                    padding: isMobile ? "14px 22px" : "16px 28px",
                                    borderRadius: 10,
                                    fontSize: isMobile ? 14 : 15,
                                    textDecoration: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    fontWeight: 500,
                                    border: "1px solid #D6DCE8",
                                }}
                            >
                                ▶ 2분 소개
                            </a>
                        </div>
                    </div>

                    <div style={{
                        height: isMobile ? 320 : 520,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <SNCRotatingCube
                            size={isMobile ? 220 : 340}
                            rotationDuration={20}
                        />
                    </div>
                </div>

                {/* ────────── STATS BAR ────────── */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                        gap: 1,
                        background: "#E2E8F2",
                        borderTop: "1px solid #E2E8F2",
                        maxWidth: 1440,
                        margin: "0 auto",
                    }}
                >
                    {[
                        { num: "25+", label: "YEARS · SINCE 2001" },
                        { num: "110K+", label: "누적 AS 처리" },
                        { num: "311", label: "기업 유지보수 계약" },
                        { num: "KOSA", label: "한국AI·SW협회 정회원", text: true },
                    ].map((s) => (
                        <div key={s.label} style={{
                            background: "#FFFFFF",
                            padding: isMobile ? "24px 16px" : "36px 32px"
                        }}>
                            <div
                                style={{
                                    fontSize: s.text ? (isMobile ? 22 : 32) : (isMobile ? 32 : 48),
                                    lineHeight: s.text ? (isMobile ? "32px" : "48px") : 1,
                                    fontWeight: 500,
                                    color: "#0066FF",
                                    letterSpacing: -1.5,
                                    fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                                }}
                            >
                                {s.num}
                            </div>
                            <div style={{
                                fontSize: isMobile ? 11 : 13,
                                color: "#5A6A8A",
                                marginTop: isMobile ? 6 : 10,
                                letterSpacing: 0.4
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* ────────── 나머지 섹션들 ────────── */}
                <TrustBar />
                <PersonaRouter />
                <BusinessPillars />
                <EnterprisePreview />
                <PartnerPreview />
                <SNCNetwork />
                <Timeline />
                <CustomerStories />
                <NewsAndFamily />
                <FinalCTAFooter />
            </main>

            {/* ────────── Mobile-only Overlays ────────── */}
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <StickyBottomCTA />
        </>
    )
}

const navLinkStyle: React.CSSProperties = {
    color: "#5A6A8A",
    textDecoration: "none",
    fontSize: 15,
}
