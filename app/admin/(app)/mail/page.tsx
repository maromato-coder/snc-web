"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import StatusBadge from "@/components/admin/StatusBadge"
import MailComposer from "@/components/admin/MailComposer"

// ════════════════════════════════════════════════
// /admin/mail — 통합 메일함
// Gmail + Zoho + 폼메일 통합 뷰 + 전체 본문 읽기
// ════════════════════════════════════════════════

interface MailMessage {
    id: string
    from: string
    to: string
    subject: string
    date: string
    snippet: string
    isRead: boolean
    _source: "gmail" | "zoho"
}

interface MailDetail {
    id: string
    from: string
    to: string
    subject: string
    date: string
    html: string | null
    text: string | null
    snippet?: string
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

type TabType = "all" | "gmail" | "zoho" | "form"

const TAB_LABEL: Record<TabType, string> = {
    all:   "전체",
    gmail: "Gmail",
    zoho:  "Zoho Mail",
    form:  "폼메일",
}

export default function MailPage() {
    const searchParams = useSearchParams()
    const gmailConnected = searchParams.get("gmail_connected")
    const gmailError = searchParams.get("gmail_error")

    const [tab, setTab] = useState<TabType>("all")
    const [gmailMessages, setGmailMessages] = useState<MailMessage[]>([])
    const [zohoMessages, setZohoMessages] = useState<MailMessage[]>([])
    const [submissions, setSubmissions] = useState<Submission[]>([])
    const [gmailStatus, setGmailStatus] = useState<"loading" | "connected" | "disconnected">("loading")
    const [zohoStatus, setZohoStatus] = useState<"loading" | "connected" | "disconnected">("loading")
    const [loading, setLoading] = useState(true)
    // 검색
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    // 페이지네이션
    const [gmailNextToken, setGmailNextToken] = useState<string | null>(null)
    const [zohoPage, setZohoPage] = useState(1)
    const [zohoHasMore, setZohoHasMore] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    // 스레드 모드
    const [threadMode, setThreadMode] = useState(false)

    // 선택된 메일
    const [selectedItem, setSelectedItem] = useState<{
        type: "gmail" | "zoho" | "form"
        id: string
    } | null>(null)
    const [mailDetail, setMailDetail] = useState<MailDetail | null>(null)
    const [detailLoading, setDetailLoading] = useState(false)
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

    // 메일 작성기
    const [composerOpen, setComposerOpen] = useState(false)
    const [composerMode, setComposerMode] = useState<"reply" | "compose" | "forward">("reply")
    const [composerTo, setComposerTo] = useState("")
    const [composerSubject, setComposerSubject] = useState("")
    const [composerSnippet, setComposerSnippet] = useState("")
    const [senderAccounts, setSenderAccounts] = useState<{ email: string; display_name: string }[]>([])

    const loadAll = useCallback(async (q = "", page = 1, append = false) => {
        if (!append) setLoading(true)
        else setLoadingMore(true)

        const qParam = q ? `&q=${encodeURIComponent(q)}` : ""
        const threadParam = threadMode ? "&threads=1" : ""

        const [gmailRes, zohoRes, subRes, senderRes] = await Promise.all([
            fetch(`/api/gmail/messages?max=20${qParam}${threadParam}${gmailNextToken && append ? `&pageToken=${gmailNextToken}` : ""}`)
                .then(r => r.json()).catch(() => ({ messages: [], error: "fetch_failed" })),
            fetch(`/api/zoho/messages?limit=20&page=${page}${qParam}${threadParam}`)
                .then(r => r.json()).catch(() => ({ messages: [], connected: false })),
            page === 1 ? fetch("/api/submissions").then(r => r.json()).catch(() => ({ submissions: [] })) : Promise.resolve(null),
            page === 1 ? fetch("/api/sender-accounts").then(r => r.json()).catch(() => ({ accounts: [] })) : Promise.resolve(null),
        ])

        // Gmail
        if (gmailRes.error === "gmail_not_connected") {
            setGmailStatus("disconnected")
        } else {
            setGmailStatus("connected")
            const newMsgs = (gmailRes.messages || []).map((m: MailMessage) => ({ ...m, _source: "gmail" as const }))
            setGmailMessages(prev => append ? [...prev, ...newMsgs] : newMsgs)
            setGmailNextToken(gmailRes.nextPageToken || null)
        }

        // Zoho
        if (!zohoRes.connected) {
            setZohoStatus("disconnected")
        } else {
            setZohoStatus("connected")
            const newMsgs = (zohoRes.messages || []).map((m: MailMessage) => ({ ...m, _source: "zoho" as const }))
            setZohoMessages(prev => append ? [...prev, ...newMsgs] : newMsgs)
            setZohoPage(page)
            setZohoHasMore(zohoRes.hasMore || false)
        }

        if (subRes) setSubmissions(subRes.submissions || [])
        if (senderRes) {
            const activeAccounts = senderRes.accounts?.filter((a: { is_active: boolean }) => a.is_active) || []
            setSenderAccounts(activeAccounts)
        }

        setLoading(false)
        setLoadingMore(false)
        setIsSearching(false)
    }, [threadMode, gmailNextToken])

    useEffect(() => { loadAll() }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    // 검색
    const handleSearch = useCallback((q: string) => {
        setSearchQuery(q)
        setIsSearching(true)
        setGmailNextToken(null)
        loadAll(q, 1, false)
    }, [loadAll])

    // 더 보기
    const loadMore = useCallback(() => {
        loadAll(searchQuery, zohoPage + 1, true)
    }, [loadAll, searchQuery, zohoPage])

    // 스레드 모드 토글
    const toggleThreadMode = useCallback(() => {
        setThreadMode(t => !t)
        setGmailNextToken(null)
        setTimeout(() => loadAll(searchQuery, 1, false), 0)
    }, [loadAll, searchQuery])

    // 메일 상세 로드
    const loadDetail = useCallback(async (type: "gmail" | "zoho", id: string) => {
        setDetailLoading(true)
        setMailDetail(null)
        try {
            const url = type === "gmail" ? `/api/gmail/messages/${id}` : `/api/zoho/messages/${id}`
            const res = await fetch(url)
            const json = await res.json()
            if (json.message) setMailDetail(json.message)
        } catch { /* 무시 */ }
        finally { setDetailLoading(false) }
    }, [])

    const selectMail = (type: "gmail" | "zoho", id: string) => {
        setSelectedItem({ type, id })
        setSelectedSubmission(null)
        loadDetail(type, id)
    }

    const selectSubmission = (s: Submission) => {
        setSelectedItem({ type: "form", id: s.id })
        setSelectedSubmission(s)
        setMailDetail(null)
    }

    const openReply = (toEmail: string, subject: string, snippet = "") => {
        setComposerTo(toEmail)
        setComposerSubject(subject.startsWith("Re:") ? subject : `Re: ${subject}`)
        setComposerSnippet(snippet)
        setComposerMode("reply")
        setComposerOpen(true)
    }

    const openCompose = () => {
        setComposerTo("")
        setComposerSubject("")
        setComposerSnippet("")
        setComposerMode("compose")
        setComposerOpen(true)
    }

    const handleSend = async (data: {
        from_email: string; to_email: string; cc?: string; bcc?: string
        subject: string; body: string; html: string
        attachments?: { filename: string; content: string; contentType: string; size: number }[]
    }) => {
        // 폼메일 답장 → /api/submissions/[id]/reply
        // 일반 메일   → /api/zoho/send (첨부 지원)
        const url = selectedSubmission
            ? `/api/submissions/${selectedSubmission.id}/reply`
            : "/api/zoho/send"

        const payload = selectedSubmission
            ? { from_email: data.from_email, to_email: data.to_email, subject: data.subject, body: data.body }
            : {
                to: data.to_email, cc: data.cc, bcc: data.bcc,
                subject: data.subject, text: data.body, html: data.html,
                from_email: data.from_email,
                attachments: data.attachments || [],
              }

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
        if (!res.ok) {
            const json = await res.json()
            throw new Error(json.error || "발송 실패")
        }
    }

    // 통합 목록 (날짜순)
    const allItems = [
        ...gmailMessages.map(m => ({ ...m, _type: "gmail" as const, _date: new Date(m.date) })),
        ...zohoMessages.map(m => ({ ...m, _type: "zoho" as const, _date: new Date(m.date) })),
        ...submissions.map(s => ({ ...s, _type: "form" as const, _date: new Date(s.created_at), isRead: s.status !== "new" })),
    ].sort((a, b) => b._date.getTime() - a._date.getTime())

    const visibleItems = tab === "all" ? allItems
        : tab === "gmail" ? allItems.filter(i => i._type === "gmail")
        : tab === "zoho" ? allItems.filter(i => i._type === "zoho")
        : allItems.filter(i => i._type === "form")

    const gmailUnread = gmailMessages.filter(m => !m.isRead).length
    const zohoUnread = zohoMessages.filter(m => !m.isRead).length
    const formNew = submissions.filter(s => s.status === "new").length

    const tabBtn = (t: TabType, count?: number) => (
        <button key={t} onClick={() => setTab(t)} style={{
            padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500,
            border: "none", cursor: "pointer", fontFamily: "inherit",
            background: tab === t ? "#0066FF" : "transparent",
            color: tab === t ? "#FFFFFF" : "#5A6A8A",
        }}>
            {TAB_LABEL[t]}
            {count && count > 0 ? (
                <span style={{
                    marginLeft: 5, background: tab === t ? "rgba(255,255,255,0.3)" : "#EEF5FF",
                    color: tab === t ? "#fff" : "#0046C0", borderRadius: 10,
                    padding: "1px 6px", fontSize: 10, fontWeight: 700,
                }}>{count}</span>
            ) : null}
        </button>
    )

    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Pretendard Variable', 'Inter', sans-serif" }}>

            {/* ── 좌측: 메일 목록 ── */}
            <div style={{ width: 360, flexShrink: 0, borderRight: "1px solid #E2E8F2", display: "flex", flexDirection: "column", background: "#FFFFFF" }}>
                {/* 헤더 */}
                <div style={{ padding: "18px 18px 0", borderBottom: "1px solid #F0F2F8" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#0066FF", letterSpacing: 1.5, fontFamily: "Inter" }}>MAIL</div>
                            <h1 style={{ fontSize: 17, fontWeight: 700, color: "#0A1733", margin: "3px 0 0", letterSpacing: -0.3 }}>통합 메일함</h1>
                        </div>
                            <div style={{ display: "flex", gap: 6 }}>
                            <button onClick={openCompose} style={{ background: "#0066FF", border: "none", borderRadius: 7, padding: "5px 12px", fontSize: 11, color: "#FFF", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
                                ✏️ 새 메일
                            </button>
                            <button onClick={() => loadAll()} style={{ background: "transparent", border: "1px solid #E2E8F2", borderRadius: 7, padding: "5px 10px", fontSize: 11, color: "#5A6A8A", cursor: "pointer", fontFamily: "inherit" }}>
                                새로고침
                            </button>
                        </div>
                    </div>

                    {/* 상태 알림 */}
                    {gmailConnected && <div style={{ marginBottom: 8, padding: "6px 10px", background: "#EDFAF5", borderRadius: 7, fontSize: 11, color: "#0A6B45", fontWeight: 500 }}>✅ Gmail 연결됨</div>}
                    {gmailError && <div style={{ marginBottom: 8, padding: "6px 10px", background: "#FFF0F0", borderRadius: 7, fontSize: 11, color: "#991B1B" }}>❌ Gmail 오류: {gmailError}</div>}
                    {zohoStatus === "disconnected" && <div style={{ marginBottom: 8, padding: "6px 10px", background: "#FFF8E6", borderRadius: 7, fontSize: 11, color: "#92600A" }}>⚠️ Zoho 연결 안됨 — 환경변수 확인</div>}
                    {gmailStatus === "disconnected" && (
                        <a href="/api/gmail/auth" style={{ display: "block", marginBottom: 8, padding: "6px 10px", background: "#EEF5FF", borderRadius: 7, fontSize: 11, color: "#0046C0", fontWeight: 600, textDecoration: "none" }}>
                            + Gmail 연결하기
                        </a>
                    )}

                    {/* 검색바 */}
                    <div style={{ position: "relative", marginBottom: 10 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8A9AB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input
                            type="text"
                            placeholder="보낸사람, 제목, 내용 검색..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSearch(searchQuery)}
                            style={{
                                width: "100%", paddingLeft: 30, paddingRight: searchQuery ? 30 : 10,
                                paddingTop: 7, paddingBottom: 7,
                                border: "1px solid #E2E8F2", borderRadius: 8,
                                fontSize: 12, color: "#0A1733", outline: "none",
                                fontFamily: "inherit", boxSizing: "border-box",
                                background: isSearching ? "#F8FAFF" : "#FFFFFF",
                            }}
                        />
                        {searchQuery && (
                            <button onClick={() => { setSearchQuery(""); loadAll("", 1, false) }} style={{
                                position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                                background: "none", border: "none", cursor: "pointer", color: "#8A9AB8", padding: 0, fontSize: 14,
                            }}>×</button>
                        )}
                    </div>

                    {/* 탭 + 스레드 토글 */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 12 }}>
                        <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                            {tabBtn("all")}
                            {tabBtn("gmail", gmailUnread)}
                            {tabBtn("zoho", zohoUnread)}
                            {tabBtn("form", formNew)}
                        </div>
                        <button onClick={toggleThreadMode} style={{
                            background: threadMode ? "#EEF5FF" : "transparent",
                            border: "1px solid " + (threadMode ? "#0066FF" : "#E2E8F2"),
                            borderRadius: 7, padding: "4px 9px", fontSize: 10,
                            color: threadMode ? "#0066FF" : "#8A9AB8",
                            cursor: "pointer", fontFamily: "inherit", fontWeight: threadMode ? 700 : 400,
                        }}>
                            스레드
                        </button>
                    </div>
                </div>

                {/* 목록 */}
                <div style={{ flex: 1, overflowY: "auto" }}>
                    {loading ? (
                        <div style={{ padding: 32, textAlign: "center", color: "#8A9AB8", fontSize: 13 }}>불러오는 중...</div>
                    ) : visibleItems.length === 0 ? (
                        <div style={{ padding: 40, textAlign: "center", color: "#8A9AB8", fontSize: 13 }}>메일이 없습니다</div>
                    ) : visibleItems.map((item, i) => {
                        const isSelected = selectedItem?.id === item.id
                        const dateStr = new Date(item._date).toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" })

                        if (item._type === "form") {
                            const sub = item as typeof item & Submission
                            return (
                                <div key={`form-${sub.id}`} onClick={() => selectSubmission(sub as unknown as Submission)} style={{
                                    padding: "12px 18px", borderBottom: "1px solid #F0F2F8", cursor: "pointer",
                                    background: isSelected ? "#F0F6FF" : "#FFFFFF",
                                    borderLeft: isSelected ? "3px solid #0066FF" : "3px solid transparent",
                                }}>
                                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                                        <span style={{ width: 18, height: 18, background: "#F0F2F8", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#374B6B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                        </span>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: "#0A1733", flex: 1 }}>{sub.name}</span>
                                        <span style={{ fontSize: 10, color: "#8A9AB8" }}>{dateStr}</span>
                                    </div>
                                    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                                        <span style={{ fontSize: 9, fontWeight: 700, background: sub.type === "join" ? "#EEF5FF" : "#F0F2F8", color: sub.type === "join" ? "#0046C0" : "#374B6B", borderRadius: 3, padding: "1px 5px" }}>
                                            {sub.type === "join" ? "가맹" : "기업"}
                                        </span>
                                        <span style={{ fontSize: 11, color: "#5A6A8A", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {(sub as unknown as Submission).email || sub.phone}
                                        </span>
                                        <StatusBadge status={sub.status} size="sm" />
                                    </div>
                                </div>
                            )
                        }

                        const mail = item as typeof item & MailMessage
                        const sourceColor = mail._type === "gmail" ? "#EA4335" : "#E3441A"
                        const sourceLabel = mail._type === "gmail" ? "G" : "Z"
                        const fromName = mail.from?.replace(/<.*>/, "").trim() || mail.from

                        return (
                            <div key={`${mail._type}-${mail.id}-${i}`} onClick={() => selectMail(mail._type as "gmail" | "zoho", mail.id)} style={{
                                padding: "12px 18px", borderBottom: "1px solid #F0F2F8", cursor: "pointer",
                                background: isSelected ? "#F0F6FF" : mail.isRead ? "#FFFFFF" : "#F8FAFF",
                                borderLeft: isSelected ? "3px solid #0066FF" : "3px solid transparent",
                            }}>
                                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                                    <span style={{ width: 18, height: 18, background: sourceColor, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontSize: 9, fontWeight: 700 }}>
                                        {sourceLabel}
                                    </span>
                                    <span style={{ fontSize: 12, fontWeight: mail.isRead ? 400 : 700, color: "#0A1733", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {fromName}
                                    </span>
                                    <span style={{ fontSize: 10, color: "#8A9AB8", flexShrink: 0 }}>{dateStr}</span>
                                </div>
                                <div style={{ fontSize: 12, fontWeight: mail.isRead ? 400 : 600, color: "#0A1733", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {mail.subject}
                                </div>
                                <div style={{ fontSize: 11, color: "#8A9AB8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {mail.snippet}
                                </div>
                            </div>
                        )
                    })}
                    {/* 더 보기 */}
                    {(gmailNextToken || zohoHasMore) && !loading && (
                        <div style={{ padding: "14px", textAlign: "center", borderTop: "1px solid #F0F2F8" }}>
                            <button
                                onClick={loadMore}
                                disabled={loadingMore}
                                style={{
                                    background: loadingMore ? "#F0F2F8" : "#FFFFFF",
                                    border: "1px solid #E2E8F2", borderRadius: 8,
                                    padding: "8px 20px", fontSize: 12, color: "#374B6B",
                                    cursor: loadingMore ? "default" : "pointer", fontFamily: "inherit", fontWeight: 500,
                                }}
                            >
                                {loadingMore ? "불러오는 중..." : "더 보기"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── 우측: 상세 ── */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFF", overflow: "hidden" }}>
                {!selectedItem ? (
                    <EmptyState />
                ) : selectedItem.type === "form" && selectedSubmission ? (
                    <FormDetail submission={selectedSubmission} onReply={email => openReply(email, `[${selectedSubmission.type === "join" ? "가맹" : "기업"}] ${selectedSubmission.name}님 답변`)} />
                ) : (
                    <MailDetailView detail={mailDetail} loading={detailLoading} onReply={openReply} />
                )}
            </div>

            {/* ── 메일 작성기 ── */}
            {composerOpen && (
                <MailComposer
                    initialTo={composerTo}
                    initialSubject={composerSubject}
                    originalSnippet={composerSnippet}
                    senderAccounts={senderAccounts}
                    mode={composerMode}
                    onSend={handleSend}
                    onClose={() => setComposerOpen(false)}
                />
            )}
        </div>
    )
}

// ── 빈 상태 ──
function EmptyState() {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, flexDirection: "column", gap: 12 }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#C8D0E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            <p style={{ fontSize: 13, color: "#8A9AB8", margin: 0 }}>메일을 선택하면 내용이 표시됩니다</p>
        </div>
    )
}

// ── 메일 상세 뷰 ──
function MailDetailView({ detail, loading, onReply }: {
    detail: MailDetail | null
    loading: boolean
    onReply: (to: string, subject: string) => void
}) {
    if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, color: "#8A9AB8", fontSize: 13 }}>불러오는 중...</div>
    if (!detail) return <EmptyState />

    const fromEmail = detail.from?.match(/<(.+)>/)?.[1] || detail.from
    const fromName = detail.from?.replace(/<.*>/, "").trim() || fromEmail
    const dateStr = new Date(detail.date).toLocaleString("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })

    return (
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px" }}>
            <div style={{ maxWidth: 680 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1733", margin: "0 0 10px", letterSpacing: -0.3 }}>{detail.subject}</h2>
                <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#8A9AB8", marginBottom: 20, flexWrap: "wrap" }}>
                    <span>보낸사람: <strong style={{ color: "#374B6B" }}>{fromName}</strong></span>
                    <span>받는사람: <strong style={{ color: "#374B6B" }}>{detail.to}</strong></span>
                    <span>{dateStr}</span>
                </div>

                <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F2", borderRadius: 12, padding: "24px", marginBottom: 20, minHeight: 200 }}>
                    {detail.html ? (
                        <div dangerouslySetInnerHTML={{ __html: detail.html }} style={{ fontSize: 14, lineHeight: 1.8, color: "#0A1733" }} />
                    ) : detail.text ? (
                        <pre style={{ fontSize: 14, lineHeight: 1.8, color: "#374B6B", whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0 }}>{detail.text}</pre>
                    ) : (
                        <p style={{ color: "#8A9AB8", fontSize: 13, margin: 0 }}>본문이 없습니다</p>
                    )}
                </div>

                <button onClick={() => onReply(fromEmail, detail.subject)} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "#0066FF", color: "#FFFFFF",
                    border: "none", borderRadius: 9, padding: "10px 20px",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 00-4-4H4"/></svg>
                    답장 보내기
                </button>
            </div>
        </div>
    )
}

// ── 폼메일 상세 ──
function FormDetail({ submission: s, onReply }: { submission: Submission; onReply: (email: string) => void }) {
    const dateStr = new Date(s.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
    const rows = [
        ["종류", s.type === "join" ? "NODE 가맹 신청" : "기업 IT 진단"],
        ["이름", s.name],
        ["연락처", s.phone],
        s.email && ["이메일", s.email],
        s.company && ["회사명", s.company],
        s.region && ["지역", s.region],
    ].filter((x): x is [string, string] => Boolean(x))

    return (
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px" }}>
            <div style={{ maxWidth: 640 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#0066FF", letterSpacing: 1.5, fontFamily: "Inter", marginBottom: 6 }}>폼메일 신청</div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0A1733", margin: "0 0 4px", letterSpacing: -0.3 }}>{s.name}{s.company ? ` · ${s.company}` : ""}</h2>
                <div style={{ fontSize: 12, color: "#8A9AB8", marginBottom: 20 }}>{dateStr}</div>

                <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F2", borderRadius: 12, padding: "18px 22px", marginBottom: 16 }}>
                    {rows.map(([label, value]) => (
                        <div key={label} style={{ display: "flex", gap: 16, padding: "8px 0", borderBottom: "1px solid #F0F2F8" }}>
                            <span style={{ fontSize: 11, color: "#8A9AB8", fontWeight: 600, width: 64, flexShrink: 0 }}>{label}</span>
                            <span style={{ fontSize: 13, color: "#0A1733" }}>{value}</span>
                        </div>
                    ))}
                    {s.message && (
                        <div style={{ paddingTop: 12 }}>
                            <div style={{ fontSize: 11, color: "#8A9AB8", fontWeight: 600, marginBottom: 6 }}>문의 내용</div>
                            <div style={{ fontSize: 13, color: "#374B6B", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{s.message}</div>
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: 16 }}><StatusBadge status={s.status} /></div>

                {s.email ? (
                    <button onClick={() => onReply(s.email!)} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        background: "#0066FF", color: "#FFFFFF",
                        border: "none", borderRadius: 9, padding: "10px 20px",
                        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                    }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 00-4-4H4"/></svg>
                        답장 보내기
                    </button>
                ) : (
                    <div style={{ padding: "10px 14px", background: "#F8FAFF", borderRadius: 8, fontSize: 12, color: "#8A9AB8" }}>
                        이메일 없음 — 연락처로 직접 연락해주세요
                    </div>
                )}
            </div>
        </div>
    )
}

const labelStyle: React.CSSProperties = { fontSize: 10, fontWeight: 600, color: "#8A9AB8", letterSpacing: 0.5, display: "block", marginBottom: 5 }
const inputStyle: React.CSSProperties = { width: "100%", border: "1px solid #E2E8F2", borderRadius: 8, padding: "8px 11px", fontSize: 13, color: "#0A1733", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }
