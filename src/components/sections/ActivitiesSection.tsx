"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
    {
        category: "LIVING",
        activities: [
            { title: "FREE FOOD DISTRIBUTION", image: "/new/Homepage/freefood.svg" },
            { title: "YOUTH WELFARE CENTERS", image: "/new/Homepage/YouthWelfarecenters.svg" },
            { title: "FREE CLOTH DISTRIBUTION", image: "/new/Homepage/FreeCloth.svg" },
        ],
    },
    {
        category: "LOVING",
        activities: [
            { title: "ENVIRONMENT CARE", image: "/new/Homepage/Environmentcare.svg" },
            { title: "MENTAL WELLNESS PROGRAM", image: "/new/Homepage/MentalWellnessProgram.svg" },
            { title: "WOMEN EMPOWERMENT", image: "/new/Homepage/womenEmpowerment.svg" },
        ],
    },
    {
        category: "LEARNING",
        activities: [
            { title: "SKILLS FOR BETTER TOMORROW", image: "/new/Homepage/SkillForBetterTommoro.svg" },
            { title: "ACCESS TO EDUCATION INITIATIVE", image: "/new/Homepage/AccesstoEducationinitiative.svg" },
            { title: "MENTAL WELLNESS PROGRAMS", image: "/new/Homepage/mentalWellnessClass.svg" },
        ],
    },
];

export function ActivitiesSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, []);

    const slide = SLIDES[currentSlide];

    return (
        <div className="w-full">
            <section className="w-full py-14 md:py-20 bg-white text-center">
                <h2 className="section-title mb-2">
                    Our Activities
                </h2>
                <p className="text-[#00BCD4] font-bold tracking-widest text-sm uppercase mb-16 md:mb-20">
                    LIVING - LOVING - LEARNING
                </p>

                <div className="relative w-full px-16 md:px-24 lg:px-32">
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 md:left-4 top-[40%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#E8E8E8] hover:bg-[#D0D0D0] text-[#555] flex items-center justify-center transition-colors shadow-md"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 md:right-4 top-[40%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#E8E8E8] hover:bg-[#D0D0D0] text-[#555] flex items-center justify-center transition-colors shadow-md"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-14 lg:gap-20 justify-items-center">
                        {slide.activities.map((activity, index) => (
                            <div key={`${currentSlide}-${index}`} className="group cursor-pointer animate-in fade-in duration-500 flex flex-col items-center">
                                <div
                                    className="relative overflow-hidden rounded-lg mb-5 w-[223px] h-[222px] border-[4px] border-[#0077B6]"
                                    style={{ background: "#D9D9D9" }}
                                >
                                    <Image
                                        src={activity.image}
                                        alt={activity.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="223px"
                                    />
                                </div>
                                <h3 className="font-heading font-bold text-[#003056] uppercase text-sm md:text-base group-hover:text-[#00BCD4] transition-colors leading-tight px-2 text-center">
                                    {activity.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="w-full bg-[#C8E8FF] py-4 md:py-6 text-center">
                <h3
                    key={currentSlide}
                    className="section-title !text-[#003056] animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                    {slide.category}
                </h3>
            </div>
        </div>
    );
}