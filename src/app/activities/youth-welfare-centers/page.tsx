
"use client";

import { InterventionsTabs } from "@/components/sections/youth-welfare/InterventionsTabs";
import { WhatWeDo } from "@/components/sections/youth-welfare/WhatWeDo";
import { OurFocus } from "@/components/sections/youth-welfare/OurFocus";
import { StoriesOfChange } from "@/components/sections/youth-welfare/StoriesOfChange";
import { HeroSlider } from "@/components/sections/youth-welfare/HeroSlider";
import Image from "next/image";

export default function YouthWelfareCentersPage() {

    return (
        <main className="w-full bg-white font-sans text-slate-800">
            <HeroSlider />

            <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide">
                        WHY YOUTH WELFARE CENTER
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
                    <div className="w-full md:w-2/5 flex justify-center shrink-0">
                        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                            <Image
                                src="/new/Youth/logo.png"
                                alt="Why Youth Welfare Center"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 text-justify">
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-3">
                            India is home to the world&apos;s largest youth population, yet millions
                            of talented young individuals from financially challenged
                            backgrounds struggle to access quality education, skill training,
                            and emotional support.
                        </p>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-3">
                            A significant percentage of students from rural areas and urban
                            slums face barriers such as limited academic resources, lack of
                            mentorship, absence of career guidance, and financial
                            constraints. Many first-generation learners drop out due to socio-
                            economic pressures, weak learning foundations, and limited
                            exposure to opportunities.
                        </p>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-3">
                            To fulfil India&apos;s vision of becoming a global knowledge and skill
                            hub, it is essential to build an ecosystem where every youth —
                            irrespective of background — has the support, skills, and
                            opportunities to excel academically, personally, and
                            professionally.
                        </p>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                            Our Youth Welfare Centers bridge this crucial gap and empower
                            young minds to transform their future.
                        </p>
                    </div>
                </div>
            </section>

            <InterventionsTabs fullWidth={true} />

            <WhatWeDo />

            <OurFocus />

            <StoriesOfChange />
        </main>
    );
}