"use client"

import LPAHero from "@/components/lpa/LPAHero"
import LPAPain from "@/components/lpa/LPAPain" 
import LPANewIdentity from "@/components/lpa/LPANewIdentity" 
import LPASystem from "@/components/lpa/LPASystem" 
import LPAGrowth from "@/components/lpa/LPAGrowth"
import LPAStories from "@/components/lpa/LPAStories" 
export default function JoinPage() {
    return (
        <main style={{ background: "#050E1F", minHeight: "100vh" }}>
            <LPAHero />
            <LPAPain />
            <LPANewIdentity /> 
            <LPASystem />   
            <LPAGrowth />
            <LPAStories /> 
        </main>
    )
}