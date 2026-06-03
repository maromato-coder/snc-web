"use client"

import { useState } from "react"
import StatusBadge from "./StatusBadge"

// ════════════════════════════════════════════════
// SubmissionsTable — 신청 목록 + 검색/필터/CSV
// ════════════════════════════════════════════════

export interface Submission {
    id: string
    type: "join" | "enterprise"
    name: string
    phone: string
    company?: string | null
    region?: string | null
    size?: string | null
    message?: string | null
    status: "new" | "contacted" | "completed" | "declined"
    admin_notes?: string | null
    site_id?: string | null
    channel?: string | null
    created_at: string
    updated_at?: string
}

const TYPE_LABEL: Record<string, string> = {
    join: "가맹",
    enterprise: "기업",
}
const TYPE_COLOR: Record<string, { bg: string; color: string }> = {
    join:       { bg: "#EEF5FF", color: "#0046C0" },
    enterprise: { bg: "#F0F2F8", color: "#374B6B" },
}
const SITE_LABEL: Record<string, string> = {
    "snc-main": "SNC 메인",
}
const CHANNEL_LABEL: Record<string, string> = {
    form:   "폼",
    email:  "메일",
    survey: "설문",
}

interface Props {
    submissions: Submission[]
    onSelect: (s: Submission) => void
    selectedId?: string
}

export default function SubmissionsTable({ submissions, onSelect, selectedId }: Props) {
    const [search, setSearch] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterSite, setFilterSite] = useState("all")

    // 필터링
    const filtered = submissions.filter((s) => {
        const q = search.toLowerCase()
        const matchSearch =
            !q ||
            s.name.toLowerCase().includes(q) ||
            s.phone.includes(q) ||
            (s.company || "").toLowerCase().includes(q)
        const matchType = filterType === "all" || s.type === filterType
        const matchStatus = filterStatus === "all" || s.status === filterStatus
        const matchSite = filterSite === "all" || (s.site_id || "snc-main") === filterSite
        return matchSearch && matchType && matchStatus && matchSite
    })

    // 사이트 목록 (동적)
    const siteIds = [...new Set(submissions.map((s) => s.site_id || "snc-main"))]

    const handleCsv = () => {
        window.location.href = "/api/submissions/csv"
    }

    const filterSelect: React.CSSProperties = {
        background: "#FFFFFF",
        border: "1px solid #E2E8F2",
        borderRadius: 8,
        padding: "7px 10px",
        fontSize: 13,
        color: "#374B6B",
        cursor: "pointer",
        outline: "none",
        fontFamily: "inherit",
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* 검색·필터 바 */}
            <div
                style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                {/* 검색 */}
                <div
                    style={{
                        position: "relative",
                        flex: "1 1 200px",
                        minWidth: 180,
                    }}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8A9AB8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            position: "absolute",
                            left: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="이름·연락처·회사명 검색"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: "100%",
                            paddingLeft: 30,
                            paddingRight: 10,
                            paddingTop: 7,
                            paddingBottom: 7,
                            border: "1px solid #E2E8F2",
                            borderRadius: 8,
                            fontSize: 13,
                            color: "#0A1733",
                            outline: "none",
                            fontFamily: "inherit",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <select value={filterSite} onChange={(e) => setFilterSite(e.target.value)} style={filterSelect}>
                    <option value="all">전체 사이트</option>
                    {siteIds.map((s) => (
                        <option key={s} value={s}>{SITE_LABEL[s] || s}</option>
                    ))}
                </select>

                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={filterSelect}>
                    <option value="all">전체 종류</option>
                    <option value="join">가맹 신청</option>
                    <option value="enterprise">기업 진단</option>
                </select>

                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={filterSelect}>
                    <option value="all">전체 상태</option>
                    <option value="new">신규</option>
                    <option value="contacted">연락중</option>
                    <option value="completed">완료</option>
                    <option value="declined">거절</option>
                </select>

                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, color: "#8A9AB8" }}>
                        {filtered.length}건
                    </span>
                    <button
                        onClick={handleCsv}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            background: "#FFFFFF",
                            border: "1px solid #E2E8F2",
                            borderRadius: 8,
                            padding: "7px 12px",
                            fontSize: 12,
                            color: "#374B6B",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            fontWeight: 500,
                        }}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        CSV
                    </button>
                </div>
            </div>

            {/* 테이블 */}
            <div
                style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F2",
                    borderRadius: 12,
                    overflow: "hidden",
                }}
            >
                {/* 헤더 */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "100px 80px 1fr 130px 110px 90px",
                        padding: "10px 20px",
                        background: "#F8FAFF",
                        borderBottom: "1px solid #E2E8F2",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#8A9AB8",
                        letterSpacing: 0.5,
                    }}
                >
                    <div>신청일</div>
                    <div>종류</div>
                    <div>이름 · 연락처</div>
                    <div>출처</div>
                    <div>회사·지역</div>
                    <div>상태</div>
                </div>

                {/* 행 */}
                {filtered.length === 0 ? (
                    <div
                        style={{
                            padding: "48px 20px",
                            textAlign: "center",
                            color: "#8A9AB8",
                            fontSize: 13,
                        }}
                    >
                        {submissions.length === 0 ? "아직 신청이 없습니다" : "검색 결과가 없습니다"}
                    </div>
                ) : (
                    filtered.map((s, i) => {
                        const isSelected = s.id === selectedId
                        const typeCfg = TYPE_COLOR[s.type] ?? TYPE_COLOR.join
                        const siteLabel = SITE_LABEL[s.site_id || "snc-main"] || s.site_id || "SNC 메인"
                        const channelLabel = CHANNEL_LABEL[s.channel || "form"] || s.channel || "폼"
                        const dateStr = new Date(s.created_at).toLocaleDateString("ko-KR", {
                            month: "2-digit",
                            day: "2-digit",
                            timeZone: "Asia/Seoul",
                        })

                        return (
                            <div
                                key={s.id}
                                onClick={() => onSelect(s)}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "100px 80px 1fr 130px 110px 90px",
                                    padding: "13px 20px",
                                    borderBottom: i < filtered.length - 1 ? "1px solid #F0F2F8" : "none",
                                    cursor: "pointer",
                                    background: isSelected ? "#F0F6FF" : "transparent",
                                    alignItems: "center",
                                    transition: "background 0.1s",
                                }}
                            >
                                <div style={{ fontSize: 12, color: "#8A9AB8" }}>{dateStr}</div>
                                <div>
                                    <span
                                        style={{
                                            fontSize: 11,
                                            fontWeight: 600,
                                            background: typeCfg.bg,
                                            color: typeCfg.color,
                                            borderRadius: 5,
                                            padding: "2px 7px",
                                        }}
                                    >
                                        {TYPE_LABEL[s.type]}
                                    </span>
                                </div>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1733" }}>{s.name}</div>
                                    <div style={{ fontSize: 12, color: "#5A6A8A", marginTop: 1 }}>{s.phone}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 600, color: "#374B6B" }}>{siteLabel}</div>
                                    <div style={{ fontSize: 11, color: "#8A9AB8", marginTop: 1 }}>{channelLabel}</div>
                                </div>
                                <div style={{ fontSize: 12, color: "#5A6A8A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {s.company || s.region || "—"}
                                </div>
                                <div>
                                    <StatusBadge status={s.status} size="sm" />
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
