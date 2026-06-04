"use client"

import { useState, useEffect, useCallback } from "react"

// ════════════════════════════════════════════════
// /admin/email-requests — 이메일 계정 신청 관리
// ════════════════════════════════════════════════

interface EmailRequest {
    id: string
    requester_name: string
    requester_email: string
    requested_email: string
    department: string | null
    purpose: string | null
    status: "pending" | "approved" | "issued" | "rejected"
    admin_memo: string | null
    issued_at: string | null
    created_at: string
}

const STATUS_CONFIG = {
    pending:  { label: "검토 중",   bg: "#FFF8E6", color: "#92600A", dot: "#F59E0B" },
    approved: { label: "승인됨",   bg: "#EEF5FF", color: "#0046C0", dot: "#0066FF" },
    issued:   { label: "발급 완료", bg: "#EDFAF5", color: "#0A6B45", dot: "#10B981" },
    rejected: { label: "거절됨",   bg: "#FFF0F0", color: "#991B1B", dot: "#EF4444" },
}

const STATUS_TABS = [
    { value: "all",      label: "전체" },
    { value: "pending",  label: "검토 중" },
    { value: "approved", label: "승인됨" },
    { value: "issued",   label: "발급 완료" },
    { value: "rejected", label: "거절됨" },
]

export default function EmailRequestsPage() {
    const [requests, setRequests] = useState<EmailRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState("all")
    const [selected, setSelected] = useState<EmailRequest | null>(null)
    const [memo, setMemo] = useState("")
    const [saving, setSaving] = useState(false)
    const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null)

    const load = useCallback(async () => {
        setLoading(true)
        const res = await fetch(`/api/email-requests?status=${filterStatus}`)
        const json = await res.json()
        setRequests(json.requests || [])
        setLoading(false)
    }, [filterStatus])

    useEffect(() => { load() }, [load])

    const handleAction = async (id: string, status: string) => {
        setSaving(true)
        setMsg(null)
        try {
            const res = await fetch(`/api/email-requests/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, admin_memo: memo }),
            })
            const json = await res.json()
            if (res.ok) {
                const labels: Record<string, string> = {
                    approved: "승인 완료",
                    issued: "발급 완료 — sender_accounts에 자동 등록됨",
                    rejected: "거절 처리 완료",
                    pending: "검토 중으로 변경",
                }
                setMsg({ type: "ok", text: labels[status] || "처리 완료" })
                setSelected(null)
                setMemo("")
                load()
            } else {
                setMsg({ type: "err", text: json.error || "처리 실패" })
            }
        } catch {
            setMsg({ type: "err", text: "네트워크 오류" })
        } finally {
            setSaving(false)
        }
    }

    const pendingCount = requests.filter(r => r.status === "pending").length

    return (
        <div style={{ padding: "32px 40px", maxWidth: 900 }}>
            {/* 헤더 */}
            <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#0066FF", letterSpacing: 1.5, marginBottom: 6, fontFamily: "Inter" }}>EMAIL ACCOUNTS</div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0A1733", margin: 0, letterSpacing: -0.5 }}>
                            이메일 계정 신청 관리
                        </h1>
                        <p style={{ fontSize: 13, color: "#5A6A8A", margin: "6px 0 0" }}>
                            @sncpc.com 계정 발급 신청을 검토·처리합니다
                        </p>
                    </div>
                    {/* 신청 폼 링크 */}
                    <a
                        href="/request-email"
                        target="_blank"
                        style={{
                            display: "flex", alignItems: "center", gap: 6,
                            background: "#F8FAFF", border: "1px solid #E2E8F2",
                            borderRadius: 9, padding: "8px 16px",
                            fontSize: 12, color: "#374B6B", textDecoration: "none", fontWeight: 500,
                        }}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        신청 폼 열기
                    </a>
                </div>
            </div>

            {/* 안내 배너 */}
            <div style={{
                background: "#EEF5FF", border: "1px solid #C7DEFF",
                borderRadius: 10, padding: "12px 16px", marginBottom: 24,
                fontSize: 13, color: "#0046C0", lineHeight: 1.6,
            }}>
                <strong>처리 흐름:</strong> 신청 접수 → 검토 중 → <strong>승인</strong> → Zoho에서 계정 직접 생성 → <strong>발급 완료</strong> 클릭<br/>
                발급 완료 시 <code style={{ background: "rgba(0,70,192,0.1)", borderRadius: 4, padding: "1px 5px", fontSize: 12 }}>sender_accounts</code>에 자동 등록되어 답장 발신자로 사용 가능합니다.
            </div>

            {/* 상태 탭 */}
            <div style={{ display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap" }}>
                {STATUS_TABS.map(t => (
                    <button
                        key={t.value}
                        onClick={() => setFilterStatus(t.value)}
                        style={{
                            padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                            border: "none", cursor: "pointer", fontFamily: "inherit",
                            background: filterStatus === t.value ? "#0066FF" : "transparent",
                            color: filterStatus === t.value ? "#FFFFFF" : "#5A6A8A",
                        }}
                    >
                        {t.label}
                        {t.value === "pending" && pendingCount > 0 && (
                            <span style={{
                                marginLeft: 5, background: filterStatus === "pending" ? "rgba(255,255,255,0.3)" : "#EEF5FF",
                                color: filterStatus === "pending" ? "#fff" : "#0046C0",
                                borderRadius: 10, padding: "1px 6px", fontSize: 10, fontWeight: 700,
                            }}>{pendingCount}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* 신청 목록 */}
            {loading ? (
                <div style={{ padding: 40, textAlign: "center", color: "#8A9AB8", fontSize: 13 }}>불러오는 중...</div>
            ) : requests.length === 0 ? (
                <div style={{ padding: 60, textAlign: "center", color: "#8A9AB8", fontSize: 13 }}>신청이 없습니다</div>
            ) : (
                <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F2", borderRadius: 12, overflow: "hidden" }}>
                    {/* 헤더 */}
                    <div style={{
                        display: "grid", gridTemplateColumns: "1fr 1fr 1fr 90px 100px",
                        padding: "10px 20px", background: "#F8FAFF",
                        borderBottom: "1px solid #E2E8F2",
                        fontSize: 11, fontWeight: 700, color: "#8A9AB8", letterSpacing: 0.5,
                    }}>
                        <div>신청자</div>
                        <div>신청 주소</div>
                        <div>소속 / 용도</div>
                        <div>상태</div>
                        <div>신청일</div>
                    </div>

                    {requests.map((r, i) => {
                        const cfg = STATUS_CONFIG[r.status]
                        const dateStr = new Date(r.created_at).toLocaleDateString("ko-KR", {
                            month: "2-digit", day: "2-digit", timeZone: "Asia/Seoul",
                        })
                        return (
                            <div
                                key={r.id}
                                onClick={() => { setSelected(r); setMemo(r.admin_memo || ""); setMsg(null) }}
                                style={{
                                    display: "grid", gridTemplateColumns: "1fr 1fr 1fr 90px 100px",
                                    padding: "14px 20px",
                                    borderBottom: i < requests.length - 1 ? "1px solid #F0F2F8" : "none",
                                    cursor: "pointer",
                                    background: selected?.id === r.id ? "#F0F6FF" : "transparent",
                                    alignItems: "center",
                                    transition: "background 0.1s",
                                }}
                            >
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1733" }}>{r.requester_name}</div>
                                    <div style={{ fontSize: 11, color: "#8A9AB8", marginTop: 2 }}>{r.requester_email}</div>
                                </div>
                                <div style={{ fontSize: 13, color: "#0066FF", fontWeight: 500 }}>{r.requested_email}</div>
                                <div>
                                    {r.department && <div style={{ fontSize: 12, color: "#374B6B" }}>{r.department}</div>}
                                    {r.purpose && <div style={{ fontSize: 11, color: "#8A9AB8", marginTop: 2 }}>{r.purpose}</div>}
                                </div>
                                <div>
                                    <span style={{
                                        display: "inline-flex", alignItems: "center", gap: 4,
                                        background: cfg.bg, color: cfg.color,
                                        borderRadius: 100, fontSize: 11, fontWeight: 600,
                                        padding: "3px 9px",
                                    }}>
                                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.dot }} />
                                        {cfg.label}
                                    </span>
                                </div>
                                <div style={{ fontSize: 12, color: "#8A9AB8" }}>{dateStr}</div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* 상세 패널 */}
            {selected && (
                <>
                    <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(10,23,51,0.25)", zIndex: 40 }} />
                    <div style={{
                        position: "fixed", top: 0, right: 0, bottom: 0, width: 420,
                        background: "#FFFFFF", boxShadow: "-4px 0 24px rgba(10,23,51,0.12)",
                        zIndex: 50, display: "flex", flexDirection: "column",
                        fontFamily: "'Pretendard Variable', 'Inter', sans-serif",
                    }}>
                        {/* 패널 헤더 */}
                        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #E2E8F2", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: "#0A1733" }}>{selected.requester_name}</div>
                                <div style={{ fontSize: 12, color: "#8A9AB8", marginTop: 2 }}>{selected.requester_email}</div>
                            </div>
                            <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A9AB8" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                        </div>

                        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
                            {/* 신청 정보 */}
                            <div style={{ marginBottom: 20 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: "#8A9AB8", letterSpacing: 0.8, marginBottom: 10 }}>신청 정보</div>
                                <div style={{ background: "#F8FAFF", border: "1px solid #E2E8F2", borderRadius: 10, padding: "14px 16px" }}>
                                    {[
                                        ["신청 주소", selected.requested_email],
                                        ["소속", selected.department || "-"],
                                        ["용도", selected.purpose || "-"],
                                        ["신청일", new Date(selected.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })],
                                        selected.issued_at ? ["발급일", new Date(selected.issued_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })] : null,
                                    ].filter((x): x is [string, string] => Boolean(x)).map(([label, value]) => (
                                        <div key={label} style={{ display: "flex", gap: 12, padding: "6px 0", borderBottom: "1px solid #F0F2F8" }}>
                                            <span style={{ fontSize: 11, color: "#8A9AB8", fontWeight: 600, width: 72, flexShrink: 0 }}>{label}</span>
                                            <span style={{ fontSize: 13, color: label === "신청 주소" ? "#0066FF" : "#0A1733", fontWeight: label === "신청 주소" ? 600 : 400 }}>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 관리자 메모 */}
                            <div style={{ marginBottom: 20 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: "#8A9AB8", letterSpacing: 0.8, marginBottom: 8 }}>관리자 메모</div>
                                <textarea
                                    value={memo}
                                    onChange={e => setMemo(e.target.value)}
                                    placeholder="거절 사유 또는 처리 메모..."
                                    rows={3}
                                    style={{
                                        width: "100%", border: "1px solid #E2E8F2", borderRadius: 8,
                                        padding: "10px 12px", fontSize: 13, color: "#0A1733",
                                        fontFamily: "inherit", resize: "vertical", outline: "none",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>

                            {/* 피드백 메시지 */}
                            {msg && (
                                <div style={{
                                    marginBottom: 16, padding: "10px 14px", borderRadius: 8,
                                    background: msg.type === "ok" ? "#EDFAF5" : "#FFF0F0",
                                    fontSize: 12, fontWeight: 600,
                                    color: msg.type === "ok" ? "#0A6B45" : "#991B1B",
                                }}>
                                    {msg.type === "ok" ? "✓ " : "✕ "}{msg.text}
                                </div>
                            )}

                            {/* 액션 버튼 */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {selected.status !== "issued" && selected.status !== "rejected" && (
                                    <>
                                        {selected.status === "pending" && (
                                            <button onClick={() => handleAction(selected.id, "approved")} disabled={saving} style={actionBtn("#0066FF")}>
                                                ✅ 승인하기
                                            </button>
                                        )}
                                        {selected.status === "approved" && (
                                            <button onClick={() => handleAction(selected.id, "issued")} disabled={saving} style={actionBtn("#10B981")}>
                                                🎉 발급 완료 처리
                                            </button>
                                        )}
                                        <button onClick={() => handleAction(selected.id, "rejected")} disabled={saving} style={actionBtn("#EF4444")}>
                                            ❌ 거절하기
                                        </button>
                                    </>
                                )}
                                {(selected.status === "issued" || selected.status === "rejected") && (
                                    <button onClick={() => handleAction(selected.id, "pending")} disabled={saving} style={actionBtn("#8A9AB8")}>
                                        🔄 검토 중으로 되돌리기
                                    </button>
                                )}
                            </div>

                            {/* Zoho 발급 안내 */}
                            {selected.status === "approved" && (
                                <div style={{
                                    marginTop: 20, padding: "14px 16px",
                                    background: "#FFF8E6", border: "1px solid #F59E0B30",
                                    borderRadius: 10, fontSize: 12, color: "#92600A", lineHeight: 1.7,
                                }}>
                                    <strong>Zoho에서 계정 직접 생성 후 발급 완료를 눌러주세요:</strong><br/>
                                    1. <a href="https://mailadmin.zoho.com" target="_blank" rel="noopener noreferrer" style={{ color: "#0066FF" }}>mailadmin.zoho.com</a> 접속<br/>
                                    2. Users → Add User<br/>
                                    3. 이메일: <strong>{selected.requested_email}</strong><br/>
                                    4. 계정 생성 완료 후 → 위 "발급 완료 처리" 클릭
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

const actionBtn = (bg: string): React.CSSProperties => ({
    width: "100%", background: bg, color: "#FFFFFF",
    border: "none", borderRadius: 9, padding: "11px",
    fontSize: 13, fontWeight: 600, cursor: "pointer",
    fontFamily: "inherit", transition: "opacity 0.15s",
})
