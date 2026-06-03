"use client"

import * as React from "react"
import StatusBadge, {
    SubmissionStatus,
    STATUS_OPTIONS,
    getStatusLabel,
} from "./StatusBadge"

export interface Submission {
    id: string
    type: "join" | "enterprise"
    name: string
    phone: string
    message: string | null
    region: string | null
    company: string | null
    size: string | null
    status: SubmissionStatus
    admin_notes: string | null
    created_at: string
    updated_at: string
}

interface SubmissionPanelProps {
    submission: Submission | null
    onClose: () => void
    onUpdate: (updated: Submission) => void
}

export default function SubmissionPanel({
    submission,
    onClose,
    onUpdate,
}: SubmissionPanelProps) {
    const [status, setStatus] = React.useState<SubmissionStatus>("new")
    const [notes, setNotes] = React.useState("")
    const [saving, setSaving] = React.useState(false)
    const [savedAt, setSavedAt] = React.useState<Date | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (submission) {
            setStatus(submission.status)
            setNotes(submission.admin_notes || "")
            setSavedAt(null)
            setError(null)
        }
    }, [submission?.id])

    if (!submission) return null

    const isJoin = submission.type === "join"
    const typeLabel = isJoin ? "🚀 가맹 신청" : "🏢 기업 진단"

    const handleSave = async () => {
        setSaving(true)
        setError(null)
        try {
            const res = await fetch(`/api/submissions/${submission.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status,
                    admin_notes: notes.trim() || null,
                }),
            })
            if (!res.ok) throw new Error("저장 실패")
            const data = await res.json()
            onUpdate(data.submission)
            setSavedAt(new Date())
        } catch (err) {
            console.error(err)
            setError("저장에 실패했습니다. 다시 시도해주세요.")
        } finally {
            setSaving(false)
        }
    }

    const dirty =
        status !== submission.status ||
        (notes.trim() || null) !== (submission.admin_notes || null)

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(10, 23, 51, 0.32)",
                    zIndex: 100,
                    backdropFilter: "blur(2px)",
                    animation: "fadeIn 0.2s ease",
                }}
            />

            {/* Panel */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: "min(540px, 100vw)",
                    background: "#FFFFFF",
                    boxShadow: "-12px 0 48px rgba(10, 23, 51, 0.18)",
                    zIndex: 101,
                    display: "flex",
                    flexDirection: "column",
                    animation: "slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                <style>{`
                  @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
                  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                `}</style>

                {/* Header */}
                <div
                    style={{
                        padding: "20px 24px",
                        borderBottom: "1px solid #F0F2F5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <div style={{ fontSize: 11.5, color: "#8A95AD", letterSpacing: 1.2, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
                            SUBMISSION
                        </div>
                        <h2 style={{ fontSize: 18, fontWeight: 500, color: "#0A1733", margin: "4px 0 0", letterSpacing: -0.3 }}>
                            {typeLabel}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "1px solid #E8ECF3",
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#5A6A8A",
                        }}
                        title="닫기"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Body — scrollable */}
                <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 100px" }}>
                    {/* 신청 정보 */}
                    <Section title="신청 정보">
                        <Field label="이름" value={submission.name} />
                        <Field
                            label="연락처"
                            value={
                                <a
                                    href={`tel:${submission.phone}`}
                                    style={{ color: "#0066FF", textDecoration: "none", fontWeight: 500 }}
                                >
                                    {submission.phone}
                                </a>
                            }
                        />
                        {isJoin && submission.region && <Field label="지역" value={submission.region} />}
                        {!isJoin && submission.company && <Field label="회사명" value={submission.company} />}
                        {!isJoin && submission.size && <Field label="기업 규모" value={submission.size} />}
                        {submission.message && (
                            <Field
                                label="문의 내용"
                                value={
                                    <div
                                        style={{
                                            whiteSpace: "pre-wrap",
                                            background: "#F8FAFF",
                                            padding: "12px 14px",
                                            borderRadius: 8,
                                            border: "1px solid #E8ECF3",
                                            fontSize: 13.5,
                                            lineHeight: 1.6,
                                            color: "#0A1733",
                                        }}
                                    >
                                        {submission.message}
                                    </div>
                                }
                                multiline
                            />
                        )}
                    </Section>

                    {/* 상태 변경 */}
                    <Section title="처리 상태">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                            {STATUS_OPTIONS.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStatus(s)}
                                    style={{
                                        background: status === s ? "#F0F4FB" : "#FFFFFF",
                                        border: `1px solid ${status === s ? "#0066FF" : "#E8ECF3"}`,
                                        borderRadius: 9,
                                        padding: "10px 12px",
                                        cursor: "pointer",
                                        fontFamily: "inherit",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 8,
                                        transition: "all 0.15s ease",
                                    }}
                                >
                                    <StatusBadge status={s} size="sm" />
                                </button>
                            ))}
                        </div>
                    </Section>

                    {/* 메모 */}
                    <Section title="담당자 메모">
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="이 신청에 대한 메모를 자유롭게 작성하세요 (담당자 간 공유)"
                            rows={5}
                            style={{
                                width: "100%",
                                padding: "12px 14px",
                                border: "1px solid #E8ECF3",
                                borderRadius: 8,
                                fontSize: 13.5,
                                lineHeight: 1.6,
                                color: "#0A1733",
                                fontFamily: "inherit",
                                resize: "vertical",
                                minHeight: 100,
                                boxSizing: "border-box",
                                outline: "none",
                                background: "#FFFFFF",
                            }}
                        />
                    </Section>

                    {/* 메타데이터 */}
                    <Section title="메타데이터">
                        <Field label="신청 일시" value={formatDateTime(submission.created_at)} />
                        <Field label="최근 수정" value={formatDateTime(submission.updated_at)} />
                        <Field
                            label="ID"
                            value={
                                <code
                                    style={{
                                        fontFamily: "'Inter', monospace",
                                        fontSize: 11,
                                        color: "#8A95AD",
                                        background: "#F8FAFF",
                                        padding: "3px 7px",
                                        borderRadius: 5,
                                    }}
                                >
                                    {submission.id.slice(0, 8)}…
                                </code>
                            }
                        />
                    </Section>
                </div>

                {/* Footer */}
                <div
                    style={{
                        padding: "16px 24px",
                        borderTop: "1px solid #F0F2F5",
                        background: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    {error ? (
                        <div style={{ flex: 1, fontSize: 13, color: "#DC2626" }}>{error}</div>
                    ) : savedAt ? (
                        <div style={{ flex: 1, fontSize: 12.5, color: "#00A878" }}>
                            ✓ 저장됨 ({formatTime(savedAt)})
                        </div>
                    ) : (
                        <div style={{ flex: 1, fontSize: 12.5, color: "#8A95AD" }}>
                            {dirty ? "저장하지 않은 변경사항이 있습니다" : ""}
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        style={{
                            background: "#FFFFFF",
                            border: "1px solid #E8ECF3",
                            color: "#5A6A8A",
                            padding: "10px 18px",
                            borderRadius: 9,
                            fontSize: 13.5,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            fontWeight: 500,
                        }}
                    >
                        닫기
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || !dirty}
                        style={{
                            background: dirty ? "#0066FF" : "#C5D5F5",
                            color: "#FFFFFF",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: 9,
                            fontSize: 13.5,
                            cursor: dirty && !saving ? "pointer" : "not-allowed",
                            fontFamily: "inherit",
                            fontWeight: 500,
                            boxShadow: dirty ? "0 6px 18px rgba(0, 102, 255, 0.25)" : "none",
                            opacity: saving ? 0.7 : 1,
                        }}
                    >
                        {saving ? "저장 중..." : "저장"}
                    </button>
                </div>
            </div>
        </>
    )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: 28 }}>
            <h3
                style={{
                    fontSize: 12,
                    color: "#8A95AD",
                    letterSpacing: 1.2,
                    fontWeight: 500,
                    margin: "0 0 12px",
                    fontFamily: "'Inter', sans-serif",
                    textTransform: "uppercase",
                }}
            >
                {title}
            </h3>
            {children}
        </div>
    )
}

function Field({ label, value, multiline }: { label: string; value: React.ReactNode; multiline?: boolean }) {
    return (
        <div
            style={{
                display: multiline ? "block" : "grid",
                gridTemplateColumns: multiline ? undefined : "100px 1fr",
                gap: multiline ? 6 : 12,
                padding: "8px 0",
                borderBottom: "1px solid #F4F6FA",
                alignItems: "baseline",
            }}
        >
            <div style={{ fontSize: 12.5, color: "#5A6A8A" }}>{label}</div>
            <div style={{ fontSize: 13.5, color: "#0A1733", fontWeight: 500 }}>{value}</div>
        </div>
    )
}

function formatDateTime(iso: string): string {
    const d = new Date(iso)
    return d.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Seoul",
    })
}

function formatTime(d: Date): string {
    return d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}
