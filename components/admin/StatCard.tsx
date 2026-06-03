"use client"

// ════════════════════════════════════════════════
// StatCard — 대시보드 통계 카드
// ════════════════════════════════════════════════

interface StatCardProps {
    label: string
    count: number
    color: string
    bg: string
    icon: React.ReactNode
}

export default function StatCard({ label, count, color, bg, icon }: StatCardProps) {
    return (
        <div
            style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F2",
                borderRadius: 12,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 1px 4px rgba(10,23,51,0.04)",
            }}
        >
            <div
                style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color,
                    flexShrink: 0,
                }}
            >
                {icon}
            </div>
            <div>
                <div
                    style={{
                        fontSize: 26,
                        fontWeight: 700,
                        color: "#0A1733",
                        lineHeight: 1,
                        fontFamily: "Inter, sans-serif",
                        letterSpacing: -0.5,
                    }}
                >
                    {count}
                </div>
                <div
                    style={{
                        fontSize: 12,
                        color: "#5A6A8A",
                        marginTop: 4,
                        fontWeight: 500,
                    }}
                >
                    {label}
                </div>
            </div>
        </div>
    )
}
