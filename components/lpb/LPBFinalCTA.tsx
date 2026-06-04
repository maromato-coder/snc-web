"use client"

import * as React from "react"

const companySizes = ["~50명", "50~200명", "200~500명", "500명+"]

export default function LPBFinalCTA() {
    const [isMobile, setIsMobile] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    const [form, setForm] = React.useState({
        company: "",
        name: "",
        phone: "",
        email: "",
        size: "",
        message: "",
    })
    const [submitted, setSubmitted] = React.useState(false)
    const [error, setError] = React.useState("")

    React.useEffect(() => {
        setMounted(true)
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    const m = mounted && isMobile

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError("")
    }

    const handleSubmit = () => {
        if (!form.company.trim() || !form.name.trim() || !form.phone.trim()) {
            setError("회사명, 담당자명, 연락처는 필수입니다.")
            return
        }
        // ════════════════════════════════════════════
        // ⚠️ 나중에 실제 연동 시 이 부분만 교체
        // ════════════════════════════════════════════
        console.log("[기업 진단 신청 데이터]", form)
        setSubmitted(true)
    }

    return (
        <section
            id="consult"
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
                {/* ── LEFT ── */}
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
                        무료 IT 진단 신청
                    </div>

                    <h2
                        style={{
                            fontSize: m ? 30 : 48,
                            lineHeight: 1.2,
                            fontWeight: 500,
                            letterSpacing: m ? -1 : -2,
                            color: "#FFFFFF",
                            margin: m ? "0 0 20px 0" : "0 0 28px 0",
                        }}
                    >
                        이제 IT 걱정은
                        <br />
                        <span style={{ color: "#66AAFF" }}>SNC에 맡기세요.</span>
                    </h2>

                    <p
                        style={{
                            fontSize: m ? 15 : 18,
                            lineHeight: 1.7,
                            color: "rgba(255, 255, 255, 0.7)",
                            margin: m ? "0 0 32px 0" : "0 0 40px 0",
                        }}
                    >
                        무료 진단으로 현재 IT 환경을 점검받으세요. 진단 결과와
                        맞춤 견적까지 비용 부담 없이 제공합니다.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 14,
                            paddingTop: m ? 28 : 32,
                            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                        }}
                    >
                        <div style={{ fontSize: m ? 13 : 14, color: "rgba(255, 255, 255, 0.55)", marginBottom: 4 }}>
                            전화 상담이 편하시다면
                        </div>
                        <a
                            href="tel:1566-8099"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                background: "rgba(255, 255, 255, 0.08)",
                                border: "1px solid rgba(255, 255, 255, 0.18)",
                                color: "#FFFFFF",
                                padding: m ? "12px 18px" : "14px 24px",
                                borderRadius: 12,
                                fontSize: m ? 15 : 16,
                                textDecoration: "none",
                                fontWeight: 500,
                                width: "fit-content",
                            }}
                        >
                            <PhoneIcon />
                            1566-8099
                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginLeft: 4 }}>
                                평일 09:00~18:00
                            </span>
                        </a>
                    </div>
                </div>

                {/* ── RIGHT: Form ── */}
                <div
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: 24,
                        padding: m ? "28px 24px" : "40px 40px",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    {submitted ? (
                        <div style={{ textAlign: "center", padding: m ? "20px 0" : "40px 0" }}>
                            <div
                                style={{
                                    width: 64,
                                    height: 64,
                                    background: "rgba(0, 224, 184, 0.15)",
                                    border: "1px solid rgba(0, 224, 184, 0.3)",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 24px",
                                }}
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 13l4 4L19 7" stroke="#00E0B8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: m ? 20 : 24, fontWeight: 500, color: "#FFFFFF", margin: "0 0 12px 0", letterSpacing: -0.5 }}>
                                진단 신청이 접수되었습니다
                            </h3>
                            <p style={{ fontSize: m ? 14 : 15, color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.6, margin: "0 0 24px 0" }}>
                                {form.company} {form.name}님, 감사합니다.
                                <br />
                                영업일 기준 1~2일 내에 담당자가 연락드립니다.
                            </p>
                            <div
                                style={{
                                    fontSize: 13,
                                    color: "rgba(255, 255, 255, 0.5)",
                                    padding: "14px 18px",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    borderRadius: 12,
                                }}
                            >
                                급하시면 지금 바로 <strong style={{ color: "#66AAFF", fontWeight: 500 }}>1566-8099</strong>로 전화 주세요.
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 style={{ fontSize: m ? 20 : 24, fontWeight: 500, color: "#FFFFFF", margin: "0 0 8px 0", letterSpacing: -0.5 }}>
                                무료 진단 신청
                            </h3>
                            <p style={{ fontSize: m ? 13 : 14, color: "rgba(255, 255, 255, 0.6)", margin: m ? "0 0 24px 0" : "0 0 28px 0", lineHeight: 1.5 }}>
                                간단히 남겨주시면 담당자가 직접 연락드립니다.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: m ? 14 : 16 }}>
                                <FormField label="회사명" required>
                                    <input name="company" value={form.company} onChange={handleChange} placeholder="(주)○○○" style={inputStyle} />
                                </FormField>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                    <FormField label="담당자명" required>
                                        <input name="name" value={form.name} onChange={handleChange} placeholder="홍길동" style={inputStyle} />
                                    </FormField>
                                    <FormField label="연락처" required>
                                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="010-0000-0000" inputMode="tel" style={inputStyle} />
                                    </FormField>
                                    <FormField label="이메일">
                                        <input name="email" value={form.email} onChange={handleChange} placeholder="example@email.com" type="email" inputMode="email" style={inputStyle} />
                                    </FormField>
                                </div>

                                <FormField label="기업 규모">
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                                        {companySizes.map((size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => setForm({ ...form, size })}
                                                style={{
                                                    background: form.size === size ? "#0066FF" : "rgba(255,255,255,0.06)",
                                                    border: `1px solid ${form.size === size ? "#0066FF" : "rgba(255,255,255,0.15)"}`,
                                                    color: "#FFFFFF",
                                                    padding: m ? "10px 6px" : "11px 8px",
                                                    borderRadius: 9,
                                                    fontSize: m ? 12 : 13,
                                                    cursor: "pointer",
                                                    fontFamily: "inherit",
                                                    fontWeight: form.size === size ? 500 : 400,
                                                    transition: "all 0.2s ease",
                                                }}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </FormField>

                                <FormField label="문의 내용">
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="관리가 필요한 IT 자산이나 궁금한 점을 적어주세요 (선택)"
                                        rows={3}
                                        style={{ ...inputStyle, resize: "vertical", minHeight: 80, fontFamily: "inherit" }}
                                    />
                                </FormField>

                                {error && (
                                    <div style={{ fontSize: 13, color: "#FF6B6B", marginTop: -4 }}>{error}</div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    style={{
                                        background: "#0066FF",
                                        color: "#FFFFFF",
                                        padding: m ? "14px 24px" : "16px 32px",
                                        borderRadius: 12,
                                        fontSize: m ? 15 : 16,
                                        border: "none",
                                        fontWeight: 500,
                                        fontFamily: "inherit",
                                        cursor: "pointer",
                                        marginTop: 6,
                                        boxShadow: "0 12px 28px rgba(0, 102, 255, 0.35)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 8,
                                    }}
                                >
                                    무료 진단 신청하기
                                    <span style={{ fontFamily: "'Inter', sans-serif" }}>→</span>
                                </button>

                                <div style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.45)", textAlign: "center", lineHeight: 1.5 }}>
                                    제출 시 개인정보 수집·이용에 동의하는 것으로 간주됩니다.
                                </div>
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
            <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
