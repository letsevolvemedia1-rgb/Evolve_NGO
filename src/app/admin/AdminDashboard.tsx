"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ContactsSection } from "./sections/ContactsSection";
import { DonationsSection } from "./sections/DonationsSection";
import { InquiriesSection } from "./sections/InquiriesSection";

type Tab = "donations" | "contacts" | "inquiries";

const TABS: { id: Tab; label: string }[] = [
  { id: "donations", label: "Donations" },
  { id: "contacts", label: "Contact submissions" },
  { id: "inquiries", label: "Join-us inquiries" },
];

export function AdminDashboard({ username }: { username: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("donations");
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
        <nav className="px-4 md:px-12 lg:px-20 flex gap-2 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "border-white text-white"
                  : "border-transparent text-white/70 hover:text-white",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="px-4 md:px-12 lg:px-20 py-8">
        {activeTab === "donations" ? <DonationsSection /> : null}
        {activeTab === "contacts" ? <ContactsSection /> : null}
        {activeTab === "inquiries" ? <InquiriesSection /> : null}
      </div>
    </main>
  );
}
