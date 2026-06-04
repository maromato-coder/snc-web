"use client"

import { useState, useRef, useCallback } from "react"

// ════════════════════════════════════════════════
// MailComposer — 세련된 메일 작성기
// 발신자 선택, 서식 툴바, 서명, 임시저장, 첨부 UI
// ════════════════════════════════════════════════

interface SenderAccount {
    email: string
    display_name: string
}

interface AttachmentFile {
    filename: string
    content: string   // base64
    contentType: string
    size: number
}

interface MailComposerProps {
    initialTo?: string
    initialSubject?: string
    initialBody?: string
    senderAccounts: SenderAccount[]
    onSend: (data: {
        from_email: string
        to_email: string
        cc?: string
        bcc?: string
        subject: string
        body: string
        html: string
        attachments: AttachmentFile[]
    }) => Promise<void>
    onClose: () => void
    mode?: "reply" | "compose" | "forward"
    originalSnippet?: string
}

type FormatCmd = "bold" | "italic" | "underline" | "strikeThrough" |
    "insertUnorderedList" | "insertOrderedList" | "justifyLeft" |
    "justifyCenter" | "justifyRight" | "createLink" | "removeFormat"

const FONT_SIZES = ["12px", "13px", "14px", "15px", "16px", "18px", "20px"]
const FONT_FAMILIES = [
    { label: "Pretendard", value: "'Pretendard Variable', sans-serif" },
    { label: "Inter", value: "'Inter', sans-serif" },
    { label: "Malgun Gothic", value: "'Malgun Gothic', sans-serif" },
    { label: "Courier", value: "'Courier New', monospace" },
]

