"use client"

import * as React from "react"

interface NewsItem {
    date: string
    category: "공지" | "블로그" | "언론"
    title: string
    url: string
}

interface FamilySite {
    name: string
    desc: string
    url: string
    icon: "blog" | "cafe" | "youtube" | "shop" | "instagram" | "facebook"
    color: string
}

const newsItems: NewsItem[] = [
    { date: "2026.05.20", category: "공지", title: "2026 SNC NODE 가맹 설명회 일정 안내", url: "#" },
    { date: "2026.05.12", category: "블로그", title: "FIXER CHIEF 박○○님 인터뷰 — 25년 손기술이 만든 자부심", url: "https://blog.naver.com/i_snc" },
    { date: "2026.04.28", category: "언론", title: "SNC, KOSA AI 포럼 참가 — 컴퓨터 AS 플랫폼 비전 발표", url: "#" },
]

const familySites: FamilySite[] = [
    { name: "네이버 블로그", desc: "현장 일상 · 노하우", url: "https://blog.naver.com/i_snc", icon: "blog", color: "#03C75A" },
    { name: "네이버 카페", desc: "가맹점 커뮤니티", url: "https://cafe.naver.com/sncpc", icon: "cafe", color: "#03C75A" },
    { name: "YouTube", desc: "IT · 교육 콘텐츠", url: "#", icon: "youtube", color: "#FF0000" },
    { name: "SNC 쇼핑몰", desc: "i-snc.co.kr", url: "https://i-snc.co.kr", icon: "shop", color: "#0066FF" },
    { name: "Instagram", desc: "@snccom", url: "https://www.instagram.com/snccom", icon: "instagram", color: "#E4405F" },
    { name: "Facebook", desc: "facebook.com/snccom", url: "https://www.facebook.com/snccom", icon: "facebook", color: "#1877F2" },
]

const categoryColors: Record<NewsItem["category"], { bg: string; text: string }> = {
    공지: { bg: "#E6EEFF", text: "#0046C0" },
    블로그: { bg: "#E0F4FB", text: "#0094BC" },
    언론: { bg: "#FEF3C7", text: "#92400E" },
}

