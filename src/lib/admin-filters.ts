import "server-only";

import {
  type Prisma,
  DonationStatus,
  InquiryType,
  SubmissionStatus,
} from "@prisma/client";

import type { ExportColumn } from "@/lib/excel-export";

export const MAX_PAGE_SIZE = 200;
export const DEFAULT_PAGE_SIZE = 25;

function parseDate(value: string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function parseInt32(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

function parseSearchString(value: string | null): string {
  return (value ?? "").trim();
}

function dateRange(from: Date | null, to: Date | null) {
  const filter: { gte?: Date; lte?: Date } = {};
  if (from) filter.gte = from;
  if (to) {
    const end = new Date(to);
    end.setHours(23, 59, 59, 999);
    filter.lte = end;
  }
  return Object.keys(filter).length > 0 ? filter : undefined;
}

function parseDonationStatus(value: string | null): DonationStatus | null {
  if (!value) return null;
  const upper = value.toUpperCase();
  return (Object.values(DonationStatus) as string[]).includes(upper)
    ? (upper as DonationStatus)
    : null;
}

function parseSubmissionStatus(value: string | null): SubmissionStatus | null {
  if (!value) return null;
  const upper = value.toUpperCase();
  return (Object.values(SubmissionStatus) as string[]).includes(upper)
    ? (upper as SubmissionStatus)
    : null;
}

function parseInquiryType(value: string | null): InquiryType | null {
  if (!value) return null;
  const upper = value.toUpperCase();
  return (Object.values(InquiryType) as string[]).includes(upper)
    ? (upper as InquiryType)
    : null;
}

export type Pagination = { page: number; pageSize: number; skip: number; take: number };

function readPagination(params: URLSearchParams): Pagination {
  const page = parseInt32(params.get("page"), 1);
  const pageSizeRaw = parseInt32(params.get("pageSize"), DEFAULT_PAGE_SIZE);
  const pageSize = Math.min(Math.max(pageSizeRaw, 1), MAX_PAGE_SIZE);
  return { page, pageSize, skip: (page - 1) * pageSize, take: pageSize };
}

export function parseDonationFilters(params: URLSearchParams) {
  const from = parseDate(params.get("from"));
  const to = parseDate(params.get("to"));
  const status = parseDonationStatus(params.get("status"));
  const causeCode = parseSearchString(params.get("causeCode")) || null;
  const q = parseSearchString(params.get("q"));

  const AND: Prisma.DonationIntentWhereInput[] = [];
  const created = dateRange(from, to);
  if (created) AND.push({ createdAt: created });
  if (status) AND.push({ status });
  if (causeCode) AND.push({ campaign: { causeCode } });
  if (q) {
    AND.push({
      OR: [
        { donorName: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { phone: { contains: q } },
      ],
    });
  }

  const where: Prisma.DonationIntentWhereInput = AND.length > 0 ? { AND } : {};
  const pagination = readPagination(params);

  return { where, pagination };
}

export function parseContactFilters(params: URLSearchParams) {
  const from = parseDate(params.get("from"));
  const to = parseDate(params.get("to"));
  const status = parseSubmissionStatus(params.get("status"));
  const q = parseSearchString(params.get("q"));

  const AND: Prisma.ContactSubmissionWhereInput[] = [];
  const created = dateRange(from, to);
  if (created) AND.push({ createdAt: created });
  if (status) AND.push({ status });
  if (q) {
    AND.push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { phone: { contains: q } },
      ],
    });
  }

  const where: Prisma.ContactSubmissionWhereInput = AND.length > 0 ? { AND } : {};
  const pagination = readPagination(params);

  return { where, pagination };
}

export function parseInquiryFilters(params: URLSearchParams) {
  const from = parseDate(params.get("from"));
  const to = parseDate(params.get("to"));
  const status = parseSubmissionStatus(params.get("status"));
  const type = parseInquiryType(params.get("type"));
  const q = parseSearchString(params.get("q"));

  const AND: Prisma.EngagementInquiryWhereInput[] = [];
  const created = dateRange(from, to);
  if (created) AND.push({ createdAt: created });
  if (status) AND.push({ status });
  if (type) AND.push({ type });
  if (q) {
    AND.push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { phone: { contains: q } },
      ],
    });
  }

  const where: Prisma.EngagementInquiryWhereInput = AND.length > 0 ? { AND } : {};
  const pagination = readPagination(params);

  return { where, pagination };
}

