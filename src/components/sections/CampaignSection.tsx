import Link from "next/link";
import Image from "next/image";

const campaigns = [
    {
        title: "TYARI KAL\nKI",
        desc: "Every young mind carries the potential to shape tomorrow. But for thousands of underprivileged youth in India, dreams are cut short due to lack of proper guidance, resources, and opportunities.",
        image: "/Homepage/Rectangle.png",
        url: "/support-a-cause?cause=future"
    },
    {
        title: "HUNGER\nFREE NIGHT",
        desc: "Every night, millions of Indians go to bed hungry. In a country that is moving forward rapidly, it is heartbreaking that so many children, women, and daily wage earners still sleep without a proper meal.",
        image: "/Homepage/image.svg",
        url: "/support-a-cause?cause=food"
    },
    {
        title: "SHIKSHA\nNA RUKE",
        desc: "Education is the most powerful tool to break the cycle of poverty. Yet, millions of children in India are forced to drop out of school because of financial hardships, lack of resources, or family struggles.",
        image: "/Homepage/image.png",
        url: "/support-a-cause?cause=education"
    },
];

export function CampaignSection() {
    return (
        <section className="relative w-full pb-20 pt-16 bg-white overflow-hidden">
            <div className="absolute top-10 right-[-40px] w-40 h-40 md:w-56 md:h-56 rounded-full border-[6px] border-[#C8E8FF]/50" />
            <div className="absolute top-24 right-8 w-24 h-24 md:w-32 md:h-32 rounded-full border-[5px] border-[#C8E8FF]/35" />
            <div className="absolute bottom-10 left-[-30px] w-36 h-36 md:w-48 md:h-48 rounded-full border-[6px] border-[#C8E8FF]/45" />
            <div className="absolute bottom-28 left-12 w-20 h-20 md:w-28 md:h-28 rounded-full border-[4px] border-[#C8E8FF]/30" />

            <div className="relative w-full px-6 md:px-16 lg:px-28 text-center">
                <h2 className="section-title mb-12">
                    Support a Cause
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 justify-items-center">
                    {campaigns.map((camp, index) => (
                        <div
                            key={index}
                            className="w-full max-w-[267px] rounded-xl bg-white flex flex-col items-center px-6 pt-6 pb-5"
                            style={{
                                boxShadow: "0px 0px 7px 0px #00000040",
                            }}
                        >
                            <div
                                className="relative w-[219px] h-[219px] rounded-[15px] overflow-hidden mb-4 flex-shrink-0"
                            >
                                <Image
                                    src={camp.image}
                                    alt={camp.title.replace("\n", " ")}
                                    fill
                                    className="object-cover"
                                    sizes="219px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                                    <h3
                                        className="uppercase whitespace-pre-line leading-[1]"
                                        style={{
                                            fontFamily: "var(--font-league-gothic), sans-serif",
                                            fontWeight: 400,
                                            fontSize: "42px",
                                            letterSpacing: "0%",
                                        }}
                                    >
                                        {camp.title}
                                    </h3>
                                </div>
                            </div>

                            <p
                                className="text-gray-600 mb-3 w-full"
                                style={{
                                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    lineHeight: "160%",
                                    textAlign: "justify",
                                }}
                            >
                                {camp.desc}
                            </p>

                            <Link
                                href={camp.url}
                                className="self-start font-bold text-[#0077B6] hover:text-[#005a8c] transition-colors"
                                style={{
                                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                }}
                            >
                                Know more&gt;
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}