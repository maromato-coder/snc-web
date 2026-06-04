import { NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server-auth"
import { isAdminEmail } from "@/lib/auth-check"
import { Resend } from "resend"

// ════════════════════════════════════════════════
// PATCH /api/email-requests/[id]
// 신청 상태 변경 (승인/발급완료/거절)
// ════════════════════════════════════════════════

const resend = new Resend(process.env.RESEND_API_KEY)

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authClient = await createClient()
        const { data: { user } } = await authClient.auth.getUser()
        if (!isAdminEmail(user?.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await req.json()
        const { status, admin_memo } = body

        const validStatuses = ["pending", "approved", "issued", "rejected"]
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: "잘못된 상태값" }, { status: 400 })
        }

        const supabase = createServerSupabaseClient()

        const updateData: Record<string, unknown> = {
            status,
            updated_at: new Date().toISOString(),
        }
        if (admin_memo !== undefined) updateData.admin_memo = admin_memo
        if (status === "issued") updateData.issued_at = new Date().toISOString()

        const { data, error } = await supabase
            .from("email_account_requests")
            .update(updateData)
            .eq("id", id)
            .select()
            .single()

        if (error) return NextResponse.json({ error: "업데이트 실패" }, { status: 500 })

        // 발급 완료 시 sender_accounts에 자동 등록
        if (status === "issued" && data.requested_email) {
            await supabase
                .from("sender_accounts")
                .upsert({
                    email: data.requested_email,
                    display_name: data.requester_name,
                    is_active: true,
                    created_by: user!.email!,
                }, { onConflict: "email" })
        }

        // 신청자에게 결과 메일
        if ((status === "issued" || status === "rejected") && data.requester_email) {
            try {
                const isIssued = status === "issued"
                await resend.emails.send({
                    from: "SNC <noreply@sncpc.com>",
                    to: [data.requester_email],
                    subject: `[SNC] 이메일 계정 신청 ${isIssued ? "발급 완료" : "거절"} 안내`,
                    html: `
                        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #0A1733;">
                            <div style="background: ${isIssued ? "linear-gradient(135deg, #0066FF, #003BB5)" : "linear-gradient(135deg, #EF4444, #B91C1C)"}; border-radius: 12px; padding: 24px; margin-bottom: 24px; color: #fff;">
                                <h2 style="margin: 0; font-size: 20px; font-weight: 600;">
                                    ${isIssued ? "✅ 이메일 계정 발급 완료" : "❌ 이메일 계정 신청 거절"}
                                </h2>
                            </div>
                            <p style="font-size: 15px; line-height: 1.7;">${data.requester_name}님,</p>
                            ${isIssued ? `
                                <div style="background: #F8FAFF; border: 1px solid #E2E8F2; border-radius: 10px; padding: 16px 20px; margin: 20px 0;">
                                    <div style="font-size: 13px; color: #5A6A8A; margin-bottom: 4px;">발급된 이메일 주소</div>
                                    <div style="font-size: 18px; font-weight: 700; color: #0066FF;">${data.requested_email}</div>
                                </div>
                                <p style="font-size: 14px; color: #5A6A8A; line-height: 1.7;">
                                    초기 비밀번호 및 접속 안내는 별도로 전달해 드립니다.<br/>
                                    문의: 1566-8099
                                </p>
                            ` : `
                                <p style="font-size: 14px; color: #5A6A8A; line-height: 1.7;">
                                    신청하신 <strong>${data.requested_email}</strong> 계정 발급이 거절되었습니다.
                                    ${admin_memo ? `<br/>사유: ${admin_memo}` : ""}
                                    <br/><br/>문의: 1566-8099
                                </p>
                            `}
                        </div>
                    `,
                })
            } catch (mailErr) {
                console.error("[PATCH email-requests] 결과 메일 실패:", mailErr)
            }
        }

        return NextResponse.json({ success: true, data })
    } catch (err) {
        console.error("[PATCH email-requests/[id]]", err)
        return NextResponse.json({ error: "서버 오류" }, { status: 500 })
    }
}
