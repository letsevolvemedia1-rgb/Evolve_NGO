"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
    { id: 1, image: "/MentalWellness/Slider.png", alt: "Mental Wellness Slide 1" },
    { id: 2, image: "/MentalWellness/Slider2.png", alt: "Mental Wellness Slide 2" },
    { id: 3, image: "/MentalWellness/Slider3.png", alt: "Mental Wellness Slide 3" },
];

export function MentalWellnessSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden bg-[#C8E8FF]">
            {/* Slider Images */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-contain"
                        priority={index === 0}
                        sizes="100vw"
                    />
                </div>
            ))}

            {/* Overlay Gradient (Optional for better text readability if needed) */}
            {/* <div className="absolute inset-0 bg-black/10" /> */}

            {/* Text Overlay
            <div className="absolute top-8 left-4 md:left-10 bg-[#00AEFF]/90 px-6 py-4 max-w-[280px] md:max-w-[380px] z-10 shadow-lg">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase leading-tight">
                    EMPOWERING MINDS
                    <br />
                    <span className="text-white">TRANSFORMING FUTURES</span>
                </h1>
            </div> */}

            {/* Navigation Dots */}
            <div className="absolute bottom-6 right-6 flex gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/80"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
