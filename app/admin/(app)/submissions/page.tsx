"use client"

import { useState, useEffect, useCallback } from "react"
import SubmissionsTable, { type Submission } from "@/components/admin/SubmissionsTable"
import SubmissionPanel from "@/components/admin/SubmissionPanel"

// ════════════════════════════════════════════════
// 신청 관리 페이지
// ════════════════════════════════════════════════

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState<Submission | null>(null)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
    const [bulkRunning, setBulkRunning] = useState(false)

    const load = useCallback(async () => {
        setLoading(true)
        try {
            // Supabase 직접 호출 대신 /api 경유 (RLS 인증 처리)
            // admin layout에서 이미 인증 확인됨 — 여기서는 브라우저에서 anon key로 조회
            const res = await fetch("/api/submissions")
            if (res.ok) {
                const json = await res.json()
                setSubmissions(json.submissions || [])
                setSelectedIds(new Set())
            }
        } catch (err) {
            console.error("Failed to load submissions:", err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        load()
    }, [load])

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const allSelected =
        submissions.length > 0 && submissions.every((s) => selectedIds.has(s.id))

    const toggleSelectAll = () => {
        if (allSelected) setSelectedIds(new Set())
        else setSelectedIds(new Set(submissions.map((s) => s.id)))
    }

    const runBulkStatus = async (status: Submission["status"]) => {
        const ids = [...selectedIds]
        if (!ids.length) return
        const label = { new: "신규", contacted: "연락중", completed: "완료", declined: "거절" }[status]
        if (!confirm(`선택 ${ids.length}건을 「${label}」로 변경할까요?`)) return
        setBulkRunning(true)
        for (const id of ids) {
            try {
                await fetch(`/api/submissions/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status }),
                })
            } catch {
                /* continue */
            }
        }
        setBulkRunning(false)
        setSelectedIds(new Set())
        load()
    }

    const handleUpdated = (updated: Submission) => {
        setSubmissions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
        setSelected(updated)
    }

    return (
        <div style={{ padding: "32px 36px" }}>
            {/* 페이지 헤더 */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#0066FF", letterSpacing: 1.5, marginBottom: 6, fontFamily: "Inter, sans-serif" }}>
                    SUBMISSIONS
                </div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0A1733", margin: 0, letterSpacing: -0.4 }}>
                    신청 관리
                </h1>
                <p style={{ fontSize: 13, color: "#5A6A8A", margin: "6px 0 0" }}>
                    모든 사이트의 신청·문의를 한 곳에서 관리합니다
                </p>
            </div>

            {selectedIds.size > 0 ? (
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 16,
                        padding: "12px 16px",
                        background: "#F0F6FF",
                        border: "1px solid #C7DEFF",
                        borderRadius: 10,
                        alignItems: "center",
                    }}
                >
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#0046C0", marginRight: 8 }}>
                        {selectedIds.size}건 선택
                    </span>
                    {(["contacted", "completed", "declined"] as const).map((st) => (
                        <button
                            key={st}
                            type="button"
                            disabled={bulkRunning}
                            onClick={() => runBulkStatus(st)}
                            style={{
                                background: st === "completed" ? "#10B981" : st === "declined" ? "#EF4444" : "#0066FF",
                                color: "#fff",
                                border: "none",
                                borderRadius: 8,
                                padding: "8px 14px",
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            일괄 {st === "contacted" ? "연락중" : st === "completed" ? "완료" : "거절"}
                        </button>
                    ))}
                    <button
                        type="button"
                        disabled={bulkRunning}
                        onClick={() => setSelectedIds(new Set())}
                        style={{
                            background: "#8A9AB8",
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            padding: "8px 14px",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        선택 해제
                    </button>
                </div>
            ) : null}

            {loading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 80,
                        color: "#8A9AB8",
                        fontSize: 13,
                    }}
                >
                    <span>불러오는 중...</span>
                </div>
            ) : (
                <SubmissionsTable
                    submissions={submissions}
                    onSelect={setSelected}
                    selectedId={selected?.id}
                    selectedIds={selectedIds}
                    onToggleSelect={toggleSelect}
                    onToggleSelectAll={toggleSelectAll}
                    allSelected={allSelected}
                />
            )}

            {selected && (
                <SubmissionPanel
                    submission={selected}
                    onClose={() => setSelected(null)}
                    onUpdated={handleUpdated}
                />
            )}
        </div>
    )
}
