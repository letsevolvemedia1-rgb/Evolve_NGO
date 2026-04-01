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

interface StatCardProps {
    numericValue: number;
    suffix: string;
    label: string;
    sub: string;
    startCounting: boolean;
    delay: number;
}

function StatCard({ numericValue, suffix, label, sub, startCounting, delay }: StatCardProps) {
    const [shouldStart, setShouldStart] = useState(false);
    const count = useCountUp(numericValue, 2000, shouldStart);

    useEffect(() => {
        if (!startCounting) return;
        const timer = setTimeout(() => setShouldStart(true), delay);
        return () => clearTimeout(timer);
    }, [startCounting, delay]);

    return (
        <div className="flex flex-col items-center group">
            <h3 className="text-5xl md:text-7xl font-heading font-bold text-[#003056] mb-1 tabular-nums transition-transform duration-300 group-hover:scale-105">
                {shouldStart ? count.toLocaleString() : "0"}
                <span>{suffix}</span>
            </h3>
            <p className="text-[#00BCD4] font-bold uppercase tracking-widest text-sm md:text-base mb-2">
                {label}
            </p>
            <p className="text-gray-500 text-[10px] md:text-xs max-w-[180px] uppercase font-medium leading-tight">
                {sub}
            </p>
        </div>
    );
}

export function ImpactSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const stats = [
        { numericValue: 50000, suffix: "+", label: "PLATES", sub: "SERVED IN UNDERPRIVILEGED SCHOOLS" },
        { numericValue: 700, suffix: "+", label: "MEALS", sub: "SERVED WEEKLY IN SLUMS" },
        { numericValue: 5000, suffix: "+", label: "CHILDREN", sub: "RECEIVED QUALITY EDUCATION KIT" },
        { numericValue: 500, suffix: "+", label: "CHILDREN", sub: "BENEFITTED THROUGH FREE COACHING" },
    ];

    return (
        <div ref={sectionRef} className="w-full">
            <div className="w-full h-6 md:h-10 bg-[#C8E8FF]" />

            <section className="relative w-full py-14 md:py-20 bg-white overflow-hidden">
                <div className="absolute -top-4 right-6 md:right-16 w-28 h-28 md:w-36 md:h-36 rounded-full border-[5px] border-[#C8E8FF]/60" />
                <div className="absolute top-8 right-16 md:right-36 w-16 h-16 md:w-24 md:h-24 rounded-full border-[4px] border-[#C8E8FF]/40" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 md:w-44 md:h-44 rounded-full border-[6px] border-[#C8E8FF]/50" />
                <div className="absolute bottom-10 left-6 w-20 h-20 md:w-24 md:h-24 rounded-full border-[4px] border-[#C8E8FF]/35" />

                <div className="relative w-full px-6 md:px-16 lg:px-28">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 md:gap-8 text-center">
                        {stats.map((stat, index) => (
                            <StatCard
                                key={index}
                                numericValue={stat.numericValue}
                                suffix={stat.suffix}
                                label={stat.label}
                                sub={stat.sub}
                                startCounting={isVisible}
                                delay={index * 200}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <div className="w-full h-6 md:h-10 bg-[#C8E8FF]" />
        </div>
    );
}