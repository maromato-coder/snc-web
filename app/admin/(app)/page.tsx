import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import StatCard from "@/components/admin/StatCard"
import StatusBadge, { SubmissionStatus } from "@/components/admin/StatusBadge"

export default async function DashboardPage() {
    const authClient = await createClient()
    const {
        data: { user },
    } = await authClient.auth.getUser()
    if (!user) redirect("/admin/login")

    // service_role 클라이언트로 통계·최근 신청 조회 (RLS 우회 안전)
    const supabase = createServerSupabaseClient()

    const [{ count: newCount }, { count: contactedCount }, { count: completedCount }, { count: declinedCount }, { data: recent }] = await Promise.all([
        supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "contacted"),
        supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "completed"),
        supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "declined"),
        supabase.from("submissions").select("*").order("created_at", { ascending: false }).limit(8),
    ])

    const recentSubs = (recent || []) as Array<{
        id: string
        type: "join" | "enterprise"
        name: string
        phone: string
        company: string | null
        region: string | null
        status: SubmissionStatus
        created_at: string
    }>

    const total = (newCount || 0) + (contactedCount || 0) + (completedCount || 0) + (declinedCount || 0)

    return (
        <div style={{ padding: "32px 40px" }}>
            {/* Page header */}
            <div style={{ marginBottom: 32 }}>
                <div
                    style={{
                        fontSize: 11.5,
                        color: "#0046C0",
                        letterSpacing: 1.5,
                        fontWeight: 500,
                        marginBottom: 6,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    DASHBOARD
                </div>
                <h1
                    style={{
                        fontSize: 28,
                        fontWeight: 500,
                        color: "#0A1733",
                        margin: 0,
                        letterSpacing: -0.8,
                    }}
                >
                    환영합니다 👋
                </h1>
                <p
                    style={{
                        fontSize: 14,
                        color: "#5A6A8A",
                        margin: "6px 0 0",
                    }}
                >
                    오늘은 {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" })}입니다.
                </p>
            </div>

            {/* Stats grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 14,
                    marginBottom: 36,
                }}
            >
                <StatCard
                    label="신규 신청"
                    value={newCount || 0}
                    color="blue"
                    icon="inbox"
                    sub={total ? `전체의 ${Math.round(((newCount || 0) / total) * 100)}%` : "처리 대기 중"}
                />
                <StatCard
                    label="연락 중"
                    value={contactedCount || 0}
                    color="amber"
                    icon="phone"
                    sub="진행 중인 건"
                />
                <StatCard
                    label="완료"
                    value={completedCount || 0}
                    color="green"
                    icon="check"
                    sub="처리 완료된 건"
                />
                <StatCard
                    label="거절"
                    value={declinedCount || 0}
                    color="gray"
                    icon="x"
                    sub="진행 불가 건"
                />
            </div>

            {/* Recent submissions */}
            <section
                style={{
                    background: "#FFFFFF",
                    border: "1px solid #E8ECF3",
                    borderRadius: 14,
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        padding: "18px 24px",
                        borderBottom: "1px solid #F0F2F5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <h2
                            style={{
                                fontSize: 15,
                                fontWeight: 500,
                                color: "#0A1733",
                                margin: 0,
                                letterSpacing: -0.2,
                            }}
                        >
                            최근 신청
                        </h2>
                        <div
                            style={{
                                fontSize: 12,
                                color: "#8A95AD",
                                marginTop: 2,
                            }}
                        >
                            가장 최근 8건
                        </div>
                    </div>
                    <Link
                        href="/admin/submissions"
                        style={{
                            fontSize: 12.5,
                            color: "#0066FF",
                            textDecoration: "none",
                            fontWeight: 500,
                            padding: "6px 12px",
                            borderRadius: 7,
                            background: "#F0F4FB",
                        }}
                    >
                        전체 보기 →
                    </Link>
                </div>

                {recentSubs.length === 0 ? (
                    <div
                        style={{
                            padding: "60px 24px",
                            textAlign: "center",
                            color: "#8A95AD",
                            fontSize: 14,
                        }}
                    >
                        아직 신청이 없습니다.
                    </div>
                ) : (
                    recentSubs.map((s) => (
                        <Link
                            key={s.id}
                            href="/admin/submissions"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "70px 1fr 1fr 100px 100px",
                                padding: "14px 24px",
                                borderBottom: "1px solid #F4F6FA",
                                textDecoration: "none",
                                color: "#0A1733",
                                fontSize: 13.5,
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <span
                                    style={{
                                        display: "inline-block",
                                        padding: "2px 7px",
                                        background: s.type === "join" ? "#FFF4DA" : "#E6EEFF",
                                        color: s.type === "join" ? "#9A5C00" : "#0046C0",
                                        borderRadius: 5,
                                        fontSize: 10.5,
                                        fontWeight: 500,
                                    }}
                                >
                                    {s.type === "join" ? "가맹" : "기업"}
                                </span>
                            </div>
                            <div style={{ fontWeight: 500 }}>{s.name}</div>
                            <div style={{ color: "#5A6A8A", fontSize: 12.5 }}>
                                {s.type === "enterprise" ? s.company || s.phone : s.region || s.phone}
                            </div>
                            <div>
                                <StatusBadge status={s.status} size="sm" />
                            </div>
                            <div style={{ color: "#8A95AD", fontSize: 11.5, textAlign: "right" }}>
                                {new Date(s.created_at).toLocaleDateString("ko-KR", {
                                    month: "2-digit",
                                    day: "2-digit",
                                })}
                            </div>
                        </Link>
                    ))
                )}
            </section>
        </div>
    )
}
