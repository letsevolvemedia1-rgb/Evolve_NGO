import Link from "next/link";

interface ReportCardProps {
    date: string;
    category: string;
    description: string;
    downloadLink: string;
}

function ReportCard({ date, category, description, downloadLink }: ReportCardProps) {
    return (
        <div className="border-2 border-[#0067A5] rounded-lg overflow-hidden flex flex-col h-full">
            <div className="flex items-center justify-between px-5 py-3 bg-white">
                <span
                    className="text-sm font-bold text-[#0067A5]"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                    {date}
                </span>
                <span
                    className="text-sm font-bold text-[#0067A5] uppercase"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                    {category}
                </span>
            </div>

            <div className="bg-[#0067A5] flex flex-col flex-1 p-5">
                <div className="w-full aspect-[16/10] bg-[#D9D9D9] mb-5 rounded-sm" />

                <div className="flex-1 mb-6">
                    <p
                        className="text-white text-[17px] leading-snug"
                        style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                        {description}
                    </p>
                </div>

                <div className="flex justify-end">
                    <Link
                        href={downloadLink}
                        className="inline-block bg-white text-[#0067A5] text-sm font-bold uppercase py-2 px-4 rounded-sm hover:bg-gray-100 transition-colors"
                        style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                        DOWNLOAD FULL REPORTS
                    </Link>
                </div>
            </div>
        </div>
    );
}

const reports = [
    {
        date: "01/02/25",
        category: "Youth Empowerment",
        description:
            "Report Of The Comptroller And Auditor General Of India On Working Of Mancheswar Carriage Repair",
        downloadLink: "#",
    },
    {
        date: "01/02/25",
        category: "Youth Empowerment",
        description:
            "Report Of The Comptroller And Auditor General Of India On Working Of Mancheswar Carriage Repair",
        downloadLink: "#",
    },
    {
        date: "01/02/25",
        category: "Youth Empowerment",
        description:
            "Report Of The Comptroller And Auditor General Of India On Working Of Mancheswar Carriage Repair",
        downloadLink: "#",
    },
];

export function ProjectReportsSection() {
    return (
        <section className="py-12 md:py-24 bg-white">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <div className="w-full h-2 bg-[#0067A5] mb-0" />
                <div className="bg-[#0067A5] py-4">
                    <h2 className="font-heading text-4xl md:text-6xl text-white text-center uppercase tracking-wide">
                        Project Reports
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
                    {reports.map((report, index) => (
                        <ReportCard
                            key={index}
                            date={report.date}
                            category={report.category}
                            description={report.description}
                            downloadLink={report.downloadLink}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}