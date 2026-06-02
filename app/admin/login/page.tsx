"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"

export default function AdminLogin() {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    // URL 파라미터에서 에러 메시지 읽기 (미들웨어/콜백에서 전달)
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const err = params.get("error")
        if (err === "unauthorized_domain") {
            setError("@sncpc.com 계정만 접근 가능합니다. 다른 계정으로 시도하지 마세요.")
        } else if (err === "callback_failed") {
            setError("로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.")
        }
    }, [])

    const handleGoogleLogin = async () => {
        setLoading(true)
        setError(null)

        const supabase = createClient()
        const { error: signInError } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback?next=/admin`,
                queryParams: {
                    access_type: "offline",
                    prompt: "consent",
                    // Google에 @sncpc.com 도메인 힌트 전달
                    hd: "sncpc.com",
                },
            },
        })

        if (signInError) {
            setError("로그인 시작 실패: " + signInError.message)
            setLoading(false)
        }
        // 성공하면 브라우저가 Google 로그인 화면으로 자동 이동
    }

    return (
        <main
            style={{
                minHeight: "100vh",
                background:
                    "radial-gradient(circle at 20% 30%, rgba(0,102,255,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,184,240,0.10) 0%, transparent 50%), #050E1F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                fontFamily: "'Pretendard Variable', 'Inter', sans-serif",
            }}
        >
            <div
                style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.10)",
                    borderRadius: 24,
                    padding: "48px 40px",
                    maxWidth: 420,
                    width: "100%",
                    textAlign: "center",
                    boxShadow: "0 24px 64px rgba(0, 0, 0, 0.45)",
                    backdropFilter: "blur(16px)",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        width: 60,
                        height: 60,
                        background: "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                        borderRadius: 16,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontWeight: 500,
                        fontSize: 26,
                        marginBottom: 28,
                        letterSpacing: 1,
                        fontFamily: "'Inter', sans-serif",
                        boxShadow: "0 12px 28px rgba(0, 102, 255, 0.35)",
                    }}
                >
                    S
                </div>

                <h1
                    style={{
                        fontSize: 26,
                        fontWeight: 500,
                        color: "#FFFFFF",
                        margin: "0 0 10px",
                        letterSpacing: -0.7,
                    }}
                >
                    SNC 관리자
                </h1>
                <p
                    style={{
                        fontSize: 14,
                        color: "rgba(255, 255, 255, 0.62)",
                        margin: "0 0 36px",
                        lineHeight: 1.6,
                    }}
                >
                    Google Workspace 계정으로 로그인하세요.
                    <br />
                    <span style={{ color: "#66AAFF" }}>@sncpc.com</span> 계정만 가능합니다.
                </p>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    style={{
                        width: "100%",
                        background: "#FFFFFF",
                        color: "#0A1733",
                        padding: "14px 20px",
                        border: "none",
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: 500,
                        cursor: loading ? "wait" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        opacity: loading ? 0.7 : 1,
                        transition: "all 0.2s ease",
                        fontFamily: "inherit",
                    }}
                >
                    <GoogleIcon />
                    {loading ? "Google로 이동 중..." : "Google로 로그인"}
                </button>

                {error && (
                    <div
                        style={{
                            marginTop: 20,
                            padding: "12px 16px",
                            background: "rgba(255, 107, 107, 0.10)",
                            border: "1px solid rgba(255, 107, 107, 0.28)",
                            borderRadius: 10,
                            color: "#FF8888",
                            fontSize: 13,
                            lineHeight: 1.5,
                            textAlign: "left",
                        }}
                    >
                        {error}
                    </div>
                )}

                <div
                    style={{
                        marginTop: 36,
                        paddingTop: 24,
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                        fontSize: 12,
                        color: "rgba(255, 255, 255, 0.40)",
                        lineHeight: 1.5,
                    }}
                >
                    SNC 신청 관리 시스템
                    <br />
                    문의: 1566-8099
                </div>
            </div>
        </main>
    )
}

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#4285F4" d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.614z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" />
            <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
        </svg>
    )
}
