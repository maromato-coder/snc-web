"use client"

import { useState, useEffect, useCallback } from "react"

// ════════════════════════════════════════════════
// /admin/email — 발신 계정 관리
// ════════════════════════════════════════════════

interface SenderAccount {
    id: string
    email: string
    display_name: string
    is_active: boolean
    created_at: string
    created_by: string
}

export default function EmailManagePage() {
    const [accounts, setAccounts] = useState<SenderAccount[]>([])
    const [loading, setLoading] = useState(true)
    const [addOpen, setAddOpen] = useState(false)
    const [form, setForm] = useState({ email: "", display_name: "" })
    const [saving, setSaving] = useState(false)
    const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null)

    const load = useCallback(async () => {
        setLoading(true)
        const res = await fetch("/api/sender-accounts")
        const json = await res.json()
        setAccounts(json.accounts || [])
        setLoading(false)
    }, [])

    useEffect(() => { load() }, [load])

    const handleAdd = async () => {
        if (!form.email.trim() || !form.display_name.trim()) return
        setSaving(true)
        setMsg(null)
        try {
            const res = await fetch("/api/sender-accounts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
            const json = await res.json()
            if (res.ok) {
                setMsg({ type: "ok", text: "계정이 추가됐습니다" })
                setForm({ email: "", display_name: "" })
                setAddOpen(false)
                load()
            } else {
                setMsg({ type: "err", text: json.error || "추가 실패" })
            }
        } catch {
            setMsg({ type: "err", text: "네트워크 오류" })
        } finally {
            setSaving(false)
        }
    }

    const toggleActive = async (id: string, current: boolean) => {
        await fetch("/api/sender-accounts", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, is_active: !current }),
        })
        load()
    }

    const inp: React.CSSProperties = {
        width: "100%", border: "1px solid #E2E8F2", borderRadius: 8,
        padding: "9px 12px", fontSize: 13, color: "#0A1733",
        outline: "none", boxSizing: "border-box", fontFamily: "inherit",
    }

    return (
        <div style={{ padding: "32px 40px", maxWidth: 720 }}>
            {/* 헤더 */}
            <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#0066FF", letterSpacing: 1.5, marginBottom: 6, fontFamily: "Inter" }}>EMAIL</div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0A1733", margin: 0, letterSpacing: -0.5 }}>발신 계정 관리</h1>
                        <p style={{ fontSize: 13, color: "#5A6A8A", margin: "6px 0 0" }}>
                            답장 발송 시 사용할 @sncpc.com 계정을 관리합니다
                        </p>
                    </div>
                    <button
                        onClick={() => { setAddOpen(true); setMsg(null) }}
                        style={{
                            display: "flex", alignItems: "center", gap: 6,
                            background: "#0066FF", color: "#FFFFFF",
                            border: "none", borderRadius: 9, padding: "9px 16px",
                            fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                        계정 추가
                    </button>
                </div>
            </div>

            {/* 안내 배너 */}
            <div style={{
                background: "#EEF5FF", border: "1px solid #C7DEFF",
                borderRadius: 10, padding: "12px 16px", marginBottom: 24,
                fontSize: 13, color: "#0046C0", lineHeight: 1.6,
            }}>
                <strong>Resend</strong>로 발송되며, <code style={{ background: "rgba(0,70,192,0.1)", borderRadius: 4, padding: "1px 5px", fontSize: 12 }}>sncpc.com</code> 도메인의 모든 주소를 발신자로 사용할 수 있습니다.<br />
                실제 수신은 Google Workspace Gmail에서 확인하세요.
            </div>

            {/* 계정 목록 */}
            {loading ? (
                <div style={{ padding: 40, textAlign: "center", color: "#8A9AB8", fontSize: 13 }}>불러오는 중...</div>
            ) : (
                <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F2", borderRadius: 12, overflow: "hidden" }}>
                    <div style={{
                        display: "grid", gridTemplateColumns: "1fr 1fr 80px 80px",
                        padding: "10px 20px", background: "#F8FAFF",
                        borderBottom: "1px solid #E2E8F2",
                        fontSize: 11, fontWeight: 700, color: "#8A9AB8", letterSpacing: 0.5,
                    }}>
                        <div>이메일</div><div>표시 이름</div><div>상태</div><div>관리</div>
                    </div>

                    {accounts.length === 0 ? (
                        <div style={{ padding: "40px 20px", textAlign: "center", color: "#8A9AB8", fontSize: 13 }}>
                            등록된 계정이 없습니다
                        </div>
                    ) : accounts.map((acc, i) => (
                        <div
                            key={acc.id}
                            style={{
                                display: "grid", gridTemplateColumns: "1fr 1fr 80px 80px",
                                padding: "14px 20px",
                                borderBottom: i < accounts.length - 1 ? "1px solid #F0F2F8" : "none",
                                alignItems: "center",
                            }}
                        >
                            <div style={{ fontSize: 13, color: "#0A1733", fontWeight: 500 }}>{acc.email}</div>
                            <div style={{ fontSize: 13, color: "#374B6B" }}>{acc.display_name}</div>
                            <div>
                                <span style={{
                                    fontSize: 11, fontWeight: 600,
                                    background: acc.is_active ? "#EDFAF5" : "#F3F4F6",
                                    color: acc.is_active ? "#0A6B45" : "#6B7280",
                                    borderRadius: 100, padding: "3px 9px",
                                }}>
                                    {acc.is_active ? "활성" : "비활성"}
                                </span>
                            </div>
                            <div>
                                <button
                                    onClick={() => toggleActive(acc.id, acc.is_active)}
                                    style={{
                                        background: "transparent", border: "1px solid #E2E8F2",
                                        borderRadius: 6, padding: "4px 10px",
                                        fontSize: 11, color: "#5A6A8A", cursor: "pointer",
                                        fontFamily: "inherit", fontWeight: 500,
                                    }}
                                >
                                    {acc.is_active ? "비활성화" : "활성화"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 계정 추가 모달 */}
            {addOpen && (
                <>
                    <div onClick={() => setAddOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(10,23,51,0.3)", zIndex: 40 }} />
                    <div style={{
                        position: "fixed", top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "#FFFFFF", borderRadius: 16,
                        padding: "28px 32px", width: 420,
                        zIndex: 50, boxShadow: "0 8px 40px rgba(10,23,51,0.16)",
                    }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0A1733", margin: "0 0 20px" }}>발신 계정 추가</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 600, color: "#8A9AB8", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>이메일 주소</label>
                                <input
                                    value={form.email}
                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                    placeholder="example@sncpc.com"
                                    style={inp}
                                />
                                <div style={{ fontSize: 11, color: "#8A9AB8", marginTop: 4 }}>@sncpc.com 주소만 등록 가능합니다</div>
                            </div>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 600, color: "#8A9AB8", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>표시 이름</label>
                                <input
                                    value={form.display_name}
                                    onChange={e => setForm(f => ({ ...f, display_name: e.target.value }))}
                                    placeholder="박진영 대표"
                                    style={inp}
                                />
                            </div>

                            {msg && (
                                <div style={{ fontSize: 12, fontWeight: 600, color: msg.type === "ok" ? "#10B981" : "#EF4444" }}>
                                    {msg.type === "ok" ? "✓ " : "✕ "}{msg.text}
                                </div>
                            )}

                            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                                <button onClick={() => setAddOpen(false)} style={{ flex: 1, background: "#F3F4F6", color: "#374B6B", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                                    취소
                                </button>
                                <button onClick={handleAdd} disabled={saving} style={{ flex: 1, background: "#0066FF", color: "#FFFFFF", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", opacity: saving ? 0.7 : 1 }}>
                                    {saving ? "저장 중..." : "추가"}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
