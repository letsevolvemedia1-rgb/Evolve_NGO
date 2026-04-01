import { notFound } from "next/navigation";
import storiesJson from "@/data/stories.json";
import { StoryDetail } from "@/components/sections/youth-welfare/StoryDetail";

interface PageProps {
    params: Promise<{ id: string }>;
}

export function generateStaticParams() {
    return storiesJson.map((story) => ({ id: story.id }));
}

export default async function StoryPage({ params }: PageProps) {
    const { id } = await params;
    const story = storiesJson.find((s) => s.id === id);

    if (!story) {
        notFound();
    }

    return (
        <StoryDetail
            name={story.name}
            image={story.image}
            role={story.role}
            company={story.company}
            quote={story.quote}
            paragraphs={story.paragraphs}
            socialLinks={story.socialLinks}
        />
    );
}
