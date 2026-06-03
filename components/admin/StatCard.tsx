import * as React from "react"

interface StatCardProps {
    label: string
    value: number
    color: "blue" | "amber" | "green" | "gray"
    icon: "inbox" | "phone" | "check" | "x"
    sub?: string
}

const COLORS = {
    blue: { bg: "#E6EEFF", icon: "#0066FF", text: "#0A1733" },
    amber: { bg: "#FFF4DA", icon: "#F59E0B", text: "#0A1733" },
    green: { bg: "#DFFAEE", icon: "#00A878", text: "#0A1733" },
    gray: { bg: "#F0F2F5", icon: "#8A95AD", text: "#0A1733" },
}

export default function StatCard({ label, value, color, icon, sub }: StatCardProps) {
    const c = COLORS[color]
    return (
        <div
            style={{
                background: "#FFFFFF",
                border: "1px solid #E8ECF3",
                borderRadius: 14,
                padding: "20px 22px",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
            }}
        >
            <div
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: c.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <CardIcon name={icon} color={c.icon} />
            </div>
            <div style={{ flex: 1 }}>
                <div
                    style={{
                        fontSize: 12.5,
                        color: "#5A6A8A",
                        fontWeight: 500,
                        marginBottom: 4,
                    }}
                >
                    {label}
                </div>
                <div
                    style={{
                        fontSize: 28,
                        fontWeight: 500,
                        color: c.text,
                        letterSpacing: -1,
                        lineHeight: 1.1,
                        fontFamily: "'Inter', 'Pretendard Variable', sans-serif",
                    }}
                >
                    {value.toLocaleString()}
                </div>
                {sub && (
                    <div
                        style={{
                            fontSize: 11.5,
                            color: "#8A95AD",
                            marginTop: 4,
                        }}
                    >
                        {sub}
                    </div>
                )}
            </div>
        </div>
    )
}

function CardIcon({ name, color }: { name: StatCardProps["icon"]; color: string }) {
    const common = {
        width: 20,
        height: 20,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    }
    switch (name) {
        case "inbox":
            return (
                <svg {...common}>
                    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                    <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
                </svg>
            )
        case "phone":
            return (
                <svg {...common}>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                </svg>
            )
        case "check":
            return (
                <svg {...common}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            )
        case "x":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
            )
    }
}
