"use client";

import { useEffect, useState, useRef } from "react";

type ContentEntry = {
  key: string;
  label: string;
  type: "TEXT" | "IMAGE" | "NUMBER";
  value: string;
  page: string;
  section: string;
};

const PAGE_LABELS: Record<string, string> = {
  "home": "Home",
  "about-us": "About Us",
  "activities/access-to-education": "Activities — Education",
  "activities/cloth-distribution": "Activities — Cloth Distribution",
  "activities/environment-care": "Activities — Environment Care",
  "activities/free-food-drive": "Activities — Free Food Drive",
  "activities/mental-wellness-program": "Activities — Mental Wellness",
  "activities/skill-development": "Activities — Skill Development",
  "activities/value-education-program": "Activities — Value Education",
  "activities/women-empowerment": "Activities — Women Empowerment",
  "activities/youth-welfare-centers": "Activities — Youth Welfare",
  "south-india-tour": "South India Tour",
  "south-india-yatra": "South India Yatra",
  "support-a-cause": "Support a Cause",
  "contact-us": "Contact Us",
  "join-us": "Join Us",
};

function ImageCard({ entry, onSaved }: { entry: ContentEntry; onSaved: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(entry.value);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setStatus("idle");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("key", entry.key);
    try {
      const res = await fetch("/api/admin/content/upload", { method: "POST", body: formData });
      const data = await res.json() as { url?: string };
      if (res.ok && data.url) {
        setPreviewUrl(data.url);
        setStatus("success");
        onSaved();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3 shadow-sm">
      <div className="text-xs text-gray-400 font-mono truncate">{entry.key}</div>
      <div className="font-semibold text-[#003056] text-sm leading-tight">{entry.label}</div>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt={entry.label}
            className="w-full h-full object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.3"; }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-xs">No image</div>
        )}
      </div>
      <div className="text-xs text-gray-400 truncate" title={previewUrl}>{previewUrl}</div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="w-full py-2 px-4 rounded-lg bg-[#0067A5] text-white text-sm font-semibold hover:bg-[#005089] disabled:opacity-50 transition-colors"
      >
        {uploading ? "Uploading…" : "📷 Upload New Image"}
      </button>
      {status === "success" && <p className="text-green-600 text-xs text-center font-medium">✓ Image updated!</p>}
      {status === "error" && <p className="text-red-600 text-xs text-center font-medium">✗ Upload failed. Try again.</p>}
    </div>
  );
}

function TextRow({ entry, onSaved }: { entry: ContentEntry; onSaved: () => void }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(entry.value);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSave() {
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: entry.key, value }),
      });
      if (res.ok) {
        setStatus("success");
        setEditing(false);
        onSaved();
        setTimeout(() => setStatus("idle"), 2500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <div className="font-semibold text-[#003056] text-sm">{entry.label}</div>
          <div className="text-xs text-gray-400 font-mono truncate">{entry.key}</div>
        </div>
        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium shrink-0 border border-blue-100">{entry.type}</span>
      </div>
      {editing ? (
        <div className="flex flex-col gap-2 mt-2">
          {entry.value.length > 100 ? (
            <textarea
              className="w-full border border-[#0077B6]/40 rounded-lg px-3 py-2 text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#0067A5] resize-y min-h-[80px]"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : (
            <input
              type={entry.type === "NUMBER" ? "number" : "text"}
              className="w-full border border-[#0077B6]/40 rounded-lg px-3 py-2 text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#0067A5]"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-1.5 rounded-lg bg-[#0067A5] text-white text-sm font-semibold hover:bg-[#005089] disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              onClick={() => { setEditing(false); setValue(entry.value); setStatus("idle"); }}
              className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
          {status === "success" && <p className="text-green-600 text-xs font-medium">✓ Saved!</p>}
          {status === "error" && <p className="text-red-600 text-xs font-medium">✗ Failed to save. Try again.</p>}
        </div>
      ) : (
        <div className="flex items-start justify-between gap-3 mt-2">
          <p className="text-sm text-gray-600 line-clamp-2 flex-1">{value}</p>
          <button
            onClick={() => setEditing(true)}
            className="shrink-0 px-3 py-1 rounded-lg border border-[#0067A5] text-[#0067A5] text-xs font-semibold hover:bg-[#0067A5] hover:text-white transition-colors"
          >
            Edit
          </button>
        </div>
      )}
      {status === "success" && !editing && <p className="text-green-600 text-xs font-medium mt-1">✓ Saved!</p>}
    </div>
  );
}

export function ContentSection() {
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [subTab, setSubTab] = useState<"images" | "text">("images");
  const [filterPage, setFilterPage] = useState<string>("all");

  async function fetchEntries() {
    try {
      const res = await fetch("/api/admin/content");
      const data = await res.json() as ContentEntry[];
      setEntries(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchEntries(); }, []);

  const pages = Array.from(new Set(entries.map((e) => e.page)));

  const filtered = entries.filter((e) => {
    const matchPage = filterPage === "all" || e.page === filterPage;
    const matchType = subTab === "images" ? e.type === "IMAGE" : e.type !== "IMAGE";
    return matchPage && matchType;
  });

  const grouped = filtered.reduce<Record<string, ContentEntry[]>>((acc, e) => {
    const key = `${PAGE_LABELS[e.page] ?? e.page} › ${e.section || "Other"}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(e);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#003056]">Content Manager</h2>
          <p className="text-sm text-gray-500 mt-1">Change images and edit text across all website pages.</p>
        </div>
        <select
          value={filterPage}
          onChange={(e) => setFilterPage(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0067A5]"
        >
          <option value="all">All Pages</option>
          {pages.map((p) => (
            <option key={p} value={p}>{PAGE_LABELS[p] ?? p}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-0 mb-6 border-b border-gray-200">
        {(["images", "text"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`px-5 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              subTab === t
                ? "border-[#0067A5] text-[#0067A5]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "images" ? "🖼️ Images" : "📝 Text & Numbers"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400 text-sm">Loading content…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">No {subTab} content for the selected filter.</div>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">{section}</h3>
              {subTab === "images" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {items.map((e) => <ImageCard key={e.key} entry={e} onSaved={fetchEntries} />)}
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((e) => <TextRow key={e.key} entry={e} onSaved={fetchEntries} />)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
