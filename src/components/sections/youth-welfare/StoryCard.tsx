import Link from "next/link";
import Image from "next/image";
import type { StoryData } from "./storiesData";

interface StoryCardProps {
    story: StoryData;
}

export function StoryCard({ story }: StoryCardProps) {
    return (
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="bg-[#005089] px-4 py-2">
                <h3 className="text-white font-bold text-sm md:text-base uppercase text-center tracking-wide">
                    {story.name}
                </h3>
            </div>

            <div className="flex flex-row flex-1 p-4 gap-4">
                <div className="w-28 md:w-32 shrink-0 flex flex-col items-center gap-2">
                    <div className="relative w-24 h-28 md:w-28 md:h-32 bg-gray-200 rounded-sm overflow-hidden flex items-center justify-center">
                        {story.image ? (
                            <Image
                                src={story.image}
                                alt={story.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <span className="text-gray-400 text-[10px] text-center px-1">
                                [Photo]
                            </span>
                        )}
                    </div>
                    {story.achievement && (
                        <span className="text-[9px] md:text-[10px] font-semibold text-slate-500 text-center leading-tight">
                            {story.achievement}
                        </span>
                    )}
                    {story.achievement2 && (
                        <span className="text-[9px] md:text-[10px] font-semibold text-slate-500 text-center leading-tight">
                            {story.achievement2}
                        </span>
                    )}
                </div>

                <div className="flex flex-col justify-between flex-1">
                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed italic">
                        {story.quote}
                    </p>
                    <Link
                        href={`/activities/youth-welfare-centers/stories/${story.id}`}
                        className="mt-3 self-start bg-[#005089] text-white text-[10px] md:text-xs font-bold px-4 py-1.5 uppercase tracking-wide hover:bg-[#003d6b] transition-colors inline-block"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
}