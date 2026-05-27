"use client"

import * as React from "react"

export default function TrustBar() {
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

    const items = [
        { name: "KOSA", subtitle: "한국AI·SW협회", verified: true },
        { name: "주연테크", subtitle: "공식대리점", verified: true },
        { name: "INNOBIZ", subtitle: "이노비즈 인증", verified: false },
        { name: "VENTURE", subtitle: "벤처기업 인증", verified: false },
        { name: "Client 01", subtitle: "고객사", verified: true },
        { name: "Client 02", subtitle: "고객사", verified: true },
        { name: "Client 03", subtitle: "고객사", verified: true },
        { name: "Client 04", subtitle: "고객사", verified: true },
    ]

    return (
        <section
            style={{
                background: "#FFFFFF",
                padding: m ? "56px 20px" : "80px 80px",
                maxWidth: 1440,
                margin: "0 auto",
            }}
        >
            <div
                style={{
                    fontSize: m ? 12 : 13,
                    color: "#5A6A8A",
                    letterSpacing: 2,
                    textAlign: "center",
                    fontWeight: 500,
                    marginBottom: m ? 28 : 48,
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                TRUSTED BY
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: m ? "repeat(2, 1fr)" : "repeat(8, 1fr)",
                    gap: m ? 10 : 16,
                    alignItems: "center",
                    maxWidth: m ? 360 : "100%",
                    margin: "0 auto",
                }}
            >
                {items.map((item) => (
                    <div
                        key={item.name}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: m ? 64 : 80,
                            padding: m ? "10px 6px" : "12px 8px",
                            background: "#F8FAFF",
                            border: "1px solid #E8ECF3",
                            borderRadius: 10,
                            opacity: item.verified ? 1 : 0.55,
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                fontSize: m ? 12 : 14,
                                fontWeight: 500,
                                color: "#0A1733",
                                fontFamily: "'Inter', sans-serif",
                                letterSpacing: 0.5,
                            }}
                        >
                            {item.name}
                        </div>
                        <div
                            style={{
                                fontSize: m ? 9.5 : 11,
                                color: "#5A6A8A",
                                marginTop: 3,
                            }}
                        >
                            {item.subtitle}
                        </div>
                        {!item.verified && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 4,
                                    right: 6,
                                    fontSize: m ? 8 : 9,
                                    color: "#8A95AD",
                                    background: "#FFFFFF",
                                    padding: "2px 5px",
                                    borderRadius: 4,
                                    border: "1px solid #E8ECF3",
                                    letterSpacing: 0.3,
                                }}
                            >
                                예정
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
