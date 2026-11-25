"use client";

import { useState } from "react";

export function SettingsSection({ username }: { username: string }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ ok: false, text: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ ok: false, text: "New password must be at least 6 characters." });
      return;
    }
    if (!newUsername.trim()) {
      setMessage({ ok: false, text: "Username cannot be empty." });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newUsername: newUsername.trim(), newPassword }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (res.ok) {
        setMessage({ ok: true, text: data.message ?? "Credentials updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ ok: false, text: data.error ?? "Failed to update credentials." });
      }
    } catch {
      setMessage({ ok: false, text: "Network error. Please try again." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#003056]">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Change your admin login credentials.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
        <div>
          <label className="block mb-1.5 text-[#003056] font-semibold text-sm uppercase tracking-wide">
            Current Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-lg border border-[#0077B6]/40 px-3 py-2 text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#0067A5]"
            placeholder="Enter your current password"
          />
        </div>

        <hr className="border-gray-100" />

        <div>
          <label className="block mb-1.5 text-[#003056] font-semibold text-sm uppercase tracking-wide">
            New Username
          </label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full rounded-lg border border-[#0077B6]/40 px-3 py-2 text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#0067A5]"
          />
          <p className="text-xs text-gray-400 mt-1">Leave as-is to keep your current username.</p>
        </div>

        <div>
          <label className="block mb-1.5 text-[#003056] font-semibold text-sm uppercase tracking-wide">
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-[#0077B6]/40 px-3 py-2 text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#0067A5]"
            placeholder="Minimum 6 characters"
          />
        </div>

        <div>
          <label className="block mb-1.5 text-[#003056] font-semibold text-sm uppercase tracking-wide">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-[#0077B6]/40 px-3 py-2 text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#0067A5]"
            placeholder="Repeat new password"
          />
        </div>

        {message && (
          <div
            className={`rounded-lg px-4 py-3 text-sm font-medium border ${
              message.ok
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2.5 rounded-lg bg-[#0067A5] text-white font-bold hover:bg-[#005089] disabled:opacity-50 transition-colors"
        >
          {saving ? "Saving…" : "Update Credentials"}
        </button>
      </form>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 leading-relaxed">
        <strong>⚠️ Note:</strong> After changing credentials, you must restart the dev server and log in again with your new username and password.
      </div>
    </div>
  );
}
