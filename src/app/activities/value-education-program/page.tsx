import Image from "next/image";
import { StoriesOfChange } from "@/components/sections/youth-welfare/StoriesOfChange";

const principles = [
  {
    label: "IQ (Intelligence Quotient)",
    icon: "/ValueEducation/iq-icon.png",
    points: ["Logical thinking", "Problem-solving", "Decision making"],
  },
  {
    label: "EQ (Emotional Quotient)",
    icon: "/ValueEducation/eq-icon.png",
    points: ["Emotional strength", "Empathy", "Relationship skills", "Resilience"],
  },
  {
    label: "SQ (Spiritual Quotient)",
    icon: "/ValueEducation/sq-icon.png",
    points: ["Purpose & ethics", "Values", "Inner peace", "Mindfulness"],
  },
];

const whatWeDoPoints = [
  "Self–discipline & determination",
  "Better focus & habit of deep learning",
  "Strong willpower & consistency",
  "Ability to manage time effectively",
  "Healthy emotional balance",
  "Habit of making responsible choices",
  "Ways to overcome social media & mobile addiction",
  "Courage to face failure & bounce back strong",
  "Gratitude, empathy & positive attitude towards life",
];

const impactPoints = [
  "More focused and goal–oriented",
  "Emotionally stable and confident",
  "Disciplined and consistent in studies & life",
  "Aware of values, ethics, and responsibilities",
  "Capable of handling failures, stress & social pressure",
];

const focusLeft = [
  "Building strong determination & self-discipline",
  "Developing good habits & consistency",
  "Enhancing focus & attention span",
  "Overcoming procrastination & distractions",
];

const focusRight = [
  "Managing emotions, stress & failure",
  "Reducing mobile & social media dependency",
  "Cultivating values like empathy, gratitude & honesty",
  "Strengthening students for future leadership roles",
];

const testimonials = [
  {
    name: "Awadhesh Yadav",
    image: "/ValueEducation/Awadhesh_Yadav.png",
    quote:
      "The value education sessions helped me become more honest, kind, and responsible in my daily life, both at school and at home.",
  },
  {
    name: "Madhu Srivastava",
    image: "/ValueEducation/Madhu_Srivastava.png",
    quote:
      "Because of value education, I now think before reacting, listen to others with respect, and try to help classmates instead of making fun of them.",
  },
  {
    name: "Mriduta Chaturvedi",
    image: "/ValueEducation/Mriduta_Chaturvedi.png",
    quote:
      "My story of change began when I applied these values in real situations — now I handle conflicts peacefully, manage my time better, and feel more confident about my future.",
  },
];