export default function NewsAndFamily() {
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
            <div style={{ maxWidth: m ? 480 : 1440, margin: "0 auto" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: m ? "1fr" : "1fr 1.1fr",
                        gap: m ? 48 : 80,
                    }}
                >
                    {/* LEFT: News */}
                    <div>
                        <div style={{ marginBottom: m ? 24 : 36 }}>
                            <div style={{ fontSize: m ? 11 : 13, color: "#0046C0", letterSpacing: 2, fontWeight: 500, marginBottom: 10, fontFamily: "'Inter', sans-serif" }}>
                                NEWS & UPDATES
                            </div>
                            <h2 style={{ fontSize: m ? 22 : 36, lineHeight: 1.25, fontWeight: 500, letterSpacing: m ? -0.6 : -1, color: "#0A1733", margin: "0 0 8px 0" }}>
                                최신 소식
                            </h2>
                            <p style={{ fontSize: m ? 12 : 14, color: "#5A6A8A", margin: 0 }}>
                                SNC의 새로운 소식과 인사이트를 확인하세요.
                            </p>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {newsItems.map((n, i) => (
                                <NewsRow key={i} news={n} isLast={i === newsItems.length - 1} isMobile={m} />
                            ))}
                        </div>

                        <a
                            href="#"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: m ? 13 : 14,
                                color: "#0066FF",
                                textDecoration: "none",
                                fontWeight: 500,
                                marginTop: 20,
                            }}
                        >
                            모든 소식 보기
                            <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                        </a>
                    </div>

                    {/* RIGHT: Family Sites */}
                    <div>
                        <div style={{ marginBottom: m ? 20 : 36 }}>
                            <div style={{ fontSize: m ? 11 : 13, color: "#0046C0", letterSpacing: 2, fontWeight: 500, marginBottom: 10, fontFamily: "'Inter', sans-serif" }}>
                                FAMILY SITES
                            </div>
                            <h2 style={{ fontSize: m ? 22 : 36, lineHeight: 1.25, fontWeight: 500, letterSpacing: m ? -0.6 : -1, color: "#0A1733", margin: "0 0 8px 0" }}>
                                SNC의 모든 채널
                            </h2>
                            <p style={{ fontSize: m ? 12 : 14, color: "#5A6A8A", margin: 0 }}>
                                각 채널에서 더 다양한 콘텐츠를 만나보세요.
                            </p>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: m ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                                gap: m ? 10 : 14,
                            }}
                        >
                            {familySites.map((s) => (
                                <FamilyCard key={s.name} site={s} isMobile={m} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function NewsRow({ news, isLast, isMobile }: { news: NewsItem; isLast: boolean; isMobile: boolean }) {
    const [hover, setHover] = React.useState(false)
    const c = categoryColors[news.category]

    return (
        <a
            href={news.url}
            target={news.url.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                display: "block",
                padding: isMobile ? "14px 0" : "20px 0",
                borderBottom: isLast ? "none" : "1px solid #E8ECF3",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.2s ease",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span
                    style={{
                        fontSize: 10,
                        fontWeight: 500,
                        color: c.text,
                        background: c.bg,
                        padding: "2px 8px",
                        borderRadius: 100,
                        letterSpacing: 0.3,
                        whiteSpace: "nowrap",
                    }}
                >
                    {news.category}
                </span>
                <span style={{ fontSize: 11, color: "#8A95AD", fontFamily: "'Inter', sans-serif" }}>
                    {news.date}
                </span>
            </div>
            <div
                style={{
                    fontSize: isMobile ? 14 : 16,
                    fontWeight: 500,
                    color: hover ? "#0066FF" : "#0A1733",
                    lineHeight: 1.5,
                    letterSpacing: -0.3,
                    transition: "color 0.2s ease",
                }}
            >
                {news.title}
            </div>
        </a>
    )
}

function FamilyCard({ site, isMobile }: { site: FamilySite; isMobile: boolean }) {
    const [hover, setHover] = React.useState(false)
    const isExternal = site.url.startsWith("http")

    return (
        <a
            href={site.url}
            target={isExternal ? "_blank" : undefined}
            rel="noopener noreferrer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: isMobile ? 8 : 12,
                padding: isMobile ? "14px 12px" : "18px 16px",
                background: "#FFFFFF",
                border: `1px solid ${hover ? site.color : "#E8ECF3"}`,
                borderRadius: 12,
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: hover ? "translateY(-3px)" : "translateY(0)",
                boxShadow: hover ? `0 8px 20px ${site.color}22` : "0 1px 2px rgba(10, 23, 51, 0.03)",
                minHeight: isMobile ? 86 : 100,
            }}
        >
            <div
                style={{
                    width: isMobile ? 30 : 36,
                    height: isMobile ? 30 : 36,
                    background: hover ? site.color : `${site.color}15`,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.25s ease",
                }}
            >
                <FamilyIcon name={site.icon} color={hover ? "#FFFFFF" : site.color} size={isMobile ? 15 : 18} />
            </div>
            <div>
                <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 500, color: "#0A1733", lineHeight: 1.3, letterSpacing: -0.2 }}>
                    {site.name}
                </div>
                <div style={{ fontSize: isMobile ? 10 : 11, color: "#5A6A8A", marginTop: 2 }}>
                    {site.desc}
                </div>
            </div>
        </a>
    )
}

function FamilyIcon({ name, color, size }: { name: FamilySite["icon"]; color: string; size: number }) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    }
    switch (name) {
        case "blog":
            return (
                <svg {...common}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="14" y2="17" />
                </svg>
            )
        case "cafe":
            return (
                <svg {...common}>
                    <path d="M17 8h1a4 4 0 010 8h-1" />
                    <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
                    <line x1="6" y1="2" x2="6" y2="4" />
                    <line x1="10" y1="2" x2="10" y2="4" />
                    <line x1="14" y1="2" x2="14" y2="4" />
                </svg>
            )
        case "youtube":
            return (
                <svg {...common}>
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill={color} />
                </svg>
            )
        case "shop":
            return (
                <svg {...common}>
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                </svg>
            )
        case "instagram":
            return (
                <svg {...common}>
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                </svg>
            )
        case "facebook":
            return (
                <svg {...common}>
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
            )
    }
}
