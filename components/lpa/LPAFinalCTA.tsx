"use client"

import * as React from "react"

export default function LPAFinalCTA() {
    const [isMobile, setIsMobile] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    const [form, setForm] = React.useState({ name: "", phone: "", email: "", region: "", message: "" })
    const [submitted, setSubmitted] = React.useState(false)
    const [submitting, setSubmitting] = React.useState(false)
    const [error, setError] = React.useState("")

    React.useEffect(() => {
        setMounted(true)
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    const m = mounted && isMobile

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError("")
    }

    const handleSubmit = async () => {
        if (!form.name.trim() || !form.phone.trim()) {
            setError("이름과 연락처는 필수입니다.")
            return
        }
        setSubmitting(true)
        setError("")
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "join", ...form }),
            })
            if (!res.ok) throw new Error("submit failed")
            setSubmitted(true)
        } catch (err) {
            console.error(err)
            setError("일시적 오류가 발생했습니다. 잠시 후 다시 시도하시거나 1566-8099로 전화 주세요.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section
            id="apply"
            style={{
                background: "#050E1F",
                color: "#FFFFFF",
                padding: m ? "72px 20px 96px" : "140px 80px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "radial-gradient(circle at 25% 40%, rgba(0, 102, 255, 0.22) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(0, 184, 240, 0.10) 0%, transparent 55%)",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    position: "relative",
                    maxWidth: 1200,
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: m ? "1fr" : "1fr 1fr",
                    gap: m ? 40 : 80,
                    alignItems: "center",
                }}
            >
                {/* LEFT */}
                <div>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            background: "rgba(51, 133, 255, 0.12)",
                            border: "1px solid rgba(51, 133, 255, 0.25)",
                            padding: m ? "6px 14px" : "8px 18px",
                            borderRadius: 100,
                            fontSize: m ? 11 : 13,
                            letterSpacing: 1.8,
                            color: "#66AAFF",
                            marginBottom: m ? 24 : 32,
                            fontWeight: 500,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        <span style={{ width: 7, height: 7, background: "#66AAFF", borderRadius: "50%" }} />
                        지금 신청하기
                    </div>
                    <h2 style={{ fontSize: m ? 30 : 48, lineHeight: 1.2, fontWeight: 500, letterSpacing: m ? -1 : -2, color: "#FFFFFF", margin: m ? "0 0 20px 0" : "0 0 28px 0" }}>
                        25년의 손기술,
                        <br />
                        <span style={{ color: "#66AAFF" }}>이제 이름을 가질 시간.</span>
                    </h2>
                    <p style={{ fontSize: m ? 15 : 18, lineHeight: 1.7, color: "rgba(255, 255, 255, 0.7)", margin: m ? "0 0 32px 0" : "0 0 40px 0" }}>
                        지금 신청하면 90일 무료로 모든 시스템을 경험합니다. 부담 없이 시작하고, 직접 겪어본 뒤 결정하세요.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: m ? 28 : 32, borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
                        <div style={{ fontSize: m ? 13 : 14, color: "rgba(255, 255, 255, 0.55)", marginBottom: 4 }}>전화·카톡 상담이 편하시다면</div>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <a href="tel:1566-8099" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.18)", color: "#FFFFFF", padding: m ? "12px 18px" : "14px 22px", borderRadius: 12, fontSize: m ? 14 : 15, textDecoration: "none", fontWeight: 500 }}>
                                <PhoneIcon />
                                1566-8099
                            </a>
                            <a href="https://pf.kakao.com/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#FEE500", color: "#3A1D1D", padding: m ? "12px 18px" : "14px 22px", borderRadius: 12, fontSize: m ? 14 : 15, textDecoration: "none", fontWeight: 500 }}>
                                <KakaoIcon />
                                카톡 상담
                            </a>
                        </div>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: 24, padding: m ? "28px 24px" : "40px 40px", backdropFilter: "blur(10px)" }}>
                    {submitted ? (
                        <div style={{ textAlign: "center", padding: m ? "20px 0" : "40px 0" }}>
                            <div style={{ width: 64, height: 64, background: "rgba(0, 224, 184, 0.15)", border: "1px solid rgba(0, 224, 184, 0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 13l4 4L19 7" stroke="#00E0B8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: m ? 20 : 24, fontWeight: 500, color: "#FFFFFF", margin: "0 0 12px 0", letterSpacing: -0.5 }}>신청이 접수되었습니다</h3>
                            <p style={{ fontSize: m ? 14 : 15, color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.6, margin: "0 0 24px 0" }}>
                                {form.name}님, 감사합니다.
                                <br />
                                영업일 기준 1~2일 내에 담당자가 연락드립니다.
                            </p>
                            <div style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.5)", padding: "14px 18px", background: "rgba(255, 255, 255, 0.05)", borderRadius: 12 }}>
                                급하시면 지금 바로 <strong style={{ color: "#66AAFF", fontWeight: 500 }}>1566-8099</strong>로 전화 주세요.
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 style={{ fontSize: m ? 20 : 24, fontWeight: 500, color: "#FFFFFF", margin: "0 0 8px 0", letterSpacing: -0.5 }}>가맹 상담 신청</h3>
                            <p style={{ fontSize: m ? 13 : 14, color: "rgba(255, 255, 255, 0.6)", margin: m ? "0 0 24px 0" : "0 0 28px 0", lineHeight: 1.5 }}>간단히 남겨주시면 담당자가 직접 연락드립니다.</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: m ? 14 : 16 }}>
                                <FormField label="이름" required>
                                    <input name="name" value={form.name} onChange={handleChange} placeholder="홍길동" disabled={submitting} style={inputStyle} />
                                </FormField>
                                <FormField label="연락처" required>
                                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="010-0000-0000" inputMode="tel" disabled={submitting} style={inputStyle} />
                                </FormField>
                                <FormField label="이메일">
                                    <input name="email" value={form.email} onChange={handleChange} placeholder="example@email.com" inputMode="email" type="email" disabled={submitting} style={inputStyle} />
                                </FormField>
                                <FormField label="지역">
                                    <input name="region" value={form.region} onChange={handleChange} placeholder="예: 서울 강동구" disabled={submitting} style={inputStyle} />
                                </FormField>
                                <FormField label="문의 내용">
                                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="궁금한 점을 자유롭게 적어주세요 (선택)" rows={3} disabled={submitting} style={{ ...inputStyle, resize: "vertical", minHeight: 80, fontFamily: "inherit" }} />
                                </FormField>
                                {error && <div style={{ fontSize: 13, color: "#FF6B6B", marginTop: -4 }}>{error}</div>}
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    style={{
                                        background: submitting ? "#3D6EBC" : "#0066FF",
                                        color: "#FFFFFF",
                                        padding: m ? "14px 24px" : "16px 32px",
                                        borderRadius: 12,
                                        fontSize: m ? 15 : 16,
                                        border: "none",
                                        fontWeight: 500,
                                        fontFamily: "inherit",
                                        cursor: submitting ? "wait" : "pointer",
                                        marginTop: 6,
                                        boxShadow: submitting ? "none" : "0 12px 28px rgba(0, 102, 255, 0.35)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 8,
                                        opacity: submitting ? 0.85 : 1,
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {submitting ? (
                                        <>
                                            <Spinner />
                                            전송 중...
                                        </>
                                    ) : (
                                        <>
                                            90일 무료로 시작하기
                                            <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                                        </>
                                    )}
                                </button>
                                <div style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.45)", textAlign: "center", lineHeight: 1.5 }}>제출 시 개인정보 수집·이용에 동의하는 것으로 간주됩니다.</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
    return (
        <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "rgba(255, 255, 255, 0.8)", marginBottom: 8 }}>
                {label}
                {required && <span style={{ color: "#66AAFF", marginLeft: 4 }}>*</span>}
            </label>
            {children}
        </div>
    )
}

function Spinner() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.25)" strokeWidth="3" fill="none" />
            <path d="M12 3a9 9 0 0 1 9 9" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
    )
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    padding: "13px 16px",
    fontSize: 15,
    color: "#FFFFFF",
    outline: "none",
    boxSizing: "border-box",
}

function PhoneIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function KakaoIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#3A1D1D">
            <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.74 1.83 5.15 4.6 6.52-.2.73-.73 2.65-.84 3.06-.13.51.19.5.4.36.16-.1 2.6-1.77 3.66-2.49.7.1 1.43.15 2.18.15 5.52 0 10-3.48 10-7.8S17.52 3 12 3z" />
        </svg>
    )
}