export const DONATION_STATUSES = Object.values(DonationStatus);
export const SUBMISSION_STATUSES = Object.values(SubmissionStatus);
export const INQUIRY_TYPES = Object.values(InquiryType);

export type DonationRow = Prisma.DonationIntentGetPayload<{
  include: { campaign: { select: { title: true; causeCode: true; slug: true } } };
}>;

export type ContactRow = Prisma.ContactSubmissionGetPayload<Record<string, never>>;
export type InquiryRow = Prisma.EngagementInquiryGetPayload<Record<string, never>>;

export const DONATION_COLUMNS: ExportColumn<DonationRow>[] = [
  { header: "Created", key: "createdAt", width: 20, numFmt: "yyyy-mm-dd hh:mm", value: (r) => r.createdAt },
  { header: "Donor Name", key: "donorName", width: 24, value: (r) => r.donorName },
  { header: "Email", key: "email", width: 28, value: (r) => r.email },
  { header: "Phone", key: "phone", width: 18, value: (r) => r.phone },
  { header: "Amount (INR)", key: "amountInr", width: 14, numFmt: "#,##0", value: (r) => r.amountInr },
  { header: "Campaign", key: "campaignLabel", width: 22, value: (r) => r.campaign?.title ?? r.campaignLabel ?? "" },
  { header: "Cause Code", key: "causeCode", width: 16, value: (r) => r.campaign?.causeCode ?? "" },
  { header: "Status", key: "status", width: 16, value: (r) => r.status },
  { header: "PAN", key: "panNumber", width: 14, value: (r) => r.panNumber ?? "" },
  { header: "Date of Birth", key: "dateOfBirth", width: 14, numFmt: "yyyy-mm-dd", value: (r) => r.dateOfBirth ?? "" },
  { header: "Country", key: "country", width: 14, value: (r) => r.country },
  { header: "State", key: "state", width: 16, value: (r) => r.state ?? "" },
  { header: "City", key: "city", width: 16, value: (r) => r.city ?? "" },
  { header: "Address", key: "address", width: 32, value: (r) => r.address ?? "" },
  { header: "Pincode", key: "pincode", width: 10, value: (r) => r.pincode ?? "" },
  { header: "Consent to Contact", key: "consentToContact", width: 12, value: (r) => (r.consentToContact ? "Yes" : "No") },
  { header: "Source Page", key: "sourcePage", width: 22, value: (r) => r.sourcePage },
  { header: "Notes", key: "notes", width: 30, value: (r) => r.notes ?? "" },
];

export const CONTACT_COLUMNS: ExportColumn<ContactRow>[] = [
  { header: "Created", key: "createdAt", width: 20, numFmt: "yyyy-mm-dd hh:mm", value: (r) => r.createdAt },
  { header: "Name", key: "name", width: 24, value: (r) => r.name },
  { header: "Email", key: "email", width: 28, value: (r) => r.email },
  { header: "Phone", key: "phone", width: 18, value: (r) => r.phone },
  { header: "Message", key: "message", width: 50, value: (r) => r.message },
  { header: "Status", key: "status", width: 14, value: (r) => r.status },
  { header: "Source Page", key: "sourcePage", width: 22, value: (r) => r.sourcePage },
];

export const INQUIRY_COLUMNS: ExportColumn<InquiryRow>[] = [
  { header: "Created", key: "createdAt", width: 20, numFmt: "yyyy-mm-dd hh:mm", value: (r) => r.createdAt },
  { header: "Type", key: "type", width: 14, value: (r) => r.type },
  { header: "Name", key: "name", width: 24, value: (r) => r.name },
  { header: "Email", key: "email", width: 28, value: (r) => r.email },
  { header: "Phone", key: "phone", width: 18, value: (r) => r.phone },
  { header: "Message", key: "message", width: 50, value: (r) => r.message ?? "" },
  { header: "Status", key: "status", width: 14, value: (r) => r.status },
  { header: "Source Page", key: "sourcePage", width: 22, value: (r) => r.sourcePage },
];
