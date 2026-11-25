"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ContactsSection } from "./sections/ContactsSection";
import { DonationsSection } from "./sections/DonationsSection";
import { InquiriesSection } from "./sections/InquiriesSection";
import { ContentSection } from "./sections/ContentSection";
import { PagesSection } from "./sections/PagesSection";
import { SettingsSection } from "./sections/SettingsSection";

type Tab = "content" | "pages" | "donations" | "contacts" | "inquiries" | "settings";

const TABS: { id: Tab; label: string }[] = [
  { id: "content", label: "✏️ Content" },
  { id: "pages", label: "📄 Pages" },
  { id: "donations", label: "Donations" },
  { id: "contacts", label: "Contact Submissions" },
  { id: "inquiries", label: "Join-Us Inquiries" },
  { id: "settings", label: "⚙️ Settings" },
];

export function AdminDashboard({ username }: { username: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("content");
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <header className="bg-[#0067A5] text-white">
        <div className="px-4 md:px-12 lg:px-20 py-5 flex items-center justify-between gap-4">
          <div>
            <h1
              className="font-league-gothic uppercase"
              style={{ fontSize: 32, lineHeight: 1 }}
            >
              Evolve Sangh Admin
            </h1>
            <p
              className="opacity-80"
              style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12 }}
            >
              Signed in as <strong>{username}</strong>
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? "Signing out…" : "Logout"}
          </Button>
        </div>
        <nav className="px-4 md:px-12 lg:px-20 flex gap-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2.5 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "border-white text-white"
                  : "border-transparent text-white/60 hover:text-white/90",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="px-4 md:px-12 lg:px-20 py-8">
        {activeTab === "content" && <ContentSection />}
        {activeTab === "pages" && <PagesSection />}
        {activeTab === "donations" && <DonationsSection />}
        {activeTab === "contacts" && <ContactsSection />}
        {activeTab === "inquiries" && <InquiriesSection />}
        {activeTab === "settings" && <SettingsSection username={username} />}
      </div>
    </main>
  );
}
