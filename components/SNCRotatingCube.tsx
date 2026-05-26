"use client"

import { motion, useMotionValue } from "framer-motion"
import * as React from "react"

interface CubeProps {
    size?: number
    rotationDuration?: number
    tiltX?: number
    pauseOnHover?: boolean
}

interface ThemeProps {
    size: number
    primary: string
    primaryDeep: string
    navy: string
    muted: string
    border: string
    bgKpi: string
    bgPale: string
    avatarBg: string
}

export default function SNCRotatingCube({
    size = 340,
    rotationDuration = 20,
    tiltX = -12,
    pauseOnHover = true,
}: CubeProps) {
    const primary = "#0066FF"
    const primaryDeep = "#0046C0"
    const navy = "#0A1733"
    const muted = "#5A6A8A"
    const border = "#DDE3F0"
    const bgFace = "#FFFFFF"
    const bgKpi = "#F0F4FB"
    const bgPale = "#F8FAFF"
    const avatarBg = "#E6EEFF"

    const [isHovered, setIsHovered] = React.useState(false)
    const rotateY = useMotionValue(0)
    const shouldPause = pauseOnHover && isHovered

    React.useEffect(() => {
        if (shouldPause) return
        let raf: number
        let lastTime: number | undefined
        const speed = 360 / (rotationDuration * 1000)

        const loop = (time: number) => {
            if (lastTime === undefined) lastTime = time
            const delta = time - lastTime
            lastTime = time
            rotateY.set((rotateY.get() + delta * speed) % 360)
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)

        return () => {
            if (raf) cancelAnimationFrame(raf)
        }
    }, [shouldPause, rotationDuration, rotateY])

    const half = size / 2
    const theme: ThemeProps = {
        size,
        primary,
        primaryDeep,
        navy,
        muted,
        border,
        bgKpi,
        bgPale,
        avatarBg,
    }

    const faceBase: React.CSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        width: size,
        height: size,
        background: bgFace,
        border: `1px solid ${border}`,
        borderRadius: size * 0.053,
        padding: size * 0.082,
        boxSizing: "border-box",
        boxShadow: `0 ${size * 0.059}px ${size * 0.118}px rgba(10, 23, 51, 0.08)`,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        overflow: "hidden",
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                perspective: size * 5.3,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                style={{
                    position: "relative",
                    width: size,
                    height: size,
                    transformStyle: "preserve-3d",
                    rotateY: rotateY,
                    rotateX: tiltX,
                }}
            >
                <div style={{ ...faceBase, transform: `translateZ(${half}px)` }}>
                    <DashboardFace {...theme} />
                </div>
                <div style={{ ...faceBase, transform: `rotateY(90deg) translateZ(${half}px)` }}>
                    <NodeMapFace {...theme} />
                </div>
                <div style={{ ...faceBase, transform: `rotateY(180deg) translateZ(${half}px)` }}>
                    <FixerProfileFace {...theme} />
                </div>
                <div style={{ ...faceBase, transform: `rotateY(270deg) translateZ(${half}px)` }}>
                    <LiveCallsFace {...theme} />
                </div>
            </motion.div>
        </div>
    )
}

function Eyebrow({ size, primaryDeep, children }: { size: number; primaryDeep: string; children: React.ReactNode }) {
    return (
        <div
            style={{
                fontSize: size * 0.038,
                color: primaryDeep,
                fontWeight: 500,
                letterSpacing: size * 0.002,
                marginBottom: size * 0.065,
                fontFamily: "'Inter', sans-serif",
            }}
        >
            {children}
        </div>
    )
}

function DashboardFace({ size, primary, primaryDeep, navy, muted, bgKpi }: ThemeProps) {
    const bars = [30, 55, 42, 72, 58, 88, 48]
    return (
        <>
            <Eyebrow size={size} primaryDeep={primaryDeep}>LIVE DASHBOARD</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: size * 0.035, marginBottom: size * 0.06 }}>
                {[
                    { l: "오늘 콜", n: "47", color: navy },
                    { l: "처리율", n: "98%", color: primary },
                ].map((kpi) => (
                    <div key={kpi.l} style={{ background: bgKpi, padding: `${size * 0.047}px ${size * 0.053}px`, borderRadius: size * 0.03 }}>
                        <div style={{ fontSize: size * 0.038, color: muted }}>{kpi.l}</div>
                        <div style={{ fontSize: size * 0.088, fontWeight: 500, color: kpi.color, marginTop: size * 0.012, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>{kpi.n}</div>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: size * 0.023, height: size * 0.265 }}>
                {bars.map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: i === bars.length - 1 ? "#B8C5E0" : primary, borderRadius: `${size * 0.012}px ${size * 0.012}px 0 0` }} />
                ))}
            </div>
        </>
    )
}

