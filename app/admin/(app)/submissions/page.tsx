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

    const load = useCallback(async () => {
        setLoading(true)
        try {
            // Supabase 직접 호출 대신 /api 경유 (RLS 인증 처리)
            // admin layout에서 이미 인증 확인됨 — 여기서는 브라우저에서 anon key로 조회
            const res = await fetch("/api/submissions")
            if (res.ok) {
                const json = await res.json()
                setSubmissions(json.submissions || [])
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
