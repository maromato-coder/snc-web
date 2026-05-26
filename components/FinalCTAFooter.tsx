"use client"

import * as React from "react"

export default function FinalCTAFooter() {
    return (
        <>
            {/* ────────── CTA BAND ────────── */}
            <section
                style={{
                    background: "#0A1733",
                    padding: "100px 80px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Glow Background */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "radial-gradient(circle at 30% 50%, rgba(0, 102, 255, 0.18) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(0, 184, 240, 0.10) 0%, transparent 50%)",
                        pointerEvents: "none",
                    }}
                />

                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        textAlign: "center",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            background: "rgba(51, 133, 255, 0.12)",
                            border: "1px solid rgba(51, 133, 255, 0.25)",
                            padding: "8px 18px",
                            borderRadius: 100,
                            fontSize: 13,
                            letterSpacing: 1.8,
                            color: "#66AAFF",
                            marginBottom: 32,
                            fontWeight: 500,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        <span
                            style={{
                                width: 7,
                                height: 7,
                                background: "#66AAFF",
                                borderRadius: "50%",
                            }}
                        />
                        READY TO CONNECT
                    </div>

                    <h2
                        style={{
                            fontSize: 56,
                            lineHeight: 1.2,
                            fontWeight: 500,
                            letterSpacing: -2,
                            color: "#FFFFFF",
                            margin: "0 0 24px 0",
                        }}
                    >
                        지금, SNC와{" "}
                        <span style={{ color: "#66AAFF" }}>다음을 시작하세요.</span>
                    </h2>
                    <p
                        style={{
                            fontSize: 18,
                            lineHeight: 1.6,
                            color: "rgba(255, 255, 255, 0.65)",
                            margin: "0 0 48px 0",
                        }}
                    >
                        25년의 손, 이제 당신께 내밉니다.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        style={{
                            display: "flex",
                            gap: 14,
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <a
                            href="#"
                            style={{
                                background: "#FFFFFF",
                                color: "#0A1733",
                                padding: "18px 36px",
                                borderRadius: 12,
                                fontSize: 16,
                                fontWeight: 500,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
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
                                padding: "18px 36px",
                                borderRadius: 12,
                                fontSize: 16,
                                fontWeight: 500,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
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
            <footer style={{ background: "#FFFFFF", padding: "80px 80px 40px" }}>
                <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                    {/* Logo Row */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            marginBottom: 56,
                        }}
                    >
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                background: "#0066FF",
                                borderRadius: 9,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#FFFFFF",
                                fontWeight: 500,
                                fontSize: 18,
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            S
                        </div>
                        <div>
                            <div
                                style={{
                                    fontSize: 20,
                                    fontWeight: 500,
                                    color: "#0A1733",
                                    letterSpacing: 1,
                                    lineHeight: 1,
                                }}
                            >
                                SNC
                            </div>
                            <div
                                style={{
                                    fontSize: 12,
                                    color: "#8A95AD",
                                    marginTop: 3,
                                    lineHeight: 1,
                                }}
                            >
                                에스엔씨 컴퓨터 서비스 센터
                            </div>
                        </div>
                    </div>

                    {/* 4-Column Grid */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1.2fr 1fr 1fr",
                            gap: 48,
                            paddingBottom: 56,
                            borderBottom: "1px solid #E8ECF3",
                        }}
                    >
                        {/* Col 1: 회사 정보 */}
                        <div>
                            <FooterTitle>회사 정보</FooterTitle>
                            <FooterText label="법인명" value="SNC (에스엔씨)" />
                            <FooterText label="대표이사" value="박진영" />
                            <FooterText label="사업자등록" value="212-12-42800" />
                            <FooterText
                                label="통신판매업"
                                value="강동 제25-924호"
                            />
                        </div>

                        {/* Col 2: 오시는 길 */}
                        <div>
                            <FooterTitle>오시는 길</FooterTitle>
                            <FooterText
                                label="본사"
                                value="서울시 강동구 고덕로 85 동성빌딩 1층"
                                multiline
                            />
                            <FooterText
                                label="지사"
                                value="서울시 강동구 올림픽로 762 일진빌딩 2층"
                                multiline
                            />
                            <FooterText
                                label="지하철"
                                value="8호선 암사역사공원역 2번 출구 도보 400m"
                                multiline
                            />
                        </div>

                        {/* Col 3: 연락처 */}
                        <div>
                            <FooterTitle>연락처</FooterTitle>
                            <FooterText label="대표전화" value="1566-8099" />
                            <FooterText label="팩스" value="02-481-7142" />
                            <FooterText label="이메일" value="help@i-snc.co.kr" />
                            <FooterText
                                label="CS 운영"
                                value="평일 09:00~18:00"
                                multiline
                            />
                            <FooterText
                                label=""
                                value="(점심 12:00~13:00 · 주말 휴무)"
                                multiline
                                muted
                            />
                        </div>

                        {/* Col 4: 패밀리 / SNS */}
                        <div>
                            <FooterTitle>채널</FooterTitle>
                            <FooterLink href="https://i-snc.co.kr" external>
                                SNC 쇼핑몰
                            </FooterLink>
                            <FooterLink href="#" external>
                                MyRepair
                            </FooterLink>
                            <FooterLink href="https://blog.naver.com/i_snc" external>
                                네이버 블로그
                            </FooterLink>
                            <FooterLink href="https://cafe.naver.com/sncpc" external>
                                네이버 카페
                            </FooterLink>
                            <FooterLink href="https://www.instagram.com/snccom" external>
                                Instagram
                            </FooterLink>
                            <FooterLink href="https://www.facebook.com/snccom" external>
                                Facebook
                            </FooterLink>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div
                        style={{
                            marginTop: 32,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 16,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 12,
                                color: "#8A95AD",
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            © 2026 SNC. All rights reserved.
                        </div>
                        <div style={{ display: "flex", gap: 24 }}>
                            <FooterPolicyLink href="#">개인정보처리방침</FooterPolicyLink>
                            <FooterPolicyLink href="#">이용약관</FooterPolicyLink>
                            <FooterPolicyLink href="#">사업자정보확인</FooterPolicyLink>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

function FooterTitle({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#0A1733",
                marginBottom: 20,
                letterSpacing: 0.3,
            }}
        >
            {children}
        </div>
    )
}

function FooterText({
    label,
    value,
    multiline,
    muted,
}: {
    label: string
    value: string
    multiline?: boolean
    muted?: boolean
}) {
    return (
        <div
            style={{
                fontSize: 13,
                lineHeight: multiline ? 1.6 : 2,
                color: muted ? "#A8B0C4" : "#5A6A8A",
                marginBottom: multiline ? 12 : 0,
            }}
        >
            {label && (
                <span style={{ color: "#8A95AD", marginRight: 8 }}>
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
}: {
    href: string
    children: React.ReactNode
    external?: boolean
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
                fontSize: 13,
                color: hover ? "#0066FF" : "#5A6A8A",
                textDecoration: "none",
                marginBottom: 10,
                transition: "color 0.2s ease",
            }}
        >
            {children}
            {external && (
                <span
                    style={{
                        marginLeft: 6,
                        fontSize: 10,
                        opacity: 0.5,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    ↗
                </span>
            )}
        </a>
    )
}

function FooterPolicyLink({
    href,
    children,
}: {
    href: string
    children: React.ReactNode
}) {
    const [hover, setHover] = React.useState(false)
    return (
        <a
            href={href}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                fontSize: 12,
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
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
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