function NodeMapFace({ size, primary, primaryDeep, muted, bgPale, border }: ThemeProps) {
    const nodes: [number, number, number, number][] = [
        [92, 52, 5, 1], [118, 78, 5, 1], [82, 92, 5, 1], [132, 102, 5, 1],
        [106, 124, 5, 1], [76, 134, 4, 0.55], [124, 148, 4, 0.55], [98, 158, 4, 0.55],
    ]
    return (
        <>
            <Eyebrow size={size} primaryDeep={primaryDeep}>NODE NETWORK</Eyebrow>
            <div style={{ height: size * 0.59, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 240 200" style={{ width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
                    <path d="M75,18 Q108,12 138,22 L162,52 Q170,90 156,124 L138,158 Q110,186 76,180 L52,150 Q34,124 44,90 Q54,46 75,18 Z" fill={bgPale} stroke={border} strokeWidth="1" />
                    {nodes.map(([cx, cy, r, op], i) => (
                        <circle key={i} cx={cx} cy={cy} r={r} fill={primary} opacity={op} />
                    ))}
                </svg>
            </div>
            <div style={{ fontSize: size * 0.038, color: muted, textAlign: "center", marginTop: size * 0.035 }}>전국 106 NODE 운영 중</div>
        </>
    )
}

function FixerProfileFace({ size, primaryDeep, navy, muted, avatarBg }: ThemeProps) {
    const stats: [string, string][] = [["4.9", "평점"], ["847", "완료"], ["43", "추천"]]
    return (
        <>
            <Eyebrow size={size} primaryDeep={primaryDeep}>FIXER PROFILE</Eyebrow>
            <div style={{ display: "flex", alignItems: "center", gap: size * 0.041, marginBottom: size * 0.082 }}>
                <div style={{ width: size * 0.118, height: size * 0.118, background: avatarBg, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.041, fontWeight: 500, color: primaryDeep }}>홍</div>
                <div>
                    <div style={{ fontSize: size * 0.041, fontWeight: 500, color: navy, lineHeight: 1.2 }}>홍길동</div>
                    <div style={{ fontSize: size * 0.035, color: primaryDeep, fontFamily: "'Inter', sans-serif", fontWeight: 500, letterSpacing: size * 0.0015, marginTop: size * 0.012 }}>◆ FIXER CHIEF</div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", textAlign: "center" }}>
                {stats.map(([n, l]) => (
                    <div key={l}>
                        <div style={{ color: navy, fontWeight: 500, fontSize: size * 0.053, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>{n}</div>
                        <div style={{ fontSize: size * 0.035, color: muted, marginTop: size * 0.018 }}>{l}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

function LiveCallsFace({ size, primary, primaryDeep, navy, muted, bgKpi, bgPale }: ThemeProps) {
    const calls = [
        { loc: "강남", id: "#2847", status: "진행", active: true },
        { loc: "송파", id: "#2846", status: "진행", active: true },
        { loc: "분당", id: "#2845", status: "완료", active: false },
    ]
    return (
        <>
            <Eyebrow size={size} primaryDeep={primaryDeep}>LIVE CALLS</Eyebrow>
            <div>
                {calls.map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: size * 0.026, padding: `${size * 0.032}px ${size * 0.04}px`, background: c.active ? bgKpi : bgPale, borderRadius: size * 0.024, marginBottom: size * 0.018 }}>
                        <span style={{ width: size * 0.024, height: size * 0.024, background: c.active ? primary : "#B8C5E0", borderRadius: "50%", flexShrink: 0 }} />
                        <div style={{ fontSize: size * 0.038, color: c.active ? navy : muted, flex: 1, fontFamily: "'Inter', sans-serif" }}>{c.loc} · {c.id}</div>
                        <div style={{ fontSize: size * 0.035, color: c.active ? primaryDeep : muted }}>{c.status}</div>
                    </div>
                ))}
            </div>
        </>
    )
}
