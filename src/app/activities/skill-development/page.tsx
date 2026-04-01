"use client";

import { useState, useEffect } from "react";
import { InterventionsTabs, InterventionItem } from "@/components/sections/youth-welfare/InterventionsTabs";

/* ── Skill Development intervention tabs (5 tabs) ── */
const skillInterventions: InterventionItem[] = [
    {
        id: "digital-technical",
        label: "DIGITAL & TECHNICAL SKILLS TRAINING",
        description:
            "Basic & Advanced Computer Training\nCoding & Software Development Fundamentals\nIndustry-Oriented Digital Tools & Technology Skills",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
        ),
    },
    {
        id: "employability",
        label: "EMPLOYABILITY & CAREER READINESS",
        description:
            "Resume Writing, Interview Preparation & Communication Skills\nSoft Skills Training For Workplace Readiness\nPersonality Development And Professional Etiquette Workshops",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
        ),
    },
    {
        id: "vocational",
        label: "VOCATIONAL & PROFESSIONAL TRAINING",
        description:
            "Hands-On Vocational Training In High-Demand Trades\nCertification Programs For Skilled Employment\nIndustry-Aligned Courses For Sustainable Livelihoods",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.06a1.5 1.5 0 010-2.58l5.1-3.06a1.5 1.5 0 011.639.02l4.907 3.06a1.5 1.5 0 010 2.54l-4.907 3.06a1.5 1.5 0 01-1.639.02zM4.5 17.5l6.42-3.86a1.5 1.5 0 011.639.02L19.5 17.5" />
            </svg>
        ),
    },
    {
        id: "mentorship-industry",
        label: "MENTORSHIP & INDUSTRY EXPOSURE",
        description:
            "Connecting Youth With Industry Mentors And Professionals\nIndustry Visits, Workshops & Real-World Project Exposure\nGuidance On Career Paths, Higher Education & Skill Specialization",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        ),
    },
    {
        id: "entrepreneurship",
        label: "ENTREPRENEURSHIP & LEADERSHIP SUPPORT",
        description:
            "Entrepreneurship Awareness And Startup Incubation Support\nLeadership Development Programs And Team-Building Activities\nFinancial Literacy And Business Planning Workshops",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
            </svg>
        ),
    },
];

/* ── What We Do ── */
const skillWhatWeDo = [
    "Evolve Sangh Foundation's Skill Development & Training Programs empower underserved youth with essential technical, digital, and professional skills to enhance employability, boost confidence, and support long-term career growth.",
    "We provide hands-on training, mentorship, industry-relevant learning pathways, and career guidance — helping students become confident, future-ready, and capable of pursuing meaningful opportunities in a competitive world.",
];

/* ── Our Focus ── */
const skillFocus = [
    "Bridge the skill-gap for underserved youth",
    "Provide digital education and future-ready skillsets",
    "Strengthen employability & career confidence",
    "Support pathways to jobs, internships, or entrepreneurship",
    "Promote personal, social & professional development",
    "Reduce economic inequality through career empowerment",
    "Create confident, skilled and responsible young citizens",
];

const heroSlides = [
    "/SkillDev/Slider.png",
    "/SkillDev/Slider2.png"
];

export default function SkillDevelopmentProgramPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="w-full bg-white font-sans text-slate-800">
            {/* ── Hero Slider ─── */}
            <section className="relative w-full bg-slate-100 overflow-hidden group">
                <img src={heroSlides[0]} alt="spacer" className="w-full h-auto invisible" aria-hidden="true" />
                
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
                            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                        <img src={slide} alt={`Skill Development Slide ${index + 1}`} className="w-full h-full object-contain sm:object-cover" />
                    </div>
                ))}

                {/* Slider indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                                index === currentSlide ? "bg-[#00AEFF] w-6" : "bg-white/80 hover:bg-white"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* ── WHY SKILL DEVELOPMENT? ─── */}
            <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide">
                        WHY SKILL DEVELOPMENT?
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="w-full lg:w-2/5 flex justify-center shrink-0">
                        <div className="relative w-full max-w-[320px] aspect-square">
                            <img src="/SkillDev/Why.png" alt="Why Skill Development" className="w-full h-full object-contain" />
                        </div>
                    </div>

                    <div className="w-full lg:w-3/5 text-justify">
                        <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed mb-4">
                            In an ever-evolving world, education alone is not enough — today&apos;s youth need
                            practical skills, digital competency, confidence, and exposure to real-world learning
                            to succeed. Yet, millions of young people globally face barriers to quality skill
                            development due to financial limitations, lack of training resources, minimal
                            industry exposure, and limited access to professional mentorship.
                        </p>
                        <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed mb-4">
                            Without the right skills, brilliant and hardworking youth often struggle for
                            employment, career direction, and economic independence — resulting in
                            untapped potential and lost opportunities.
                        </p>
                        <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed">
                            Equipping young people with future-ready skills is key to enabling long-term
                            empowerment, sustainable livelihoods, and inclusive social growth.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── OUR INTERVENTIONS ─── */}
            <div className="text-center my-6 md:my-8 lg:my-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide">
                    OUR INTERVENTIONS
                </h2>
            </div>
            <InterventionsTabs
                items={skillInterventions}
                fullWidth={true}
            />

            {/* ── WHAT WE DO ─── */}
            <section className="w-full py-10 md:py-16 bg-white flex justify-center mt-10">
                <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-6xl">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide text-center mb-8 md:mb-12">
                        WHAT WE DO
                    </h2>

                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
                        <div className="w-full md:w-1/2 order-2 md:order-1 text-justify">
                            <div className="space-y-4">
                                <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed">
                                    {skillWhatWeDo[0]}
                                </p>
                                <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed">
                                    {skillWhatWeDo[1]}
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
                            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm">
                                <img src="/SkillDev/WHATWeDo.png" alt="What We Do" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── OUR FOCUS ─── */}
            <section className="w-full">
                <div className="w-full bg-[#005089] py-3 md:py-4">
                    <div className="container mx-auto px-4 md:px-8 lg:px-16">
                        <h2 className="text-xl md:text-2xl font-extrabold text-white uppercase tracking-wider text-center">
                            OUR FOCUS
                        </h2>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16 bg-white border-b-4 border-b-[#005089]">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 max-w-6xl mx-auto">
                        <div className="w-full md:w-5/12 flex justify-center shrink-0">
                            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-sm">
                                <img src="/SkillDev/OurFocus.png" alt="Our Focus" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="w-full md:w-7/12">
                            <ul className="space-y-3">
                                {skillFocus.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-slate-800 font-medium text-xs md:text-sm lg:text-base leading-relaxed"
                                    >
                                        <span className="text-slate-800 mt-[3px] shrink-0 font-bold text-xs">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── GLIMPSES ─── */}
            <section className="w-full py-10 md:py-14 bg-white">
                <div className="container mx-auto px-4 md:px-8 lg:px-16 pl-6 pr-6">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide text-center mb-10">
                        GLIMPSES
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
                        {[
                            "/SkillDev/glimes.png",
                            "/SkillDev/glimes2.png",
                            "/SkillDev/glimes3.png",
                            "/SkillDev/glimes4.png",
                        ].map((src, i) => (
                            <div key={i} className="aspect-square bg-[#fdefd1] rounded-sm overflow-hidden flex items-center justify-center shadow-sm">
                                <img src={src} alt={`Skill Development Glimpse ${i + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}