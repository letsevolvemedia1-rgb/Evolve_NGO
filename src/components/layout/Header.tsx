"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const activitiesDropdown = {
  Living: [
    { label: "Food Distribution", href: "/activities/free-food-drive" },
    {
      label: "Youth Welfare Centers",
      href: "/activities/youth-welfare-centers",
    },
    { label: "Cloth Distribution", href: "/activities/cloth-distribution" },
  ],
  Learning: [
    {
      label: "Access To Education Initiative",
      href: "/activities/access-to-education",
    },
    {
      label: "Skill Development Program",
      href: "/activities/skill-development",
    },
    {
      label: "Value Education Program",
      href: "/activities/value-education-program",
    },
  ],
  Loving: [
    { label: "Environment Care", href: "/activities/environment-care" },
    {
      label: "Mental Wellness Program",
      href: "/activities/mental-wellness-program",
    },
    { label: "Women Empowerment", href: "/activities/women-empowerment" },
  ],
};

const getInvolvedDropdown = [
  { label: "Corporate Partnership", href: "/join-us" },
  { label: "Volunteers & Internships", href: "/join-us" },
];

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full flex flex-col font-sans">
      <div className="w-full flex justify-end px-4 md:px-12 py-2">
        <Link
          href="/support-a-cause"
          className="flex items-center justify-center gap-2 font-bold text-white uppercase tracking-wide rounded-none"
          style={{
            background: "#FFA500",
            width: "279px",
            height: "58px",
            fontSize: "18px",
          }}
        >
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          SUPPORT A CAUSE
        </Link>
      </div>

      <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image
              src="/nav/EVOLVE_final_LOGO 1.svg"
              alt="Evolve Sangh Foundation"
              width={180}
              height={60}
              className="h-12 md:h-14 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/about-us"
              className="text-sm font-bold text-slate-600 hover:text-[#0067A5] uppercase tracking-wide transition-colors"
            >
              About Us
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("activities")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="text-sm font-bold text-slate-600 hover:text-[#0067A5] uppercase tracking-wide flex items-center gap-1 transition-colors">
                Our Activities
                <svg
                  className={`w-3 h-3 transition-transform ${openDropdown === "activities" ? "rotate-180" : ""}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {openDropdown === "activities" && (
                <div className="absolute top-full left-0 pt-2 z-50 min-w-[320px]">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-6">
                    <h3 className="font-bold text-[#0067A5] text-base mb-4 uppercase">
                      Our Activities
                    </h3>
                    {Object.entries(activitiesDropdown).map(
                      ([category, items]) => (
                        <div key={category} className="mb-4 last:mb-0">
                          <h4 className="font-bold text-slate-800 text-sm mb-2">
                            {category}
                          </h4>
                          <ul className="space-y-1 pl-3">
                            {items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  className="text-sm text-slate-500 hover:text-[#0067A5] transition-colors block py-[2px]"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("involved")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="text-sm font-bold text-slate-600 hover:text-[#0067A5] uppercase tracking-wide flex items-center gap-1 transition-colors">
                Get Involved
                <svg
                  className={`w-3 h-3 transition-transform ${openDropdown === "involved" ? "rotate-180" : ""}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {openDropdown === "involved" && (
                <div className="absolute top-full left-0 pt-2 z-50 min-w-[240px]">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-5">
                    <h3 className="font-bold text-[#0067A5] text-base mb-3 uppercase">
                      Get Involved
                    </h3>
                    <ul className="space-y-2">
                      {getInvolvedDropdown.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className="text-sm font-semibold text-slate-700 hover:text-[#0067A5] transition-colors block py-1"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/contact-us"
              className="text-sm font-bold text-slate-600 hover:text-[#0067A5] uppercase tracking-wide transition-colors"
            >
              Contact Us
            </Link>

            <button className="text-[#0067A5] hover:text-[#005089] transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-4">
            <button className="text-[#0067A5]">
              <Search className="w-5 h-5" />
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4 h-[calc(100vh-80px)] overflow-y-auto">
            <Link
              href="/"
              className="text-base font-bold text-slate-700 hover:text-[#0067A5]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/about-us"
              className="text-base font-bold text-slate-700 hover:text-[#0067A5]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ABOUT US
            </Link>

            <div className="flex flex-col gap-2">
              <div className="text-base font-bold text-slate-700 uppercase">
                Our Activities
              </div>
              <div className="pl-4 flex flex-col gap-2 border-l-2 border-slate-100">
                {Object.entries(activitiesDropdown).map(([category, items]) => (
                  <div key={category}>
                    <div className="text-sm font-semibold text-slate-900 mb-1">
                      {category}
                    </div>
                    {items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block text-sm text-slate-500 py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-base font-bold text-slate-700 uppercase">
                Get Involved
              </div>
              <div className="pl-4 flex flex-col gap-1 border-l-2 border-slate-100">
                {getInvolvedDropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-sm text-slate-500 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contact-us"
              className="text-base font-bold text-slate-700 hover:text-[#0067A5]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CONTACT US
            </Link>

            <Link
              href="/support-a-cause"
              className="flex items-center justify-center gap-2 font-bold text-white uppercase tracking-wide rounded-sm py-3 mt-4"
              style={{ background: "#FFA500" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              SUPPORT A CAUSE
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
