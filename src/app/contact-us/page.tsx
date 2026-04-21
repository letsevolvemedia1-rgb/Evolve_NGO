"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "Unable to submit the form right now.");
      }

      setFormData({ name: "", phone: "", email: "", message: "" });
      setStatus({ type: "success", message: "Thank you. Our team will get back to you shortly." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit the form right now.";
      setStatus({ type: "error", message });
    } finally {
      setCaptchaToken(null);
      setCaptchaResetKey((prev) => prev + 1);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full bg-white font-sans text-slate-800">
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[#0067A5] uppercase tracking-wide">
            Get In Touch
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="space-y-12">
            <div>
              <h2 className="text-xl font-bold text-slate-900 uppercase mb-3">
                For Corporate Partnerships
              </h2>
              <div className="text-base text-slate-600 space-y-1">
                <p>Vishant - <span className="font-semibold">9151050779</span></p>
                <a href="mailto:Info@Evolve.Org" className="text-[#0067A5] hover:underline">
                  Info@Evolve.Org
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 uppercase mb-3">
                Donation Related Queries
                <br />
                <span className="text-lg text-slate-700">For New Donors</span>
              </h2>
              <div className="text-base text-slate-600 space-y-1">
                <p>Prakarsh - <span className="font-semibold">9151050780</span></p>
                <a href="mailto:Info@Evolve.Org" className="text-[#0067A5] hover:underline">
                  Info@Evolve.Org
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 uppercase mb-4">
                Visit Us Here
              </h2>

              <div className="mb-6">
                <h3 className="text-base font-bold text-slate-800 uppercase mb-2">Head Office</h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  3rd Floor, 13 Avantipuram, Kalyanpur, Kanpur - 208024
                  <br />
                  <span className="font-semibold">Phone:</span> +91-9151050780, +91-9151050778
                  <br />
                  <span className="font-semibold">Email:</span> Info@Evolve.Org
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 uppercase mb-2">Regd. Office:</h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  233D- Lakhanpur Housing Society, Awadhpuri, Kanpur - 208024
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 uppercase mb-3">
                Help desk
              </h2>
              <p className="text-slate-600">
                For any grievance, suggestions and queries kindly write to us.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-500">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0067A5] focus:border-[#0067A5] transition-colors placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-500">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder=""
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0067A5] focus:border-[#0067A5] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-500">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0067A5] focus:border-[#0067A5] transition-colors placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-500">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#0067A5] focus:border-[#0067A5] transition-colors placeholder:text-slate-400 resize-none"
                />
              </div>

              <TurnstileWidget onTokenChange={setCaptchaToken} resetKey={captchaResetKey} />

              <Button
                type="submit"
                disabled={isSubmitting || !captchaToken}
                className="w-full bg-black hover:bg-slate-800 text-white font-bold py-6 rounded-sm uppercase tracking-wider text-sm transition-all"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>

              {status.type !== "idle" && (
                <p className={`text-sm ${status.type === "success" ? "text-green-700" : "text-red-600"}`}>
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
