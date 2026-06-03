// ════════════════════════════════════════════════
// ComingSoon — Phase 5+ 예정 페이지 공통 컴포넌트
// ════════════════════════════════════════════════

interface ComingSoonProps {
    eyebrow: string
    title: string
    description: string
    features: string[]
    icon: React.ReactNode
}

export default function ComingSoon({ eyebrow, title, description, features, icon }: ComingSoonProps) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "calc(100vh - 80px)",
                padding: 40,
            }}
        >
            <div
                style={{
                    maxWidth: 480,
                    width: "100%",
                    background: "#FFFFFF",
                    borderRadius: 16,
                    padding: "44px 40px",
                    boxShadow: "0 1px 4px rgba(10,23,51,0.06)",
                    border: "1px solid #E2E8F2",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        width: 56,
                        height: 56,
                        background: "#EEF5FF",
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px",
                    }}
                >
                    {icon}
                </div>

                <div
                    style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#0066FF",
                        letterSpacing: 1.5,
                        marginBottom: 10,
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    {eyebrow}
                </div>

                <h1
                    style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#0A1733",
                        margin: "0 0 12px",
                        letterSpacing: -0.4,
                    }}
                >
                    {title}
                </h1>

                <p
                    style={{
                        fontSize: 14,
                        color: "#5A6A8A",
                        lineHeight: 1.7,
                        margin: "0 0 28px",
                    }}
                >
                    {description}
                </p>

                <div
                    style={{
                        background: "#F8FAFF",
                        border: "1px solid #E2E8F2",
                        borderRadius: 10,
                        padding: "16px 20px",
                        textAlign: "left",
                    }}
                >
                    <div
                        style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#8A9AB8",
                            letterSpacing: 0.8,
                            marginBottom: 10,
                        }}
                    >
                        Phase 5 예정 기능
                    </div>
                    {features.map((f, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "5px 0",
                                fontSize: 13,
                                color: "#374B6B",
                            }}
                        >
                            <span style={{ color: "#0066FF", fontSize: 11 }}>•</span>
                            {f}
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        marginTop: 24,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "#FFF8E6",
                        color: "#92600A",
                        borderRadius: 100,
                        padding: "6px 14px",
                        fontSize: 11,
                        fontWeight: 600,
                    }}
                >
                    🚧 개발 예정
                </div>
            </div>
        </div>
    )
}
