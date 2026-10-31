"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Compass, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Users, 
  BookOpen, 
  Sparkles, 
  Phone, 
  Mail, 
  Download, 
  ChevronRight, 
  Clock,
  Award,
  Bus,
  HeartHandshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Participating Colleges and their respective coordinators
const collegeCoordinators = [
  {
    college: "IIT BHU (Indian Institute of Technology, Varanasi)",
    code: "IIT-BHU",
    coordinator: "Campus Coordinator",
    role: "Campus Coordinator",
    phone: "+91 91510 50780",
    email: "iitbhu.coordinator@evolvesangh.org",
  },
  {
    college: "IIIT Lucknow (Indian Institute of Information Technology)",
    code: "IIIT-L",
    coordinator: "Campus Coordinator",
    role: "Campus Coordinator",
    phone: "+91 91510 50781",
    email: "iiitl.coordinator@evolvesangh.org",
  },
  {
    college: "HBTU Kanpur (Harcourt Butler Technical University)",
    code: "HBTU",
    coordinator: "Aditya Sharma",
    role: "Student Coordinator",
    phone: "+91 91510 50782",
    email: "aditya.hbtu@evolvesangh.org",
  },
  {
    college: "KNIT Sultanpur (Kamla Nehru Institute of Technology)",
    code: "KNIT",
    coordinator: "Campus Coordinator",
    role: "Campus Coordinator",
    phone: "+91 91510 50783",
    email: "knit.coordinator@evolvesangh.org",
  },
  {
    college: "IIT Guwahati (Indian Institute of Technology Guwahati)",
    code: "IITG",
    coordinator: "Campus Coordinator",
    role: "Campus Coordinator",
    phone: "+91 91510 50784",
    email: "iitg.coordinator@evolvesangh.org",
  },
  {
    college: "Other Colleges / Universities",
    code: "OTHER",
    coordinator: "Vishant & Prakarsh",
    role: "Central Tour Coordinators",
    phone: "+91 91510 50780",
    email: "letsevolve.official@gmail.com",
  },
];

// Selection & Tour Flow
const flowSteps = [
  {
    step: "01",
    title: "Register Online",
    badge: "Step 1",
    icon: <BookOpen className="w-6 h-6 text-[#0067A5]" />,
    desc: "Fill in your college details, academic info, and personal statement on this registration portal.",
  },
  {
    step: "02",
    title: "Selection Test",
    badge: "Step 2",
    icon: <Award className="w-6 h-6 text-[#FFA500]" />,
    desc: "A short written/online evaluation on Indian culture, heritage awareness, and personal values.",
  },
  {
    step: "03",
    title: "Shortlisting",
    badge: "Step 3",
    icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
    desc: "Eligible students are shortlisted based on test performance and college participation quota.",
  },
  {
    step: "04",
    title: "Coordinator Contact",
    badge: "Step 4",
    icon: <Users className="w-6 h-6 text-[#00BCD4]" />,
    desc: "Respective college coordinators reach out for verification, itinerary briefing, and packing guide.",
  },
  {
    step: "05",
    title: "Tour Flag-off 🚌",
    badge: "Step 5",
    icon: <Bus className="w-6 h-6 text-[#0067A5]" />,
    desc: "Board the tour bus with fellow students, embark on the sacred trail across historic South India.",
  },
  {
    step: "06",
    title: "Memories & Values 🌸",
    badge: "Step 6",
    icon: <Sparkles className="w-6 h-6 text-[#FFA500]" />,
    desc: "Return enriched with lifetime friendships, spiritual depth, and timeless cultural insights.",
  },
];

// Sacred destinations featured in the Tour
const destinations = [
  {
    name: "Madurai",
    tagline: "The Ancient Athens of the East",
    highlights: ["Meenakshi Sundareswarar Temple", "Sculptural Marvel of Dravidian Art", "Night Temple Procession"],
    bg: "from-amber-900/80 to-slate-900/90",
  },
  {
    name: "Rameshwaram",
    tagline: "Sacred Island of The Ramayana",
    highlights: ["Ramanathaswamy 1,000-Pillar Hall", "Agni Theertham Holy Dip", "Dr. APJ Abdul Kalam Memorial"],
    bg: "from-blue-900/80 to-slate-900/90",
  },
  {
    name: "Kanyakumari",
    tagline: "Confluence of Three Oceans",
    highlights: ["Vivekananda Rock Memorial", "Thiruvalluvar Giant Statue", "Triveni Sangam Sunrise Meditation"],
    bg: "from-teal-900/80 to-slate-900/90",
  },
  {
    name: "Thanjavur & Srirangam",
    tagline: "Cradle of Great Chola Heritage",
    highlights: ["Brihadisvara UNESCO Temple", "Grand Vimana Architecture", "Ranganathaswamy Temple Complex"],
    bg: "from-orange-950/80 to-slate-900/90",
  },
];

