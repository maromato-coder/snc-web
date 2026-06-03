import ComingSoon from "@/components/admin/ComingSoon"

export default function UsersPage() {
    return (
        <ComingSoon
            eyebrow="USERS"
            title="사용자 관리"
            description="@sncpc.com 직원들의 운영 콘솔 접근 권한을 관리합니다. 역할별 권한 분리로 보안성을 높입니다."
            features={[
                "직원 초대·삭제·역할 부여",
                "Super Admin / Editor / Viewer 역할",
                "사이트별 접근 권한 (예: A 직원은 SNC만, B 직원은 NODE만)",
                "활동 로그 (누가 언제 무엇을 했는지)",
            ]}
            icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
            }
        />
    )
}
