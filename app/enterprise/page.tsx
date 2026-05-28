"use client"

import LPBHero from "@/components/lpb/LPBHero"
import LPBPain from "@/components/lpb/LPBPain" 
import LPBSolution from "@/components/lpb/LPBSolution" 
import LPBSLA from "@/components/lpb/LPBSLA" 
import LPBCoverage from "@/components/lpb/LPBCoverage"

export default function EnterprisePage() {
    return (
        <main style={{ background: "#FFFFFF", minHeight: "100vh" }}>
            <LPBHero />
            <LPBPain />
            <LPBSolution />
            <LPBSLA />
            <LPBCoverage />
        </main>
    )
}