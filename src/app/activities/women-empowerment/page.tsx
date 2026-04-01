"use client";

import Image from "next/image";

/* ── What We Do Data ── */
const whatWeDoList = [
    {
        title: "Sewing & Tailoring Training",
        desc: "Hands-on training in stitching, tailoring, and garment-making to help women build sustainable earning opportunities from home or through community centers."
    },
    {
        title: "Basic Computer Education",
        desc: "Digital literacy sessions that enable women to access online opportunities, improve employability, and stay connected in the modern economy."
    },
    {
        title: "Spoken English & Communication Skills",
        desc: "Empowering women to communicate confidently, explore professional paths, and participate more actively in social and economic spheres."
    }
];

/* ── Our Approach Data ── */
const ourApproachList = [
    "Skill Development for Self-reliance",
    "Inclusive Learning Environments",
    "Mentorship & Personal Confidence Building",
    "Community Support & Networking",
    "Real-world Earning Opportunities"
];

/* ── Placeholder images for Glimpses ── */
const glimpseImages = [
    { src: "/Activity/youth-welfare-center.jpg", alt: "Women empowerment glimpse 1" },
    { src: "/Living/image.png", alt: "Women empowerment glimpse 2" },
    { src: "/Activity/food-distribution.jpg", alt: "Women empowerment glimpse 3" },
    { src: "/Living/image-1.png", alt: "Women empowerment glimpse 4" },
];

export default function WomenEmpowermentPage() {
    return (
        <main className="w-full bg-white font-sans text-slate-800">
            {/* ── Hero Banner ─── */}
            <section className="w-full relative">
                <img
                    src="/new/Women/Slider.png"
                    alt="Women Economic & Social Development"
                    className="w-full h-auto block"
                />
            </section>

            {/* ── WOMEN EMPOWERMENT PROGRAM ─── */}
            <section className="container mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-16 text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide mb-6">
                    WOMEN EMPOWERMENT PROGRAM
                </h2>
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed text-left md:text-center">
                        At Evolve Sangh Foundation, we believe that when women rise, communities rise. Our Women Empowerment
                        Program is designed to provide opportunities, resources, and skills that enable women—especially from
                        underserved backgrounds—to become independent, confident, and financially secure.
                    </p>
                </div>
            </section>

            {/* ── WHAT WE DO ─── */}
            <section className="container mx-auto px-4 md:px-8 lg:px-16 pb-12 md:pb-20 flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide text-center mb-10">
                    WHAT WE DO
                </h2>
                
                <div className="max-w-4xl w-full mx-auto space-y-8">
                    <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed">
                        Through our Women Skill Development Centers, we equip women with practical and employable skills
                        that support long-term economic empowerment and personal growth. Our programs include:
                    </p>

                    <ul className="space-y-6">
                        {whatWeDoList.map((item, idx) => (
                            <li key={idx} className="space-y-1">
                                <h3 className="text-sm md:text-base font-bold text-slate-800 flex items-start gap-2">
                                    <span className="text-slate-800 shrink-0 mt-[1px] md:mt-[3px]">•</span>
                                    <span>{item.title}</span>
                                </h3>
                                <p className="text-xs md:text-sm lg:text-base text-slate-600 leading-relaxed pl-6">
                                    {item.desc}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── OUR APPROACH ─── */}
            <section className="w-full border-t border-slate-200">
                <div className="w-full bg-[#005089] py-3 md:py-4 border-b-[8px] border-[#0077c0]">
                    <div className="container mx-auto px-4 md:px-8 lg:px-16 flex justify-center">
                        <h2 className="text-xl md:text-2xl font-extrabold text-white uppercase tracking-wider text-center flex items-center gap-2">
                            OUR APPROACH
                        </h2>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-20 bg-white">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 max-w-5xl mx-auto">
                        
                        {/* Abstract Icons Container */}
                        <div className="flex items-center gap-4 md:gap-8 relative z-10 shrink-0">
                             {/* Connector line */}
                             <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-300 -z-10"></div>
                             
                             {/* First circle */}
                             <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-[3px] md:border-4 border-[#005089] bg-white flex items-center justify-center overflow-hidden shadow-sm relative">
                                  {/* Dummy SVG resembling leaves and a female profile silhouette */}
                                  <svg className="w-10 h-10 md:w-16 md:h-16 text-[#005089]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
                                  </svg>
                             </div>
                             
                             {/* Second circle */}
                             <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-[3px] md:border-4 border-[#005089] bg-[#fff0f5] flex items-center justify-center overflow-hidden shadow-sm relative">
                                  {/* Dummy SVG resembling a megaphone and female symbol */}
                                  <svg className="w-10 h-10 md:w-16 md:h-16 text-[#e83e8c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                  </svg>
                             </div>
                        </div>

                        {/* Bullet List */}
                        <div className="text-left w-full max-w-sm">
                            <ul className="space-y-2 md:space-y-3">
                                {ourApproachList.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-slate-800 text-xs md:text-sm lg:text-base font-bold"
                                    >
                                        <span className="text-slate-800 mt-[2px] shrink-0 text-xs">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── GLIMPSES ─── */}
            <section className="w-full py-10 md:py-14 bg-white border-b-4 border-b-[#005089] mb-4">
                <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide text-center mb-8">
                        GLIMPSES
                    </h2>
                    <div className="flex justify-center gap-4 md:gap-6 lg:gap-8 flex-wrap">
                        {glimpseImages.map((img, i) => (
                            <div key={i} className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-[#fdefd1] rounded-sm overflow-hidden shrink-0">
                                {/* Next Image with multiply effect to give it that beige feeling on hover. Replace with actual icons later. */}
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover opacity-80 mix-blend-multiply transition-opacity duration-300 hover:opacity-100"
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
