import { createClient } from "@/lib/supabase/server-auth"
import { redirect } from "next/navigation"

/**
 * 관리자 대시보드 (placeholder)
 *
 * Phase 3에서는 로그인 동작 확인용으로만 사용.
 * Phase 4에서 신청 목록·검색·관리 UI로 교체됩니다.
 */
export default async function AdminDashboard() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // 미들웨어가 이미 보호하지만, 한 번 더 (defense in depth)
    if (!user) {
        redirect("/admin/login")
    }

    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#F8FAFF",
                padding: "60px 20px",
                fontFamily: "'Pretendard Variable', 'Inter', sans-serif",
            }}
        >
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
                <div
                    style={{
                        background: "#FFFFFF",
                        borderRadius: 20,
                        padding: "48px 40px",
                        boxShadow: "0 4px 16px rgba(10, 23, 51, 0.06)",
                        border: "1px solid #EEF2F8",
                    }}
                >
                    <div
                        style={{
                            width: 56,
                            height: 56,
                            background:
                                "linear-gradient(135deg, #00E0B8 0%, #00A878 100%)",
                            borderRadius: 16,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 24,
                        }}
                    >
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M5 13l4 4L19 7"
                                stroke="#FFFFFF"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div
                        style={{
                            fontSize: 12,
                            color: "#0046C0",
                            letterSpacing: 1.5,
                            fontWeight: 500,
                            marginBottom: 10,
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        LOGIN SUCCESS
                    </div>
                    <h1
                        style={{
                            fontSize: 30,
                            fontWeight: 500,
                            color: "#0A1733",
                            margin: "0 0 14px",
                            letterSpacing: -0.8,
                            lineHeight: 1.2,
                        }}
                    >
                        관리자 페이지에 오신 걸 환영합니다
                    </h1>

                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 16px",
                            background: "#F0F4FB",
                            borderRadius: 100,
                            marginBottom: 28,
                        }}
                    >
                        <div
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                background:
                                    "linear-gradient(135deg, #0066FF 0%, #003BB5 100%)",
                                color: "#FFFFFF",
                                fontSize: 13,
                                fontWeight: 500,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {user.email?.[0].toUpperCase()}
                        </div>
                        <span style={{ fontSize: 14, color: "#0A1733", fontWeight: 500 }}>
                            {user.email}
                        </span>
                    </div>

                    <div
                        style={{
                            background: "#F8FAFF",
                            border: "1px solid #E2E8F2",
                            borderRadius: 12,
                            padding: "20px 24px",
                            marginBottom: 28,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: "#0A1733",
                                marginBottom: 8,
                            }}
                        >
                            🚧 Phase 4 작업 예정
                        </div>
                        <p
                            style={{
                                fontSize: 13,
                                color: "#5A6A8A",
                                margin: 0,
                                lineHeight: 1.6,
                            }}
                        >
                            여기에 다음 기능들이 추가됩니다:
                            <br />
                            • 신청 목록 (LP-A 가맹 · LP-B 기업 진단)
                            <br />
                            • 검색·필터·정렬
                            <br />
                            • 상태 변경 (신규/연락중/완료)
                            <br />
                            • 담당자 메모
                            <br />
                            • CSV 내보내기
                        </p>
                    </div>

                    <form action="/auth/signout" method="post">
                        <button
                            type="submit"
                            style={{
                                background: "#FFFFFF",
                                color: "#5A6A8A",
                                border: "1px solid #E2E8F2",
                                padding: "10px 20px",
                                borderRadius: 10,
                                fontSize: 14,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                fontWeight: 500,
                            }}
                        >
                            로그아웃
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}
