import { NextResponse } from "next/server";

export type HeritageWalkRegistrationPayload = {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  courseYear: string;
  rollNumber: string;
  city: string;
  address?: string;
  motivation: string;
  consentAccepted: boolean;
};

// User's deployed Google Apps Script Webhook
const DEFAULT_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzIQp0FDCxLm9SoKEsZ17Sd7PLtXxyScE1kKgMKzrSFgf1FFs3fz19mYUN7fR9rQX-u/exec";

function generateRegistrationId(): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const timestamp = Date.now().toString().slice(-4);
  return `HW-TOUR-${timestamp}-${randomSuffix}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{7,20}$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<HeritageWalkRegistrationPayload>;

    const fullName = (body.fullName ?? "").trim();
    const email = (body.email ?? "").trim().toLowerCase();
    const phone = (body.phone ?? "").trim();
    const college = (body.college ?? "").trim();
    const courseYear = (body.courseYear ?? "").trim();
    const rollNumber = (body.rollNumber ?? "").trim();
    const city = (body.city ?? "").trim();
    const address = (body.address ?? "").trim();
    const motivation = (body.motivation ?? "").trim();
    const consentAccepted = Boolean(body.consentAccepted);

    // Validation (Exclusively for male college students)
    if (!fullName || !email || !phone || !college || !courseYear || !rollNumber) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Email, WhatsApp Phone, College, Course/Year, Roll Number)." },
        { status: 400 },
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!PHONE_RE.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit WhatsApp/phone number." },
        { status: 400 },
      );
    }

    if (!consentAccepted) {
      return NextResponse.json(
        { error: "Please agree to the Tour code of conduct and selection test commitment." },
        { status: 400 },
      );
    }

    const registrationId = generateRegistrationId();
    const registeredAt = new Date().toISOString();

    // Data payload for Google Sheets (Row columns)
    const rowData = {
      registrationId,
      registeredAt,
      fullName,
      email,
      phone,
      college,
      courseYear,
      rollNumber,
      gender: "Male",
      city: city || "Not Specified",
      address: address || "Not Specified",
      motivation: motivation || "Eager to explore Indian heritage, spirituality, and culture.",
    };

    // Google Sheets Integration
    const webhookUrl =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL ||
      DEFAULT_WEBHOOK_URL;

    let sheetSyncStatus = "not_configured";

    if (webhookUrl) {
      try {
        const sheetResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rowData),
          redirect: "follow",
        });

        if (sheetResponse.ok) {
          sheetSyncStatus = "synced";
        } else {
          sheetSyncStatus = "webhook_error";
          console.warn("Google Sheets webhook returned status:", sheetResponse.status);
        }
      } catch (webhookErr) {
        sheetSyncStatus = "network_error";
        console.error("Failed to post to Google Sheets webhook:", webhookErr);
      }
    }

    return NextResponse.json({
      ok: true,
      registrationId,
      registeredAt,
      message: "Registration successful! Your selection test details will be shared soon.",
      data: {
        fullName,
        email,
        phone,
        college,
        courseYear,
        rollNumber,
      },
    });
  } catch (error) {
    console.error("Heritage Walk Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong while submitting your registration. Please try again." },
      { status: 500 },
    );
  }
}
