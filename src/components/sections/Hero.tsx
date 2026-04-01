"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const HERO_IMAGES = [
    "/new/Homepage/Slider.png",
    "/new/Homepage/Slider2.png",
    "/new/Homepage/Slider3.png",
    "/new/Homepage/Slider4.png",
];

export function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full bg-[#003056] overflow-hidden group">
            {/* Structural invisible spacer to define height responsively based on the slider image's intrinsic aspect ratio */}
            <img src={HERO_IMAGES[0]} alt="spacer" className="w-full h-auto invisible" aria-hidden="true" />

            {HERO_IMAGES.map((src, index) => (
                <div
                    key={index}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center",
                        index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    )}
                >
                    <img src={src} alt={`Hero Slide ${index + 1}`} className="w-full h-full object-contain sm:object-cover" />
                </div>
            ))}

            <div className="absolute bottom-8 right-8 flex gap-3 z-10">
                {HERO_IMAGES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={cn(
                            "w-3 h-3 rounded-full transition-all duration-300 border border-white",
                            index === currentSlide
                                ? "bg-white scale-125"
                                : "bg-white/30 hover:bg-white/50"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}