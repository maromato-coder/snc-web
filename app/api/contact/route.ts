import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createServerSupabaseClient } from "@/lib/supabase/server"

const resend = new Resend(process.env.RESEND_API_KEY)

// ════════════════════════════════════════════════
// POST /api/contact
// LP-A (가맹) / LP-B (기업) 폼 제출을 받아서
// 1) Supabase DB에 저장
// 2) maromato@gmail.com 으로 알림 메일 발송
// ════════════════════════════════════════════════

interface SubmissionBody {
    type: "join" | "enterprise"
    name: string
    phone: string
    message?: string
    // LP-A 전용
    region?: string
    // LP-B 전용
    company?: string
    size?: string
}

export async function POST(req: NextRequest) {
    try {
        const body: SubmissionBody = await req.json()

        // ──────── 입력 검증 ────────
        if (!body.type || !body.name?.trim() || !body.phone?.trim()) {
            return NextResponse.json(
                { error: "필수 항목이 누락되었습니다" },
                { status: 400 }
            )
        }
        if (!["join", "enterprise"].includes(body.type)) {
            return NextResponse.json(
                { error: "잘못된 신청 종류" },
                { status: 400 }
            )
        }

        // ──────── 1. DB 저장 (필수) ────────
        const supabase = createServerSupabaseClient()
        const { data, error: dbError } = await supabase
            .from("submissions")
            .insert({
                type: body.type,
                name: body.name.trim(),
                phone: body.phone.trim(),
                message: body.message?.trim() || null,
                region: body.region?.trim() || null,
                company: body.company?.trim() || null,
                size: body.size?.trim() || null,
            })
            .select()
            .single()

        if (dbError) {
            console.error("[/api/contact] DB insert failed:", dbError)
            return NextResponse.json(
                { error: "신청 저장에 실패했습니다" },
                { status: 500 }
            )
        }

        // ──────── 2. 메일 알림 (실패해도 응답은 성공) ────────
        try {
            const isJoin = body.type === "join"
            const typeLabel = isJoin ? "가맹 신청" : "기업 진단 신청"
            const subjectName = isJoin
                ? body.name
                : `${body.company || ""} ${body.name}`.trim()

            await resend.emails.send({
                from: "SNC 신청 알림 <noreply@sncpc.com>",
                to: ["maromato@gmail.com"],
                subject: `[SNC] 새 ${typeLabel} - ${subjectName}`,
                html: renderEmailHtml(body),
            })
        } catch (mailError) {
            // 메일 실패는 로깅만 — DB 저장은 됐으니 사용자에겐 성공 응답
            console.error("[/api/contact] Email failed (data saved):", mailError)
        }

        return NextResponse.json({ success: true, id: data.id })
    } catch (error) {
        console.error("[/api/contact] Unexpected error:", error)
        return NextResponse.json(
            { error: "서버 오류가 발생했습니다" },
            { status: 500 }
        )
    }
}

// ════════════════════════════════════════════════
// 알림 메일 HTML 템플릿
// ════════════════════════════════════════════════
function renderEmailHtml(body: SubmissionBody): string {
    const isJoin = body.type === "join"
    const typeLabel = isJoin ? "🚀 NODE 가맹 신청" : "🏢 기업 IT 진단 신청"
    const typeColor = isJoin ? "#0066FF" : "#003BB5"

    const rows: string[] = []
    rows.push(row("이름", escapeHtml(body.name)))
    rows.push(
        row(
            "연락처",
            `<a href="tel:${escapeHtml(body.phone)}" style="color: #0066FF; text-decoration: none; font-weight: 500;">${escapeHtml(body.phone)}</a>`
        )
    )
    if (isJoin && body.region) {
        rows.push(row("지역", escapeHtml(body.region)))
    }
    if (!isJoin && body.company) {
        rows.push(row("회사명", escapeHtml(body.company)))
    }
    if (!isJoin && body.size) {
        rows.push(row("기업 규모", escapeHtml(body.size)))
    }
    if (body.message) {
        rows.push(row("문의 내용", escapeHtml(body.message).replace(/\n/g, "<br>")))
    }

    const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })

    return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><title>SNC 신청 알림</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Pretendard Variable', 'Apple SD Gothic Neo', sans-serif; line-height: 1.6; color: #0A1733; margin: 0; padding: 24px; background: #F8FAFF;">
  <div style="max-width: 580px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; padding: 36px 32px; box-shadow: 0 4px 16px rgba(10,23,51,0.06);">
    <div style="border-bottom: 2px solid ${typeColor}; padding-bottom: 16px; margin-bottom: 24px;">
      <div style="font-size: 12px; color: ${typeColor}; font-weight: 600; letter-spacing: 1.2px;">SNC 신청 알림 · ${now}</div>
      <h1 style="font-size: 22px; margin: 8px 0 0; color: #0A1733; font-weight: 600;">${typeLabel}</h1>
    </div>
    <table style="width: 100%; border-collapse: collapse;">
      ${rows.join("")}
    </table>
    <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #E2E8F2; font-size: 12px; color: #5A6A8A; line-height: 1.7;">
      이 메일은 LP 폼 제출 시 자동 발송된 알림입니다.<br>
      관리자 페이지에서 상태 변경·메모 기록이 가능합니다.<br>
      <a href="https://snc-web-gamma.vercel.app/admin" style="color: #0066FF; text-decoration: none; font-weight: 500;">관리자 페이지 열기 →</a>
    </div>
  </div>
</body>
</html>`
}

function row(label: string, value: string): string {
    return `<tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #F0F2F5; color: #5A6A8A; font-size: 13px; width: 100px; vertical-align: top;">${label}</td>
      <td style="padding: 12px 0; border-bottom: 1px solid #F0F2F5; color: #0A1733; font-size: 14px;">${value}</td>
    </tr>`
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}