// Past Tour Memories
const glimpses = [
  {
    image: "/HeritageWalk/hero-tour.jpg",
    title: "The Majestic Gopuram of Madurai",
    subtitle: "Students arriving at the historic Dravidian temple entrance during golden hour.",
  },
  {
    image: "/HeritageWalk/glimpse-students.jpg",
    title: "Joy of Shared Heritage",
    subtitle: "College delegation bonding in the stone courtyard of ancient temple corridors.",
  },
  {
    image: "/HeritageWalk/glimpse-corridor.jpg",
    title: "1,000 Pillars of Serenity",
    subtitle: "A silent morning walk through sacred corridors where history meets devotion.",
  },
  {
    image: "/HeritageWalk/glimpse-kanyakumari.jpg",
    title: "Dawn at Vivekananda Rock",
    subtitle: "Contemplating life, vision, and patriotism at India's southernmost ocean sanctuary.",
  },
];



export default function HeritageWalkPage() {
  const formRef = useRef<HTMLDivElement>(null);

  // Form state (Exclusively for male college students)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "IIT BHU (Indian Institute of Technology, Varanasi)",
    otherCollege: "",
    courseYear: "B.Tech - 2nd Year",
    rollNumber: "",
    city: "Kanpur",
    address: "",
    motivation: "",
    consentAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<{
    id: string;
    date: string;
    name: string;
    college: string;
  } | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const chosenCollege =
      formData.college === "Other" && formData.otherCollege
        ? formData.otherCollege
        : formData.college;

    try {
      const response = await fetch("/api/heritage-walk-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          college: chosenCollege,
          courseYear: formData.courseYear,
          rollNumber: formData.rollNumber,
          city: formData.city,
          address: formData.address,
          motivation: formData.motivation,
          consentAccepted: formData.consentAccepted,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit registration. Please try again.");
      }

      setRegistrationSuccess({
        id: result.registrationId,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        name: formData.fullName,
        college: chosenCollege,
      });

      // Scroll to confirmation box
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full bg-[#f8fafc] text-slate-800 font-sans">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        <Image
          src="/HeritageWalk/hero-tour.jpg"
          alt="The Heritage Walk - South India Tour"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 transform scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Ambient Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-20 text-center flex flex-col items-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0067A5]/80 backdrop-blur-md border border-[#00BCD4]/40 text-[#C8E8FF] text-xs md:text-sm font-semibold tracking-widest uppercase mb-6 shadow-lg">
            <Compass className="w-4 h-4 text-[#00BCD4] animate-spin-slow" />
            Evolve Sangh Foundation Presents
          </div>

          <h1
            className="font-league-gothic text-5xl md:text-8xl tracking-wider uppercase text-white drop-shadow-md max-w-4xl"
            style={{ lineHeight: 0.95 }}
          >
            The Heritage Walk
          </h1>
          <p className="font-heading text-xl md:text-3xl uppercase tracking-widest text-[#FFA500] mt-3 mb-6 font-semibold">
            South India Tour | Journey of Culture & Brotherhood
          </p>

          <p
            className="text-slate-200 text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-10"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            An extraordinary travel tour for college students to explore the timeless spiritual,
            architectural, and cultural wonders of South India. Travel together, bond with peers from
            across universities, and awaken the wisdom of our ancient heritage.
          </p>

          {/* Quick Info Tags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl mb-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-lg p-3 text-center">
              <span className="block text-[#FFA500] text-xs uppercase tracking-wider font-bold">Destination</span>
              <span className="text-sm md:text-base font-semibold text-white">Madurai & Rameshwaram</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-lg p-3 text-center">
              <span className="block text-[#00BCD4] text-xs uppercase tracking-wider font-bold">Highlight</span>
              <span className="text-sm md:text-base font-semibold text-white">Kanyakumari Dawn</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-lg p-3 text-center">
              <span className="block text-green-400 text-xs uppercase tracking-wider font-bold">Eligibility</span>
              <span className="text-sm md:text-base font-semibold text-white">Boys (College Students)</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-lg p-3 text-center">
              <span className="block text-[#C8E8FF] text-xs uppercase tracking-wider font-bold">Process</span>
              <span className="text-sm md:text-base font-semibold text-white">Test & Selection</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant="warning"
              size="lg"
              onClick={() => scrollToSection("register")}
              className="text-base px-8 py-6 font-bold shadow-xl hover:scale-105 transition-all text-black"
            >
              Register for the Tour
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("flow")}
              className="border-white/40 text-white hover:bg-white/15 text-base px-6 py-6"
            >
              How It Works & Stepper
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => scrollToSection("coordinators")}
              className="text-[#C8E8FF] hover:text-white hover:bg-white/10 text-base"
            >
              View College Coordinators →
            </Button>
          </div>
        </div>
      </section>

      {/* ── 2. TOUR OVERVIEW SECTION ── */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0067A5] bg-[#C8E8FF]/40 px-3 py-1 rounded-full">
              Sacred Heritage Expedition
            </span>
            <h2 className="section-title mt-4 mb-4">Why The Heritage Walk?</h2>
            <div className="w-20 h-1 bg-[#0067A5] mx-auto mb-6" />
            <p
              className="text-slate-600 text-lg leading-relaxed"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Beyond textbooks and campus routines lies a living civilization of monumental architecture,
              sacred devotion, and profound wisdom. The Heritage Walk is not just a sightseeing tour — it is
              a transformative pilgrimage designed to ignite purpose, camaraderie, and cultural pride in youth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#0067A5] hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-xl bg-[#0067A5] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl uppercase font-bold text-slate-900 mb-3 tracking-wide">
                Sacred Living Heritage
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Step into thousand-year-old stone corridors, witness living traditions of Ramanathaswamy and
                Meenakshi temples, and decipher the geometry of world-renowned Dravidian art.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#FFA500] hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-xl bg-[#FFA500] text-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl uppercase font-bold text-slate-900 mb-3 tracking-wide">
                Inter-College Brotherhood
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Travel alongside passionate students from IIT BHU, IIIT Lucknow, HBTU Kanpur, KNIT Sultanpur, and IIT Guwahati. Form
                unbreakable bonds, share ideas, and create memories on overnight bus journeys and temple walks.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#00BCD4] hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-xl bg-[#00BCD4] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl uppercase font-bold text-slate-900 mb-3 tracking-wide">
                Values, Reflection & Peace
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Experience sunrise meditations at the confluence of oceans in Kanyakumari, engaging satsangs,
                mindful discussions on leadership, and spiritual rejuvenation away from screen fatigue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. REGISTRATION & SELECTION FLOW (STEPPER) ── */}
      <section id="flow" className="py-16 md:py-24 bg-[#f1f5f9] border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0067A5] bg-[#C8E8FF]/60 px-3 py-1 rounded-full">
              Fair & Transparent Admission
            </span>
            <h2 className="section-title mt-4 mb-4">Registration & Selection Flow</h2>
            <div className="w-20 h-1 bg-[#0067A5] mx-auto mb-6" />
            <p className="text-slate-600 text-lg">
              Here is the exact journey from the moment you submit your form to packing your bags for South India:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {flowSteps.map((item, index) => (
              <div
                key={item.step}
                className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                    {item.badge}
                  </span>
                  <span className="font-league-gothic text-3xl text-slate-300 font-bold">
                    {item.step}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg uppercase font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* Progress arrow indicator on desktop */}
                {index < flowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Flow Pipeline Summary Strip */}
          <div className="mt-12 p-4 md:p-6 bg-[#003056] text-white rounded-xl flex flex-wrap items-center justify-center gap-2 md:gap-4 text-center font-heading text-sm md:text-base uppercase tracking-wider">
            <span>Register</span>
            <span className="text-[#FFA500]">→</span>
            <span>Selection Test</span>
            <span className="text-[#FFA500]">→</span>
            <span>Shortlisting</span>
            <span className="text-[#FFA500]">→</span>
            <span>Coordinator Contact</span>
            <span className="text-[#FFA500]">→</span>
            <span className="text-amber-400 font-bold">Tour 🚌</span>
            <span className="text-[#FFA500]">→</span>
            <span className="text-pink-300 font-bold">Memories 🌸</span>
          </div>
        </div>
      </section>

      {/* ── 4. GLIMPSES FROM LAST YEAR'S TOUR (PHOTO GALLERY) ── */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0067A5] bg-[#C8E8FF]/40 px-3 py-1 rounded-full">
              Memories From Previous Edition
            </span>
            <h2 className="section-title mt-4 mb-4">Glimpses of Last Year's Tour</h2>
            <div className="w-20 h-1 bg-[#0067A5] mx-auto mb-6" />
            <p className="text-slate-600 text-lg">
              Catch a glimpse of the joy, contemplation, and grandeur experienced by our student delegations on the last Tour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {glimpses.map((item, idx) => (
              <div
                key={idx}
                className="group relative h-[340px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-100"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="font-heading text-xl md:text-2xl uppercase tracking-wide font-bold mb-1 text-[#FFA500]">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-200 leading-relaxed font-light">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Participant Testimonial Banner */}
          <div className="mt-12 bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#0067A5] text-white flex items-center justify-center shrink-0 font-league-gothic text-3xl">
              HW
            </div>
            <div className="space-y-1 text-center md:text-left">
              <p className="text-slate-700 italic text-base md:text-lg">
                &ldquo;Walking inside the Rameshwaram corridors at 5 AM with 40 peers from different colleges,
                chanting and meditating together, completely changed how I look at our heritage and my own focus as a student.&rdquo;
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#0067A5]">
                — Shaurya K., B.Tech Final Year (Previous Tour Delegate)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. COLLEGE COORDINATORS DIRECTORY ── */}
      <section id="coordinators" className="py-16 md:py-24 bg-[#f8fafc] border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0067A5] bg-[#C8E8FF]/60 px-3 py-1 rounded-full">
              Local Campus Support
            </span>
            <h2 className="section-title mt-4 mb-4">College Coordinators Directory</h2>
            <div className="w-20 h-1 bg-[#0067A5] mx-auto mb-6" />
            <p className="text-slate-600 text-lg">
              Each participating college has a dedicated coordinator to help you with the selection test,
              answer questions, and coordinate your campus delegation.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0067A5] text-white text-xs uppercase font-heading tracking-wider">
                  <th className="py-4 px-6">Participating College / University</th>
                  <th className="py-4 px-6">Coordinator Name</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">WhatsApp / Phone</th>
                  <th className="py-4 px-6">Email Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {collegeCoordinators.map((c) => (
                  <tr key={c.code} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">{c.college}</td>
                    <td className="py-4 px-6 font-medium">{c.coordinator}</td>
                    <td className="py-4 px-6">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#C8E8FF]/40 text-[#0067A5] font-semibold">
                        {c.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-800">{c.phone}</td>
                    <td className="py-4 px-6 text-[#0067A5] hover:underline">
                      <a href={`mailto:${c.email}`}>{c.email}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {collegeCoordinators.map((c) => (
              <div key={c.code} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900 text-base">{c.college}</h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#C8E8FF]/50 text-[#0067A5]">
                    {c.code}
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-medium">
                  {c.coordinator} <span className="text-xs text-slate-400">({c.role})</span>
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-col gap-1 text-xs">
                  <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-[#0067A5]" />
                    {c.phone}
                  </a>
                  <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 text-[#0067A5]">
                    <Mail className="w-3.5 h-3.5 text-[#0067A5]" />
                    {c.email}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Help box for non-listed colleges */}
          <div className="p-4 md:p-6 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-amber-950 text-sm md:text-base">
                Studying in another institution or want to nominate a campus coordinator?
              </h4>
              <p className="text-xs md:text-sm text-amber-800">
                You can still register directly below! Select &ldquo;Other College&rdquo; or contact Central Coordinator Vishant at +91 9151050779.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollToSection("register")}
              className="border-amber-400 text-amber-900 hover:bg-amber-100"
            >
              Register Now
            </Button>
          </div>
        </div>
      </section>

      {/* ── 6. REGISTRATION FORM SECTION ── */}
      <section id="register" ref={formRef} className="py-16 md:py-24 bg-white scroll-mt-12">
        <div className="container mx-auto px-4 md:px-12 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FFA500] bg-orange-100 px-3 py-1 rounded-full">
              Apply Now
            </span>
            <h2 className="section-title mt-4 mb-4">Register For South India Tour</h2>
            <div className="w-20 h-1 bg-[#FFA500] mx-auto mb-6" />
            <p className="text-slate-600 text-base md:text-lg">
              Fill in your details accurately to register. You will receive your Selection Test details and confirmation upon submission.
            </p>
          </div>

          {/* SUCCESS SLIP STATE */}
          {registrationSuccess ? (
            <div className="bg-gradient-to-br from-slate-50 to-emerald-50/40 rounded-2xl p-8 md:p-12 border-2 border-emerald-500/40 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-league-gothic text-4xl uppercase text-slate-900 tracking-wide">
                  Registration Successful!
                </h3>
                <p className="text-slate-600 text-sm md:text-base mt-2">
                  Welcome aboard, <strong className="text-slate-900">{registrationSuccess.name}</strong>!
                  Your registration for The Heritage Walk has been recorded.
                </p>
              </div>

              {/* Printable Registration Slip Box */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-lg mx-auto text-left shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-widest">
                    Registration ID
                  </span>
                  <span className="font-mono text-sm md:text-base font-bold text-[#0067A5]">
                    {registrationSuccess.id}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
                  <div>
                    <span className="text-slate-400 block">Candidate Name</span>
                    <span className="font-semibold text-slate-800">{registrationSuccess.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">College</span>
                    <span className="font-semibold text-slate-800">{registrationSuccess.college}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Date of Application</span>
                    <span className="font-semibold text-slate-800">{registrationSuccess.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Status</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>

              {/* Next steps advice */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 text-xs md:text-sm max-w-lg mx-auto text-left space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#0067A5]" /> Next Step: Selection Test Notification
                </p>
                <p className="text-blue-800 leading-relaxed">
                  Your designated College Coordinator will reach out with the test link/schedule and guidelines.
                  Save your Registration ID for reference.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <Button
                  variant="outline"
                  onClick={() => window.print()}
                  className="flex items-center gap-2 border-slate-300"
                >
                  <Download className="w-4 h-4" /> Print / Save Slip
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    setRegistrationSuccess(null);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      college: "IIT BHU (Indian Institute of Technology, Varanasi)",
                      otherCollege: "",
                      courseYear: "B.Tech - 2nd Year",
                      rollNumber: "",
                      city: "Kanpur",
                      address: "",
                      motivation: "",
                      consentAccepted: false,
                    });
                  }}
                >
                  Register Another Participant
                </Button>
              </div>
            </div>
          ) : (
            /* ACTIVE REGISTRATION FORM */
            <form
              onSubmit={handleSubmit}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-10 shadow-sm space-y-6"
            >
              <div className="border-b border-slate-200 pb-4 mb-6">
                <h3 className="font-heading text-xl uppercase font-bold text-slate-900">
                  Candidate Information Form
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  All fields marked with <span className="text-red-500">*</span> are mandatory for test eligibility.
                </p>
                <div className="mt-3 px-3 py-1.5 rounded-lg bg-blue-50/80 border border-blue-200/80 text-[11px] md:text-xs text-blue-900 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0067A5]" />
                  Cohort Notice: This Tour edition is organized exclusively for male college students (boys only).
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0067A5] text-sm"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Email Address (For Test Link) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0067A5] text-sm"
                  />
                </div>

                {/* WhatsApp Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0067A5] text-sm"
                  />
                </div>

                {/* Hometown / City */}
                <div className="space-y-1.5">
                  <label htmlFor="city" className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Hometown / Current City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="e.g. Kanpur, Lucknow, Varanasi, Prayagraj"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0067A5] text-sm"
                  />
                </div>

                {/* College Selection */}
                <div className="space-y-1.5 md:col-span-2">
                  <label htmlFor="college" className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Participating College / University <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="college"
                    name="college"
                    required
                    value={formData.college}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0067A5] text-sm"
                  >
                    <option value="IIT BHU (Indian Institute of Technology, Varanasi)">
                      IIT BHU (Indian Institute of Technology, Varanasi)
                    </option>
                    <option value="IIIT Lucknow (Indian Institute of Information Technology)">
                      IIIT Lucknow (Indian Institute of Information Technology)
                    </option>
                    <option value="HBTU Kanpur (Harcourt Butler Technical University)">
                      HBTU Kanpur (Harcourt Butler Technical University)
                    </option>
                    <option value="KNIT Sultanpur (Kamla Nehru Institute of Technology)">
                      KNIT Sultanpur (Kamla Nehru Institute of Technology)
                    </option>
                    <option value="IIT Guwahati (Indian Institute of Technology Guwahati)">
                      IIT Guwahati (Indian Institute of Technology Guwahati)
                    </option>
                    <option value="Other">Others / Not Listed (Specify below)</option>
                  </select>
                </div>

                {/* Other College Text Field (Appears only if Other is chosen) */}
                {formData.college === "Other" && (
                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="otherCollege" className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                      Specify College Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="otherCollege"
                      name="otherCollege"
                      type="text"
                      required
                      placeholder="Enter the full name of your college and campus"
                      value={formData.otherCollege}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0067A5] text-sm"
                    />
                  </div>
                )}

                {/* Course & Year */}
                <div className="space-y-1.5">
                  <label htmlFor="courseYear" className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Course & Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="courseYear"
                    name="courseYear"
                    type="text"
                    required
                    placeholder="e.g. B.Tech 3rd Year / BCA 2nd Year"
                    value={formData.courseYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0067A5] text-sm"
                  />
                </div>

                {/* Roll Number / Student ID */}
                <div className="space-y-1.5">
                  <label htmlFor="rollNumber" className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Roll Number / College ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="rollNumber"
                    name="rollNumber"
                    type="text"
                    required
                    placeholder="Official Student Roll No"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0067A5] text-sm"
                  />
                </div>

                {/* Current / Hostel Address */}
                <div className="space-y-1.5 md:col-span-2">
                  <label htmlFor="address" className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Current / Hostel Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Hostel Name, Room No / Residential Local Address, City, Pincode"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0067A5] text-sm"
                  />
                </div>

                {/* Motivation / Personal statement */}
                <div className="space-y-1.5 md:col-span-2">
                  <label htmlFor="motivation" className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Why do you want to join The Heritage Walk South India Tour?
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    rows={3}
                    placeholder="Briefly share your interest in Indian culture, personal growth, or spiritual exploration..."
                    value={formData.motivation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0067A5] text-sm resize-none"
                  />
                </div>
              </div>

              {/* Consent and terms checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentAccepted"
                    checked={formData.consentAccepted}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded text-[#0067A5] border-slate-300 focus:ring-[#0067A5] mt-1"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I confirm that the details provided are accurate. I commit to appearing for the selection test
                    and abiding by the dignity, code of conduct, and guidelines of the South India Tour.
                  </span>
                </label>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs md:text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 text-base font-bold uppercase tracking-wider bg-[#0067A5] hover:bg-[#005089] text-white shadow-lg transition-all"
              >
                {isSubmitting ? "Submitting Registration..." : "Submit Registration for Selection Test"}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* ── 7. ASSISTANCE & HELPLINE ── */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-12 max-w-4xl">
          {/* Contact Helpline Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
            <h3 className="font-heading text-xl uppercase font-bold text-slate-900">
              Need assistance or have questions regarding registration?
            </h3>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Our Central Student Coordinators are available on call and WhatsApp to assist you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-sm font-semibold">
              <a
                href="tel:+919151050780"
                className="flex items-center gap-2 text-[#0067A5] hover:underline"
              >
                <Phone className="w-4 h-4" /> +91 91510 50780 (Prakarsh)
              </a>
              <a
                href="tel:+919151050779"
                className="flex items-center gap-2 text-[#0067A5] hover:underline"
              >
                <Phone className="w-4 h-4" /> +91 91510 50779 (Vishant)
              </a>
              <a
                href="mailto:letsevolve.official@gmail.com"
                className="flex items-center gap-2 text-slate-700 hover:underline"
              >
                <Mail className="w-4 h-4 text-[#FFA500]" /> letsevolve.official@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
