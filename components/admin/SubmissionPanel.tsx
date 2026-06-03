"use client"

import { useState, useEffect, useCallback } from "react"
import StatusBadge from "./StatusBadge"
import type { Submission } from "./SubmissionsTable"

// ════════════════════════════════════════════════
// SubmissionPanel — 신청 상세 슬라이드 패널
// 출처 표시 + 메모 누적 타임라인
// ════════════════════════════════════════════════

interface Note {
    id: string
    author_email: string
    content: string
    created_at: string
}

const STATUS_OPTIONS = [
    { value: "new",       label: "신규" },
    { value: "contacted", label: "연락중" },
    { value: "completed", label: "완료" },
    { value: "declined",  label: "거절" },
]
const SITE_LABEL: Record<string, string> = { "snc-main": "SNC 메인" }
const CHANNEL_LABEL: Record<string, string> = { form: "폼", email: "메일", survey: "설문" }
const TYPE_LABEL: Record<string, string> = { join: "NODE 가맹 신청 폼", enterprise: "기업 IT 진단 폼" }

interface Props {
    submission: Submission
    onClose: () => void
    onUpdated: (updated: Submission) => void
}

export default function SubmissionPanel({ submission: initialSubmission, onClose, onUpdated }: Props) {
    const [submission, setSubmission] = useState(initialSubmission)
    const [notes, setNotes] = useState<Note[]>([])
    const [notesLoading, setNotesLoading] = useState(true)
    const [newNote, setNewNote] = useState("")
    const [noteSaving, setNoteSaving] = useState(false)
    const [statusSaving, setStatusSaving] = useState(false)
    const [statusMsg, setStatusMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null)
    const [noteMsg, setNoteMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null)

    // 메모 불러오기
    const loadNotes = useCallback(async () => {
        setNotesLoading(true)
        try {
            const res = await fetch(`/api/submissions/${submission.id}/notes`)
            const json = await res.json()
            if (res.ok) setNotes(json.notes || [])
        } catch {
            // 무시
        } finally {
            setNotesLoading(false)
        }
    }, [submission.id])

    useEffect(() => {
        setSubmission(initialSubmission)
        loadNotes()
    }, [initialSubmission, loadNotes])

    // 상태 변경
    const handleStatusChange = async (newStatus: string) => {
        setStatusSaving(true)
        setStatusMsg(null)
        try {
            const res = await fetch(`/api/submissions/${submission.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            })
            const json = await res.json()
            if (res.ok) {
                const updated = { ...submission, status: newStatus as Submission["status"] }
                setSubmission(updated)
                onUpdated(updated)
                setStatusMsg({ type: "ok", text: "상태 저장됨" })
                setTimeout(() => setStatusMsg(null), 2000)
            } else {
                setStatusMsg({ type: "err", text: json.error || "저장 실패" })
            }
        } catch {
            setStatusMsg({ type: "err", text: "네트워크 오류" })
        } finally {
            setStatusSaving(false)
        }
    }

    // 메모 추가
    const handleAddNote = async () => {
        if (!newNote.trim()) return
        setNoteSaving(true)
        setNoteMsg(null)
        try {
            const res = await fetch(`/api/submissions/${submission.id}/notes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newNote.trim() }),
            })
            const json = await res.json()
            if (res.ok) {
                setNotes((prev) => [...prev, json.note])
                setNewNote("")
                setNoteMsg({ type: "ok", text: "메모 저장됨" })
                setTimeout(() => setNoteMsg(null), 2000)
            } else {
                setNoteMsg({ type: "err", text: json.error || "저장 실패" })
            }
        } catch {
            setNoteMsg({ type: "err", text: "네트워크 오류" })
        } finally {
            setNoteSaving(false)
        }
    }

    const siteLabel = SITE_LABEL[submission.site_id || "snc-main"] || submission.site_id || "SNC 메인"
    const channelLabel = CHANNEL_LABEL[submission.channel || "form"] || submission.channel || "폼"
    const typeLabel = TYPE_LABEL[submission.type] || submission.type
    const createdAt = new Date(submission.created_at).toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit",
    })

    const section: React.CSSProperties = {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottom: "1px solid #F0F2F8",
    }
    const label: React.CSSProperties = {
        fontSize: 11,
        fontWeight: 600,
        color: "#8A9AB8",
        letterSpacing: 0.8,
        marginBottom: 6,
    }
    const value: React.CSSProperties = {
        fontSize: 14,
        color: "#0A1733",
        lineHeight: 1.5,
    }

    return (
        <>
            {/* 오버레이 */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(10,23,51,0.25)",
                    zIndex: 40,
                }}
            />

            {/* 패널 */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: 440,
                    background: "#FFFFFF",
                    boxShadow: "-4px 0 24px rgba(10,23,51,0.12)",
                    zIndex: 50,
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "'Pretendard Variable', 'Inter', sans-serif",
                }}
            >
                {/* 헤더 */}
                <div
                    style={{
                        padding: "20px 24px 18px",
                        borderBottom: "1px solid #E2E8F2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 16, fontWeight: 700, color: "#0A1733" }}>
                                {submission.name}
                            </span>
                            <StatusBadge status={submission.status} />
                        </div>
                        <div style={{ fontSize: 12, color: "#8A9AB8", marginTop: 3 }}>{createdAt} 신청</div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: 4,
                            color: "#8A9AB8",
                            display: "flex",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* 내용 (스크롤) */}
                <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>

                    {/* ── 출처 섹션 ── */}
                    <div style={section}>
                        <div style={label}>출처</div>
                        <div
                            style={{
                                background: "#F8FAFF",
                                border: "1px solid #E2E8F2",
                                borderRadius: 10,
                                padding: "12px 14px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5A6A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                                </svg>
                                <span style={{ fontSize: 12, color: "#374B6B" }}>
                                    <span style={{ color: "#8A9AB8", marginRight: 4 }}>사이트</span>
                                    <strong>{siteLabel}</strong>
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5A6A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                                <span style={{ fontSize: 12, color: "#374B6B" }}>
                                    <span style={{ color: "#8A9AB8", marginRight: 4 }}>채널</span>
                                    <strong>{typeLabel}</strong>
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5A6A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                </svg>
                                <span style={{ fontSize: 12, color: "#374B6B" }}>
                                    <span style={{ color: "#8A9AB8", marginRight: 4 }}>채널 유형</span>
                                    <strong>{channelLabel}</strong>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ── 신청 정보 ── */}
                    <div style={section}>
                        <div style={label}>신청 정보</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <Row label="이름" value={submission.name} />
                            <Row label="연락처" value={submission.phone} />
                            {submission.company && <Row label="회사명" value={submission.company} />}
                            {submission.size && <Row label="기업 규모" value={submission.size} />}
                            {submission.region && <Row label="희망 지역" value={submission.region} />}
                            {submission.message && (
                                <div>
                                    <div style={{ fontSize: 11, color: "#8A9AB8", fontWeight: 600, letterSpacing: 0.5, marginBottom: 4 }}>문의 내용</div>
                                    <div
                                        style={{
                                            fontSize: 13,
                                            color: "#374B6B",
                                            lineHeight: 1.6,
                                            background: "#F8FAFF",
                                            borderRadius: 8,
                                            padding: "10px 12px",
                                            border: "1px solid #E2E8F2",
                                        }}
                                    >
                                        {submission.message}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── 처리 상태 변경 ── */}
                    <div style={section}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                            <div style={label}>처리 상태</div>
                            {statusMsg && (
                                <span style={{ fontSize: 11, color: statusMsg.type === "ok" ? "#10B981" : "#EF4444", fontWeight: 600 }}>
                                    {statusMsg.type === "ok" ? "✓ " : "✕ "}{statusMsg.text}
                                </span>
                            )}
                        </div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {STATUS_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleStatusChange(opt.value)}
                                    disabled={statusSaving || submission.status === opt.value}
                                    style={{
                                        padding: "7px 14px",
                                        borderRadius: 8,
                                        fontSize: 12,
                                        fontWeight: submission.status === opt.value ? 700 : 500,
                                        cursor: submission.status === opt.value ? "default" : "pointer",
                                        border: submission.status === opt.value ? "2px solid #0066FF" : "1px solid #E2E8F2",
                                        background: submission.status === opt.value ? "#EEF5FF" : "#FFFFFF",
                                        color: submission.status === opt.value ? "#0046C0" : "#374B6B",
                                        opacity: statusSaving ? 0.6 : 1,
                                        fontFamily: "inherit",
                                        transition: "all 0.15s",
                                    }}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── 메모 타임라인 ── */}
                    <div>
                        <div style={{ ...label, marginBottom: 12 }}>
                            담당자 메모 타임라인
                        </div>

                        {/* 기존 메모들 */}
                        {notesLoading ? (
                            <div style={{ fontSize: 12, color: "#8A9AB8", padding: "8px 0" }}>불러오는 중...</div>
                        ) : notes.length === 0 ? (
                            <div
                                style={{
                                    fontSize: 12,
                                    color: "#8A9AB8",
                                    padding: "16px",
                                    background: "#F8FAFF",
                                    borderRadius: 8,
                                    textAlign: "center",
                                    marginBottom: 12,
                                }}
                            >
                                아직 메모가 없습니다
                            </div>
                        ) : (
                            <div style={{ marginBottom: 16 }}>
                                {notes.map((note, i) => {
                                    const noteDate = new Date(note.created_at).toLocaleString("ko-KR", {
                                        timeZone: "Asia/Seoul",
                                        month: "2-digit", day: "2-digit",
                                        hour: "2-digit", minute: "2-digit",
                                    })
                                    const authorShort = note.author_email.split("@")[0]
                                    return (
                                        <div key={note.id} style={{ display: "flex", gap: 10, marginBottom: i < notes.length - 1 ? 12 : 0 }}>
                                            {/* 타임라인 선 */}
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                                                <div
                                                    style={{
                                                        width: 7,
                                                        height: 7,
                                                        borderRadius: "50%",
                                                        background: "#0066FF",
                                                        marginTop: 4,
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                {i < notes.length - 1 && (
                                                    <div style={{ width: 1, flex: 1, background: "#E2E8F2", marginTop: 3 }} />
                                                )}
                                            </div>
                                            {/* 메모 내용 */}
                                            <div style={{ flex: 1, paddingBottom: 4 }}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 8,
                                                        marginBottom: 5,
                                                    }}
                                                >
                                                    <span style={{ fontSize: 11, fontWeight: 700, color: "#0A1733" }}>
                                                        {authorShort}
                                                    </span>
                                                    <span style={{ fontSize: 10, color: "#8A9AB8" }}>{noteDate}</span>
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: 13,
                                                        color: "#374B6B",
                                                        lineHeight: 1.6,
                                                        background: "#F8FAFF",
                                                        borderRadius: 8,
                                                        padding: "10px 12px",
                                                        border: "1px solid #E2E8F2",
                                                        whiteSpace: "pre-wrap",
                                                    }}
                                                >
                                                    {note.content}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        {/* 새 메모 입력 */}
                        <div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                                <div style={{ fontSize: 11, color: "#8A9AB8", fontWeight: 600, letterSpacing: 0.5 }}>새 메모 추가</div>
                                {noteMsg && (
                                    <span style={{ fontSize: 11, color: noteMsg.type === "ok" ? "#10B981" : "#EF4444", fontWeight: 600 }}>
                                        {noteMsg.type === "ok" ? "✓ " : "✕ "}{noteMsg.text}
                                    </span>
                                )}
                            </div>
                            <textarea
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="담당자 메모를 입력하세요..."
                                rows={3}
                                style={{
                                    width: "100%",
                                    border: "1px solid #E2E8F2",
                                    borderRadius: 8,
                                    padding: "10px 12px",
                                    fontSize: 13,
                                    color: "#0A1733",
                                    fontFamily: "inherit",
                                    resize: "vertical",
                                    outline: "none",
                                    boxSizing: "border-box",
                                    lineHeight: 1.5,
                                }}
                            />
                            <button
                                onClick={handleAddNote}
                                disabled={noteSaving || !newNote.trim()}
                                style={{
                                    marginTop: 8,
                                    width: "100%",
                                    padding: "9px",
                                    borderRadius: 8,
                                    border: "none",
                                    background: newNote.trim() ? "#0066FF" : "#E2E8F2",
                                    color: newNote.trim() ? "#FFFFFF" : "#8A9AB8",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: newNote.trim() ? "pointer" : "default",
                                    fontFamily: "inherit",
                                    opacity: noteSaving ? 0.7 : 1,
                                    transition: "all 0.15s",
                                }}
                            >
                                {noteSaving ? "저장 중..." : "메모 추가"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Row({ label: l, value: v }: { label: string; value: string }) {
    return (
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 11, color: "#8A9AB8", fontWeight: 600, letterSpacing: 0.5, width: 72, flexShrink: 0, paddingTop: 1 }}>
                {l}
            </span>
            <span style={{ fontSize: 13, color: "#0A1733" }}>{v}</span>
        </div>
    )
}
