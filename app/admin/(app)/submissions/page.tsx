import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/server-auth"
import { redirect } from "next/navigation"
import SubmissionsTable from "@/components/admin/SubmissionsTable"
import { Submission } from "@/components/admin/SubmissionPanel"

export default async function SubmissionsPage() {
    const authClient = await createClient()
    const {
        data: { user },
    } = await authClient.auth.getUser()
    if (!user) redirect("/admin/login")

    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        return (
            <div style={{ padding: "32px 40px" }}>
                <h1 style={{ color: "#DC2626" }}>로딩 실패</h1>
                <pre style={{ background: "#FEF2F2", padding: 16, borderRadius: 8 }}>
                    {error.message}
                </pre>
            </div>
        )
    }

    const submissions = (data || []) as Submission[]

    return (
        <div style={{ padding: "32px 40px" }}>
            {/* Page header */}
            <div style={{ marginBottom: 24 }}>
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
                    SUBMISSIONS
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
                    신청 관리
                </h1>
                <p
                    style={{
                        fontSize: 14,
                        color: "#5A6A8A",
                        margin: "6px 0 0",
                    }}
                >
                    LP-A 가맹 · LP-B 기업 진단 모든 신청을 한 곳에서 관리합니다.
                </p>
            </div>

            <SubmissionsTable initialSubmissions={submissions} />
        </div>
    )
}
