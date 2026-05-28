"use client"

import LPBHero from "@/components/lpb/LPBHero"
import LPBPain from "@/components/lpb/LPBPain" 

export default function EnterprisePage() {
    return (
        <main style={{ background: "#FFFFFF", minHeight: "100vh" }}>
            <LPBHero />
            <LPBPain />
        </main>
    )
}