import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server-auth"
import { createServerSupabaseClient } from "@/lib/supabase/server"

const ALLOWED_DOMAIN = "sncpc.com"

/**
 * GET /api/submissions/csv
 * 인증된 @sncpc.com 직원만 다운로드 가능
 * Query params: type, status, q (검색어)
 */
export async function GET(req: NextRequest) {
    // 인증
    const authClient = await createClient()
    const {
        data: { user },
    } = await authClient.auth.getUser()

    if (!user || !user.email?.endsWith(`@${ALLOWED_DOMAIN}`)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const filterType = searchParams.get("type")
    const filterStatus = searchParams.get("status")
    const searchQuery = searchParams.get("q")?.toLowerCase()

    // 데이터 조회
    const supabase = createServerSupabaseClient()
    let query = supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false })

    if (filterType && filterType !== "all") {
        query = query.eq("type", filterType)
    }
    if (filterStatus && filterStatus !== "all") {
        query = query.eq("status", filterStatus)
    }

    const { data, error } = await query
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    let rows = data || []
    // 검색어는 클라이언트 측 필터링 (DB OR로 처리 가능하지만 단순화)
    if (searchQuery) {
        rows = rows.filter((r) => {
            const hay = `${r.name} ${r.phone} ${r.company || ""} ${r.region || ""} ${r.message || ""}`.toLowerCase()
            return hay.includes(searchQuery)
        })
    }

    // CSV 생성
    const headers = [
        "ID",
        "신청종류",
        "이름",
        "연락처",
        "회사명",
        "기업규모",
        "지역",
        "문의내용",
        "상태",
        "담당자메모",
        "신청일시",
        "최근수정",
    ]

    const csvRows = [
        headers.join(","),
        ...rows.map((r) =>
            [
                r.id,
                r.type === "join" ? "가맹" : "기업",
                r.name,
                r.phone,
                r.company || "",
                r.size || "",
                r.region || "",
                r.message || "",
                statusLabel(r.status),
                r.admin_notes || "",
                formatDateTime(r.created_at),
                formatDateTime(r.updated_at),
            ]
                .map(csvEscape)
                .join(",")
        ),
    ]

    // 한글 깨짐 방지: UTF-8 BOM 추가
    const csv = "\uFEFF" + csvRows.join("\r\n")

    const filename = `snc-submissions-${new Date().toISOString().slice(0, 10)}.csv`

    return new NextResponse(csv, {
        status: 200,
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
        },
    })
}

function csvEscape(val: unknown): string {
    if (val === null || val === undefined) return ""
    const s = String(val)
    // 쌍따옴표·콤마·줄바꿈 있으면 따옴표로 감싸고 내부 따옴표는 두 번
    if (s.includes('"') || s.includes(",") || s.includes("\n") || s.includes("\r")) {
        return `"${s.replace(/"/g, '""')}"`
    }
    return s
}

function statusLabel(status: string): string {
    switch (status) {
        case "new":
            return "신규"
        case "contacted":
            return "연락중"
        case "completed":
            return "완료"
        case "declined":
            return "거절"
        default:
            return status
    }
}

function formatDateTime(iso: string): string {
    if (!iso) return ""
    return new Date(iso).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
}
