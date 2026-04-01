export function VisionMissionSection() {
    return (
        <section id="vision-mission" className="py-16 md:py-24 bg-white">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <h2 className="section-title mb-10 md:mb-14">
                    Vision and Mission
                </h2>

                <div className="max-w-8xl mx-auto">
                    <p
                        className="text-gray-700 mb-8"
                        style={{
                            fontFamily: "'Open Sans', sans-serif",
                            fontWeight: 400,
                            fontSize: "18px",
                            lineHeight: "180%",
                            textAlign: "justify",
                        }}
                    >
                        Evolve Sangh Foundation is committed to transforming the lives of
                        youth from economically weaker backgrounds through a three-fold
                        mission:
                    </p>

                    <ol
                        className="space-y-4 mb-8 pl-6"
                        style={{
                            fontFamily: "'Open Sans', sans-serif",
                            fontWeight: 400,
                            fontSize: "18px",
                            lineHeight: "170%",
                            textAlign: "justify",
                        }}
                    >
                        <li className="text-gray-700">
                            <span className="font-bold text-gray-900">Living:</span>{" "}
                            Ensuring no one sleeps hungry by organizing food, clothing, and
                            basic need drives.
                        </li>
                        <li className="text-gray-700">
                            <span className="font-bold text-gray-900">Loving:</span>{" "}
                            Addressing the mental and emotional health crisis among students
                            through counseling, de-addiction programs, and a supportive
                            environment.
                        </li>
                        <li className="text-gray-700">
                            <span className="font-bold text-gray-900">Learning:</span>{" "}
                            Enabling academic and career success through free education,
                            skill development, mentoring, and youth welfare centers.
                        </li>
                    </ol>

                    <p
                        className="text-gray-700"
                        style={{
                            fontFamily: "'Open Sans', sans-serif",
                            fontWeight: 400,
                            fontSize: "18px",
                            lineHeight: "180%",
                            textAlign: "justify",
                        }}
                    >
                        To build a compassionate and empowered society where every
                        underprivileged student receives holistic support—nourishment for
                        the body, education for the mind, and guidance for the soul.
                    </p>
                </div>
            </div>
        </section>
    );
}