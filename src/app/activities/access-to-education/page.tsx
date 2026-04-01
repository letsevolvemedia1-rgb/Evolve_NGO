"use client";

import { useState, useEffect } from "react";
import { InterventionsTabs, InterventionItem } from "@/components/sections/youth-welfare/InterventionsTabs";
import { WhatWeDo } from "@/components/sections/youth-welfare/WhatWeDo";
import { OurFocus } from "@/components/sections/youth-welfare/OurFocus";

/* ── Access to Education intervention tabs ── */
const educationInterventions: InterventionItem[] = [
    {
        id: "learning-support",
        label: "LEARNING SUPPORT & ACADEMIC ENRICHMENT",
        description:
            "Academic Guidance And Foundational Learning Sessions\nAfter-School Learning Support For School And College Students\nSTEM Education Support And Digital Literacy Training",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
        ),
    },
    {
        id: "learning-resources",
        label: "ACCESS TO LEARNING RESOURCES",
        description:
            "Providing Free Textbooks, Study Materials & Stationery To Students\nSetting Up Community Libraries And Reading Corners\nDigital Learning Kits And E-Learning Access For Remote Learners",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
        ),
    },
    {
        id: "digital-education",
        label: "DIGITAL EDUCATION & TECHNOLOGY ACCESS",
        description:
            "Computer Literacy Programs For First-Generation Learners\nOnline Learning Platforms And Virtual Classroom Access\nTechnology-Enabled Teaching Aids And Smart Learning Tools",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
        ),
    },
    {
        id: "mentorship-career",
        label: "MENTORSHIP & CAREER GUIDANCE",
        description:
            "One-On-One Mentorship Programs With Experienced Professionals\nCareer Counseling, Goal-Setting & Higher Education Guidance\nScholarship Awareness And Application Support",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        ),
    },
    {
        id: "community-parental",
        label: "COMMUNITY & PARENTAL ENGAGEMENT",
        description:
            "Parent Awareness Programs On Importance Of Education\nCommunity Mobilization Drives To Reduce School Dropouts\nPartnerships With Schools And Local Bodies For Inclusive Education",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        ),
    },
];

/* ── What We Do content ── */
const educationWhatWeDo = [
    "Evolve Sangh Foundation's Access to Education Initiative supports economically disadvantaged students to continue their education, excel academically, and unlock their true potential.",
    "We provide learning support, academic mentorship, digital access, and essential educational resources — enabling students to thrive in school, pursue higher education, and gain opportunities that would otherwise remain inaccessible.",
];

/* ── Our Focus items ── */
const educationFocus = [
    "Enable equal access to quality education for underserved students",
    "Support first-generation learners to transition and excel academically",
    "Provide learning tools, digital access, and academic guidance",
    "Build strong learning foundations and future-ready skills",
    "Reduce dropout rates and create long-term learning opportunities",
    "Promote education as a pathway to dignity, empowerment, and independence",
    "Empower students to lead meaningful, inspired, and purposeful lives",
];

const HERO_IMAGES = [
    "/AccessToEducation/Slider.svg",
    "/AccessToEducation/Slider2.svg",
    "/AccessToEducation/Slider3.svg"
];

export default function AccessToEducationPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="w-full bg-white font-sans text-slate-800">
            <section className="relative w-full bg-sky-100 overflow-hidden">
                <img src={HERO_IMAGES[0]} alt="Spacer" className="w-full h-auto block opacity-0 pointer-events-none" />
                
                {HERO_IMAGES.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Access to Education Slide ${index + 1}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    />
                ))}
            </section>

            <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-14">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide">
                        WHY FREE ACCESS TO EDUCATION?
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
                    <div className="w-full md:w-2/5 flex justify-center">
                        <div className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px]">
                            <div className="absolute top-0 left-0 w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-[#87CEEB] overflow-hidden bg-gray-100 z-10"><img src="/new/Education/Slider2.svg" alt="Education" className="w-full h-full object-cover" /></div>
                            <div className="absolute bottom-0 left-6 w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-[#00AEFF] overflow-hidden bg-gray-200 z-20"><img src="/new/Education/Slider3.svg" alt="Education" className="w-full h-full object-cover" /></div>
                            <div className="absolute top-1/4 right-0 w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-300 z-30"><img src="/new/Education/glimse.png" alt="Education" className="w-full h-full object-cover" /></div>
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 text-justify">
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-3">
                            Education is one of the strongest tools for breaking cycles of poverty, empowering
                            individuals, and building stronger and more equitable societies. Yet, millions of
                            children and youth worldwide remain outside the formal education system due to
                            financial constraints, social barriers, lack of resources, limited access to learning
                            facilities, and digital divide challenges.
                        </p>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-3">
                            Many first-generation learners face additional obstacles — inadequate academic
                            support, lack of awareness, minimal exposure to technology, and absence of
                            mentorship — resulting in high dropout rates and lost opportunities.
                        </p>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                            Ensuring equal access to education is not only a fundamental right but also a vital step
                            toward building a future where every learner has the chance to pursue their dreams
                            with dignity and confidence.
                        </p>
                    </div>
                </div>
            </section>

            <InterventionsTabs
                items={educationInterventions}
                fullWidth={true}
            />

            <section className="w-full py-10 md:py-16 bg-white">
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide text-center mb-10">
                        WHAT WE DO
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                        <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                            {educationWhatWeDo.map((para, i) => (
                                <p key={i} className="text-sm md:text-base text-slate-700 leading-relaxed text-justify">
                                    {para}
                                </p>
                            ))}
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                            <div className="relative w-full aspect-video md:aspect-[16/10] max-w-lg rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md">
                                <img src="/new/Education/WhatWedo.png" alt="What We Do" className="w-full h-full object-cover object-center" />
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
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="w-full md:w-5/12 flex justify-center md:justify-start">
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100">
                                <img src="/new/Education/OurFocus.svg" alt="Our Focus" className="w-full h-full object-cover object-center" />
                            </div>
                        </div>
                        <div className="w-full md:w-7/12">
                            <ul className="space-y-3">
                                {educationFocus.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-slate-700 text-sm md:text-base leading-relaxed">
                                        <span className="text-[#005089] mt-1 shrink-0 font-bold">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-10 md:py-14 bg-white">
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide text-center mb-8">
                        GLIMPSES
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {[
                            "/new/Education/glimse.png",
                            "/new/Education/glimse2.png",
                            "/new/Education/glimes3.png",
                            "/new/Education/glimes4.png",
                        ].map((src, i) => (
                            <div key={i} className="aspect-[4/3] bg-gray-200 rounded-sm overflow-hidden flex items-center justify-center">
                                <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}