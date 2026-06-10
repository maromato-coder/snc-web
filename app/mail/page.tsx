"use client"

import { useCallback, useEffect, useState } from "react"

// /mail — 직원 개인 @sncpc.com Zoho 사서함 (업무앱 iframe·SSO 대상)

type MailItem = {
    id: string
    from: string
    subject: string
    date: string
    snippet: string
    isRead: boolean
}

type MailDetail = {
    id: string
    from: string
    to: string
    subject: string
    date: string
    text: string | null
    html: string | null
    snippet?: string
}

export default function StaffMailboxPage() {
    const [email, setEmail] = useState("")
    const [configured, setConfigured] = useState<boolean | null>(null)
    const [messages, setMessages] = useState<MailItem[]>([])
    const [connected, setConnected] = useState(false)
    const [loading, setLoading] = useState(true)
    const [hint, setHint] = useState("")
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [detail, setDetail] = useState<MailDetail | null>(null)
    const [detailLoading, setDetailLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [savingPw, setSavingPw] = useState(false)
    const [composeOpen, setComposeOpen] = useState(false)
    const [composeTo, setComposeTo] = useState("")
    const [composeSubject, setComposeSubject] = useState("")
    const [composeBody, setComposeBody] = useState("")
    const [sending, setSending] = useState(false)

    const loadCredentialStatus = useCallback(async () => {
        const res = await fetch("/api/staff-mailbox/credentials").then((r) => r.json())
        setEmail(res.email || "")
        setConfigured(!!res.configured)
        return !!res.configured
    }, [])

    const loadMessages = useCallback(async () => {
        setLoading(true)
        setHint("")
        const res = await fetch("/api/staff-mailbox/messages?limit=30").then((r) => r.json())
        setConnected(!!res.connected)
        setMessages(res.messages || [])
        if (res.hint) setHint(res.hint)
        if (res.error === "mailbox_credentials_missing") setConfigured(false)
        setLoading(false)
    }, [])

    useEffect(() => {
        loadCredentialStatus().then((ok) => {
            if (ok) loadMessages()
            else setLoading(false)
        })
    }, [loadCredentialStatus, loadMessages])

    const savePassword = async () => {
        if (!password.trim()) return
        setSavingPw(true)
        const res = await fetch("/api/staff-mailbox/credentials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        }).then((r) => r.json())
        setSavingPw(false)
        if (res.error) {
            alert(res.error)
            return
        }
        setPassword("")
        setConfigured(true)
        loadMessages()
    }

    const openMail = async (id: string) => {
        setSelectedId(id)
        setDetailLoading(true)
        const res = await fetch(`/api/staff-mailbox/messages/${id}`).then((r) => r.json())
        setDetail(res.detail || null)
        setDetailLoading(false)
    }

    const sendMail = async () => {
        setSending(true)
        const res = await fetch("/api/staff-mailbox/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to: composeTo, subject: composeSubject, text: composeBody }),
        }).then((r) => r.json())
        setSending(false)
        if (res.error) {
            alert(res.error)
            return
        }
        setComposeOpen(false)
        setComposeTo("")
        setComposeSubject("")
        setComposeBody("")
        loadMessages()
    }

    if (configured === false) {
        return (
            <div style={{ maxWidth: 480, margin: "48px auto", padding: 24, background: "#fff", borderRadius: 12, border: "1px solid #E2E8F2" }}>
                <h1 style={{ fontSize: 18, fontWeight: 800, color: "#0A1733", margin: "0 0 8px" }}>사내메일 연결</h1>
                <p style={{ fontSize: 13, color: "#5A6A8A", lineHeight: 1.6 }}>
                    <strong>{email || "@sncpc.com"}</strong> Zoho 사서함을 열려면 IMAP 비밀번호가 필요합니다.
                    Zoho에서 계정을 활성화한 뒤, 관리자가 알려준 임시 비밀번호 또는 앱 비밀번호를 입력하세요.
                </p>
                <input
                    type="password"
                    placeholder="Zoho 비밀번호 / 앱 비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", marginTop: 16, padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F2", fontSize: 14 }}
                />
                <button
                    type="button"
                    onClick={savePassword}
                    disabled={savingPw || !password.trim()}
                    style={{
                        marginTop: 12,
                        width: "100%",
                        padding: "10px 0",
                        borderRadius: 8,
                        border: "none",
                        background: "#0066FF",
                        color: "#fff",
                        fontWeight: 700,
                        cursor: "pointer",
                        opacity: savingPw ? 0.6 : 1,
                    }}
                >
                    {savingPw ? "저장 중…" : "메일함 연결"}
                </button>
            </div>
        )
    }

    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <div style={{ width: 360, flexShrink: 0, borderRight: "1px solid #E2E8F2", background: "#fff", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "16px 18px", borderBottom: "1px solid #F0F2F8" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#0066FF", letterSpacing: 1.2 }}>STAFF MAIL</div>
                    <h1 style={{ fontSize: 16, fontWeight: 800, color: "#0A1733", margin: "4px 0 0" }}>{email}</h1>
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                        <button
                            type="button"
                            onClick={() => setComposeOpen(true)}
                            style={{ flex: 1, padding: "7px 0", borderRadius: 7, border: "none", background: "#0066FF", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                        >
                            새 메일
                        </button>
                        <button
                            type="button"
                            onClick={loadMessages}
                            style={{ padding: "7px 12px", borderRadius: 7, border: "1px solid #E2E8F2", background: "#fff", fontSize: 12, cursor: "pointer" }}
                        >
                            새로고침
                        </button>
                    </div>
                    {!connected && hint ? (
                        <div style={{ marginTop: 10, padding: "8px 10px", background: "#FFF8E6", borderRadius: 7, fontSize: 11, color: "#92600A" }}>{hint}</div>
                    ) : null}
                </div>
                <div style={{ flex: 1, overflowY: "auto" }}>
                    {loading ? (
                        <div style={{ padding: 32, textAlign: "center", color: "#8A9AB8", fontSize: 13 }}>불러오는 중…</div>
                    ) : messages.length === 0 ? (
                        <div style={{ padding: 40, textAlign: "center", color: "#8A9AB8", fontSize: 13 }}>받은 메일이 없습니다</div>
                    ) : (
                        messages.map((m) => (
                            <button
                                key={m.id}
                                type="button"
                                onClick={() => openMail(m.id)}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    textAlign: "left",
                                    padding: "12px 18px",
                                    border: "none",
                                    borderBottom: "1px solid #F0F2F8",
                                    background: selectedId === m.id ? "#F0F6FF" : m.isRead ? "#fff" : "#F8FAFF",
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                }}
                            >
                                <div style={{ fontSize: 12, fontWeight: m.isRead ? 500 : 700, color: "#0A1733" }}>{m.from.replace(/<.*>/, "").trim()}</div>
                                <div style={{ fontSize: 12, color: "#0A1733", marginTop: 2 }}>{m.subject}</div>
                                <div style={{ fontSize: 11, color: "#8A9AB8", marginTop: 2 }}>{m.snippet}</div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            <div style={{ flex: 1, background: "#F8FAFF", overflow: "auto", padding: 24 }}>
                {composeOpen ? (
                    <div style={{ maxWidth: 640, background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E2E8F2" }}>
                        <h2 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 12px" }}>새 메일</h2>
                        <input placeholder="받는 사람" value={composeTo} onChange={(e) => setComposeTo(e.target.value)} style={inputStyle} />
                        <input placeholder="제목" value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} style={{ ...inputStyle, marginTop: 8 }} />
                        <textarea placeholder="본문" value={composeBody} onChange={(e) => setComposeBody(e.target.value)} rows={10} style={{ ...inputStyle, marginTop: 8, resize: "vertical" }} />
                        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                            <button type="button" onClick={sendMail} disabled={sending} style={primaryBtn}>{sending ? "발송 중…" : "보내기"}</button>
                            <button type="button" onClick={() => setComposeOpen(false)} style={ghostBtn}>취소</button>
                        </div>
                    </div>
                ) : !selectedId ? (
                    <div style={{ color: "#8A9AB8", fontSize: 14, marginTop: 80, textAlign: "center" }}>메일을 선택하세요</div>
                ) : detailLoading ? (
                    <div style={{ color: "#8A9AB8", fontSize: 14 }}>본문 불러오는 중…</div>
                ) : detail ? (
                    <div style={{ maxWidth: 800, background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #E2E8F2" }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0A1733", margin: "0 0 8px" }}>{detail.subject}</h2>
                        <div style={{ fontSize: 12, color: "#5A6A8A", marginBottom: 16 }}>
                            보낸사람 {detail.from} · {new Date(detail.date).toLocaleString("ko-KR")}
                        </div>
                        <pre style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.6, color: "#0A1733", fontFamily: "inherit" }}>
                            {detail.text || detail.snippet || "(본문 없음)"}
                        </pre>
                    </div>
                ) : (
                    <div style={{ color: "#991B1B", fontSize: 13 }}>메일을 불러오지 못했습니다</div>
                )}
            </div>
        </div>
    )
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #E2E8F2",
    fontSize: 13,
    boxSizing: "border-box",
    fontFamily: "inherit",
}

const primaryBtn: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: 8,
    border: "none",
    background: "#0066FF",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
}

const ghostBtn: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid #E2E8F2",
    background: "#fff",
    cursor: "pointer",
}
