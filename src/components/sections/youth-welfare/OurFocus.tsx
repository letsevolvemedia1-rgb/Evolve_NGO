interface OurFocusProps {
    title?: string;
    items?: string[];
}

const defaultItems = [
    "Create equitable education & career opportunities",
    "Strengthen foundational learning & digital literacy",
    "Support first-generation learners and economically weak youth",
    "Build employability through modern skill development",
    "Promote mental well-being and emotional resilience",
    "Reduce drop-out rates and break poverty-education barriers",
    "Shape responsible, confident and future-ready youth leaders",
];

export function OurFocus({
    title = "OUR FOCUS",
    items = defaultItems,
}: OurFocusProps) {
    const midpoint = Math.ceil(items.length / 2);
    const leftItems = items.slice(0, midpoint);
    const rightItems = items.slice(midpoint);

    return (
        <section className="w-full">
            <div className="w-full bg-[#005089] py-3 md:py-4">
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                    <h2 className="text-xl md:text-2xl font-extrabold text-white uppercase tracking-wider text-center">
                        {title}
                    </h2>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6 md:py-10 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                    <ul className="space-y-2.5">
                        {leftItems.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2.5 text-slate-700 text-xs md:text-sm leading-relaxed"
                            >
                                <span className="text-[#005089] mt-0.5 shrink-0 font-bold">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <ul className="space-y-2.5">
                        {rightItems.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2.5 text-slate-700 text-xs md:text-sm leading-relaxed"
                            >
                                <span className="text-[#005089] mt-0.5 shrink-0 font-bold">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}