import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server-auth"
import { createServerSupabaseClient } from "@/lib/supabase/server"

const ALLOWED_DOMAIN = "sncpc.com"
const VALID_STATUSES = ["new", "contacted", "completed", "declined"]

interface PatchBody {
    status?: string
    admin_notes?: string | null
}

/**
 * PATCH /api/submissions/[id]
 * 로그인한 @sncpc.com 직원만 상태·메모 수정 가능
 */
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // 인증 체크 (로그인 + 도메인)
    const authClient = await createClient()
    const {
        data: { user },
    } = await authClient.auth.getUser()

    if (!user || !user.email?.endsWith(`@${ALLOWED_DOMAIN}`)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body: PatchBody = await req.json()

    // 입력 검증
    const updates: Record<string, unknown> = {}
    if (body.status !== undefined) {
        if (!VALID_STATUSES.includes(body.status)) {
            return NextResponse.json(
                { error: "Invalid status value" },
                { status: 400 }
            )
        }
        updates.status = body.status
    }
    if (body.admin_notes !== undefined) {
        updates.admin_notes =
            typeof body.admin_notes === "string"
                ? body.admin_notes.trim() || null
                : null
    }

    if (Object.keys(updates).length === 0) {
        return NextResponse.json({ error: "No fields to update" }, { status: 400 })
    }

    // service_role로 업데이트 (RLS 우회)
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
        .from("submissions")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

    if (error) {
        console.error("[/api/submissions/:id PATCH] Failed:", error)
        return NextResponse.json(
            { error: "Update failed", details: error.message },
            { status: 500 }
        )
    }

    return NextResponse.json({ success: true, submission: data })
}
