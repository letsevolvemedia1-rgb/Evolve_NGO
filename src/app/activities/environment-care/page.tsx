"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { InterventionsTabs, InterventionItem } from "@/components/sections/youth-welfare/InterventionsTabs";

/* ── Environment Care intervention tabs (3 tabs) ── */
const envInterventions: InterventionItem[] = [
    {
        id: "tree-plantation",
        label: "TREE PLANTATION DRIVES",
        description:
            "Plantation Of Diverse, Eco-Friendly, And Climate-Resilient Saplings\nFocus On Public Spaces, Schools, Rural Lands, And Underserved Areas\nEnsuring Post-Plantation Care To Support Long-Term Growth",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-6m0 0c-2.485 0-4.5-2.015-4.5-4.5S9.515 6 12 6s4.5 2.015 4.5 4.5S14.485 15 12 15zm0-9c-1.38 0-2.5-1.12-2.5-2.5S10.62 1 12 1s2.5 1.12 2.5 2.5S13.38 6 12 6z" />
            </svg>
        ),
    },
    {
        id: "land-rejuvenation",
        label: "LAND REJUVENATION & SOIL ENRICHMENT",
        description:
            "Restoring Barren And Degraded Land Through Natural Rejuvenation Techniques\nSoil Health Improvement Using Organic And Sustainable Methods\nCreating Green Zones In Urban And Rural Areas For Ecological Balance",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
            </svg>
        ),
    },
    {
        id: "community-participation",
        label: "COMMUNITY PARTICIPATION & AWARENESS",
        description:
            "Organizing Community Clean-Up Drives And Environmental Awareness Campaigns\nEngaging Youth And Volunteers In Eco-Conservation Activities\nSchool And College Environmental Education Programs And Green Clubs",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        ),
    },
];

/* ── Our Focus ── */
const envFocus = [
    "Increase green cover and reduce carbon footprint",
    "Promote ecological balance and biodiversity",
    "Restore barren land and improve soil health",
    "Inspire youth and community participation in sustainability",
    "Reduce pollution and improve air quality over time",
    "Encourage long-term environmental responsibility and awareness",
    "Contribute to a healthier and greener planet",
];

const heroSlides = [
    "/new/Environment/Slider.png",
    "/new/Environment/Slider2.png",
    "/new/Environment/Slider3.png"
];

export default function EnvironmentCarePage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="w-full bg-white font-sans text-slate-800">
            <section className="relative w-full bg-slate-100 overflow-hidden group">
                {/* Structural invisible image to define height responsively based on the slide's intrinsic aspect ratio */}
                <img src={heroSlides[0]} alt="spacer" className="w-full h-auto invisible" aria-hidden="true" />
                
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
                            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                        <img src={slide} alt={`Environment Care Slide ${index + 1}`} className="w-full h-full object-contain sm:object-cover" />
                    </div>
                ))}

                {/* Slider indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                                index === currentSlide ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-14">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide">
                        WHY ENVIRONMENT CARE?
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
                    <div className="w-full md:w-2/5 flex justify-center mt-4">
                        <div className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px]">
                            <div className="absolute top-0 left-0 w-36 h-36 md:w-40 md:h-40 rounded-[2rem] border-4 border-[#87CEEB] overflow-hidden bg-gray-100 z-10">
                                <img src="/new/Environment/glimse.png" alt="Environment Care" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-0 left-6 w-36 h-36 md:w-40 md:h-40 rounded-[2rem] border-4 border-[#00AEFF] overflow-hidden bg-gray-200 z-20">
                                <img src="/new/Environment/glimse2.png" alt="Environment Care" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute top-1/4 right-0 w-32 h-32 md:w-36 md:h-36 rounded-[2rem] border-4 border-white shadow-lg overflow-hidden bg-gray-300 z-30">
                                <img src="/new/Environment/glimse3.png" alt="Environment Care" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 text-justify">
                        <p className="text-xs md:text-sm text-[#005089] font-semibold italic mb-3 text-left">
                            Planting Hope, Growing Futures
                        </p>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4">
                            A healthy planet is the foundation of a healthy future. Yet, rapid urbanization,
                            industrialization, deforestation, and climate change continue to degrade
                            natural ecosystems and threaten global well-being.
                        </p>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4">
                            Environmental deterioration directly impacts communities — reducing air
                            quality, increasing temperatures, harming soil fertility, and affecting food and
                            water security.
                        </p>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                            To secure a sustainable future for the next generation, we must take proactive
                            steps today to restore green spaces, rejuvenate land, and promote ecological
                            responsibility across communities.
                        </p>
                    </div>
                </div>
            </section>

            <InterventionsTabs
                items={envInterventions}
                fullWidth={true}
            />

            <section className="w-full py-10 md:py-16 bg-white">
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide text-center mb-8 md:mb-10">
                        WHAT WE DO
                    </h2>

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        <div className="w-full md:w-1/2 order-2 md:order-1">
                            <div className="space-y-4 text-justify">
                                <p className="text-xs md:text-sm lg:text-base text-slate-600 leading-relaxed">
                                    Evolve Sangh Foundation's Environment Care Programs work toward nurturing a cleaner, greener, and healthier planet by mobilizing youth and communities for environmental action.
                                </p>
                                <p className="text-xs md:text-sm lg:text-base text-slate-600 leading-relaxed">
                                    Through plantation drives, land restoration efforts, and awareness programs, we contribute to reducing pollution, increasing green cover, and rebuilding degraded ecosystems to support long-term sustainability and community well-being.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm border md:border-2 border-gray-100">
                                <img src="/new/Environment/Slider.png" alt="What We Do" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full">
                <div className="w-full bg-[#005089] py-3 md:py-4">
                    <div className="container mx-auto px-4 md:px-8 lg:px-16">
                        <h2 className="text-xl md:text-2xl font-extrabold text-white uppercase tracking-wider text-center">
                            OUR FOCUS
                        </h2>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12 bg-white">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="w-full md:w-5/12 flex justify-center">
                            <div className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border md:border-2 border-gray-100">
                                <img src="/new/Environment/Slider2.png" alt="Our Focus" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="w-full md:w-7/12">
                            <ul className="space-y-3">
                                {envFocus.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2.5 text-slate-700 text-xs md:text-sm lg:text-base leading-relaxed"
                                    >
                                        <span className="text-[#005089] mt-0.5 shrink-0 font-bold">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-10 md:py-14 bg-[#f8f9fa]">
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide text-center mb-8">
                        GLIMPSES
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[
                            "/new/Environment/glimse.png",
                            "/new/Environment/glimse2.png",
                            "/new/Environment/glimse3.png",
                            "/new/Environment/glimse4.png",
                        ].map((src, i) => (
                            <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center shadow-sm">
                                <img src={src} alt={`Environment Care Glimpse ${i + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}