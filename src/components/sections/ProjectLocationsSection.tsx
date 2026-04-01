import Image from "next/image";

const locations = [
    "NOIDA",
    "KANPUR (AWADHPURI)",
    "KANPUR (KALYANPUR)",
    "KANPUR (GURUDEV CHAUHARA)",
    "BANGALORE",
    "SULTANPUR",
    "LUCKNOW",
    "KANNAUJ",
    "MAINPURI",
];

export function ProjectLocationsSection() {
    return (
        <section className="py-12 md:py-24 bg-white">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <h2 className="section-title mb-10 md:mb-16">
                    OUR PROJECT LOCATIONS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start max-w-6xl mx-auto">
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.123456!2d80.3319!3d26.4499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c379b5555555%3A0x1234567890!2sKanpur%2C+Uttar+Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>

                    <div>
                        <h3
                            className="font-bold text-[#0067A5] text-lg md:text-xl mb-6 uppercase tracking-wide"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}
                        >
                            Centres In Primary Locations
                        </h3>
                        <ol
                            className="space-y-2 pl-1"
                            style={{
                                fontFamily: "'Open Sans', sans-serif",
                                fontWeight: 600,
                                fontSize: "16px",
                                lineHeight: "180%",
                            }}
                        >
                            {locations.map((loc, i) => (
                                <li key={i} className="text-gray-800 flex items-baseline gap-2">
                                    <span className="text-[#0067A5] font-bold min-w-[24px]">{i + 1}.</span>
                                    <span>{loc}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}