import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server-auth"

// ════════════════════════════════════════════════
// GET /api/submissions/csv
// 전체 신청 CSV 다운로드 (한글 깨짐 방지 BOM 포함)
// ════════════════════════════════════════════════

const STATUS_LABEL: Record<string, string> = {
    new: "신규",
    contacted: "연락중",
    completed: "완료",
    declined: "거절",
}
const TYPE_LABEL: Record<string, string> = {
    join: "가맹 신청",
    enterprise: "기업 진단",
}
const SITE_LABEL: Record<string, string> = {
    "snc-main": "SNC 메인",
}
const CHANNEL_LABEL: Record<string, string> = {
    form: "폼",
    email: "이메일",
    survey: "설문",
}

export async function GET(req: NextRequest) {
    try {
        const authClient = await createClient()
        const { data: { user } } = await authClient.auth.getUser()
        if (!user?.email?.endsWith("@sncpc.com")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const supabase = createServerSupabaseClient()
        const { data, error } = await supabase
            .from("submissions")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("[CSV] DB error:", error)
            return NextResponse.json({ error: "데이터 조회 실패" }, { status: 500 })
        }

        const headers = [
            "신청일시", "종류", "사이트", "채널",
            "이름", "연락처", "회사명", "기업규모", "지역", "문의내용",
            "처리상태", "관리자메모"
        ]

        const rows = (data || []).map((row) => {
            const createdAt = new Date(row.created_at).toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
                year: "numeric", month: "2-digit", day: "2-digit",
                hour: "2-digit", minute: "2-digit",
            })
            return [
                createdAt,
                TYPE_LABEL[row.type] || row.type,
                SITE_LABEL[row.site_id] || row.site_id || "SNC 메인",
                CHANNEL_LABEL[row.channel] || row.channel || "폼",
                row.name || "",
                row.phone || "",
                row.company || "",
                row.size || "",
                row.region || "",
                (row.message || "").replace(/\n/g, " "),
                STATUS_LABEL[row.status] || row.status,
                (row.admin_notes || "").replace(/\n/g, " "),
            ]
                .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
                .join(",")
        })

        // UTF-8 BOM 추가 (Excel 한글 깨짐 방지)
        const BOM = "\uFEFF"
        const csv = BOM + [headers.join(","), ...rows].join("\n")

        const filename = `SNC_신청목록_${new Date().toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" }).replace(/\./g, "").replace(/ /g, "")}.csv`

        return new NextResponse(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
            },
        })
    } catch (error) {
        console.error("[CSV] Unexpected:", error)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
