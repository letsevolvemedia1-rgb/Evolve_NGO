import Image from "next/image";
import Link from "next/link";

export function MissionSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/4 flex justify-center flex-shrink-0">
            <Image
              src="/nav/EVOLVE_final_LOGO 1.png"
              alt="Evolve Sangh Foundation"
              width={224}
              height={224}
              className="w-48 h-48 md:w-56 md:h-56 object-contain"
            />
          </div>

          <div className="w-full md:w-3/4">
            <p
              className="text-gray-600 mb-6"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "160%",
                letterSpacing: "0%",
                textAlign: "justify",
              }}
            >
              Evolve Sangh Foundation is a Section 8 nonprofit dedicated to
              uplifting underprivileged youth in India. Our mission-driven
              programs cater to students who lack basic necessities, educational
              resources, or emotional support. Through grassroots initiatives
              like free food distribution in slums, midday meals in schools,
              stationery drives, and personalized career mentoring, we aim to
              break the cycle of poverty and despair. Our Youth Welfare Centers
              provide holistic care—including hostel food, coaching, mental
              wellness, and value-based education. Anchored in compassion and
              guided by purpose, we believe every young mind deserves the tools,
              support, and environment to thrive.
            </p>
            <Link
              href="/about-us"
              className="inline-block text-blue-400 hover:text-blue-600 font-semibold transition-colors"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "16px",
              }}
            >
              read more &gt;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
