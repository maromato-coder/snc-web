import ComingSoon from "@/components/admin/ComingSoon"

export default function SitesPage() {
    return (
        <ComingSoon
            eyebrow="SITES"
            title="사이트 관리"
            description="SNC의 모든 사이트를 한 곳에서 관리합니다. 사이트별 신청·문의·설문 데이터를 통합 추적합니다."
            features={[
                "사이트 추가·삭제·설정",
                "사이트별 폼·채널 관리",
                "사이트별 통계 및 분석",
                "URL·도메인·연동 설정",
            ]}
            icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
            }
        />
    )
}
