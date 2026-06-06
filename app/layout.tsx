import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#0066FF",
};

export const metadata: Metadata = {
    metadataBase: new URL("https://snc-web-gamma.vercel.app"),
    title: {
        default: "SNC | 25년 IT 서비스 파트너, 컴퓨터 AS 전문기업",
        template: "%s | SNC 에스엔씨",
    },
    description:
        "2001년부터 25년, 누적 AS 11만 건. 기업 311개사가 신뢰한 전국 IT 서비스 파트너. KOSA 정회원·주연테크 공식대리점. 전국 106 NODE 네트워크 운영.",
    openGraph: {
        type: "website",
        locale: "ko_KR",
        url: "https://snc-web-gamma.vercel.app",
        siteName: "SNC | 에스엔씨",
        title: "SNC | 25년 IT 서비스 파트너, 컴퓨터 AS 전문기업",
        description:
            "2001년부터 25년, 누적 AS 11만 건. 기업 311개사가 신뢰한 전국 IT 서비스 파트너.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "SNC - 전국 IT 서비스를 다시 연결합니다",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "SNC | 25년 IT 서비스 파트너, 컴퓨터 AS 전문기업",
        description:
            "누적 AS 11만 건, 기업 311개사가 신뢰한 전국 IT 서비스 파트너.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: "/favicon.ico",
    },
    category: "business",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ko"
            data-scroll-behavior="smooth"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}