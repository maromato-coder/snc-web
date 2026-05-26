"use client"

import * as React from "react"

export default function TrustBar() {
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
                padding: "80px 80px",
                maxWidth: 1440,
                margin: "0 auto",
            }}
        >
            <div
                style={{
                    fontSize: 13,
                    color: "#5A6A8A",
                    letterSpacing: 2,
                    textAlign: "center",
                    fontWeight: 500,
                    marginBottom: 48,
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                TRUSTED BY
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(8, 1fr)",
                    gap: 16,
                    alignItems: "center",
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
                            height: 80,
                            padding: "12px 8px",
                            background: "#F8FAFF",
                            border: "1px solid #E8ECF3",
                            borderRadius: 10,
                            opacity: item.verified ? 1 : 0.55,
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 14,
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
                                fontSize: 11,
                                color: "#5A6A8A",
                                marginTop: 4,
                            }}
                        >
                            {item.subtitle}
                        </div>
                        {!item.verified && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 6,
                                    right: 8,
                                    fontSize: 9,
                                    color: "#8A95AD",
                                    background: "#FFFFFF",
                                    padding: "2px 6px",
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
