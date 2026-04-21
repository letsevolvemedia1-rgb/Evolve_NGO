import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full font-sans">
            <div className="w-full h-2 bg-[#C8E8FF]" />

            <div className="w-full bg-[#0067A5] text-white">
                <div className="w-full px-8 md:px-16 lg:px-28 pt-10 pb-8">

                    <div className="mb-2">
                        <h4 className="font-bold uppercase text-[13px] tracking-[0.15em] mb-1 border-b border-white/30 pb-2 w-fit">
                            OUR ACTIVITIES
                        </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-16 mb-8 mt-4">
                        <div>
                            <h5 className="font-bold italic text-[13px] mb-3 text-white">Living</h5>
                            <ul className="space-y-[6px] text-[12px] text-white/75 pl-4">
                                <li><Link href="/activities/free-food-drive" className="hover:text-white transition-colors">Free Food Drives</Link></li>
                                <li><Link href="/activities/youth-welfare-centers" className="hover:text-white transition-colors">Youth Welfare Centers</Link></li>
                                <li><Link href="/activities/cloth-distribution" className="hover:text-white transition-colors">Free Cloth Distribution</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold italic text-[13px] mb-3 text-white">Loving</h5>
                            <ul className="space-y-[6px] text-[12px] text-white/75 pl-4">
                                <li><Link href="/activities/environment-care" className="hover:text-white transition-colors">Environment Care</Link></li>
                                <li><Link href="/activities/mental-wellness-program" className="hover:text-white transition-colors">Mental Wellness Program</Link></li>
                                <li><Link href="/activities/women-empowerment" className="hover:text-white transition-colors">Women Empowerment</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold italic text-[13px] mb-3 text-white">Learning</h5>
                            <ul className="space-y-[6px] text-[12px] text-white/75 pl-4">
                                <li><Link href="/activities/access-to-education" className="hover:text-white transition-colors">Access To Education Initiative</Link></li>
                                <li><Link href="/activities/skill-development" className="hover:text-white transition-colors">Skill Development & Training Programs</Link></li>
                                <li><Link href="/activities/value-education-program" className="hover:text-white transition-colors">Value Education Program</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full h-px bg-white/20 mb-8" />

                    <div className="grid grid-cols-1 md:grid-cols-[200px_200px_1fr] gap-x-10 gap-y-8">

                        <div>
                            <h4 className="font-bold uppercase text-[13px] tracking-[0.12em] border-b border-white/30 pb-1 mb-4 w-fit">
                                ABOUT US
                            </h4>
                            <ul className="space-y-[5px] text-[12px] text-white/75">
                                <li><Link href="/about-us#vision-mission" className="hover:text-white transition-colors">Vision And Mission</Link></li>
                                <li><Link href="/about-us" className="hover:text-white transition-colors">Our Identity</Link></li>
                                <li><Link href="/about-us" className="hover:text-white transition-colors">Our Project Locations</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Audit Report</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Our Team</Link></li>
                                <li><Link href="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold uppercase text-[13px] tracking-[0.12em] border-b border-white/30 pb-1 mb-4 w-fit">
                                GET INVOLVED
                            </h4>
                            <ul className="space-y-[5px] text-[12px] text-white/75">
                                <li><Link href="/join-us" className="hover:text-white transition-colors">Become A Volunteer</Link></li>
                                <li><Link href="/join-us" className="hover:text-white transition-colors">Internship</Link></li>
                                <li><Link href="/support-a-cause" className="hover:text-white transition-colors">Donate</Link></li>
                                <li><Link href="/join-us" className="hover:text-white transition-colors">Corporate Partners</Link></li>
                                <li><Link href="/join-us" className="hover:text-white transition-colors">CSR</Link></li>
                            </ul>
                        </div>

                        <div className="flex flex-col justify-between min-h-[140px]">
                            <div>
                                <h4 className="font-bold text-[15px] mb-1 tracking-wide">
                                    EVOLVE Sangh Foundation
                                </h4>
                                <p className="text-[12px] text-white/80 leading-[1.6]">
                                    233D- Lakhanpur Housing Society, Awadhpuri, Kanpur 208024
                                </p>

                                <p className="text-[12px] text-white/80 mt-4">
                                    <span className="font-bold text-white">Contact Us :</span>{" "}
                                    Ph No. : +91 9151050780, +91 9151050778 | E-Mail: Info@Evolve.Org
                                </p>
                            </div>

                            <div className="flex gap-3 mt-5 md:justify-end">
                                <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="Facebook">
                                    <svg className="w-5 h-5 text-[#0067A5]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="Twitter">
                                    <svg className="w-5 h-5 text-[#0067A5]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="Instagram">
                                    <svg className="w-5 h-5 text-[#0067A5]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="LinkedIn">
                                    <svg className="w-5 h-5 text-[#0067A5]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="YouTube">
                                    <svg className="w-5 h-5 text-[#0067A5]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-7 bg-[#1a1a1a]" />
        </footer>
    );
}
