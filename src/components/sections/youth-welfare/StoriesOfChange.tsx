"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { StoryCard } from "./StoryCard";
import type { StoryData } from "./storiesData";
import { storiesData as defaultStories } from "./storiesData";

interface StoriesOfChangeProps {
    stories?: StoryData[];
    title?: string;
    viewMoreHref?: string;
    visibleCount?: number;
}

export function StoriesOfChange({
    stories = defaultStories,
    title = "STORIES OF CHANGE",
    viewMoreHref = "/activities/youth-welfare-centers/stories",
    visibleCount = 3,
}: StoriesOfChangeProps) {
    const [startIndex, setStartIndex] = useState(0);
    const displayed = stories.slice(startIndex, startIndex + visibleCount);

    const canPrev = startIndex > 0;
    const canNext = startIndex + visibleCount < stories.length;

    const handlePrev = useCallback(() => {
        if (canPrev) setStartIndex((i) => i - 1);
    }, [canPrev]);

    const handleNext = useCallback(() => {
        if (canNext) setStartIndex((i) => i + 1);
    }, [canNext]);

    return (
        <section className="w-full py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-12">
                <h2 className="text-2xl md:text-4xl font-bold text-[#005089] uppercase tracking-wide text-center mb-10 md:mb-14">
                    {title}
                </h2>

                <div className="relative">
                    {canPrev && (
                        <button
                            onClick={handlePrev}
                            aria-label="Previous stories"
                            className="hidden md:flex absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#005089] text-white rounded-full items-center justify-center shadow-lg hover:bg-[#003d6b] transition-colors cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {displayed.map((story) => (
                            <StoryCard key={story.id} story={story} />
                        ))}
                    </div>

                    {canNext && (
                        <button
                            onClick={handleNext}
                            aria-label="Next stories"
                            className="hidden md:flex absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#005089] text-white rounded-full items-center justify-center shadow-lg hover:bg-[#003d6b] transition-colors cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="flex justify-center mt-10">
                    <Link
                        href={viewMoreHref}
                        className="inline-block border-2 border-[#005089] text-[#005089] font-bold text-sm uppercase tracking-wider px-8 py-3 hover:bg-[#005089] hover:text-white transition-all"
                    >
                        View More
                    </Link>
                </div>
            </div>
        </section>
    );
}