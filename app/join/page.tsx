"use client"

import LPAHero from "@/components/lpa/LPAHero"
import LPAPain from "@/components/lpa/LPAPain" 
import LPANewIdentity from "@/components/lpa/LPANewIdentity" 
export default function JoinPage() {
    return (
        <main style={{ background: "#050E1F", minHeight: "100vh" }}>
            <LPAHero />
            <LPAPain />
            <LPANewIdentity />  
        </main>
    )
}
