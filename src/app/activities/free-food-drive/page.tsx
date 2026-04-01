"use client";

import { useState, useEffect } from "react";
import { InterventionsTabs, InterventionItem } from "@/components/sections/youth-welfare/InterventionsTabs";

/* ── Food Drive intervention tabs (3 tabs) ── */
const foodDriveInterventions: InterventionItem[] = [
    {
        id: "community-food",
        label: "COMMUNITY FOOD DRIVES",
        description:
            "Freshly Cooked Meals Distributed In Urban Slums And Low-Income Settlements\nNutritious Food Packages For Vulnerable Families And Children\nRegular Distribution To Ensure Continuity And Trust Within Communities",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
        ),
    },
    {
        id: "rural-outreach",
        label: "RURAL FOOD OUTREACH",
        description:
            "Reaching Remote Villages And Tribal Communities With Essential Food Supplies\nPartnership With Local Bodies For Last-Mile Delivery\nSeasonal And Emergency Food Relief During Natural Disasters And Crises",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
        ),
    },
    {
        id: "midday-meal",
        label: "MID-DAY MEAL SUPPORT FOR SCHOOLS",
        description:
            "Nutritious Mid-Day Meals For Government And Community School Students\nSupporting Schools Where Children Depend On School Meals As Primary Nutrition\nPromoting Regular Attendance And Reducing Dropout Through Meal Programs",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
        ),
    },
];

/* ── What We Do ── */
const foodDriveWhatWeDo = [
    "Evolve Sangh Foundation's Free Food Drive Programs ensure that underserved communities — including slum dwellers, rural families, and school-going children — receive nutritious meals regularly.",
    "Through community food drives, rural outreach, and school-based meal support, we provide access to healthy food for those who need it the most, reducing hunger and supporting overall growth, learning, and well-being.",
];

/* ── Our Focus ── */
const foodDriveFocus = [
    "Fight hunger and support nutritional well-being",
    "Ensure children receive adequate nutrition for healthy growth",
    "Reduce dropout rates by supporting mid-day meals in schools",
    "Provide dignity and relief to struggling families",
    "Prioritize underserved communities in both urban and rural settings",
    "Encourage community participation and volunteer engagement",
    "Build healthier, happier, and more resilient communities",
];

const heroSlides = [
    "/new/Freefood/Slider.png",
    "/new/Freefood/Slider2.png",
    "/new/Freefood/Slider3.png",
    "/new/Freefood/Slider4.png",
    "/new/Freefood/Slider5.png",
];

export default function FreeFoodDrivePage() {
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
                {/* Structural invisible image to define height responsively based on the slide's intrinsic aspect ratio */}
                <img src={heroSlides[0]} alt="spacer" className="w-full h-auto invisible" aria-hidden="true" />
                
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
                            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                        <img src={slide} alt={`Free Food Drive Slide ${index + 1}`} className="w-full h-full object-contain sm:object-cover" />
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

            {/* ── WHY FOOD SECURITY? ─── */}
            <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide">
                        WHY FOOD SECURITY?
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="w-full lg:w-2/5 flex justify-center shrink-0">
                        <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] border-[6px] md:border-8 border-[#00AEFF] bg-white flex items-center justify-center">
                            {/* Circle 1: Top Left */}
                            <div className="absolute top-[-25px] md:top-[-30px] left-[-20px] md:left-[-30px] w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-white overflow-hidden bg-gray-100 z-30 shadow-sm">
                                <img src="/new/Freefood/Slider.png" alt="Food Drive 1" className="w-full h-full object-cover" />
                            </div>
                            
                            {/* Circle 2: Mid-right */}
                            <div className="absolute top-1/2 -translate-y-1/2 right-[-25px] md:right-[-35px] w-36 h-36 md:w-44 md:h-44 rounded-full border-[6px] border-white overflow-hidden bg-gray-200 z-20 shadow-sm">
                                <img src="/new/Freefood/Slider2.png" alt="Food Drive 2" className="w-full h-full object-cover" />
                            </div>
                            
                            {/* Circle 3: Bottom Left */}
                            <div className="absolute bottom-[-20px] md:bottom-[-25px] left-2 md:left-6 w-36 h-36 md:w-44 md:h-44 rounded-full border-[6px] border-white overflow-hidden bg-gray-300 z-10 shadow-sm">
                                <img src="/new/Freefood/Slider3.png" alt="Food Drive 3" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-3/5 text-justify">
                        <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed mb-4">
                            Food is a basic human right — yet millions around the world continue to struggle
                            for one nutritious meal a day. Poverty, rising living costs, unstable incomes, and
                            lack of resources force vulnerable families, especially children, to compromise on
                            nutrition and well-being.
                        </p>
                        <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed mb-4">
                            For children and youth, food insecurity leads to malnutrition, poor concentration,
                            lower academic performance, and long-term health challenges. For struggling
                            families, daily sustenance often becomes an overwhelming concern, limiting their
                            ability to focus on education, livelihood, or personal development.
                        </p>
                        <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed">
                            Ensuring access to nutritious food is essential not only to fight hunger, but also
                            to support dignity, health, and equal opportunity for every individual —
                            regardless of socio-economic background.
                        </p>
                    </div>
                </div>
            </section>

            <InterventionsTabs
                items={foodDriveInterventions}
                fullWidth={true}
            />

            {/* ── WHAT WE DO ─── */}
            <section className="w-full py-10 md:py-16 bg-white flex justify-center">
                <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-6xl">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide text-center mb-8 md:mb-12">
                        WHAT WE DO
                    </h2>

                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
                        <div className="w-full md:w-1/2 order-2 md:order-1 text-justify">
                            <div className="space-y-4">
                                <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed">
                                    {foodDriveWhatWeDo[0]}
                                </p>
                                <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed">
                                    {foodDriveWhatWeDo[1]}
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
                            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm">
                                <img src="/new/Freefood/WhatWeDo.png" alt="What We Do" className="w-full h-full object-cover" />
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
                                <img src="/new/Freefood/Ourfocus.png" alt="Our Focus" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="w-full md:w-7/12">
                            <ul className="space-y-3">
                                {foodDriveFocus.map((item, index) => (
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
                    {/* The 8-grid block from the screenshot: 4 items per row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
                        {[
                            "/new/Freefood/glimes.png",
                            "", 
                            "",
                            "/new/Freefood/glimes2.png",
                            "/new/Freefood/glimes5.png",
                            "/new/Freefood/glimes6.png",
                            "/new/Freefood/glimes7.png",
                            "/new/Freefood/glimes8.png",
                        ].map((src, i) => (
                            <div key={i} className="aspect-square bg-[#fdefd1] rounded-sm overflow-hidden flex items-center justify-center shadow-sm">
                                {src ? (
                                    <img src={src} alt={`Free Food Drive Glimpse ${i + 1}`} className="w-full h-full object-cover" />
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}