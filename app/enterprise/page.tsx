"use client"

import LPHeader from "@/components/lp-shared/LPHeader"
import LPBHero from "@/components/lpb/LPBHero"
import LPBPain from "@/components/lpb/LPBPain" 
import LPBSolution from "@/components/lpb/LPBSolution" 
import LPBSLA from "@/components/lpb/LPBSLA" 
import LPBCoverage from "@/components/lpb/LPBCoverage"
import LPBProcess from "@/components/lpb/LPBProcess" 
import LPBStories from "@/components/lpb/LPBStories"
import LPBFinalCTA from "@/components/lpb/LPBFinalCTA" 

export default function EnterprisePage() {
    return (
        <main style={{ background: "#FFFFFF", minHeight: "100vh" }}>
            <LPHeader variant="light" />
            <LPBHero />
            <LPBPain />
            <LPBSolution />
            <LPBSLA />
            <LPBCoverage />
            <LPBProcess /> 
            <LPBStories /> 
            <LPBFinalCTA /> 
        </main>
    )
}