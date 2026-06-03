"use client"

// ════════════════════════════════════════════════
// StatCard — 대시보드 통계 카드 (큼직한 버전)
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
        <div style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F2",
            borderRadius: 14,
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            boxShadow: "0 1px 4px rgba(10,23,51,0.04)",
            transition: "box-shadow 0.15s",
        }}>
            <div style={{
                width: 44, height: 44, borderRadius: 11,
                background: bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                color, flexShrink: 0,
            }}>
                {icon}
            </div>
            <div>
                <div style={{
                    fontSize: 36, fontWeight: 800, color: "#0A1733",
                    lineHeight: 1, fontFamily: "Inter, sans-serif", letterSpacing: -1,
                }}>
                    {count}
                </div>
                <div style={{ fontSize: 13, color: "#5A6A8A", marginTop: 5, fontWeight: 500 }}>
                    {label}
                </div>
            </div>
        </div>
    )
}
