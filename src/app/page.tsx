"use client"

import { Header } from "@/components/Header"
import Hero from "@/components/Hero"
import { Features } from "@/components/Features"
import { Waitlist } from "@/components/Waitlist"
import { Footer } from "@/components/Footer"

export default function Page() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        {/* <Features /> */}
        {/* <Waitlist /> */}
      </main>
      {/* <Footer /> */}
    </div>
  )
}