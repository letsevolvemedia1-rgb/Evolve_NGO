import { HeroWrapper } from "@/components/sections/HeroWrapper";
import { MissionSection } from "@/components/sections/MissionSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ActivitiesSection } from "@/components/sections/ActivitiesSection";
import { CampaignSection } from "@/components/sections/CampaignSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroWrapper />
      <MissionSection />
      <ImpactSection />
      <ActivitiesSection />
      <CampaignSection />
    </main>
  );
}
