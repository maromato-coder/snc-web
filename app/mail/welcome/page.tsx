// SSO 세션 없이 /mail 접근 시 — 운영콘솔 Google 로그인 대신 안내
export default async function MailWelcomePage({
    searchParams,
}: {
    searchParams: Promise<{ reason?: string }>
}) {
    const { reason } = await searchParams
    const isSession = reason === "session"

    return (
        <div style={{ maxWidth: 480, margin: "64px auto", padding: 28, background: "#fff", borderRadius: 14, border: "1px solid #E2E8F2", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📬</div>
            <h1 style={{ fontSize: 18, fontWeight: 800, color: "#0A1733", margin: "0 0 10px" }}>사내메일함</h1>
            <p style={{ fontSize: 14, color: "#5A6A8A", lineHeight: 1.7, margin: 0 }}>
                {isSession
                    ? "업무앱에서 넘어온 로그인 세션이 이 창에 유지되지 않았습니다."
                    : "직원 사내메일은 업무앱(SSO)으로 여는 것을 권장합니다."}
                <br />
                <strong>SNC 업무앱 → 사내메일 → 「메일함 새 창에서 열기」</strong>
            </p>
            <p style={{ fontSize: 12, color: "#8A9AB8", marginTop: 16, lineHeight: 1.6 }}>
                아래 「Google로 로그인」은 관리자 운영콘솔용입니다. 직원 메일함과 별개입니다.
                <br />
                @sncpc.com 주소(jyp@sncpc.com 등)를 바꿀 필요는 없습니다.
            </p>
        </div>
    )
}
