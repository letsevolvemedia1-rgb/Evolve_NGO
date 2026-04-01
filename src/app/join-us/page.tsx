"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const waysToJoin = [
    {
        id: "volunteer",
        title: "VOLUNTEER WITH US",
        description:
            "Join our on-ground team and make a direct difference. Whether it's teaching, organizing events, or supporting our welfare activities — your time and skills matter.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        ),
    },
    {
        id: "internship",
        title: "INTERNSHIP PROGRAM",
        description:
            "Gain real-world experience working alongside our passionate team. We offer internships across field operations, communications, fundraising, and program management.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
        ),
    },
    {
        id: "corporate",
        title: "CORPORATE PARTNERSHIP",
        description:
            "Partner with us under your CSR mandate. We work with companies to design impactful programs aligned with your goals — from skill development to community welfare.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
        ),
    },
    {
        id: "donate",
        title: "SUPPORT A CAUSE",
        description:
            "Your donation directly funds meals, education, shelter, and opportunity for those who need it most. Every rupee counts and every contribution transforms lives.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        ),
    },
];

export default function JoinUsPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        interest: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className="w-full bg-white font-sans text-slate-800">

            {/* Hero */}
            <section className="relative w-full h-[280px] md:h-[360px] overflow-hidden">
                <Image src="/Homepage/hero-bg-2.jpg" alt="Join Our Mission" fill className="object-cover object-center" priority sizes="100vw" />
                <div className="absolute top-8 left-4 md:left-10 bg-[#00AEFF]/90 px-6 py-4 max-w-[280px] md:max-w-[400px]">
                    <p className="text-sm md:text-base text-white/90 uppercase tracking-wider font-medium">
                        BE THE CHANGE
                    </p>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase leading-tight">
                        JOIN OUR MISSION
                    </h1>
                </div>
            </section>

            {/* Intro */}
            <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-14 text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide mb-4">
                    TOGETHER, WE CAN DO MORE
                </h2>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl mx-auto">
                    Evolve Sangh Foundation is built on the belief that change happens when communities come together.
                    Whether you choose to volunteer your time, share your skills, partner as a corporation, or donate —
                    you become a vital part of our movement to uplift lives across India.
                </p>
            </section>

            {/* Ways to Join */}
            <section className="w-full bg-slate-50 py-10 md:py-14">
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide text-center mb-10">
                        WAYS TO GET INVOLVED
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {waysToJoin.map((item) => (
                            <div key={item.id} className="bg-white border border-gray-200 rounded-sm p-6 flex items-start gap-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-[#005089] shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-sm md:text-base font-extrabold text-[#005089] uppercase tracking-wide mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                    {item.id === "donate" && (
                                        <Link
                                            href="/support-a-cause"
                                            className="inline-block mt-3 text-xs font-bold text-[#FF6B00] uppercase tracking-wide hover:underline"
                                        >
                                            Donate Now →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Registration Form */}
            <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-14">
                <div className="max-w-2xl mx-auto">
                    <div className="border border-gray-200 rounded-sm shadow-sm">
                        <div className="bg-white px-6 py-5 text-center border-b border-gray-100">
                            <h3 className="text-xl md:text-2xl font-extrabold text-[#005089] uppercase tracking-wide">
                                REGISTER YOUR INTEREST
                            </h3>
                            <p className="text-xs md:text-sm text-slate-500 mt-2">
                                Fill in the form and our team will get back to you.
                            </p>
                        </div>

                        <div className="px-6 py-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name *"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-sm px-3 py-2 text-xs md:text-sm focus:outline-none focus:border-[#005089] text-slate-700"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address *"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-sm px-3 py-2 text-xs md:text-sm focus:outline-none focus:border-[#005089] text-slate-700"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number *"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-sm px-3 py-2 text-xs md:text-sm focus:outline-none focus:border-[#005089] text-slate-700"
                                />
                                <select
                                    name="interest"
                                    value={formData.interest}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-sm px-3 py-2 text-xs md:text-sm focus:outline-none focus:border-[#005089] text-slate-700 bg-white"
                                >
                                    <option value="">Area of Interest *</option>
                                    <option value="volunteer">Volunteering</option>
                                    <option value="internship">Internship</option>
                                    <option value="corporate">Corporate Partnership</option>
                                    <option value="donation">Donation</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <textarea
                                name="message"
                                placeholder="Tell us a little about yourself and why you'd like to join us..."
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-xs md:text-sm focus:outline-none focus:border-[#005089] text-slate-700 resize-none"
                            />

                            <div className="text-center pt-2">
                                <button className="bg-[#FF6B00] hover:bg-[#e06000] text-white font-bold uppercase text-sm px-10 py-3 rounded-sm transition-colors tracking-wider cursor-pointer">
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="w-full bg-[#005089] py-4">
                <div className="container mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">
                    <p className="text-white text-xs md:text-sm font-medium">
                        Have questions? Reach out to us at{" "}
                        <a href="mailto:Info@Evolve.Org" className="underline hover:text-white/80">
                            Info@Evolve.Org
                        </a>
                    </p>
                    <Link
                        href="/contact-us"
                        className="bg-[#FF6B00] hover:bg-[#e06000] text-white font-bold uppercase text-sm px-6 py-2.5 rounded-sm transition-colors tracking-wider"
                    >
                        CONTACT US
                    </Link>
                </div>
            </section>
        </main>
    );
}
