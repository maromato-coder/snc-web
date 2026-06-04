"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import StatusBadge from "@/components/admin/StatusBadge"

// ════════════════════════════════════════════════
// /admin/mail — 통합 메일함
// Gmail 받은메일 + 폼메일 신청을 한 화면에서
// ════════════════════════════════════════════════

interface GmailMessage {
    id: string
    threadId: string
    from: string
    to: string
    subject: string
    date: string
    snippet: string
    isRead: boolean
    labels: string[]
}

interface Submission {
    id: string
    type: string
    name: string
    phone: string
    email?: string
    company?: string
    region?: string
    message?: string
    status: string
    site_id?: string
    created_at: string
}

type TabType = "all" | "gmail" | "form"

const TAB_LABEL: Record<TabType, string> = {
    all:   "전체",
    gmail: "받은메일 (Gmail)",
    form:  "폼메일 신청",
}

export default function MailPage() {
    const searchParams = useSearchParams()
    const gmailConnected = searchParams.get("gmail_connected")
    const gmailError = searchParams.get("gmail_error")

    const [tab, setTab] = useState<TabType>("all")
    const [gmailMessages, setGmailMessages] = useState<GmailMessage[]>([])
    const [submissions, setSubmissions] = useState<Submission[]>([])
    const [gmailStatus, setGmailStatus] = useState<"loading" | "connected" | "disconnected">("loading")
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState<{ type: "gmail" | "form"; id: string } | null>(null)
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

    // 답장 모달
    const [replyOpen, setReplyOpen] = useState(false)
    const [senderAccounts, setSenderAccounts] = useState<{ email: string; display_name: string }[]>([])
    const [replyForm, setReplyForm] = useState({ from_email: "", to_email: "", subject: "", body: "" })
    const [replySending, setReplySending] = useState(false)
    const [replyMsg, setReplyMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null)

    const loadAll = useCallback(async () => {
        setLoading(true)
        const [gmailRes, subRes, senderRes] = await Promise.all([
            fetch("/api/gmail/messages").then(r => r.json()).catch(() => ({ messages: [], connected: false })),
            fetch("/api/submissions").then(r => r.json()).catch(() => ({ submissions: [] })),
            fetch("/api/sender-accounts").then(r => r.json()).catch(() => ({ accounts: [] })),
        ])

        if (gmailRes.error === "gmail_not_connected") {
            setGmailStatus("disconnected")
        } else {
            setGmailStatus("connected")
            setGmailMessages(gmailRes.messages || [])
        }
        setSubmissions(subRes.submissions || [])
        setSenderAccounts(senderRes.accounts?.filter((a: { is_active: boolean }) => a.is_active) || [])
        if (senderRes.accounts?.length > 0) {
            setReplyForm(f => ({ ...f, from_email: senderRes.accounts[0].email }))
        }
        setLoading(false)
    }, [])

    useEffect(() => { loadAll() }, [loadAll])

    // 답장 열기
    const openReply = (toEmail: string, subject: string) => {
        setReplyForm(f => ({
            ...f,
            to_email: toEmail,
            subject: subject.startsWith("Re:") ? subject : `Re: ${subject}`,
            body: "",
        }))
        setReplyOpen(true)
        setReplyMsg(null)
    }

    // 신청 선택
    const selectSubmission = (s: Submission) => {
        setSelectedSubmission(s)
        setSelected({ type: "form", id: s.id })
    }

    // 답장 발송
    const handleReply = async () => {
        if (!replyForm.to_email || !replyForm.subject || !replyForm.body) return
        if (!selectedSubmission) return
        setReplySending(true)
        setReplyMsg(null)
        try {
            const res = await fetch(`/api/submissions/${selectedSubmission.id}/reply`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(replyForm),
            })
            const json = await res.json()
            if (res.ok) {
                setReplyMsg({ type: "ok", text: "발송 완료" })
                setTimeout(() => { setReplyOpen(false); setReplyMsg(null) }, 1500)
            } else {
                setReplyMsg({ type: "err", text: json.error || "발송 실패" })
            }
        } catch {
            setReplyMsg({ type: "err", text: "네트워크 오류" })
        } finally {
            setReplySending(false)
        }
    }

    // 탭별 아이템 합치기
    const allItems = [
        ...gmailMessages.map(m => ({ ...m, _type: "gmail" as const, _date: new Date(m.date) })),
        ...submissions.map(s => ({ ...s, _type: "form" as const, _date: new Date(s.created_at) })),
    ].sort((a, b) => b._date.getTime() - a._date.getTime())

    const visibleItems = tab === "all" ? allItems
        : tab === "gmail" ? allItems.filter(i => i._type === "gmail")
        : allItems.filter(i => i._type === "form")

    const gmailCount = gmailMessages.filter(m => !m.isRead).length
    const formCount = submissions.filter(s => s.status === "new").length

    const s: Record<string, React.CSSProperties> = {
        tab: {
            padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500,
            border: "none", cursor: "pointer", fontFamily: "inherit",
            transition: "all 0.15s",
        },
    }

    return (
        <div style={{ display: "flex", height: "calc(100vh - 0px)", overflow: "hidden" }}>

            {/* ── 좌측 패널 — 메일 목록 ── */}
            <div style={{
                width: 380, flexShrink: 0,
                borderRight: "1px solid #E2E8F2",
                display: "flex", flexDirection: "column",
                background: "#FFFFFF",
            }}>
                {/* 헤더 */}
                <div style={{ padding: "20px 20px 0", borderBottom: "1px solid #F0F2F8" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "#0066FF", letterSpacing: 1.5, fontFamily: "Inter, sans-serif" }}>MAIL</div>
                            <h1 style={{ fontSize: 18, fontWeight: 700, color: "#0A1733", margin: "3px 0 0", letterSpacing: -0.3 }}>통합 메일함</h1>
                        </div>
                        {gmailStatus === "disconnected" && (
                            <a
                                href="/api/gmail/auth"
                                style={{
                                    fontSize: 11, fontWeight: 600, color: "#0066FF",
                                    background: "#EEF5FF", borderRadius: 7,
                                    padding: "6px 10px", textDecoration: "none",
                                    border: "1px solid #C7DEFF",
                                }}
                            >
                                Gmail 연결
                            </a>
                        )}
                    </div>

                    {/* 상태 알림 */}
                    {gmailConnected && (
                        <div style={{ marginBottom: 10, padding: "8px 12px", background: "#EDFAF5", borderRadius: 8, fontSize: 12, color: "#0A6B45", fontWeight: 500 }}>
                            ✅ Gmail 연결 완료
                        </div>
                    )}
                    {gmailError && (
                        <div style={{ marginBottom: 10, padding: "8px 12px", background: "#FFF0F0", borderRadius: 8, fontSize: 12, color: "#991B1B", fontWeight: 500 }}>
                            ❌ Gmail 연결 실패: {gmailError}
                        </div>
                    )}

                    {/* 탭 */}
                    <div style={{ display: "flex", gap: 4, paddingBottom: 14 }}>
                        {(["all", "gmail", "form"] as TabType[]).map(t => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                style={{
                                    ...s.tab,
                                    background: tab === t ? "#0066FF" : "transparent",
                                    color: tab === t ? "#FFFFFF" : "#5A6A8A",
                                }}
                            >
                                {TAB_LABEL[t]}
                                {t === "gmail" && gmailCount > 0 && (
                                    <span style={{ marginLeft: 5, background: tab === t ? "rgba(255,255,255,0.3)" : "#EEF5FF", color: tab === t ? "#fff" : "#0046C0", borderRadius: 10, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>
                                        {gmailCount}
                                    </span>
                                )}
                                {t === "form" && formCount > 0 && (
                                    <span style={{ marginLeft: 5, background: tab === t ? "rgba(255,255,255,0.3)" : "#EEF5FF", color: tab === t ? "#fff" : "#0046C0", borderRadius: 10, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>
                                        {formCount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 목록 */}
                <div style={{ flex: 1, overflowY: "auto" }}>
                    {loading ? (
                        <div style={{ padding: 32, textAlign: "center", color: "#8A9AB8", fontSize: 13 }}>불러오는 중...</div>
                    ) : visibleItems.length === 0 ? (
                        <div style={{ padding: 40, textAlign: "center", color: "#8A9AB8", fontSize: 13 }}>
                            {tab === "gmail" && gmailStatus === "disconnected" ? "Gmail을 연결해주세요" : "메일이 없습니다"}
                        </div>
                    ) : (
                        visibleItems.map((item) => {
                            const isSelected = selected?.id === item.id
                            const isGmail = item._type === "gmail"

                            if (isGmail) {
                                const msg = item as typeof item & GmailMessage
                                const fromName = msg.from?.replace(/<.*>/, "").trim() || msg.from
                                const dateStr = new Date(msg.date).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" })
                                return (
                                    <div
                                        key={`gmail-${msg.id}`}
                                        onClick={() => setSelected({ type: "gmail", id: msg.id })}
                                        style={{
                                            padding: "14px 20px",
                                            borderBottom: "1px solid #F0F2F8",
                                            cursor: "pointer",
                                            background: isSelected ? "#F0F6FF" : msg.isRead ? "#FFFFFF" : "#F8FAFF",
                                            borderLeft: isSelected ? "3px solid #0066FF" : "3px solid transparent",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                                            <span style={{ width: 20, height: 20, background: "#EEF5FF", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                                                </svg>
                                            </span>
                                            <span style={{ fontSize: 12, fontWeight: msg.isRead ? 400 : 700, color: "#0A1733", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {fromName}
                                            </span>
                                            <span style={{ fontSize: 11, color: "#8A9AB8", flexShrink: 0 }}>{dateStr}</span>
                                        </div>
                                        <div style={{ fontSize: 13, fontWeight: msg.isRead ? 400 : 600, color: "#0A1733", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {msg.subject}
                                        </div>
                                        <div style={{ fontSize: 11, color: "#8A9AB8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {msg.snippet}
                                        </div>
                                        {!msg.isRead && (
                                            <div style={{ width: 6, height: 6, background: "#0066FF", borderRadius: "50%", position: "absolute", left: 8, marginTop: -30 }} />
                                        )}
                                    </div>
                                )
                            } else {
                                const sub = item as typeof item & Submission
                                const dateStr = new Date(sub.created_at).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" })
                                return (
                                    <div
                                        key={`form-${sub.id}`}
                                        onClick={() => selectSubmission(sub as unknown as Submission)}
                                        style={{
                                            padding: "14px 20px",
                                            borderBottom: "1px solid #F0F2F8",
                                            cursor: "pointer",
                                            background: isSelected ? "#F0F6FF" : "#FFFFFF",
                                            borderLeft: isSelected ? "3px solid #0066FF" : "3px solid transparent",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                                            <span style={{ width: 20, height: 20, background: "#F0F2F8", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#374B6B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                                                </svg>
                                            </span>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: "#0A1733", flex: 1 }}>{sub.name}</span>
                                            <span style={{ fontSize: 11, color: "#8A9AB8" }}>{dateStr}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <span style={{
                                                fontSize: 10, fontWeight: 600,
                                                background: sub.type === "join" ? "#EEF5FF" : "#F0F2F8",
                                                color: sub.type === "join" ? "#0046C0" : "#374B6B",
                                                borderRadius: 4, padding: "1px 6px",
                                            }}>
                                                {sub.type === "join" ? "가맹" : "기업"}
                                            </span>
                                            <span style={{ fontSize: 11, color: "#5A6A8A", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {sub.email || sub.phone}
                                            </span>
                                            <StatusBadge status={sub.status} size="sm" />
                                        </div>
                                    </div>
                                )
                            }
                        })
                    )}
                </div>
            </div>

            {/* ── 우측 패널 — 상세 + 답장 ── */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFF", overflow: "hidden" }}>
                {!selected ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, flexDirection: "column", gap: 12 }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C8D0E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <p style={{ fontSize: 14, color: "#8A9AB8", margin: 0 }}>메일을 선택하면 내용이 표시됩니다</p>
                    </div>
                ) : selected.type === "form" && selectedSubmission ? (
                    <FormDetail
                        submission={selectedSubmission}
                        onReply={(email) => openReply(email, `${selectedSubmission.type === "join" ? "[가맹 신청]" : "[기업 문의]"} ${selectedSubmission.name}님 답변`)}
                    />
                ) : (
                    <GmailDetail
                        message={gmailMessages.find(m => m.id === selected.id) || null}
                        onReply={(to, subject) => openReply(to, subject)}
                    />
                )}
            </div>

            {/* ── 답장 모달 ── */}
            {replyOpen && (
                <>
                    <div onClick={() => setReplyOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(10,23,51,0.3)", zIndex: 40 }} />
                    <div style={{
                        position: "fixed", bottom: 0, right: 0,
                        width: 520, background: "#FFFFFF",
                        boxShadow: "-4px 0 24px rgba(10,23,51,0.12)",
                        zIndex: 50, borderRadius: "16px 16px 0 0",
                        display: "flex", flexDirection: "column",
                    }}>
                        <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #E2E8F2", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span style={{ fontSize: 15, fontWeight: 700, color: "#0A1733" }}>답장 작성</span>
                            <button onClick={() => setReplyOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A9AB8" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                        </div>

                        <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                            {/* 발신자 선택 */}
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 600, color: "#8A9AB8", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>발신자</label>
                                <select
                                    value={replyForm.from_email}
                                    onChange={e => setReplyForm(f => ({ ...f, from_email: e.target.value }))}
                                    style={{ width: "100%", border: "1px solid #E2E8F2", borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "#0A1733", fontFamily: "inherit", outline: "none" }}
                                >
                                    {senderAccounts.map(a => (
                                        <option key={a.email} value={a.email}>{a.display_name} &lt;{a.email}&gt;</option>
                                    ))}
                                </select>
                            </div>
                            <ReplyField label="수신자">
                                <input value={replyForm.to_email} onChange={e => setReplyForm(f => ({ ...f, to_email: e.target.value }))} style={replyInput} />
                            </ReplyField>
                            <ReplyField label="제목">
                                <input value={replyForm.subject} onChange={e => setReplyForm(f => ({ ...f, subject: e.target.value }))} style={replyInput} />
                            </ReplyField>
                            <ReplyField label="내용">
                                <textarea
                                    value={replyForm.body}
                                    onChange={e => setReplyForm(f => ({ ...f, body: e.target.value }))}
                                    rows={6}
                                    style={{ ...replyInput, resize: "vertical", fontFamily: "inherit" }}
                                />
                            </ReplyField>

                            {replyMsg && (
                                <div style={{ fontSize: 12, fontWeight: 600, color: replyMsg.type === "ok" ? "#10B981" : "#EF4444" }}>
                                    {replyMsg.type === "ok" ? "✓ " : "✕ "}{replyMsg.text}
                                </div>
                            )}

                            <button
                                onClick={handleReply}
                                disabled={replySending || !replyForm.to_email || !replyForm.body}
                                style={{
                                    background: (!replyForm.to_email || !replyForm.body) ? "#E2E8F2" : "#0066FF",
                                    color: (!replyForm.to_email || !replyForm.body) ? "#8A9AB8" : "#FFFFFF",
                                    border: "none", borderRadius: 9, padding: "11px",
                                    fontSize: 14, fontWeight: 600, cursor: replySending ? "wait" : "pointer",
                                    fontFamily: "inherit", opacity: replySending ? 0.7 : 1,
                                }}
                            >
                                {replySending ? "발송 중..." : "📤 답장 보내기"}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

// ── 폼메일 상세 뷰 ──
function FormDetail({ submission: s, onReply }: { submission: Submission; onReply: (email: string) => void }) {
    const dateStr = new Date(s.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
    return (
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
            <div style={{ maxWidth: 640 }}>
                <div style={{ marginBottom: 20 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#0066FF", letterSpacing: 1, fontFamily: "Inter" }}>폼메일 신청</span>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1733", margin: "6px 0 4px", letterSpacing: -0.3 }}>
                        {s.name} {s.company ? `· ${s.company}` : ""}
                    </h2>
                    <div style={{ fontSize: 12, color: "#8A9AB8" }}>{dateStr}</div>
                </div>

                <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F2", borderRadius: 12, padding: "20px 24px", marginBottom: 16 }}>
                    {[
                        ["종류", s.type === "join" ? "NODE 가맹 신청" : "기업 IT 진단"],
                        ["이름", s.name],
                        ["연락처", s.phone],
                        s.email && ["이메일", s.email],
                        s.company && ["회사명", s.company],
                        s.region && ["지역", s.region],
                    ].filter((x): x is [string, string] => Boolean(x)).map(([label, value]) => (
                        <div key={label} style={{ display: "flex", gap: 16, padding: "8px 0", borderBottom: "1px solid #F0F2F8" }}>
                            <span style={{ fontSize: 11, color: "#8A9AB8", fontWeight: 600, width: 64, flexShrink: 0 }}>{label}</span>
                            <span style={{ fontSize: 13, color: "#0A1733" }}>{value}</span>
                        </div>
                    ))}
                    {s.message && (
                        <div style={{ paddingTop: 12, marginTop: 4 }}>
                            <div style={{ fontSize: 11, color: "#8A9AB8", fontWeight: 600, marginBottom: 8 }}>문의 내용</div>
                            <div style={{ fontSize: 13, color: "#374B6B", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{s.message}</div>
                        </div>
                    )}
                </div>

                <StatusBadge status={s.status} />

                {s.email && (
                    <button
                        onClick={() => onReply(s.email!)}
                        style={{
                            marginTop: 16, display: "flex", alignItems: "center", gap: 8,
                            background: "#0066FF", color: "#FFFFFF",
                            border: "none", borderRadius: 9, padding: "10px 20px",
                            fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 00-4-4H4"/>
                        </svg>
                        답장 보내기
                    </button>
                )}
                {!s.email && (
                    <div style={{ marginTop: 16, padding: "10px 14px", background: "#F8FAFF", borderRadius: 8, fontSize: 12, color: "#8A9AB8" }}>
                        이메일 주소가 없어 답장을 보낼 수 없습니다. 연락처로 직접 연락해주세요.
                    </div>
                )}
            </div>
        </div>
    )
}

// ── Gmail 메시지 상세 뷰 ──
function GmailDetail({ message: msg, onReply }: { message: GmailMessage | null; onReply: (to: string, subject: string) => void }) {
    if (!msg) return null
    const fromEmail = msg.from?.match(/<(.+)>/)?.[1] || msg.from
    const fromName = msg.from?.replace(/<.*>/, "").trim() || fromEmail
    const dateStr = new Date(msg.date).toLocaleString("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })

    return (
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
            <div style={{ maxWidth: 640 }}>
                <div style={{ marginBottom: 20 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#0066FF", letterSpacing: 1, fontFamily: "Inter" }}>Gmail 받은메일</span>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1733", margin: "6px 0 4px", letterSpacing: -0.3 }}>{msg.subject}</h2>
                    <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#8A9AB8" }}>
                        <span>보낸사람: <strong style={{ color: "#374B6B" }}>{fromName}</strong></span>
                        <span>{dateStr}</span>
                    </div>
                </div>

                <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F2", borderRadius: 12, padding: "20px 24px", marginBottom: 16 }}>
                    <p style={{ fontSize: 14, color: "#374B6B", lineHeight: 1.8, margin: 0, whiteSpace: "pre-wrap" }}>
                        {msg.snippet}
                        {"\n\n"}
                        <span style={{ fontSize: 12, color: "#8A9AB8" }}>
                            (전체 내용을 보려면 Gmail에서 확인하세요)
                        </span>
                    </p>
                </div>

                <button
                    onClick={() => onReply(fromEmail, msg.subject)}
                    style={{
                        display: "flex", alignItems: "center", gap: 8,
                        background: "#0066FF", color: "#FFFFFF",
                        border: "none", borderRadius: 9, padding: "10px 20px",
                        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 00-4-4H4"/>
                    </svg>
                    답장 보내기
                </button>
            </div>
        </div>
    )
}

function ReplyField({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#8A9AB8", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>{label}</label>
            {children}
        </div>
    )
}

const replyInput: React.CSSProperties = {
    width: "100%", border: "1px solid #E2E8F2", borderRadius: 8,
    padding: "9px 12px", fontSize: 13, color: "#0A1733",
    outline: "none", boxSizing: "border-box",
}
