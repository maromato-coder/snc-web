import * as React from "react"

interface ComingSoonProps {
    title: string
    description: string
    features: string[]
    eyebrow: string
    icon: React.ReactNode
}

export default function ComingSoon({ title, description, features, eyebrow, icon }: ComingSoonProps) {
    return (
        <div style={{ padding: "32px 40px" }}>
            <div style={{ marginBottom: 24 }}>
                <div
                    style={{
                        fontSize: 11.5,
                        color: "#0046C0",
                        letterSpacing: 1.5,
                        fontWeight: 500,
                        marginBottom: 6,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    {eyebrow}
                </div>
                <h1
                    style={{
                        fontSize: 28,
                        fontWeight: 500,
                        color: "#0A1733",
                        margin: 0,
                        letterSpacing: -0.8,
                    }}
                >
                    {title}
                </h1>
            </div>

            <div
                style={{
                    background: "#FFFFFF",
                    border: "1px solid #E8ECF3",
                    borderRadius: 14,
                    padding: "56px 40px",
                    textAlign: "center",
                    maxWidth: 600,
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        width: 64,
                        height: 64,
                        background: "#F0F4FB",
                        borderRadius: 16,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 24,
                    }}
                >
                    {icon}
                </div>

                <div
                    style={{
                        fontSize: 11.5,
                        color: "#F59E0B",
                        background: "#FFF4DA",
                        padding: "4px 12px",
                        borderRadius: 100,
                        display: "inline-block",
                        marginBottom: 16,
                        fontWeight: 500,
                        letterSpacing: 0.5,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    COMING SOON
                </div>

                <h2
                    style={{
                        fontSize: 22,
                        fontWeight: 500,
                        color: "#0A1733",
                        margin: "0 0 12px",
                        letterSpacing: -0.5,
                    }}
                >
                    {title} 기능 준비 중
                </h2>
                <p
                    style={{
                        fontSize: 14,
                        color: "#5A6A8A",
                        margin: "0 0 32px",
                        lineHeight: 1.6,
                    }}
                >
                    {description}
                </p>

                <div
                    style={{
                        background: "#F8FAFF",
                        border: "1px solid #EEF2F8",
                        borderRadius: 10,
                        padding: "20px 24px",
                        textAlign: "left",
                    }}
                >
                    <div
                        style={{
                            fontSize: 11,
                            color: "#8A95AD",
                            letterSpacing: 1,
                            fontWeight: 500,
                            marginBottom: 12,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        예정 기능
                    </div>
                    <ul
                        style={{
                            margin: 0,
                            padding: 0,
                            listStyle: "none",
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                        }}
                    >
                        {features.map((f) => (
                            <li
                                key={f}
                                style={{
                                    fontSize: 13,
                                    color: "#0A1733",
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "flex-start",
                                }}
                            >
                                <span
                                    style={{
                                        flexShrink: 0,
                                        width: 16,
                                        height: 16,
                                        borderRadius: 4,
                                        background: "#E6EEFF",
                                        color: "#0066FF",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 10,
                                        marginTop: 2,
                                    }}
                                >
                                    ✓
                                </span>
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
