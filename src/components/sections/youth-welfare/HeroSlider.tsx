"use client";

import { useState, useEffect } from "react";

const heroSlides = [
    "/new/Youth/Slider.png",
    "/new/Youth/slider2.png",
    "/new/Youth/Slider3.png",
];

export function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section className="relative w-full bg-[#003056] overflow-hidden group">
            {/* Structural invisible image to define height responsively based on the slide's intrinsic aspect ratio */}
            <img src={heroSlides[0]} alt="spacer" className="w-full h-auto invisible" aria-hidden="true" />
            
            {/* Slider Images */}
            {heroSlides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out flex items-center justify-center ${
                        index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <img src={slide} alt={`Youth Welfare Slide ${index + 1}`} className="w-full h-full object-contain sm:object-cover" />
                </div>
            ))}

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide ? "bg-white scale-125 w-8" : "bg-white/50 hover:bg-white/80"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
