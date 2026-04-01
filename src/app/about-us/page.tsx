import { AboutHero } from "@/components/sections/AboutHero";
import { VisionMissionSection } from "@/components/sections/VisionMissionSection";
import { IdentitySection } from "@/components/sections/IdentitySection";
import { AboutImpactSection } from "@/components/sections/AboutImpactSection";
import { ProjectLocationsSection } from "@/components/sections/ProjectLocationsSection";
import { ProjectReportsSection } from "@/components/sections/ProjectReportsSection";

export default function AboutUsPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <AboutHero />
            <VisionMissionSection />
            <IdentitySection />
            <AboutImpactSection />
            <ProjectLocationsSection />
            <ProjectReportsSection />
        </main>
    );
}
