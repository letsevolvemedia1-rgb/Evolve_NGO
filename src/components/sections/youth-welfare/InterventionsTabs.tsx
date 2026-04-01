"use client";

import { useState } from "react";

export interface InterventionItem {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
}

interface InterventionsTabsProps {
    items?: InterventionItem[];
    title?: string;
    /** When true, removes container padding — tabs stretch edge-to-edge */
    fullWidth?: boolean;
}

const defaultItems: InterventionItem[] = [
    {
        id: "residential",
        label: "FREE RESIDENTIAL & FOOD SUPPORT",
        description:
            "Providing Safe Accommodation, Nutritious Meals, Study Environment, And Basic Necessities—Ensuring Financial Stress Does Not Hinder Education.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        ),
    },
    {
        id: "academic",
        label: "ACADEMIC & COMPETITIVE EXAM COACHING",
        description:
            "Offering Guided Learning Support, Doubt-Clearing Sessions, Exam Preparation, And Study Planning For Engineering, Government Exams, And Academic Success.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
        ),
    },
    {
        id: "skill",
        label: "SKILL DEVELOPMENT & DIGITAL LITERACY",
        description:
            "Conducting Training In Programming, Communication Skills, Computer Literacy, Soft Skills, And Employability Programs To Prepare Students For Modern Careers.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
        ),
    },
    {
        id: "mentorship",
        label: "MENTORSHIP & CAREER GUIDANCE",
        description:
            "Connecting Students With Accomplished Professionals And Industry Mentors For Career Counseling, Interview Preparation, Goal-Setting, And Personality Development.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        ),
    },
    {
        id: "mental",
        label: "MENTAL WELLNESS & LIFE-SKILLS TRAINING",
        description:
            "Regular Sessions On Stress Management, Discipline, Confidence Building, Emotional Resilience, And Healthy Lifestyle Practices To Nurture Balanced And Grounded Youth.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        ),
    },
    {
        id: "internship",
        label: "INTERNSHIP & PLACEMENT SUPPORT",
        description:
            "Facilitating Industry Exposure, Internship Opportunities, Resume Building, Mock Interviews, And Professional Networking To Support Career Growth.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
        ),
    },
    {
        id: "community",
        label: "COMMUNITY SERVICE & LEADERSHIP DEVELOPMENT",
        description:
            "Encouraging Students To Contribute To Society Through Volunteering, Social Campaigns, And Leadership Activities—Building Socially-Conscious Future Leaders.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
            </svg>
        ),
    },
];

export function InterventionsTabs({
    items = defaultItems,
    title = "OUR INTERVENTIONS",
    fullWidth = false,
}: InterventionsTabsProps) {
    const [activeTab, setActiveTab] = useState(0);

    const descriptionLines = items[activeTab].description.split("\n").filter(Boolean);
    const isBulletList = descriptionLines.length > 1;

    return (
        <section className={`w-full ${fullWidth ? "py-8 md:py-12" : "py-12 md:py-16"} bg-white`}>
            <div className={fullWidth ? "w-full" : "container mx-auto px-4 md:px-8 lg:px-16"}>
                <h2 className={`text-2xl md:text-3xl font-extrabold text-[#005089] uppercase tracking-wide text-center ${fullWidth ? "mb-6 md:mb-8 px-4" : "mb-8 md:mb-10"}`}>
                    {title}
                </h2>

                <div className="border-4 border-[#0077C0] overflow-hidden">
                    <div className="bg-[#0077C0] px-1 pt-1.5 md:pt-2">
                        <div className="w-full overflow-x-auto scrollbar-hide">
                            <div className={`flex ${fullWidth ? "w-full" : "min-w-max"} gap-[2px]`}>
                                {items.map((item, index) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(index)}
                                        className={`
                                            flex-1 px-1.5 py-2 md:py-2.5
                                            ${fullWidth
                                                ? "text-[6px] md:text-[7px] lg:text-[8px]"
                                                : "text-[7px] md:text-[8px] lg:text-[9px] min-w-[110px] md:min-w-[120px] px-2"
                                            }
                                            font-bold uppercase text-center
                                            leading-tight tracking-wider
                                            transition-all duration-200 ease-in-out
                                            cursor-pointer
                                            ${activeTab === index
                                                ? "bg-[#fdf6e3] text-[#005089] border-b-0 relative z-10"
                                                : "bg-white text-[#005089] hover:bg-gray-50"
                                            }
                                        `}
                                        style={activeTab === index ? { marginBottom: '-1px' } : {}}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={`w-full bg-[#fdf6e3] ${fullWidth ? "px-4 py-4 md:px-8 md:py-5" : "px-6 py-5 md:px-10 md:py-6"}`}>
                        <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                            <div className="text-[#005089] shrink-0">
                                {items[activeTab].icon}
                            </div>
                            {isBulletList ? (
                                <ul className="space-y-1.5">
                                    {descriptionLines.map((line, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs md:text-sm lg:text-base text-slate-800 leading-relaxed font-semibold italic">
                                            <span className="text-[#005089] mt-0.5 shrink-0">•</span>
                                            <span>{line}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-xs md:text-sm lg:text-base text-slate-800 leading-relaxed font-semibold italic">
                                    {items[activeTab].description}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="h-3 md:h-4 bg-[#0077C0]"></div>
                </div>
            </div>
        </section>
    );
}