"use client"

import { Header } from "@/components/Header"
import Hero from "@/components/Hero"
import { Features } from "@/components/Features"
import { Waitlist } from "@/components/Waitlist"
import { Footer } from "@/components/Footer"
import WaitlistFeaturesSection from "@/components/WaitlistFeaturesSection"
import { useEffect, useState } from "react"
import { LucideArrowDown, LucideArrowUp } from "lucide-react"


export function useActiveSection() {
  const [active, setActive] = useState<"waitlist" | "feature">("waitlist");

  useEffect(() => {
    const wait = document.getElementById("waitlist");
    const feat = document.getElementById("feature");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id as "waitlist" | "feature");
        }
      },
      { threshold: 0.4 }
    );

    wait && observer.observe(wait);
    feat && observer.observe(feat);

    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Page() {
const active = useActiveSection();

  return (
    <div className="bg-white relative">
      <Header />
      <main>
        <Hero/>
        <WaitlistFeaturesSection />
        {/* <Features /> */}
        {/* <Waitlist /> */}
      </main>

      <div className="w-full bg-transparent fixed bottom-8 flex items-center justify-center z-10">

      <button
        onClick={() =>
          document.getElementById(active === "waitlist" ? "feature" : "waitlist")?.scrollIntoView({ behavior: "smooth" })
        }
        className="
          rounded-full px-6 py-3
          text-base font-medium text-white
          backdrop-blur-md bg-slate-900/40
          border border-gray-200/20
          shadow-[0_10px_35px_rgba(15,23,42,0.55)]
          hover:bg-slate-900/50 transition
          cursor-pointer
          flex items-center gap-3
          "
          >
          {active === "waitlist" ? <LucideArrowDown className="animate-bounce"/> : <LucideArrowUp className="animate-bounce"/>}
        {active === "waitlist" ? "View Features" : "Back to Waitlist"}
      </button>
      </div>

    </div>
  )
}