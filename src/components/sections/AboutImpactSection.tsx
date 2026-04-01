"use client";

import { useState, useEffect, useRef } from "react";

function useCountUp(target: number, duration: number = 2000, startCounting: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startCounting) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [target, duration, startCounting]);

    return count;
}

interface ImpactStatProps {
    value: number;
    label: string;
    description: string;
    isInView: boolean;
    delay?: number;
}

function ImpactStat({ value, label, description, isInView, delay = 0 }: ImpactStatProps) {
    const [shouldStart, setShouldStart] = useState(false);
    const count = useCountUp(value, 2000, shouldStart);

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setShouldStart(true), delay);
            return () => clearTimeout(timer);
        }
    }, [isInView, delay]);

    return (
        <div className="flex flex-col items-start text-left">
            <h3 className="font-heading font-bold text-white text-5xl md:text-7xl mb-2">
                {shouldStart ? count.toLocaleString() : "0"}+
            </h3>
            <p className="text-white/90 uppercase text-sm md:text-base font-medium max-w-[250px] leading-tight">
                {description}
            </p>
        </div>
    );
}

export function AboutImpactSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const stats = [
        { value: 700, desc: "MEALS SERVED WEEKLY IN SLUMS" },
        { value: 50000, desc: "PLATES SERVED IN UNPRIVILEGED SCHOOLS" },
        { value: 5000, desc: "CHILDREN RECEIVED QUALITY EDUCATION KIT" }, // Filled in reasonable guess for 3rd item
        { value: 500, desc: "CHILDREN BENEFITTED THROUGH FREE COACHING" },
        { value: 70, desc: "UNPRIVILEGED STUDENTS GOT PLACED IN TECH JOBS IN GUIDANCE OF VOLUNTEERS" },
        { value: 7, desc: "SLUM AREAS COVERED" },
    ];

    return (
        <section ref={sectionRef} className="w-full bg-[#0067A5] py-12 md:py-24 text-white">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <h2 className="font-heading text-4xl md:text-6xl text-center uppercase mb-10 md:mb-16 tracking-wide">
                    OUR IMPACT
                </h2>

                <div className="w-full h-px bg-white/40 mb-16 mx-auto max-w-6xl" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 max-w-6xl mx-auto">
                    {stats.map((stat, index) => (
                        <ImpactStat
                            key={index}
                            value={stat.value}
                            label=""
                            description={stat.desc}
                            isInView={isInView}
                            delay={index * 150}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}