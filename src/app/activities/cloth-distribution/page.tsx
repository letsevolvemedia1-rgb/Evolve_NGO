"use client";

import { useState } from "react";
import Image from "next/image";

const interventionTabs = [
  {
    id: "distribution",
    label: "Clothing Distribution to Vulnerable Communities",
    points: [
      "Providing clean & usable clothing to children, youth, and families",
      "Seasonal support drives (winter wear, summer clothing, blankets)",
      "Special focus on slum regions & underserved rural communities",
    ],
  },
  {
    id: "donation-drives",
    label: "Student & Community Donation Drives",
    points: [
      "Mobilising college students and residential communities to donate pre-loved items",
      "Organising campus drives, collection camps & awareness sessions",
      "Partnering with institutions to build a culture of compassionate giving",
    ],
  },
  {
    id: "toys-books",
    label: "Distribution of Toys, Books & Essentials",
    points: [
      "Collecting and redistributing toys, books, stationery, and learning materials",
      "Ensuring children receive resources that support education and play",
      "Reducing landfill waste by giving usable goods a meaningful second life",
    ],
  },
];

const focusPoints = [
  "Ensure access to clothing & basic essentials for underserved families",
  "Restore dignity, warmth, and comfort to those in need",
  "Promote responsible giving and sustainable reuse culture",
  "Engage youth and communities in compassion-driven contribution",
  "Reduce waste by channeling resources to where they matter most",
  "Support children's emotional, social, and educational development",
  "Build a kinder and more inclusive community ecosystem",
];

const glimpseImages = [
  { src: "/ClothDistribution/Glimpses1.jpeg", alt: "Cloth distribution glimpse 1" },
  { src: "/ClothDistribution/Glimpses2.jpeg", alt: "Cloth distribution glimpse 2" },
  { src: "/ClothDistribution/Glimpses3.jpeg", alt: "Cloth distribution glimpse 3" },
  { src: "/ClothDistribution/Glimpses4.jpeg", alt: "Cloth distribution glimpse 4" },
  { src: "/ClothDistribution/Glimpses5.jpeg", alt: "Cloth distribution glimpse 5" },
];

export default function ClothDistributionPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="w-full bg-white font-sans text-slate-800">

      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <section className="relative w-full h-[350px] md:h-[450px] lg:h-[677px] overflow-hidden">
        <Image
          src="/ClothDistribution/hero-banner.jpg"
          alt="Cloth Distribution — Evolve Sangh Foundation"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </section>

      {/* ── Why Cloth Dignity ────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <h2 className="section-title mb-10">Why Cloth Dignity?</h2>
        <div
          className="mx-auto px-6 md:px-16 lg:px-0 max-w-[1080px] text-center"
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "160%",
            color: "#202020",
          }}
        >
          <p className="mb-4">
            Access to clean and comfortable clothing is a basic human need — essential for dignity,
            confidence, and well-being. Yet, millions of underserved individuals, especially children
            living in slums and low-income communities, struggle to meet even this simplest necessity.
          </p>
          <p className="mb-4">
            Seasonal hardships, unstable incomes, and lack of essential resources force vulnerable
            families to compromise on clothing and basic essentials. Children are most affected —
            impacting their health, social confidence, and overall development.
          </p>
          <p>
            At the same time, countless usable clothes, toys, and learning materials go unused or
            discarded in more privileged societies. With collective effort, these resources can be
            meaningfully redirected to transform lives.
          </p>
        </div>
      </section>

      {/* ── Our Interventions ────────────────────────────────────── */}
      <section className="pb-14 md:pb-20 bg-white">
        <h2 className="section-title mb-8">Our Interventions</h2>

        {/* Tab bar — blue background */}
        <div className="bg-[#005fa5]">
          <div className="flex flex-col md:flex-row w-full">
            {interventionTabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={`flex-1 px-4 py-4 text-center text-xs md:text-sm font-bold uppercase tracking-wide transition-colors border-b-2 md:border-b-0 md:border-r last:border-r-0 ${
                  activeTab === i
                    ? "bg-white text-[#005fa5] border-white"
                    : "bg-[#005fa5] text-white border-white/30 hover:bg-[#004d8a]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content — light blue bg */}
          <div className="bg-[#ecfbff] px-6 md:px-16 lg:px-24 py-8">
            <ul
              className="space-y-3"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                color: "#434343",
              }}
            >
              {interventionTabs[activeTab].points.map((pt) => (
                <li key={pt} className="flex items-start gap-3">
                  <span className="text-[#005fa5] mt-1 flex-shrink-0">•</span>
                  <span className="capitalize">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── What We Do ───────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <h2 className="section-title mb-10">What We Do</h2>
        <div
          className="mx-auto px-6 md:px-16 lg:px-0 max-w-[974px] text-center"
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "160%",
            color: "#202020",
          }}
        >
          <p className="mb-4">
            Evolve Sangh Foundation&apos;s Cloth Distribution Drive ensures that underprivileged
            families and children receive essential clothing and other basic resources, restoring
            dignity, warmth, and comfort.
          </p>
          <p>
            We collect good-quality pre-loved clothes, toys, books, and essential items from
            compassionate individuals, colleges, and residential communities — and distribute them
            responsibly to those in need, especially in slum and rural areas.
          </p>
        </div>
      </section>

      {/* ── Our Focus ────────────────────────────────────────────── */}
      <section className="bg-[#005fa5] py-12 px-6 md:px-16 lg:px-24">
        <h2 className="section-title !text-white mb-10">Our Focus</h2>
        <ul
          className="max-w-[647px] mx-auto space-y-3 text-white"
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 600,
            fontSize: "19px",
            lineHeight: "160%",
          }}
        >
          {focusPoints.map((pt) => (
            <li key={pt} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-1">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Glimpses ─────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <h2 className="section-title mb-10">Glimpses</h2>
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {glimpseImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-sm overflow-hidden"
                style={{ background: "#ffebc6" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
