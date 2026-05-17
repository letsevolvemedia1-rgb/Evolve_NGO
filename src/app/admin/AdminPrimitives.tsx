"use client";

import { type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CommonFilters = {
  from: string;
  to: string;
  status: string;
  q: string;
};

export const EMPTY_COMMON: CommonFilters = { from: "", to: "", status: "", q: "" };

type FilterBarProps = {
  filters: CommonFilters;
  onChange: (next: CommonFilters) => void;
  onApply: () => void;
  onReset: () => void;
  onExport: () => void;
  exporting: boolean;
  statusOptions: { value: string; label: string }[];
  extraSelect?: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (next: string) => void;
  };
};

const inputCls =
  "rounded-md border border-[#0077B6]/40 bg-white px-3 py-2 text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#0067A5]";

const labelCls =
  "block mb-1 text-[11px] uppercase tracking-wide text-[#003056] font-heading";

export function FilterBar({
  filters,
  onChange,
  onApply,
  onReset,
  onExport,
  exporting,
  statusOptions,
  extraSelect,
}: FilterBarProps) {
  return (
    <form
      className="bg-white rounded-lg border border-[#0077B6]/20 p-4 md:p-5 mb-6"
      style={{ boxShadow: "0px 0px 7px 0px #00000040" }}
      onSubmit={(e) => {
        e.preventDefault();
        onApply();
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="from" className={labelCls}>From date</label>
          <input
            id="from"
            type="date"
            value={filters.from}
            onChange={(e) => onChange({ ...filters, from: e.target.value })}
            className={cn(inputCls, "w-full")}
          />
        </div>
        <div>
          <label htmlFor="to" className={labelCls}>To date</label>
          <input
            id="to"
            type="date"
            value={filters.to}
            onChange={(e) => onChange({ ...filters, to: e.target.value })}
            className={cn(inputCls, "w-full")}
          />
        </div>
        <div>
          <label htmlFor="status" className={labelCls}>Status</label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className={cn(inputCls, "w-full")}
          >
            <option value="">All</option>
            {statusOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        {extraSelect ? (
          <div>
            <label htmlFor="extra" className={labelCls}>{extraSelect.label}</label>
            <select
              id="extra"
              value={extraSelect.value}
              onChange={(e) => extraSelect.onChange(e.target.value)}
              className={cn(inputCls, "w-full")}
            >
              <option value="">All</option>
              {extraSelect.options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label htmlFor="q" className={labelCls}>Search</label>
            <input
              id="q"
              type="search"
              placeholder="Name, email or phone"
              value={filters.q}
              onChange={(e) => onChange({ ...filters, q: e.target.value })}
              className={cn(inputCls, "w-full")}
            />
          </div>
        )}
        {extraSelect ? (
          <div className="lg:col-span-1">
            <label htmlFor="q" className={labelCls}>Search</label>
            <input
              id="q"
              type="search"
              placeholder="Name, email or phone"
              value={filters.q}
              onChange={(e) => onChange({ ...filters, q: e.target.value })}
              className={cn(inputCls, "w-full")}
            />
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button type="submit">Apply filters</Button>
        <Button type="button" variant="outline" onClick={onReset}>
          Reset
        </Button>
        <div className="flex-1" />
        <Button
          type="button"
          variant="warning"
          onClick={onExport}
          disabled={exporting}
        >
          {exporting ? "Preparing Excel…" : "Download Excel"}
        </Button>
      </div>
    </form>
  );
}

type ColumnDef<T> = {
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

type DataTableProps<T extends { id: string }> = {
  columns: ColumnDef<T>[];
  rows: T[];
  loading: boolean;
  error: string | null;
};

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  loading,
  error,
}: DataTableProps<T>) {
  return (
    <div
      className="bg-white rounded-lg border border-[#0077B6]/20 overflow-hidden"
      style={{ boxShadow: "0px 0px 7px 0px #00000040" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#0067A5] text-white">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.header}
                  className={cn(
                    "text-left font-heading uppercase tracking-wide text-xs px-3 py-3 whitespace-nowrap",
                    c.className,
                  )}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-8 text-center text-[#003056]">
                  Loading…
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-8 text-center text-red-600">
                  {error}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-8 text-center text-[#003056]/70">
                  No records match the current filters.
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-t border-[#0077B6]/15 align-top",
                    i % 2 === 1 ? "bg-[#f5f7fb]" : "bg-white",
                  )}
                >
                  {columns.map((c) => (
                    <td
                      key={c.header}
                      className={cn(
                        "px-3 py-2 text-[#171717] whitespace-pre-wrap",
                        c.className,
                      )}
                    >
                      {c.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type PaginationBarProps = {
  page: number;
  pageSize: number;
  total: number;
  onPage: (next: number) => void;
};

export function PaginationBar({ page, pageSize, total, onPage }: PaginationBarProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[#003056]">
      <span>
        Showing <strong>{start}</strong>–<strong>{end}</strong> of <strong>{total}</strong>
      </span>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          Previous
        </Button>
        <span>
          Page <strong>{page}</strong> / {totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export function formatDateTime(value: string | Date | null | undefined) {
  if (!value) return "";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} ${hh}:${mm}`;
}

export function buildQueryString(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    sp.set(k, String(v));
  }
  return sp.toString();
}

export function triggerDownload(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.rel = "noopener";
  a.click();
}
