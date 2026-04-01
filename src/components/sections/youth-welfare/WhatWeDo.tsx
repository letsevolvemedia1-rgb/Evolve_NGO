import Image from "next/image";

interface WhatWeDoProps {
    title?: string;
    description?: string[];
    imageAlt?: string;
}

const defaultDescription = [
    "Evolve Sangh Foundation's Youth Welfare Center Program is a community-driven initiative designed to empower financially challenged yet highly motivated students. Our centers offer free hostel facility, nutritious meals, academic support, mentorship, skill training, and career guidance to help students pursue higher education and become self-reliant.",
    "With a focus on building an environment of discipline, mental wellness, learning and brotherhood, the program nurtures youth into capable, confident, and socially responsible individuals.",
];

export function WhatWeDo({
    title = "WHAT WE DO",
    description = defaultDescription,
    imageAlt = "Youth Welfare Center activities",
}: WhatWeDoProps) {
    return (
        <section className="w-full py-10 md:py-16 bg-white">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide text-center mb-8 md:mb-10">
                    {title}
                </h2>

                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
                    <div className="w-full md:w-3/4 order-2 md:order-1">
                        <div className="space-y-3">
                            {description.map((para, index) => (
                                <p
                                    key={index}
                                    className="text-xs md:text-sm text-slate-600 leading-relaxed text-justify"
                                >
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-1/4 flex justify-center order-1 md:order-2">
                        <div className="relative w-40 h-40 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-[#005089] bg-gray-200 shrink-0 shadow-sm">
                            <Image
                                src="/new/Youth/logo2.svg"
                                alt={imageAlt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}