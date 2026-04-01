import storiesJson from "@/data/stories.json";

export interface StoryData {
    id: string;
    name: string;
    quote: string;
    achievement?: string;
    achievement2?: string;
    image?: string;
}

interface StoryJson {
    id: string;
    name: string;
    quote: string;
    achievement?: string;
    achievement2?: string;
    image?: string;
    role?: string;
    company?: string;
    socialLinks?: Record<string, string>;
    paragraphs?: string[];
}

export const storiesData: StoryData[] = (storiesJson as StoryJson[]).map((s) => ({
    id: s.id,
    name: s.name,
    quote: s.quote,
    achievement: s.achievement || undefined,
    achievement2: s.achievement2 || undefined,
    image: s.image || undefined,
}));
