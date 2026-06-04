import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"
import { Resend } from "resend"

// ════════════════════════════════════════════════
// GET  /api/email-requests — 신청 목록 조회 (관리자)
// POST /api/email-requests — 신규 신청 (누구나)
// ════════════════════════════════════════════════

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(req: NextRequest) {
    try {
        const authClient = await createClient()
        const { data: { user } } = await authClient.auth.getUser()
        if (!isAdminEmail(user?.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const status = searchParams.get("status") || "all"

        const supabase = createServerSupabaseClient()
        let query = supabase
            .from("email_account_requests")
            .select("*")
            .order("created_at", { ascending: false })

        if (status !== "all") {
            query = query.eq("status", status)
        }

        const { data, error } = await query
        if (error) return NextResponse.json({ error: "조회 실패" }, { status: 500 })

        return NextResponse.json({ requests: data })
    } catch (err) {
        console.error("[GET email-requests]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { requester_name, requester_email, requested_email, department, purpose } = body

        // 입력 검증
        if (!requester_name?.trim() || !requester_email?.trim() || !requested_email?.trim()) {
            return NextResponse.json({ error: "필수 항목이 누락되었습니다" }, { status: 400 })
        }
        if (!requested_email.endsWith("@sncpc.com")) {
            return NextResponse.json({ error: "@sncpc.com 주소만 신청 가능합니다" }, { status: 400 })
        }
        // 이메일 형식 검증
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(requester_email)) {
            return NextResponse.json({ error: "올바른 이메일 주소를 입력해주세요" }, { status: 400 })
        }

        const supabase = createServerSupabaseClient()

        // 중복 신청 확인
        const { data: existing } = await supabase
            .from("email_account_requests")
            .select("id, status")
            .eq("requested_email", requested_email)
            .in("status", ["pending", "approved", "issued"])
            .single()

        if (existing) {
            const statusLabel: Record<string, string> = {
                pending: "검토 중",
                approved: "승인됨",
                issued: "발급 완료",
            }
            return NextResponse.json({
                error: `이미 신청된 주소입니다 (${statusLabel[existing.status] || existing.status})`
            }, { status: 409 })
        }

        // 신청 저장
        const { data, error } = await supabase
            .from("email_account_requests")
            .insert({
                requester_name: requester_name.trim(),
                requester_email: requester_email.trim().toLowerCase(),
                requested_email: requested_email.trim().toLowerCase(),
                department: department?.trim() || null,
                purpose: purpose?.trim() || null,
            })
            .select()
            .single()

        if (error) {
            console.error("[POST email-requests] DB error:", error)
            return NextResponse.json({ error: "저장 실패" }, { status: 500 })
        }

        // 신청자에게 접수 확인 메일
        try {
            await resend.emails.send({
                from: "SNC <noreply@sncpc.com>",
                to: [requester_email],
                subject: "[SNC] 이메일 계정 신청이 접수되었습니다",
                html: `
                    <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #0A1733;">
                        <div style="background: linear-gradient(135deg, #0066FF, #003BB5); borderRadius: 12px; padding: 24px; margin-bottom: 24px; color: #fff; border-radius: 12px;">
                            <h2 style="margin: 0; font-size: 20px; font-weight: 600;">이메일 계정 신청 접수</h2>
                        </div>
                        <p style="font-size: 15px; line-height: 1.7;">${requester_name}님, 이메일 계정 신청이 접수되었습니다.</p>
                        <div style="background: #F8FAFF; border: 1px solid #E2E8F2; border-radius: 10px; padding: 16px 20px; margin: 20px 0;">
                            <div style="font-size: 13px; color: #5A6A8A; margin-bottom: 4px;">신청하신 주소</div>
                            <div style="font-size: 16px; font-weight: 700; color: #0066FF;">${requested_email}</div>
                        </div>
                        <p style="font-size: 14px; color: #5A6A8A; line-height: 1.7;">
                            담당자 검토 후 1~2 영업일 내에 결과를 알려드립니다.<br/>
                            문의: 1566-8099
                        </p>
                    </div>
                `,
            })
        } catch (mailErr) {
            console.error("[POST email-requests] 신청자 메일 실패:", mailErr)
        }

        // 관리자에게 알림 메일
        try {
            await resend.emails.send({
                from: "SNC 알림 <noreply@sncpc.com>",
                to: [process.env.RECIPIENT_EMAIL || "maromato@gmail.com"],
                subject: `[SNC] 새 이메일 계정 신청 — ${requested_email}`,
                html: `
                    <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #0A1733;">
                        <h2 style="font-size: 18px; color: #0A1733;">새 이메일 계정 신청</h2>
                        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                            <tr><td style="padding: 8px 0; color: #5A6A8A; width: 100px;">신청자</td><td>${requester_name}</td></tr>
                            <tr><td style="padding: 8px 0; color: #5A6A8A;">연락 이메일</td><td>${requester_email}</td></tr>
                            <tr><td style="padding: 8px 0; color: #5A6A8A;">신청 주소</td><td style="color: #0066FF; font-weight: 600;">${requested_email}</td></tr>
                            <tr><td style="padding: 8px 0; color: #5A6A8A;">소속</td><td>${department || "-"}</td></tr>
                            <tr><td style="padding: 8px 0; color: #5A6A8A;">용도</td><td>${purpose || "-"}</td></tr>
                        </table>
                        <a href="https://snc-web-gamma.vercel.app/admin/email-requests" style="display: inline-block; margin-top: 20px; background: #0066FF; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px;">
                            관리자 페이지에서 처리하기 →
                        </a>
                    </div>
                `,
            })
        } catch (mailErr) {
            console.error("[POST email-requests] 관리자 메일 실패:", mailErr)
        }

        return NextResponse.json({ success: true, id: data.id })
    } catch (err) {
        console.error("[POST email-requests] Unexpected:", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
