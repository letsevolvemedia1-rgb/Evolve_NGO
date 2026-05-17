"use client";

import { useCallback, useEffect, useState } from "react";

import type { SubmissionStatus } from "@prisma/client";

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

type ContactRow = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: SubmissionStatus;
  sourcePage: string;
};

const STATUS_OPTIONS: { value: SubmissionStatus; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "IN_REVIEW", label: "In review" },
  { value: "CLOSED", label: "Closed" },
  { value: "SPAM", label: "Spam" },
];

const PAGE_SIZE = 25;

export function ContactsSection() {
  const [draft, setDraft] = useState<CommonFilters>(EMPTY_COMMON);
  const [applied, setApplied] = useState<CommonFilters>(EMPTY_COMMON);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<ContactRow[]>([]);
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
      const res = await fetch(`/api/admin/data/contacts?${qs}`);
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? `Request failed (${res.status})`);
      }
      const data = (await res.json()) as { rows: ContactRow[]; total: number };
      setRows(data.rows);
      setTotal(data.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load contacts.");
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
      triggerDownload(`/api/admin/export/contacts?${qs}`);
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
        statusOptions={STATUS_OPTIONS}
      />

      <DataTable
        loading={loading}
        error={error}
        rows={rows}
        columns={[
          { header: "Date", cell: (r) => formatDateTime(r.createdAt) },
          { header: "Name", cell: (r) => r.name },
          { header: "Email", cell: (r) => r.email },
          { header: "Phone", cell: (r) => r.phone },
          { header: "Message", cell: (r) => r.message, className: "max-w-md" },
          { header: "Status", cell: (r) => r.status },
        ]}
      />

      <PaginationBar page={page} pageSize={PAGE_SIZE} total={total} onPage={setPage} />
    </section>
  );
}
