// app/components/WaitlistFeaturesSection.tsx
"use client";

import { Bot, Lock, LucideInspect } from "lucide-react";
import Image from "next/image";
import type { FC, ReactNode } from "react";

type Feature = {
  name: string;
  description: string;
  icon: ReactNode;
};
export const featuresData = [
  {
    title: "Effortless Reflection",
    description: "Seamlessly capture your thoughts and insights with an intuitive interface.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "AI Coach & Companion",
    description: "AI companion that listens and gently helps you reframe your thoughts when you feel stuck.",
    icon: (
      <Bot/>
    ),
  },
  {
    title: "Seed Prompts & Templates",
    description: "Carefully designed prompts and journaling templates so you never face a blank page.",
    icon: (
      <LucideInspect/>
    ),
  },
  {
    title: "Encrypted Private Journals",
    description: "Your entries are encrypted and private by default. So your all thoughts stay fully yours.",
    icon: (
      <Lock/>
    ),
  },
];

import React, { FormEvent, useState } from 'react';

function WaitlistFeatureSection({ 
  }) {
    
    
    return (
        <div id="feature" className="relative min-h-screen bg-gradient-to-br from-sky-200 to-sky-100/60 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                {/* --- Left Side: Text and Features --- */}
                <div className="text-left space-y-4">
                    <div className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-500 border-1 border-sky-500">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
                      Key Features
                    </div>
                    <h2 className="text-3xl font-normal tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem] lg:leading-snug">
                      Built for people who want to think <span className="text-sky-600 font-bold underline underline-offset-5">clearer</span> and feel more <span className="text-sky-600 font-bold underline underline-offset-5">grounded</span>.{" "}
                      {/* <span className="text-sky-600 font-bold">clearer</span> */}
                    </h2>
                    {/* <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
                      Built for people who want to think clearer and feel more grounded.
                    </p> */}

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 pt-6">
                        {featuresData.map((feature, index) => (
                            <div key={index} className="flex flex-col gap-4 cursor-pointer items-start space-x-4">
                                <div className="">
                                    {/* Icon Placeholder */}
                                    <div className="p-3 rounded-3xl bg-sky-600 bg-gradient-to-br from-sky-600  to-[#4074A7] text-sky-50">
                                        {feature.icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-normal text-gray-900">{feature.title}</h3>
                                    <p className="mt-1 text-gray-600 text-base">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* --- Right Side: Phone Image Placeholder --- */}
                <div className="relative flex justify-center items-center md:justify-end">
                    {/* Replace this div with your Next.js Image component for the phone mockup */}
                    <div className="w-full max-w-6xl h-100 rounded-2xl shadow-xl flex items-center justify-center text-gray-600 text-2xl font-semibold">
                        <img src="/og5.png" alt="dashboard" className="rounded-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WaitlistFeatureSection;