export default function ValueEducationProgramPage() {
  return (
    <main className="bg-white">
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <section className="relative w-full h-[380px] md:h-[520px] lg:h-[677px] overflow-hidden">
        <Image
          src="/ValueEducation/bannerImg.png"
          alt="Value Education Program — Students at Evolve"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* white box with text — bottom-left corner */}
        <div className="absolute bottom-4 md:bottom-8 lg:bottom-12 left-0 bg-white inline-flex flex-col items-center justify-center px-6 py-4 md:px-[40px] md:py-[20px] lg:px-[50px] lg:py-[25px]">
          <p
            className="uppercase text-center tracking-[2px] md:tracking-[3px]"
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(22px, 4vw, 45px)",
              color: "#3db5d8",
              lineHeight: "1.1",
              marginBottom: "4px",
            }}
          >
            Let&apos;s Build a
          </p>
          <p
            className="uppercase text-center"
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px, 5vw, 55px)",
              color: "#004476",
              lineHeight: "1.1",
            }}
          >
            Value–Driven Generation
          </p>
        </div>
      </section>

      {/* ── Value Education Program Title + Description ──────────── */}
      <section className="py-12 md:py-18 bg-white">
        <h2 className="section-title mb-8">Value Education Program</h2>
        <div
          className="mx-auto px-6 md:px-16 lg:px-0 max-w-[1000px]"
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "1.6",
            color: "#333",
            textAlign: "left",
          }}
        >
          <p className="mb-1 text-gray-800">
            Nurturing Character, Discipline &amp; Purpose in the Next Generation
          </p>
          <p className="mb-1">
            The youth of today are growing up in an era of constant distraction, emotional stress, rapidly changing social influences, and technology-driven lifestyles. While academic knowledge is important, the ability to manage emotions, stay disciplined, make ethical decisions, and maintain focus is equally essential for success in life.
          </p>
          <p className="mb-1">
            Sadly, many young minds are struggling with lack of concentration, procrastination, peer pressure, mobile addiction, stress, and confusion about life goals. To guide them towards a balanced, meaningful, and successful life, Evolve Sangh Foundation runs the Value Education Program, specially designed for students from class 6 to 12.
          </p>
          <p className="mb-0">
            Our aim is to shape students into confident, emotionally strong, self-disciplined, and value-driven individuals who can lead themselves and society with clarity and integrity.
          </p>
        </div>
      </section>

      {/* ── Our Core Principle ───────────────────────────────────── */}
      <section className="pt-8 pb-0 bg-white">
        <h2 className="section-title mb-6">Our Core Principle</h2>
        <p
          className="text-center mb-6 px-4"
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            color: "#333",
          }}
        >
          We Focus On Enhancing Three Essential Human Qualities In Every Student:
        </p>

        {/* Blue principle bar */}
        <div className="bg-[#0060a8] py-8 px-4 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
            {principles.map((p) => (
              <div 
                key={p.label} 
                className="flex flex-col bg-[#fcf8ef] rounded-[8px] p-5 lg:p-6 shadow-sm"
              >
                <p
                  className="uppercase text-center text-black mb-4 tracking-tight"
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                >
                  {p.label}
                </p>
                
                <div className="flex flex-row items-center justify-center gap-6">
                  {/* icon */}
                  <div className="relative w-[50px] h-[50px] flex-shrink-0">
                    <Image
                      src={p.icon}
                      alt={p.label}
                      fill
                      className="object-contain"
                      sizes="50px"
                    />
                  </div>
                  
                  {/* points list */}
                  <ul className="text-left text-black list-disc space-y-1">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="capitalize"
                        style={{
                          fontFamily: "'Open Sans', sans-serif",
                          fontWeight: 400,
                          fontSize: "15px",
                          lineHeight: "1.5",
                        }}
                      >
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote banner */}
        <div className="bg-[#0060a8] border-t border-white/30 py-4 px-6 text-center">
          <p
            className="text-white/90 max-w-[1100px] mx-auto tracking-wide"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 300,
              fontSize: "16px",
            }}
          >
            We Believe True Education Is Not Only About Acquiring Knowledge — It Is About Building A Strong Mind, Compassionate Heart, And Purposeful Soul.
          </p>
        </div>
      </section>

      {/* ── What We Do ───────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-white">
        <h2 className="section-title mb-10">What We Do</h2>
        <div className="w-full px-6 md:px-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start max-w-[1100px] mx-auto">
          {/* text */}
          <div
            className="flex-1"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "1.6",
              color: "#333",
              textAlign: "left",
            }}
          >
            <p className="mb-4">
              Our Value Education sessions are structured with a practical and engaging approach including workshops, classroom sessions, real-life examples, habit-building practices, and student activities.<br />
              Through our program, students learn to develop:
            </p>
            <ul className="list-disc ml-5 space-y-1 mb-6 text-gray-800">
              {whatWeDoPoints.map((pt) => (
                <li key={pt} className="pl-1">{pt}</li>
              ))}
            </ul>
            <p>
              This initiative helps students build a strong foundation of values, character, and inner strength — preparing them not only for academic success, but for life.
            </p>
          </div>

          {/* image */}
          <div className="flex-shrink-0 w-full lg:w-[360px]">
            <div className="relative w-full lg:w-[360px] h-[300px] lg:h-[400px] rounded-[16px] overflow-hidden shadow-md">
              <Image
                src="/ValueEducation/ImgInnexttopara.png"
                alt="Value Education classroom session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 360px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact ───────────────────────────────────────────────── */}
      <section className="bg-[#005fa5] py-12 px-6 md:px-16 lg:px-24">
        <h2 className="section-title !text-white mb-8">Impact</h2>
        <div
          className="max-w-[968px] mx-auto text-white"
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "160%",
          }}
        >
          <p className="mb-3">Through this program, students become:</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            {impactPoints.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
          <p>They evolve into responsible, capable, value–driven future leaders.</p>
        </div>
      </section>

      {/* ── Our Focus ────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <h2 className="section-title mb-12">Our Focus</h2>
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3 max-w-[1200px] mx-auto">
            <ul
              className="list-disc list-inside space-y-3"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 600,
                fontSize: "19px",
                color: "#202020",
              }}
            >
              {focusLeft.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <ul
              className="list-disc list-inside space-y-3"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 600,
                fontSize: "19px",
                color: "#202020",
              }}
            >
              {focusRight.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <StoriesOfChange 
        title="STORIES OF CHANGE" 
        stories={testimonials.map((t, i) => ({
          id: `ve-story-${i}`,
          name: t.name,
          quote: `"${t.quote}"`,
          image: t.image
        }))} 
      />

    </main>
  );
}
