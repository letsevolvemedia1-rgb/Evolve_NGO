"use client";

import { useCallback, useEffect, useState } from "react";

import type { DonationStatus } from "@prisma/client";

import {
  DataTable,
  EMPTY_COMMON,
  FilterBar,
  PaginationBar,
  buildQueryString,
  formatDateTime,
  triggerDownload,
  type CommonFilters,
} from "../AdminPrimitives";

type DonationRow = {
  id: string;
  createdAt: string;
  donorName: string;
  email: string;
  phone: string;
  amountInr: number;
  campaignLabel: string | null;
  status: DonationStatus;
  city: string | null;
  state: string | null;
  consentToContact: boolean;
  campaign: { title: string; causeCode: string; slug: string } | null;
};

const STATUS_OPTIONS: { value: DonationStatus | ""; label: string }[] = [
  { value: "INTENT", label: "Intent" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "RECEIPT_PENDING", label: "Receipt pending" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const PAGE_SIZE = 25;

export function DonationsSection() {
  const [draft, setDraft] = useState<CommonFilters>(EMPTY_COMMON);
  const [applied, setApplied] = useState<CommonFilters>(EMPTY_COMMON);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<DonationRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    setError(null);
    const qs = buildQueryString({
      from: applied.from,
      to: applied.to,
      status: applied.status,
      q: applied.q,
      page,
      pageSize: PAGE_SIZE,
    });
    try {
      const res = await fetch(`/api/admin/data/donations?${qs}`);
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? `Request failed (${res.status})`);
      }
      const data = (await res.json()) as { rows: DonationRow[]; total: number };
      setRows(data.rows);
      setTotal(data.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load donations.");
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [applied, page]);

  useEffect(() => {
    void fetchRows();
  }, [fetchRows]);

  function handleApply() {
    setApplied(draft);
    setPage(1);
  }

  function handleReset() {
    setDraft(EMPTY_COMMON);
    setApplied(EMPTY_COMMON);
    setPage(1);
  }

  async function handleExport() {
    setExporting(true);
    try {
      const qs = buildQueryString({
        from: applied.from,
        to: applied.to,
        status: applied.status,
        q: applied.q,
      });
      triggerDownload(`/api/admin/export/donations?${qs}`);
    } finally {
      setTimeout(() => setExporting(false), 800);
    }
  }

  return (
    <section>
      <FilterBar
        filters={draft}
        onChange={setDraft}
        onApply={handleApply}
        onReset={handleReset}
        onExport={handleExport}
        exporting={exporting}
        statusOptions={STATUS_OPTIONS as { value: string; label: string }[]}
      />

      <DataTable
        loading={loading}
        error={error}
        rows={rows}
        columns={[
          { header: "Date", cell: (r) => formatDateTime(r.createdAt) },
          { header: "Donor", cell: (r) => r.donorName },
          { header: "Email", cell: (r) => r.email },
          { header: "Phone", cell: (r) => r.phone },
          {
            header: "Amount",
            cell: (r) => `₹${r.amountInr.toLocaleString("en-IN")}`,
            className: "text-right",
          },
          { header: "Campaign", cell: (r) => r.campaign?.title ?? r.campaignLabel ?? "—" },
          { header: "Status", cell: (r) => r.status },
          { header: "Location", cell: (r) => [r.city, r.state].filter(Boolean).join(", ") || "—" },
        ]}
      />

      <PaginationBar page={page} pageSize={PAGE_SIZE} total={total} onPage={setPage} />
    </section>
  );
}
