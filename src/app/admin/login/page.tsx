"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = (await res.json().catch(() => null)) as { error?: string } | null;

      if (!res.ok) {
        setError(data?.error ?? "Login failed.");
        setSubmitting(false);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-md bg-white rounded-xl border border-[#0077B6]/20 p-8"
        style={{ boxShadow: "0px 0px 7px 0px #00000040" }}
      >
        <h1 className="section-title text-left" style={{ fontSize: 40 }}>
          Admin Login
        </h1>
        <p
          className="mt-2 mb-6 text-[#003056]"
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 14,
            lineHeight: "160%",
          }}
        >
          Sign in to view and export submission data.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-[#003056] font-heading text-sm uppercase tracking-wide"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-[#0077B6]/40 px-3 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#0067A5]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-[#003056] font-heading text-sm uppercase tracking-wide"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-[#0077B6]/40 px-3 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#0067A5]"
            />
          </div>

          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
