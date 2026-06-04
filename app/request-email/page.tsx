"use client"

import { useState } from "react"

// ════════════════════════════════════════════════
// /request-email — @sncpc.com 이메일 계정 신청 폼
// 외부 공개 페이지 (대리점·직원 신청용)
// ════════════════════════════════════════════════

export default function RequestEmailPage() {
    const [form, setForm] = useState({
        requester_name: "",
        requester_email: "",
        requested_username: "",  // @sncpc.com 앞부분
        department: "",
        purpose: "",
    })
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError("")
    }

    const handleSubmit = async () => {
        if (!form.requester_name.trim() || !form.requester_email.trim() || !form.requested_username.trim()) {
            setError("이름, 연락 이메일, 원하는 계정명은 필수입니다")
            return
        }

        // 계정명 유효성 검사 (영문·숫자·점·하이픈만)
        const usernameRegex = /^[a-zA-Z0-9._-]+$/
        if (!usernameRegex.test(form.requested_username)) {
            setError("계정명은 영문·숫자·점(.)·하이픈(-)만 사용 가능합니다")
            return
        }

        setSubmitting(true)
        setError("")

        try {
            const res = await fetch("/api/email-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    requester_name: form.requester_name.trim(),
                    requester_email: form.requester_email.trim(),
                    requested_email: `${form.requested_username.trim().toLowerCase()}@sncpc.com`,
                    department: form.department.trim() || null,
                    purpose: form.purpose.trim() || null,
                }),
            })
            const json = await res.json()
            if (res.ok) {
                setSubmitted(true)
            } else {
                setError(json.error || "신청에 실패했습니다")
            }
        } catch {
            setError("일시적 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main style={{
            minHeight: "100vh",
            background: "radial-gradient(circle at 20% 30%, rgba(0,102,255,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,184,240,0.08) 0%, transparent 50%), #F8FAFF",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
            fontFamily: "'Pretendard Variable', 'Inter', sans-serif",
        }}>
            <div style={{
                background: "#FFFFFF", borderRadius: 20,
                padding: "44px 40px", maxWidth: 480, width: "100%",
                boxShadow: "0 4px 32px rgba(10,23,51,0.08)",
                border: "1px solid #E2E8F2",
            }}>
                {/* 로고 */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
                    <div style={{
                        width: 36, height: 36,
                        background: "linear-gradient(135deg, #0066FF, #003BB5)",
                        borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <span style={{ color: "#FFF", fontSize: 12, fontWeight: 700, fontFamily: "Inter" }}>SNC</span>
                    </div>
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#0A1733" }}>SNC</div>
                        <div style={{ fontSize: 11, color: "#8A9AB8" }}>이메일 계정 신청</div>
                    </div>
                </div>

                {submitted ? (
                    /* 완료 화면 */
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                        <div style={{
                            width: 64, height: 64, background: "#EDFAF5",
                            border: "2px solid #10B981", borderRadius: "50%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            margin: "0 auto 24px",
                        }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                <path d="M5 13l4 4L19 7" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0A1733", margin: "0 0 12px", letterSpacing: -0.5 }}>
                            신청이 접수되었습니다
                        </h2>
                        <p style={{ fontSize: 14, color: "#5A6A8A", lineHeight: 1.7, margin: "0 0 20px" }}>
                            <strong style={{ color: "#0066FF" }}>{form.requested_username.toLowerCase()}@sncpc.com</strong> 계정 신청이<br/>
                            접수되었습니다. 접수 확인 메일을 보내드렸어요.
                        </p>
                        <div style={{
                            background: "#F8FAFF", borderRadius: 10, padding: "14px 18px",
                            fontSize: 13, color: "#5A6A8A", lineHeight: 1.7,
                        }}>
                            담당자 검토 후 <strong>1~2 영업일 내</strong>에<br/>
                            결과를 이메일로 알려드립니다.<br/>
                            문의: <strong style={{ color: "#0A1733" }}>1566-8099</strong>
                        </div>
                    </div>
                ) : (
                    /* 신청 폼 */
                    <>
                        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0A1733", margin: "0 0 8px", letterSpacing: -0.5 }}>
                            @sncpc.com 이메일 신청
                        </h1>
                        <p style={{ fontSize: 13, color: "#5A6A8A", margin: "0 0 28px", lineHeight: 1.6 }}>
                            SNC 공식 이메일 계정을 신청합니다. 담당자 확인 후 발급해드립니다.
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <Field label="이름" required>
                                <input
                                    name="requester_name"
                                    value={form.requester_name}
                                    onChange={handleChange}
                                    placeholder="홍길동"
                                    style={inputStyle}
                                />
                            </Field>

                            <Field label="연락 이메일" required hint="신청 결과를 받을 이메일 주소">
                                <input
                                    name="requester_email"
                                    type="email"
                                    value={form.requester_email}
                                    onChange={handleChange}
                                    placeholder="hong@example.com"
                                    style={inputStyle}
                                />
                            </Field>

                            <Field label="원하는 계정명" required hint="@sncpc.com 앞부분 (영문·숫자·점·하이픈)">
                                <div style={{ display: "flex", alignItems: "center", border: "1px solid #E2E8F2", borderRadius: 10, overflow: "hidden" }}>
                                    <input
                                        name="requested_username"
                                        value={form.requested_username}
                                        onChange={handleChange}
                                        placeholder="jyp"
                                        style={{ ...inputStyle, border: "none", borderRadius: 0, flex: 1 }}
                                    />
                                    <div style={{
                                        background: "#F8FAFF", padding: "0 14px",
                                        fontSize: 13, color: "#5A6A8A", fontWeight: 500,
                                        borderLeft: "1px solid #E2E8F2", whiteSpace: "nowrap",
                                        alignSelf: "stretch", display: "flex", alignItems: "center",
                                    }}>
                                        @sncpc.com
                                    </div>
                                </div>
                                {form.requested_username && (
                                    <div style={{ marginTop: 5, fontSize: 12, color: "#0066FF", fontWeight: 500 }}>
                                        → {form.requested_username.toLowerCase()}@sncpc.com
                                    </div>
                                )}
                            </Field>

                            <Field label="소속">
                                <input
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                    placeholder="예: SNC 강남 대리점, 본사 영업팀"
                                    style={inputStyle}
                                />
                            </Field>

                            <Field label="사용 목적">
                                <textarea
                                    name="purpose"
                                    value={form.purpose}
                                    onChange={handleChange}
                                    placeholder="예: 고객 대응 및 AS 업무용"
                                    rows={3}
                                    style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                                />
                            </Field>

                            {error && (
                                <div style={{
                                    padding: "10px 14px", background: "#FFF0F0",
                                    border: "1px solid #FECACA", borderRadius: 8,
                                    fontSize: 13, color: "#991B1B",
                                }}>
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                style={{
                                    background: submitting ? "#6B8FCC" : "#0066FF",
                                    color: "#FFFFFF", border: "none", borderRadius: 12,
                                    padding: "14px", fontSize: 15, fontWeight: 700,
                                    cursor: submitting ? "wait" : "pointer",
                                    fontFamily: "inherit",
                                    boxShadow: submitting ? "none" : "0 4px 16px rgba(0,102,255,0.3)",
                                    transition: "all 0.15s",
                                    marginTop: 4,
                                }}
                            >
                                {submitting ? "신청 중..." : "신청하기"}
                            </button>

                            <div style={{ fontSize: 11, color: "#8A9AB8", textAlign: "center", lineHeight: 1.6 }}>
                                제출 시 개인정보 수집·이용에 동의하는 것으로 간주됩니다.<br/>
                                문의: 1566-8099
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    )
}

function Field({ label, required, hint, children }: {
    label: string
    required?: boolean
    hint?: string
    children: React.ReactNode
}) {
    return (
        <div>
            <label style={{
                display: "block", fontSize: 13, fontWeight: 600,
                color: "#374B6B", marginBottom: 6,
            }}>
                {label}
                {required && <span style={{ color: "#0066FF", marginLeft: 3 }}>*</span>}
            </label>
            {hint && <div style={{ fontSize: 11, color: "#8A9AB8", marginBottom: 6 }}>{hint}</div>}
            {children}
        </div>
    )
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #E2E8F2",
    borderRadius: 10,
    padding: "11px 14px",
    fontSize: 14,
    color: "#0A1733",
    outline: "none",
    boxSizing: "border-box",
    background: "#FFFFFF",
    transition: "border-color 0.15s",
}
