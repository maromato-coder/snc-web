"use client"

import LPHeader from "@/components/lp-shared/LPHeader"
import LPAHero from "@/components/lpa/LPAHero"
import LPAPain from "@/components/lpa/LPAPain" 
import LPANewIdentity from "@/components/lpa/LPANewIdentity" 
import LPASystem from "@/components/lpa/LPASystem" 
import LPAGrowth from "@/components/lpa/LPAGrowth"
import LPAStories from "@/components/lpa/LPAStories" 
import LPAPricing from "@/components/lpa/LPAPricing" 
import LPAFinalCTA from "@/components/lpa/LPAFinalCTA" 
export default function JoinPage() {
    return (
        <main style={{ background: "#050E1F", minHeight: "100vh" }}>
            <LPHeader variant="dark" />
            <LPAHero />
            <LPAPain />
            <LPANewIdentity /> 
            <LPASystem />   
            <LPAGrowth />
            <LPAStories /> 
            <LPAPricing />
            <LPAFinalCTA /> 
        </main>
    )
}