"use client"

import * as React from "react"
import StatusBadge, { SubmissionStatus } from "./StatusBadge"
import SubmissionPanel, { Submission } from "./SubmissionPanel"

type FilterType = "all" | "join" | "enterprise"
type FilterStatus = "all" | SubmissionStatus

interface SubmissionsTableProps {
    initialSubmissions: Submission[]
}

export default function SubmissionsTable({ initialSubmissions }: SubmissionsTableProps) {
    const [submissions, setSubmissions] = React.useState(initialSubmissions)
    const [search, setSearch] = React.useState("")
    const [filterType, setFilterType] = React.useState<FilterType>("all")
    const [filterStatus, setFilterStatus] = React.useState<FilterStatus>("all")
    const [selected, setSelected] = React.useState<Submission | null>(null)

    const filtered = React.useMemo(() => {
        return submissions.filter((s) => {
            if (filterType !== "all" && s.type !== filterType) return false
            if (filterStatus !== "all" && s.status !== filterStatus) return false
            if (search) {
                const q = search.toLowerCase()
                const haystack = `${s.name} ${s.phone} ${s.company || ""} ${s.region || ""} ${s.message || ""}`.toLowerCase()
                if (!haystack.includes(q)) return false
            }
            return true
        })
    }, [submissions, search, filterType, filterStatus])

    const handleUpdate = (updated: Submission) => {
        setSubmissions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
        setSelected(updated)
    }

    const downloadCsv = () => {
        // Get filtered IDs to send to CSV endpoint
        const params = new URLSearchParams()
        if (filterType !== "all") params.set("type", filterType)
        if (filterStatus !== "all") params.set("status", filterStatus)
        if (search) params.set("q", search)
        window.location.href = `/api/submissions/csv?${params.toString()}`
    }

    return (
        <>
            {/* Filter bar */}
            <div
                style={{
                    background: "#FFFFFF",
                    border: "1px solid #E8ECF3",
                    borderRadius: 12,
                    padding: "12px 14px",
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 16,
                    flexWrap: "wrap",
                }}
            >
                {/* Search */}
                <div
                    style={{
                        flex: "1 1 240px",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8A95AD"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{ position: "absolute", left: 12 }}
                    >
                        <circle cx="11" cy="11" r="7" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="이름, 전화, 회사로 검색..."
                        style={{
                            width: "100%",
                            padding: "9px 12px 9px 34px",
                            border: "1px solid #E8ECF3",
                            borderRadius: 8,
                            fontSize: 13.5,
                            color: "#0A1733",
                            fontFamily: "inherit",
                            outline: "none",
                            boxSizing: "border-box",
                            background: "#FFFFFF",
                        }}
                    />
                </div>

                {/* Type filter */}
                <FilterButtonGroup
                    value={filterType}
                    onChange={(v) => setFilterType(v as FilterType)}
                    options={[
                        { value: "all", label: "전체" },
                        { value: "join", label: "가맹" },
                        { value: "enterprise", label: "기업" },
                    ]}
                />

                {/* Status filter */}
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                    style={{
                        padding: "8px 12px",
                        border: "1px solid #E8ECF3",
                        borderRadius: 8,
                        fontSize: 13.5,
                        color: "#0A1733",
                        fontFamily: "inherit",
                        cursor: "pointer",
                        background: "#FFFFFF",
                        outline: "none",
                    }}
                >
                    <option value="all">모든 상태</option>
                    <option value="new">신규</option>
                    <option value="contacted">연락중</option>
                    <option value="completed">완료</option>
                    <option value="declined">거절</option>
                </select>

                {/* CSV download */}
                <button
                    onClick={downloadCsv}
                    title="CSV 다운로드"
                    style={{
                        padding: "8px 14px",
                        background: "#FFFFFF",
                        border: "1px solid #E8ECF3",
                        borderRadius: 8,
                        fontSize: 13.5,
                        color: "#5A6A8A",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontWeight: 500,
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    CSV
                </button>
            </div>

            {/* Result count */}
            <div style={{ fontSize: 12.5, color: "#8A95AD", marginBottom: 12, paddingLeft: 4 }}>
                {filtered.length}개 결과 {submissions.length !== filtered.length && `· 전체 ${submissions.length}개`}
            </div>

            {/* Table */}
            <div
                style={{
                    background: "#FFFFFF",
                    border: "1px solid #E8ECF3",
                    borderRadius: 12,
                    overflow: "hidden",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "80px 1fr 140px 1fr 110px 130px",
                        padding: "12px 20px",
                        background: "#F8FAFF",
                        borderBottom: "1px solid #E8ECF3",
                        fontSize: 11.5,
                        color: "#5A6A8A",
                        fontWeight: 500,
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    <div>종류</div>
                    <div>이름</div>
                    <div>연락처</div>
                    <div>회사/지역</div>
                    <div>상태</div>
                    <div>등록일</div>
                </div>

                {/* Rows */}
                {filtered.length === 0 ? (
                    <div
                        style={{
                            padding: "60px 20px",
                            textAlign: "center",
                            color: "#8A95AD",
                            fontSize: 14,
                        }}
                    >
                        조건에 맞는 신청이 없습니다.
                    </div>
                ) : (
                    filtered.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setSelected(s)}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "80px 1fr 140px 1fr 110px 130px",
                                padding: "16px 20px",
                                width: "100%",
                                background: selected?.id === s.id ? "#F0F4FB" : "#FFFFFF",
                                border: "none",
                                borderBottom: "1px solid #F0F2F5",
                                cursor: "pointer",
                                textAlign: "left",
                                fontSize: 13.5,
                                color: "#0A1733",
                                fontFamily: "inherit",
                                alignItems: "center",
                                transition: "background 0.1s ease",
                            }}
                            onMouseEnter={(e) => {
                                if (selected?.id !== s.id) {
                                    e.currentTarget.style.background = "#FAFBFD"
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selected?.id !== s.id) {
                                    e.currentTarget.style.background = "#FFFFFF"
                                }
                            }}
                        >
                            <div>
                                <span
                                    style={{
                                        display: "inline-block",
                                        padding: "2px 8px",
                                        background: s.type === "join" ? "#FFF4DA" : "#E6EEFF",
                                        color: s.type === "join" ? "#9A5C00" : "#0046C0",
                                        borderRadius: 5,
                                        fontSize: 11,
                                        fontWeight: 500,
                                    }}
                                >
                                    {s.type === "join" ? "가맹" : "기업"}
                                </span>
                            </div>
                            <div style={{ fontWeight: 500 }}>{s.name}</div>
                            <div style={{ color: "#5A6A8A", fontVariantNumeric: "tabular-nums", fontSize: 12.5 }}>
                                {s.phone}
                            </div>
                            <div style={{ color: "#5A6A8A", fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 12 }}>
                                {s.type === "enterprise" ? s.company || "—" : s.region || "—"}
                            </div>
                            <div>
                                <StatusBadge status={s.status} size="sm" />
                            </div>
                            <div style={{ color: "#8A95AD", fontSize: 12, fontVariantNumeric: "tabular-nums" }}>
                                {formatShort(s.created_at)}
                            </div>
                        </button>
                    ))
                )}
            </div>

            {/* Slide-over panel */}
            <SubmissionPanel
                submission={selected}
                onClose={() => setSelected(null)}
                onUpdate={handleUpdate}
            />
        </>
    )
}

function FilterButtonGroup({
    value,
    onChange,
    options,
}: {
    value: string
    onChange: (v: string) => void
    options: { value: string; label: string }[]
}) {
    return (
        <div
            style={{
                display: "inline-flex",
                background: "#F8FAFF",
                border: "1px solid #E8ECF3",
                borderRadius: 8,
                padding: 2,
            }}
        >
            {options.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    style={{
                        padding: "6px 12px",
                        background: value === opt.value ? "#FFFFFF" : "transparent",
                        border: "none",
                        borderRadius: 6,
                        fontSize: 13,
                        color: value === opt.value ? "#0A1733" : "#5A6A8A",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontWeight: value === opt.value ? 500 : 400,
                        boxShadow: value === opt.value ? "0 1px 2px rgba(10, 23, 51, 0.06)" : "none",
                    }}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    )
}

function formatShort(iso: string): string {
    const d = new Date(iso)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffHr = diffMs / (1000 * 60 * 60)

    if (diffHr < 1) {
        const m = Math.floor(diffMs / (1000 * 60))
        return m <= 0 ? "방금" : `${m}분 전`
    }
    if (diffHr < 24) return `${Math.floor(diffHr)}시간 전`
    if (diffHr < 24 * 7) return `${Math.floor(diffHr / 24)}일 전`
    return d.toLocaleDateString("ko-KR", { month: "2-digit", day: "2-digit" })
}
