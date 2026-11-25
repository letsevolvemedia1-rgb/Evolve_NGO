"use client";

import { useEffect, useState } from "react";

type PageEntry = {
  key: string;
  label: string;
  enabled: boolean;
};

function Toggle({
  enabled,
  onChange,
  loading,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  loading: boolean;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      disabled={loading}
      role="switch"
      aria-checked={enabled}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0067A5] focus:ring-offset-2 ${
        enabled ? "bg-[#0067A5]" : "bg-gray-300"
      } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export function PagesSection() {
  const [pages, setPages] = useState<PageEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingKey, setTogglingKey] = useState<string | null>(null);
  const [flash, setFlash] = useState<{ key: string; ok: boolean } | null>(null);

  async function fetchPages() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pages");
      const data = (await res.json()) as Record<string, { label: string; enabled: boolean }>;
      setPages(
        Object.entries(data).map(([key, v]) => ({ key, label: v.label, enabled: v.enabled }))
      );
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchPages(); }, []);

  async function handleToggle(pageKey: string, enabled: boolean) {
    setTogglingKey(pageKey);
    setFlash(null);
    try {
      const res = await fetch("/api/admin/pages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey, enabled }),
      });
      if (res.ok) {
        setPages((prev) =>
          prev.map((p) => (p.key === pageKey ? { ...p, enabled } : p))
        );
        setFlash({ key: pageKey, ok: true });
      } else {
        setFlash({ key: pageKey, ok: false });
      }
    } catch {
      setFlash({ key: pageKey, ok: false });
    } finally {
      setTogglingKey(null);
      setTimeout(() => setFlash(null), 2500);
    }
  }

  const homePages = pages.filter((p) => p.key === "home");
  const activityPages = pages.filter((p) => p.key.startsWith("activities/"));
  const otherPages = pages.filter((p) => p.key !== "home" && !p.key.startsWith("activities/"));

  function PageRow({ page }: { page: PageEntry }) {
    const isToggling = togglingKey === page.key;
    const msg = flash?.key === page.key ? flash : null;

    return (
      <div className="flex items-center justify-between py-3 px-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              page.enabled ? "bg-green-500" : "bg-gray-300"
            }`}
          />
          <div className="min-w-0">
            <div className="font-medium text-[#003056] text-sm">{page.label}</div>
            <div className="text-xs text-gray-400 font-mono truncate">/{page.key}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-4">
          {msg && (
            <span
              className={`text-xs font-medium ${
                msg.ok ? "text-green-600" : "text-red-600"
              }`}
            >
              {msg.ok ? "✓ Saved" : "✗ Failed"}
            </span>
          )}
          <span className="text-xs text-gray-500 w-7 text-right">
            {page.enabled ? "ON" : "OFF"}
          </span>
          <Toggle
            enabled={page.enabled}
            onChange={(v) => handleToggle(page.key, v)}
            loading={isToggling}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#003056]">Page Visibility</h2>
        <p className="text-sm text-gray-500 mt-1">
          Turn any page on or off. Disabled pages redirect visitors back to the home page.
        </p>
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
          <strong>⚠️ Important:</strong> After toggling a page, restart the dev server for changes to take effect (the middleware reads env vars on startup).
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400 text-sm">Loading pages…</div>
      ) : (
        <div className="space-y-6">
          {homePages.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Main</h3>
              <div className="space-y-2">
                {homePages.map((p) => <PageRow key={p.key} page={p} />)}
              </div>
            </div>
          )}
          {activityPages.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Activity Pages</h3>
              <div className="space-y-2">
                {activityPages.map((p) => <PageRow key={p.key} page={p} />)}
              </div>
            </div>
          )}
          {otherPages.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Other Pages</h3>
              <div className="space-y-2">
                {otherPages.map((p) => <PageRow key={p.key} page={p} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
