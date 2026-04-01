import { StoryCard } from "@/components/sections/youth-welfare/StoryCard";
import { storiesData } from "@/components/sections/youth-welfare/storiesData";

export default function StoriesPage() {
    return (
        <main className="w-full bg-white font-sans text-slate-800">
            <section className="bg-slate-50 py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-[#005089] uppercase tracking-wide">
                        Stories of Change
                    </h1>
                </div>
            </section>

            <section className="container mx-auto px-4 md:px-12 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {storiesData.map((story) => (
                        <StoryCard key={story.id} story={story} />
                    ))}
                </div>
            </section>
        </main>
    );
}