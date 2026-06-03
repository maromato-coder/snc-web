"use client"

// ════════════════════════════════════════════════
// StatusBadge — 처리 상태 표시 칩
// ════════════════════════════════════════════════

interface StatusBadgeProps {
    status: string
    size?: "sm" | "md"
}

const STATUS_CONFIG = {
    new:       { label: "신규",   bg: "#EEF5FF", color: "#0046C0", dot: "#0066FF" },
    contacted: { label: "연락중", bg: "#FFF8E6", color: "#92600A", dot: "#F59E0B" },
    completed: { label: "완료",   bg: "#EDFAF5", color: "#0A6B45", dot: "#10B981" },
    declined:  { label: "거절",   bg: "#FFF0F0", color: "#991B1B", dot: "#EF4444" },
} as const

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
    const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ?? {
        label: status, bg: "#F3F4F6", color: "#374151", dot: "#9CA3AF",
    }
    const fontSize = size === "sm" ? 11 : 12
    const padding = size === "sm" ? "3px 8px" : "4px 10px"

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: cfg.bg,
                color: cfg.color,
                borderRadius: 100,
                fontSize,
                fontWeight: 600,
                padding,
                letterSpacing: 0.2,
                whiteSpace: "nowrap",
            }}
        >
            <span
                style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: cfg.dot,
                    flexShrink: 0,
                }}
            />
            {cfg.label}
        </span>
    )
}
