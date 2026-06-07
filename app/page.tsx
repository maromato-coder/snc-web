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
import BrandPC from "@/components/BrandPC"
import MainHeader from "@/components/MainHeader"
import SNCCare from "@/components/SNCCare"
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

    const stats = [
        { num: "2001", label: "설립연도" },
        { num: "11만+", label: "누적 AS" },
        { num: "311", label: "기업 유지보수" },
        { num: "106", label: "NODE 파트너" },
    ]

    return (
        <>
            <main style={{ background: "#FFFFFF", minHeight: "100vh", color: "#0A1733" }}>

                {/* ────────── NAVIGATION ────────── */}
                <MainHeader isMobile={isMobile} onMenuOpen={() => setIsMenuOpen(true)} />

                {/* ────────── HERO ────────── */}
                <section
                    style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1.15fr 1fr",
                        gap: isMobile ? 0 : 80,
                        padding: isMobile ? "60px 20px 40px" : "120px 80px 100px",
                        maxWidth: 1440,
                        margin: "0 auto",
                    }}
                >
                    {/* 왼쪽 텍스트 */}
                    <div>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                background: "#EEF4FF",
                                borderRadius: 20,
                                padding: "6px 14px",
                                marginBottom: isMobile ? 20 : 28,
                            }}
                        >
                            <span
                                style={{
                                    width: 7,
                                    height: 7,
                                    background: "#0066FF",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                }}
                            />
                            <span
                                style={{
                                    fontSize: 13,
                                    color: "#0066FF",
                                    fontWeight: 600,
                                    letterSpacing: 0.3,
                                }}
                            >
                                2001년부터 신뢰받는 IT 서비스
                            </span>
                        </div>

                        <h1
                            style={{
                                fontSize: isMobile ? 34 : 56,
                                fontWeight: 800,
                                lineHeight: 1.15,
                                letterSpacing: -1.5,
                                color: "#0A1733",
                                marginBottom: isMobile ? 16 : 24,
                            }}
                        >
                            구매 이후까지<br />
                            <span style={{ color: "#0066FF" }}>책임집니다</span>
                        </h1>

                        <p
                            style={{
                                fontSize: isMobile ? 15 : 18,
                                color: "#5A6A8A",
                                lineHeight: 1.75,
                                marginBottom: isMobile ? 28 : 40,
                                maxWidth: 480,
                            }}
                        >
                            전국망 서비스와 2년 무상 AS를 기반으로,
                            고객의 업무와 일상을 책임지는 대한민국 대표 PC 브랜드.
                        </p>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <a
                                href="/enterprise"
                                style={{
                                    background: "#0066FF",
                                    color: "#FFFFFF",
                                    padding: isMobile ? "13px 24px" : "16px 32px",
                                    borderRadius: 10,
                                    fontSize: isMobile ? 14 : 16,
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    display: "inline-block",
                                }}
                            >
                                기업 서비스 알아보기
                            </a>
                            <a
                                href="/join"
                                style={{
                                    background: "#FFFFFF",
                                    color: "#0066FF",
                                    padding: isMobile ? "13px 24px" : "16px 32px",
                                    borderRadius: 10,
                                    fontSize: isMobile ? 14 : 16,
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    border: "1.5px solid #0066FF",
                                    display: "inline-block",
                                }}
                            >
                                파트너 가맹 문의
                            </a>
                        </div>
                    </div>

                    {/* 오른쪽 3D 큐브 */}
                    {!isMobile && (
                        <div
                            style={{
                                height: 520,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <SNCRotatingCube size={340} rotationDuration={20} />
                        </div>
                    )}
                </section>

                {/* ────────── STATS BAR ────────── */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: isMobile ? 24 : 64,
                        padding: isMobile ? "28px 20px" : "40px 80px",
                        borderTop: "1px solid #F0F2F5",
                        borderBottom: "1px solid #F0F2F5",
                        background: "#FAFBFF",
                        flexWrap: "wrap",
                    }}
                >
                    {stats.map((s) => (
                        <div key={s.label} style={{ textAlign: "center" }}>
                            <div
                                style={{
                                    fontSize: isMobile ? 28 : 40,
                                    fontWeight: 500,
                                    color: "#0066FF",
                                    letterSpacing: -1.5,
                                    lineHeight: 1,
                                    fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                                }}
                            >
                                {s.num}
                            </div>
                            <div
                                style={{
                                    fontSize: isMobile ? 11 : 13,
                                    color: "#5A6A8A",
                                    marginTop: isMobile ? 6 : 10,
                                    letterSpacing: 0.4,
                                }}
                            >
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ────────── 나머지 섹션들 ────────── */}
                <BrandPC isMobile={isMobile} />
                <SNCCare isMobile={isMobile} />
                <div id="solutions">
                    <TrustBar />
                    <PersonaRouter />
                    <BusinessPillars />
                    <EnterprisePreview />
                    <PartnerPreview />
                </div>
                <div id="network">
                    <SNCNetwork />
                </div>
                <div id="customers">
                    <CustomerStories />
                </div>
                <div id="about">
                    <Timeline />
                    <NewsAndFamily />
                </div>
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
