import { createServerSupabaseClient } from "@/lib/supabase/server"
import StatCard from "@/components/admin/StatCard"
import StatusBadge from "@/components/admin/StatusBadge"
import Link from "next/link"

// ════════════════════════════════════════════════
// 관리자 대시보드
// ════════════════════════════════════════════════

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
    const supabase = createServerSupabaseClient()

    const [{ data: all }, { data: recent }] = await Promise.all([
        supabase.from("submissions").select("status"),
        supabase
            .from("submissions")
            .select("id, type, name, phone, company, region, status, site_id, channel, created_at")
            .order("created_at", { ascending: false })
            .limit(10),
    ])

    const counts = {
        new:       (all || []).filter((r) => r.status === "new").length,
        contacted: (all || []).filter((r) => r.status === "contacted").length,
        completed: (all || []).filter((r) => r.status === "completed").length,
        declined:  (all || []).filter((r) => r.status === "declined").length,
    }
    const total = (all || []).length

    const SITE_LABEL: Record<string, string> = { "snc-main": "SNC 메인" }
    const TYPE_LABEL: Record<string, string> = { join: "가맹", enterprise: "기업" }

    return (
        <div style={{ padding: "32px 40px", width: "100%", boxSizing: "border-box" }}>

            {/* ── 페이지 헤더 ── */}
            <div style={{ marginBottom: 32 }}>
                <div style={{
                    fontSize: 11, fontWeight: 700, color: "#0066FF",
                    letterSpacing: 1.5, marginBottom: 6, fontFamily: "Inter, sans-serif",
                }}>
                    DASHBOARD
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <div>
                        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0A1733", margin: 0, letterSpacing: -0.5 }}>
                            대시보드
                        </h1>
                        <p style={{ fontSize: 13, color: "#5A6A8A", margin: "6px 0 0" }}>
                            전체 신청 <strong style={{ color: "#0A1733" }}>{total}건</strong>
                        </p>
                    </div>
                    <Link
                        href="/admin/submissions"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            background: "#0066FF", color: "#FFFFFF",
                            borderRadius: 9, padding: "9px 18px",
                            fontSize: 13, fontWeight: 600, textDecoration: "none",
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                        </svg>
                        신청 관리
                    </Link>
                </div>
            </div>

            {/* ── 통계 카드 ── */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 14,
                marginBottom: 36,
            }}>
                <StatCard label="신규" count={counts.new} color="#0046C0" bg="#EEF5FF"
                    icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>}
                />
                <StatCard label="연락중" count={counts.contacted} color="#92600A" bg="#FFF8E6"
                    icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>}
                />
                <StatCard label="완료" count={counts.completed} color="#0A6B45" bg="#EDFAF5"
                    icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                />
                <StatCard label="거절" count={counts.declined} color="#991B1B" bg="#FFF0F0"
                    icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>}
                />
            </div>

            {/* ── 최근 신청 ── */}
            <div>
                <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", marginBottom: 16,
                }}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0A1733", margin: 0 }}>
                        최근 신청
                    </h2>
                    <Link href="/admin/submissions" style={{ fontSize: 12, color: "#0066FF", textDecoration: "none", fontWeight: 500 }}>
                        전체 보기 →
                    </Link>
                </div>

                <div style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F2",
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "0 1px 4px rgba(10,23,51,0.04)",
                }}>
                    {/* 테이블 헤더 */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "100px 72px 1fr 120px 100px 96px",
                        padding: "11px 24px",
                        background: "#F8FAFF",
                        borderBottom: "1px solid #E2E8F2",
                        fontSize: 11, fontWeight: 700, color: "#8A9AB8", letterSpacing: 0.6,
                    }}>
                        <div>신청일</div>
                        <div>종류</div>
                        <div>이름 · 연락처</div>
                        <div>출처</div>
                        <div>회사 · 지역</div>
                        <div>상태</div>
                    </div>

                    {!recent || recent.length === 0 ? (
                        <div style={{ padding: "48px 24px", textAlign: "center", color: "#8A9AB8", fontSize: 14 }}>
                            아직 신청이 없습니다
                        </div>
                    ) : (
                        recent.map((s, i) => {
                            const dateStr = new Date(s.created_at).toLocaleDateString("ko-KR", {
                                month: "2-digit", day: "2-digit", timeZone: "Asia/Seoul",
                            })
                            const siteLabel = SITE_LABEL[s.site_id || "snc-main"] || "SNC 메인"
                            return (
                                <Link
                                    key={s.id}
                                    href="/admin/submissions"
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "100px 72px 1fr 120px 100px 96px",
                                        padding: "14px 24px",
                                        borderBottom: i < recent.length - 1 ? "1px solid #F0F2F8" : "none",
                                        textDecoration: "none",
                                        alignItems: "center",
                                        transition: "background 0.1s",
                                    }}

                                >
                                    <div style={{ fontSize: 12, color: "#8A9AB8" }}>{dateStr}</div>
                                    <div>
                                        <span style={{
                                            fontSize: 11, fontWeight: 600,
                                            background: s.type === "join" ? "#EEF5FF" : "#F0F2F8",
                                            color: s.type === "join" ? "#0046C0" : "#374B6B",
                                            borderRadius: 5, padding: "2px 8px",
                                        }}>
                                            {TYPE_LABEL[s.type] || s.type}
                                        </span>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1733" }}>{s.name}</div>
                                        <div style={{ fontSize: 11, color: "#8A9AB8", marginTop: 2 }}>{s.phone}</div>
                                    </div>
                                    <div style={{ fontSize: 12, color: "#374B6B", fontWeight: 500 }}>{siteLabel}</div>
                                    <div style={{ fontSize: 12, color: "#5A6A8A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {s.company || s.region || "—"}
                                    </div>
                                    <div><StatusBadge status={s.status} size="sm" /></div>
                                </Link>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}
