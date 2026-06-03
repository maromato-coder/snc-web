import * as React from "react"

export type SubmissionStatus = "new" | "contacted" | "completed" | "declined"

const STATUS_STYLES: Record<
    SubmissionStatus,
    { label: string; bg: string; color: string; border: string; dot: string }
> = {
    new: {
        label: "신규",
        bg: "#E6EEFF",
        color: "#0046C0",
        border: "#C5D5F5",
        dot: "#0066FF",
    },
    contacted: {
        label: "연락중",
        bg: "#FFF4DA",
        color: "#9A5C00",
        border: "#FBD89A",
        dot: "#F59E0B",
    },
    completed: {
        label: "완료",
        bg: "#DFFAEE",
        color: "#066E47",
        border: "#A6E8C9",
        dot: "#00A878",
    },
    declined: {
        label: "거절",
        bg: "#F4F5F8",
        color: "#5A6A8A",
        border: "#E0E4ED",
        dot: "#8A95AD",
    },
}

export default function StatusBadge({
    status,
    size = "md",
}: {
    status: SubmissionStatus
    size?: "sm" | "md"
}) {
    const s = STATUS_STYLES[status]
    const isSm = size === "sm"
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: s.bg,
                color: s.color,
                border: `1px solid ${s.border}`,
                padding: isSm ? "2px 8px" : "4px 10px",
                borderRadius: 100,
                fontSize: isSm ? 11 : 12,
                fontWeight: 500,
                letterSpacing: -0.1,
                whiteSpace: "nowrap",
                lineHeight: 1.4,
            }}
        >
            <span
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: s.dot,
                    display: "inline-block",
                }}
            />
            {s.label}
        </span>
    )
}

export const STATUS_OPTIONS: SubmissionStatus[] = [
    "new",
    "contacted",
    "completed",
    "declined",
]

export function getStatusLabel(status: SubmissionStatus): string {
    return STATUS_STYLES[status].label
}
