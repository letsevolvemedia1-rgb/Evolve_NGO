"use client";

import Image from "next/image";

export function IdentitySection() {
    return (
        <section className="py-0 bg-white">
            <div className="w-full bg-[#0067A5] py-5 mb-12 md:mb-16">
                <h2 className="font-heading text-5xl md:text-6xl text-white text-center uppercase tracking-wide">
                    OUR IDENTITY
                </h2>
            </div>

            <div className="w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-24">

                <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 items-center">
                    <div className="relative w-full h-[300px] md:h-[380px]">
                        <Image
                            src="/About/OurIdentity.svg"
                            alt="Our Identity"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div>
                        <p
                            className="text-gray-700"
                            style={{
                                fontFamily: "'Open Sans', sans-serif",
                                fontWeight: 400,
                                fontSize: "20px",
                                lineHeight: "160%",
                                letterSpacing: "0%",
                                textAlign: "justify",
                            }}
                        >
                            Evolve Sangh Foundation is a nonprofit dedicated to uplifting
                            underprivileged youth in India. Our mission-driven programs cater to
                            students who lack basic necessities, educational resources, or
                            emotional support. Through grassroots initiatives like free food
                            distribution in slums, midday meals in schools, stationery drives,
                            and personalized career mentoring, we aim to break the cycle of
                            poverty and despair. Our Youth Welfare Centers provide holistic
                            care—including hostel, food, coaching, mental wellness, and
                            value-based education. Anchored in compassion and guided by purpose,
                            we believe every young mind deserves the tools, support, and
                            environment to thrive.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}