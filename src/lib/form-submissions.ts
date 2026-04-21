import "server-only";

import { InquiryType } from "@prisma/client";

type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export type ContactSubmissionInput = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export type EngagementInquiryInput = {
  type: InquiryType;
  name: string;
  email: string;
  phone: string;
  message: string | null;
};

export type DonationIntentInput = {
  causeCode: string | null;
  donorName: string;
  email: string;
  phone: string;
  amountInr: number;
  dateOfBirth: Date | null;
  panNumber: string | null;
  country: string;
  state: string | null;
  city: string | null;
  address: string | null;
  pincode: string | null;
  consentToContact: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{7,20}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const PINCODE_RE = /^[0-9]{4,10}$/;

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readOptionalString(value: unknown) {
  const normalized = readString(value);
  return normalized.length > 0 ? normalized : null;
}

function validateEmail(email: string) {
  return EMAIL_RE.test(email);
}

function validatePhone(phone: string) {
  return PHONE_RE.test(phone);
}

function parsePositiveAmount(value: unknown) {
  const raw = readString(value).replace(/,/g, "");
  if (!raw) return null;

  const amount = Number(raw);
  if (!Number.isFinite(amount) || amount <= 0) return null;

  return Math.round(amount);
}

function parseDate(value: unknown) {
  const raw = readString(value);
  if (!raw) return null;

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return "invalid";
  return parsed;
}

function parseInquiryType(value: unknown): InquiryType | null {
  const raw = readString(value).toUpperCase();
  if (
    raw === InquiryType.VOLUNTEER ||
    raw === InquiryType.INTERNSHIP ||
    raw === InquiryType.CORPORATE ||
    raw === InquiryType.DONATION ||
    raw === InquiryType.OTHER
  ) {
    return raw;
  }

  return null;
}

export function isDatabaseConfigured() {
  const url = process.env.DATABASE_URL;
  return Boolean(url && !url.includes("[YOUR-PASSWORD]"));
}

export function validateContactSubmission(payload: unknown): ValidationResult<ContactSubmissionInput> {
  const input = payload as Record<string, unknown>;
  const name = readString(input?.name);
  const phone = readString(input?.phone);
  const email = readString(input?.email).toLowerCase();
  const message = readString(input?.message);

  if (!name || !phone || !email || !message) {
    return { ok: false, error: "All fields are required." };
  }

  if (!validatePhone(phone)) {
    return { ok: false, error: "Enter a valid phone number." };
  }

  if (!validateEmail(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  return { ok: true, data: { name, phone, email, message } };
}

export function validateEngagementInquiry(payload: unknown): ValidationResult<EngagementInquiryInput> {
  const input = payload as Record<string, unknown>;
  const type = parseInquiryType(input?.interest);
  const name = readString(input?.name);
  const email = readString(input?.email).toLowerCase();
  const phone = readString(input?.phone);
  const message = readOptionalString(input?.message);

  if (!type || !name || !phone || !email) {
    return { ok: false, error: "Name, email, phone, and area of interest are required." };
  }

  if (!validatePhone(phone)) {
    return { ok: false, error: "Enter a valid phone number." };
  }

  if (!validateEmail(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  return { ok: true, data: { type, name, email, phone, message } };
}

export function validateDonationIntent(payload: unknown): ValidationResult<DonationIntentInput> {
  const input = payload as Record<string, unknown>;
  const causeCode = readOptionalString(input?.causeCode)?.toLowerCase() ?? null;
  const donorName = readString(input?.donorName);
  const email = readString(input?.email).toLowerCase();
  const phone = readString(input?.phone);
  const amountInr = parsePositiveAmount(input?.amountInr);
  const dob = parseDate(input?.dateOfBirth);
  const panNumber = readOptionalString(input?.panNumber)?.toUpperCase() ?? null;
  const country = readString(input?.country) || "India";
  const state = readOptionalString(input?.state);
  const city = readOptionalString(input?.city);
  const address = readOptionalString(input?.address);
  const pincode = readOptionalString(input?.pincode);
  const consentToContact = Boolean(input?.consentToContact);

  if (!donorName || !email || !phone || !amountInr) {
    return { ok: false, error: "Name, email, phone, and amount are required." };
  }

  if (!validatePhone(phone)) {
    return { ok: false, error: "Enter a valid phone number." };
  }

  if (!validateEmail(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  if (dob === "invalid") {
    return { ok: false, error: "Enter a valid date of birth." };
  }

  if (panNumber && !PAN_RE.test(panNumber)) {
    return { ok: false, error: "Enter a valid PAN number." };
  }

  if (pincode && !PINCODE_RE.test(pincode)) {
    return { ok: false, error: "Enter a valid pincode." };
  }

  return {
    ok: true,
    data: {
      causeCode,
      donorName,
      email,
      phone,
      amountInr,
      dateOfBirth: dob,
      panNumber,
      country,
      state,
      city,
      address,
      pincode,
      consentToContact,
    },
  };
}
