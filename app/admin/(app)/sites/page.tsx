import ComingSoon from "@/components/admin/ComingSoon"

export default function SitesPage() {
    return (
        <ComingSoon
            eyebrow="SITES"
            title="사이트 관리"
            description="SNC가 운영하는 모든 사이트를 통합 관리합니다. 사이트별 신청·문의·설문 데이터를 한 화면에서 추적할 수 있게 됩니다."
            features={[
                "사이트 추가·삭제·설정",
                "사이트별 폼·설문 관리",
                "사이트별 통계 및 분석",
                "URL·도메인·연동 설정",
            ]}
            icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
            }
        />
    )
}