export default function MailComposer({
    initialTo = "",
    initialSubject = "",
    initialBody = "",
    senderAccounts,
    onSend,
    onClose,
    mode = "compose",
    originalSnippet,
}: MailComposerProps) {
    const [fromEmail, setFromEmail] = useState(senderAccounts[0]?.email || "")
    const [to, setTo] = useState(initialTo)
    const [cc, setCc] = useState("")
    const [bcc, setBcc] = useState("")
    const [subject, setSubject] = useState(initialSubject)
    const [showCc, setShowCc] = useState(false)
    const [showBcc, setShowBcc] = useState(false)
    const [sending, setSending] = useState(false)
    const [sendMsg, setSendMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null)
    const [fontSize, setFontSize] = useState("14px")
    const [fontFamily, setFontFamily] = useState(FONT_FAMILIES[0].value)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const [showLinkInput, setShowLinkInput] = useState(false)
    const [linkUrl, setLinkUrl] = useState("")
    const [attachments, setAttachments] = useState<AttachmentFile[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const editorRef = useRef<HTMLDivElement>(null)
    const savedSelection = useRef<Range | null>(null)

    // 에디터 초기 내용 설정
    const getInitialHtml = () => {
        const signature = `
            <br/><br/>
            <div style="border-top: 1px solid #E2E8F2; padding-top: 12px; margin-top: 8px; color: #5A6A8A; font-size: 12px; line-height: 1.6;">
                <strong style="color: #0A1733;">${senderAccounts[0]?.display_name || "SNC"}</strong><br/>
                SNC · 1566-8099<br/>
                ${senderAccounts[0]?.email || ""}
            </div>
        `
        const quote = originalSnippet ? `
            <br/>
            <div style="border-left: 3px solid #E2E8F2; padding-left: 12px; color: #8A9AB8; font-size: 12px; margin-top: 16px;">
                ${originalSnippet}
            </div>
        ` : ""
        return `<p>${initialBody || ""}</p>${signature}${quote}`
    }

    // 서식 명령 실행
    const execFormat = useCallback((cmd: FormatCmd, value?: string) => {
        editorRef.current?.focus()
        document.execCommand(cmd, false, value)
        updateWordCount()
    }, [])

    // 선택 영역 저장 (링크 삽입 전)
    const saveSelection = () => {
        const sel = window.getSelection()
        if (sel && sel.rangeCount > 0) {
            savedSelection.current = sel.getRangeAt(0)
        }
    }

    // 링크 삽입
    const insertLink = () => {
        if (!linkUrl) return
        if (savedSelection.current) {
            const sel = window.getSelection()
            sel?.removeAllRanges()
            sel?.addRange(savedSelection.current)
        }
        execFormat("createLink", linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`)
        setShowLinkInput(false)
        setLinkUrl("")
    }

    // 폰트 크기 변경
    const changeFontSize = (size: string) => {
        setFontSize(size)
        editorRef.current?.focus()
        document.execCommand("fontSize", false, "7")
        const els = editorRef.current?.querySelectorAll('font[size="7"]')
        els?.forEach(el => {
            (el as HTMLElement).removeAttribute("size");
            (el as HTMLElement).style.fontSize = size
        })
    }

    // 글자 수 업데이트
    const updateWordCount = () => {
        const text = editorRef.current?.innerText || ""
        setWordCount(text.replace(/\s/g, "").length)
    }

    // 파일 첨부
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        files.forEach(file => {
            if (file.size > 5 * 1024 * 1024) {
                alert(`${file.name}: 파일 크기는 5MB 이하여야 합니다`)
                return
            }
            const reader = new FileReader()
            reader.onload = (ev) => {
                const base64 = (ev.target?.result as string).split(",")[1]
                setAttachments(prev => [...prev, {
                    filename: file.name,
                    content: base64,
                    contentType: file.type || "application/octet-stream",
                    size: file.size,
                }])
            }
            reader.readAsDataURL(file)
        })
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const removeAttachment = (idx: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== idx))
    }

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes}B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
        return `${(bytes / 1024 / 1024).toFixed(1)}MB`
    }

    // 발송
    const handleSend = async () => {
        if (!to.trim() || !subject.trim()) {
            setSendMsg({ type: "err", text: "수신자와 제목을 입력해주세요" })
            return
        }
        const html = editorRef.current?.innerHTML || ""
        const text = editorRef.current?.innerText || ""
        if (!text.trim()) {
            setSendMsg({ type: "err", text: "내용을 입력해주세요" })
            return
        }

        setSending(true)
        setSendMsg(null)
        try {
            await onSend({ from_email: fromEmail, to_email: to, cc, bcc, subject, body: text, html, attachments })
            setSendMsg({ type: "ok", text: "발송 완료!" })
            setTimeout(() => onClose(), 1200)
        } catch {
            setSendMsg({ type: "err", text: "발송 실패. 다시 시도해주세요." })
        } finally {
            setSending(false)
        }
    }

    const modeLabel = mode === "reply" ? "답장" : mode === "forward" ? "전달" : "새 메일"
    const modeColor = mode === "reply" ? "#0066FF" : mode === "forward" ? "#6366F1" : "#10B981"

    const toolBtn = (onClick: () => void, title: string, children: React.ReactNode, active = false) => (
        <button
            key={title}
            onClick={onClick}
            title={title}
            style={{
                background: active ? "#EEF5FF" : "transparent",
                border: "none",
                borderRadius: 5,
                padding: "5px 7px",
                cursor: "pointer",
                color: active ? "#0066FF" : "#374B6B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.1s",
            }}
        >
            {children}
        </button>
    )

    const containerStyle: React.CSSProperties = isFullscreen ? {
        position: "fixed",
        inset: 0,
        zIndex: 60,
        borderRadius: 0,
    } : {
        position: "fixed",
        bottom: 0,
        right: 24,
        width: 600,
        zIndex: 50,
        borderRadius: "14px 14px 0 0",
        boxShadow: "0 -4px 32px rgba(10,23,51,0.18)",
    }

    return (
        <>
            {isFullscreen && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(10,23,51,0.4)", zIndex: 55 }} />
            )}
            <div style={{
                ...containerStyle,
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                fontFamily: "'Pretendard Variable', 'Inter', sans-serif",
                overflow: "hidden",
            }}>
                {/* ── 타이틀 바 ── */}
                <div style={{
                    background: `linear-gradient(135deg, ${modeColor}15 0%, ${modeColor}08 100%)`,
                    borderBottom: `2px solid ${modeColor}30`,
                    padding: "12px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexShrink: 0,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{
                            width: 24, height: 24, borderRadius: 6,
                            background: modeColor,
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                {mode === "reply"
                                    ? <><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 00-4-4H4"/></>
                                    : <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>
                                }
                            </svg>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0A1733" }}>{modeLabel} 작성</span>
                        {wordCount > 0 && (
                            <span style={{ fontSize: 10, color: "#8A9AB8", background: "#F0F2F8", borderRadius: 4, padding: "2px 6px" }}>
                                {wordCount}자
                            </span>
                        )}
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                        <button onClick={() => setIsFullscreen(f => !f)} title={isFullscreen ? "축소" : "전체화면"} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#8A9AB8", padding: 4, borderRadius: 5 }}>
                            {isFullscreen
                                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"/></svg>
                                : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
                            }
                        </button>
                        <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#8A9AB8", padding: 4, borderRadius: 5 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>
                </div>

                {/* ── 수신자 / 발신자 필드 ── */}
                <div style={{ borderBottom: "1px solid #F0F2F8", flexShrink: 0 }}>
                    {/* 발신자 */}
                    <FieldRow label="보낸사람">
                        <select value={fromEmail} onChange={e => setFromEmail(e.target.value)} style={fieldSelectStyle}>
                            {senderAccounts.map(a => (
                                <option key={a.email} value={a.email}>{a.display_name} &lt;{a.email}&gt;</option>
                            ))}
                        </select>
                    </FieldRow>

                    {/* 수신자 */}
                    <FieldRow label="받는사람" actions={
                        <div style={{ display: "flex", gap: 6 }}>
                            {!showCc && <FieldTag label="참조" onClick={() => setShowCc(true)} />}
                            {!showBcc && <FieldTag label="숨김" onClick={() => setShowBcc(true)} />}
                        </div>
                    }>
                        <input
                            value={to}
                            onChange={e => setTo(e.target.value)}
                            placeholder="recipient@example.com"
                            style={fieldInputStyle}
                        />
                    </FieldRow>

                    {/* 참조 */}
                    {showCc && (
                        <FieldRow label="참조" actions={<FieldTag label="✕" onClick={() => { setShowCc(false); setCc("") }} />}>
                            <input value={cc} onChange={e => setCc(e.target.value)} placeholder="cc@example.com" style={fieldInputStyle} />
                        </FieldRow>
                    )}

                    {/* 숨은참조 */}
                    {showBcc && (
                        <FieldRow label="숨은참조" actions={<FieldTag label="✕" onClick={() => { setShowBcc(false); setBcc("") }} />}>
                            <input value={bcc} onChange={e => setBcc(e.target.value)} placeholder="bcc@example.com" style={fieldInputStyle} />
                        </FieldRow>
                    )}

                    {/* 제목 */}
                    <FieldRow label="제목">
                        <input
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            placeholder="메일 제목을 입력하세요"
                            style={{ ...fieldInputStyle, fontWeight: 600, fontSize: 14 }}
                        />
                    </FieldRow>
                </div>

                {/* ── 서식 툴바 ── */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    padding: "6px 12px",
                    borderBottom: "1px solid #F0F2F8",
                    flexWrap: "wrap",
                    flexShrink: 0,
                    background: "#FAFBFF",
                }}>
                    {/* 폰트 */}
                    <select value={fontFamily} onChange={e => { setFontFamily(e.target.value); editorRef.current?.focus() }} style={toolSelectStyle}>
                        {FONT_FAMILIES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                    </select>
                    <select value={fontSize} onChange={e => changeFontSize(e.target.value)} style={{ ...toolSelectStyle, width: 56 }}>
                        {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <div style={{ width: 1, height: 16, background: "#E2E8F2", margin: "0 4px" }} />

                    {toolBtn(() => execFormat("bold"), "굵게", <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 4h8a4 4 0 010 8H6z"/><path d="M6 12h9a4 4 0 010 8H6z"/></svg>)}
                    {toolBtn(() => execFormat("italic"), "기울임", <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>)}
                    {toolBtn(() => execFormat("underline"), "밑줄", <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>)}
                    {toolBtn(() => execFormat("strikeThrough"), "취소선", <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17.3 12H20"/><path d="M4 12h2.7"/><path d="M10.4 6.3c.3-.4.8-.8 1.3-1 .7-.4 1.5-.6 2.3-.5 1.1 0 2.1.4 2.9 1.1"/><path d="M6.2 17.7c.8 1 2.1 1.6 3.5 1.6 1 0 1.9-.2 2.7-.7.6-.3 1.1-.8 1.4-1.4"/></svg>)}

                    <div style={{ width: 1, height: 16, background: "#E2E8F2", margin: "0 4px" }} />

                    {toolBtn(() => execFormat("insertUnorderedList"), "글머리 기호", <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>)}
                    {toolBtn(() => execFormat("insertOrderedList"), "번호 목록", <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>)}

                    <div style={{ width: 1, height: 16, background: "#E2E8F2", margin: "0 4px" }} />

                    {toolBtn(() => execFormat("justifyLeft"), "왼쪽 정렬", <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>)}
                    {toolBtn(() => execFormat("justifyCenter"), "가운데 정렬", <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></svg>)}
                    {toolBtn(() => execFormat("justifyRight"), "오른쪽 정렬", <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/></svg>)}

                    <div style={{ width: 1, height: 16, background: "#E2E8F2", margin: "0 4px" }} />

                    {/* 링크 */}
                    <div style={{ position: "relative" }}>
                        {toolBtn(() => { saveSelection(); setShowLinkInput(v => !v) }, "링크 삽입",
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
                            showLinkInput
                        )}
                        {showLinkInput && (
                            <div style={{
                                position: "absolute", top: "calc(100% + 6px)", left: 0,
                                background: "#FFFFFF", border: "1px solid #E2E8F2",
                                borderRadius: 10, padding: "10px 12px",
                                boxShadow: "0 4px 16px rgba(10,23,51,0.12)",
                                zIndex: 10, width: 260,
                                display: "flex", gap: 6,
                            }}>
                                <input
                                    value={linkUrl}
                                    onChange={e => setLinkUrl(e.target.value)}
                                    placeholder="https://example.com"
                                    onKeyDown={e => e.key === "Enter" && insertLink()}
                                    autoFocus
                                    style={{ flex: 1, border: "1px solid #E2E8F2", borderRadius: 6, padding: "5px 8px", fontSize: 12, outline: "none" }}
                                />
                                <button onClick={insertLink} style={{ background: "#0066FF", color: "#FFF", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>삽입</button>
                            </div>
                        )}
                    </div>

                    {toolBtn(() => execFormat("removeFormat"), "서식 제거",
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/><line x1="18" y1="18" x2="6" y2="6"/></svg>
                    )}

                    <div style={{ width: 1, height: 16, background: "#E2E8F2", margin: "0 4px" }} />

                    {/* 파일 첨부 */}
                    <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} style={{ display: "none" }} />
                    {toolBtn(() => fileInputRef.current?.click(), "파일 첨부",
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                        </svg>,
                        attachments.length > 0
                    )}
                    {attachments.length > 0 && (
                        <span style={{ fontSize: 10, color: "#0066FF", fontWeight: 600, background: "#EEF5FF", borderRadius: 4, padding: "2px 6px" }}>
                            {attachments.length}개
                        </span>
                    )}
                </div>

                {/* ── 첨부 파일 목록 ── */}
                {attachments.length > 0 && (
                    <div style={{
                        padding: "8px 16px", borderBottom: "1px solid #F0F2F8",
                        display: "flex", flexWrap: "wrap", gap: 6, flexShrink: 0,
                        background: "#FAFBFF",
                    }}>
                        {attachments.map((att, i) => (
                            <div key={i} style={{
                                display: "flex", alignItems: "center", gap: 6,
                                background: "#FFFFFF", border: "1px solid #E2E8F2",
                                borderRadius: 7, padding: "4px 10px", fontSize: 11,
                            }}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5A6A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                                </svg>
                                <span style={{ color: "#374B6B", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{att.filename}</span>
                                <span style={{ color: "#8A9AB8" }}>{formatBytes(att.size)}</span>
                                <button onClick={() => removeAttachment(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A9AB8", padding: 0, lineHeight: 1, fontSize: 13 }}>×</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── 에디터 본문 ── */}
                <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={updateWordCount}
                    dangerouslySetInnerHTML={{ __html: getInitialHtml() }}
                    style={{
                        flex: 1,
                        padding: "16px 20px",
                        outline: "none",
                        overflowY: "auto",
                        fontSize,
                        fontFamily,
                        lineHeight: 1.75,
                        color: "#0A1733",
                        minHeight: isFullscreen ? "calc(100vh - 280px)" : 220,
                    }}
                />

                {/* ── 하단 바 ── */}
                <div style={{
                    padding: "10px 16px",
                    borderTop: "1px solid #F0F2F8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexShrink: 0,
                    background: "#FAFBFF",
                }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        {/* 발송 버튼 */}
                        <button
                            onClick={handleSend}
                            disabled={sending}
                            style={{
                                display: "flex", alignItems: "center", gap: 7,
                                background: sending ? "#6B8FCC" : "#0066FF",
                                color: "#FFFFFF", border: "none", borderRadius: 9,
                                padding: "9px 20px", fontSize: 13, fontWeight: 700,
                                cursor: sending ? "wait" : "pointer",
                                fontFamily: "inherit",
                                boxShadow: sending ? "none" : "0 4px 14px rgba(0,102,255,0.3)",
                                transition: "all 0.15s",
                            }}
                        >
                            {sending ? (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
                                        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                                        <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                                        <path d="M12 3a9 9 0 019 9" stroke="#FFF" strokeWidth="3" strokeLinecap="round"/>
                                    </svg>
                                    발송 중...
                                </>
                            ) : (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                                    </svg>
                                    발송
                                </>
                            )}
                        </button>

                        {/* 상태 메시지 */}
                        {sendMsg && (
                            <span style={{
                                fontSize: 12, fontWeight: 600,
                                color: sendMsg.type === "ok" ? "#10B981" : "#EF4444",
                                display: "flex", alignItems: "center", gap: 4,
                            }}>
                                {sendMsg.type === "ok" ? "✓" : "✕"} {sendMsg.text}
                            </span>
                        )}
                    </div>

                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "#8A9AB8" }}>{wordCount}자</span>
                        <button onClick={onClose} style={{ background: "transparent", border: "1px solid #E2E8F2", borderRadius: 7, padding: "7px 12px", fontSize: 12, color: "#5A6A8A", cursor: "pointer", fontFamily: "inherit" }}>
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

// ── 필드 행 ──
function FieldRow({ label, children, actions }: { label: string; children: React.ReactNode; actions?: React.ReactNode }) {
    return (
        <div style={{ display: "flex", alignItems: "center", padding: "0 16px", borderBottom: "1px solid #F8FAFF", minHeight: 40 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#8A9AB8", width: 64, flexShrink: 0, letterSpacing: 0.3 }}>{label}</span>
            <div style={{ flex: 1 }}>{children}</div>
            {actions && <div style={{ flexShrink: 0, paddingLeft: 8 }}>{actions}</div>}
        </div>
    )
}

function FieldTag({ label, onClick }: { label: string; onClick: () => void }) {
    return (
        <button onClick={onClick} style={{ background: "#F0F2F8", border: "none", borderRadius: 5, padding: "2px 8px", fontSize: 11, color: "#5A6A8A", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>
            {label}
        </button>
    )
}

const fieldInputStyle: React.CSSProperties = {
    width: "100%", border: "none", outline: "none",
    fontSize: 13, color: "#0A1733", padding: "8px 0",
    background: "transparent", fontFamily: "inherit",
}
const fieldSelectStyle: React.CSSProperties = {
    width: "100%", border: "none", outline: "none",
    fontSize: 13, color: "#0A1733", padding: "8px 0",
    background: "transparent", fontFamily: "inherit", cursor: "pointer",
}
const toolSelectStyle: React.CSSProperties = {
    border: "1px solid #E2E8F2", borderRadius: 6,
    padding: "4px 6px", fontSize: 11, color: "#374B6B",
    background: "#FFFFFF", cursor: "pointer", fontFamily: "inherit",
    outline: "none", width: 100,
}
