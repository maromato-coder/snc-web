"use client"

import * as React from "react"

export default function FinalCTAFooter() {
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
        <>
            {/* ────────── CTA BAND ────────── */}
            <section
                style={{
                    background: "#0A1733",
                    padding: m ? "72px 20px" : "100px 80px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "radial-gradient(circle at 30% 50%, rgba(0, 102, 255, 0.18) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(0, 184, 240, 0.10) 0%, transparent 50%)",
                        pointerEvents: "none",
                    }}
                />

                <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", position: "relative" }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: "rgba(51, 133, 255, 0.12)",
                            border: "1px solid rgba(51, 133, 255, 0.25)",
                            padding: m ? "6px 14px" : "8px 18px",
                            borderRadius: 100,
                            fontSize: m ? 11 : 13,
                            letterSpacing: 1.5,
                            color: "#66AAFF",
                            marginBottom: m ? 20 : 32,
                            fontWeight: 500,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        <span style={{ width: 6, height: 6, background: "#66AAFF", borderRadius: "50%" }} />
                        READY TO CONNECT
                    </div>

                    <h2 style={{ fontSize: m ? 28 : 56, lineHeight: 1.2, fontWeight: 500, letterSpacing: m ? -1 : -2, color: "#FFFFFF", margin: m ? "0 0 16px 0" : "0 0 24px 0" }}>
                        지금, SNC와 <span style={{ color: "#66AAFF" }}>다음을 시작하세요.</span>
                    </h2>
                    <p style={{ fontSize: m ? 14 : 18, lineHeight: 1.6, color: "rgba(255, 255, 255, 0.65)", margin: m ? "0 0 32px 0" : "0 0 48px 0" }}>
                        25년의 손, 이제 당신께 내밉니다.
                    </p>

                    <div style={{ display: "flex", gap: m ? 10 : 14, justifyContent: "center", flexWrap: "wrap" }}>
                        <a
                            href="#"
                            style={{
                                background: "#FFFFFF",
                                color: "#0A1733",
                                padding: m ? "14px 24px" : "18px 36px",
                                borderRadius: 12,
                                fontSize: m ? 14 : 16,
                                fontWeight: 500,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            무료 상담 신청
                            <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                        </a>
                        <a
                            href="tel:1566-8099"
                            style={{
                                background: "transparent",
                                color: "#FFFFFF",
                                padding: m ? "14px 24px" : "18px 36px",
                                borderRadius: 12,
                                fontSize: m ? 14 : 16,
                                fontWeight: 500,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                border: "1px solid rgba(255, 255, 255, 0.25)",
                            }}
                        >
                            <PhoneIcon />
                            1566-8099
                        </a>
                    </div>
                </div>
            </section>

            {/* ────────── FOOTER ────────── */}
            <footer style={{ background: "#FFFFFF", padding: m ? "48px 20px 28px" : "80px 80px 40px" }}>
                <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                    {/* Logo Row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: m ? 32 : 56 }}>
                        <div
                            style={{
                                width: m ? 34 : 40,
                                height: m ? 34 : 40,
                                background: "#0066FF",
                                borderRadius: 9,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#FFFFFF",
                                fontWeight: 500,
                                fontSize: m ? 15 : 18,
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            S
                        </div>
                        <div>
                            <div style={{ fontSize: m ? 17 : 20, fontWeight: 500, color: "#0A1733", letterSpacing: 1, lineHeight: 1 }}>SNC</div>
                            <div style={{ fontSize: m ? 11 : 12, color: "#8A95AD", marginTop: 3, lineHeight: 1 }}>에스엔씨 컴퓨터 서비스 센터</div>
                        </div>
                    </div>

                    {/* Footer Grid - Desktop 4-col / Mobile 2-col */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: m ? "1fr 1fr" : "1fr 1.2fr 1fr 1fr",
                            gap: m ? 24 : 48,
                            paddingBottom: m ? 28 : 56,
                            borderBottom: "1px solid #E8ECF3",
                        }}
                    >
                        <div>
                            <FooterTitle isMobile={m}>회사 정보</FooterTitle>
                            <FooterText isMobile={m} label="법인명" value="SNC (에스엔씨)" />
                            <FooterText isMobile={m} label="대표" value="박진영" />
                            <FooterText isMobile={m} label="사업자" value="212-12-42800" />
                            <FooterText isMobile={m} label="통신판매" value="강동 제25-924호" />
                        </div>

                        <div>
                            <FooterTitle isMobile={m}>오시는 길</FooterTitle>
                            <FooterText isMobile={m} label="본사" value="서울시 강동구 고덕로 85 동성빌딩 1층" multiline />
                            <FooterText isMobile={m} label="지사" value="서울시 강동구 올림픽로 762 일진빌딩 2층" multiline />
                            <FooterText isMobile={m} label="지하철" value="8호선 암사역사공원역 2번 출구" multiline />
                        </div>

                        <div>
                            <FooterTitle isMobile={m}>연락처</FooterTitle>
                            <FooterText isMobile={m} label="전화" value="1566-8099" />
                            <FooterText isMobile={m} label="팩스" value="02-481-7142" />
                            <FooterText isMobile={m} label="메일" value="help@i-snc.co.kr" />
                            <FooterText isMobile={m} label="CS" value="평일 09:00~18:00" multiline />
                        </div>

                        <div>
                            <FooterTitle isMobile={m}>채널</FooterTitle>
                            <FooterLink isMobile={m} href="https://i-snc.co.kr" external>SNC 쇼핑몰</FooterLink>
                            <FooterLink isMobile={m} href="#" external>MyRepair</FooterLink>
                            <FooterLink isMobile={m} href="https://blog.naver.com/i_snc" external>네이버 블로그</FooterLink>
                            <FooterLink isMobile={m} href="https://cafe.naver.com/sncpc" external>네이버 카페</FooterLink>
                            <FooterLink isMobile={m} href="https://www.instagram.com/snccom" external>Instagram</FooterLink>
                            <FooterLink isMobile={m} href="https://www.facebook.com/snccom" external>Facebook</FooterLink>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div
                        style={{
                            marginTop: m ? 20 : 32,
                            display: "flex",
                            alignItems: m ? "flex-start" : "center",
                            justifyContent: "space-between",
                            flexDirection: m ? "column" : "row",
                            gap: m ? 12 : 16,
                        }}
                    >
                        <div style={{ fontSize: m ? 11 : 12, color: "#8A95AD", fontFamily: "'Inter', sans-serif" }}>
                            © 2026 SNC. All rights reserved.
                        </div>
                        <div style={{ display: "flex", gap: m ? 14 : 24, flexWrap: "wrap" }}>
                            <FooterPolicyLink isMobile={m} href="#">개인정보처리방침</FooterPolicyLink>
                            <FooterPolicyLink isMobile={m} href="#">이용약관</FooterPolicyLink>
                            <FooterPolicyLink isMobile={m} href="#">사업자정보확인</FooterPolicyLink>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

function FooterTitle({ children, isMobile }: { children: React.ReactNode; isMobile: boolean }) {
    return (
        <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 500, color: "#0A1733", marginBottom: isMobile ? 14 : 20, letterSpacing: 0.3 }}>
            {children}
        </div>
    )
}

function FooterText({
    label,
    value,
    multiline,
    isMobile,
}: {
    label: string
    value: string
    multiline?: boolean
    isMobile: boolean
}) {
    return (
        <div
            style={{
                fontSize: isMobile ? 11 : 13,
                lineHeight: multiline ? 1.55 : 1.9,
                color: "#5A6A8A",
                marginBottom: multiline ? (isMobile ? 8 : 12) : 0,
            }}
        >
            {label && (
                <span style={{ color: "#8A95AD", marginRight: 6 }}>
                    {label}
                </span>
            )}
            {value}
        </div>
    )
}

function FooterLink({
    href,
    children,
    external,
    isMobile,
}: {
    href: string
    children: React.ReactNode
    external?: boolean
    isMobile: boolean
}) {
    const [hover, setHover] = React.useState(false)
    return (
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel="noopener noreferrer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                display: "block",
                fontSize: isMobile ? 11 : 13,
                color: hover ? "#0066FF" : "#5A6A8A",
                textDecoration: "none",
                marginBottom: isMobile ? 7 : 10,
                transition: "color 0.2s ease",
            }}
        >
            {children}
            {external && (
                <span style={{ marginLeft: 5, fontSize: 9, opacity: 0.5, fontFamily: "'Inter', sans-serif" }}>
                    ↗
                </span>
            )}
        </a>
    )
}

function FooterPolicyLink({
    href,
    children,
    isMobile,
}: {
    href: string
    children: React.ReactNode
    isMobile: boolean
}) {
    const [hover, setHover] = React.useState(false)
    return (
        <a
            href={href}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                fontSize: isMobile ? 11 : 12,
                color: hover ? "#0066FF" : "#5A6A8A",
                textDecoration: "none",
                transition: "color 0.2s ease",
            }}
        >
            {children}
        </a>
    )
}

function PhoneIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
