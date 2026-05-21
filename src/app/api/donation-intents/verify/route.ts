import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

import { DonationStatus } from "@prisma/client";

import { isDatabaseConfigured } from "@/lib/form-submissions";
import { prisma } from "@/lib/prisma";

type VerifyPayload = {
  donationIntentId?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  donorName?: string;
  email?: string;
  panNumber?: string;
  campaignTitle?: string;
  amountInr?: number;
};

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a, "utf8");
  const bBuffer = Buffer.from(b, "utf8");
  if (aBuffer.length !== bBuffer.length) {
    timingSafeEqual(aBuffer, aBuffer);
    return false;
  }
  return timingSafeEqual(aBuffer, bBuffer);
}

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Razorpay is not configured yet. Set RAZORPAY_KEY_SECRET first." },
      { status: 503 },
    );
  }

  try {
    const payload = (await request.json()) as VerifyPayload;
    const donationIntentId = readString(payload.donationIntentId);
    const orderId = readString(payload.razorpay_order_id);
    const paymentId = readString(payload.razorpay_payment_id);
    const signature = readString(payload.razorpay_signature);

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: "Missing payment verification details." },
        { status: 400 },
      );
    }

    const digest = createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (!safeEqual(signature, digest)) {
      return NextResponse.json(
        { error: "Payment verification failed. Invalid signature." },
        { status: 400 },
      );
    }

    const amountInr = readNumber(payload.amountInr);
    const donorName = readString(payload.donorName);
    const email = readString(payload.email).toLowerCase();
    const panNumber = readString(payload.panNumber).toUpperCase();
    const campaignTitle = readString(payload.campaignTitle);

    if (isDatabaseConfigured() && donationIntentId) {
      try {
        await prisma.donationIntent.update({
          where: { id: donationIntentId },
          data: {
            status: DonationStatus.COMPLETED,
            notes: `razorpay_order_id:${orderId}; razorpay_payment_id:${paymentId}; razorpay_signature:${signature}`,
          },
        });
      } catch (dbError) {
        console.error("donation-intents verify DB update failed (non-blocking)", dbError);
      }
    }

    return NextResponse.json({
      ok: true,
      slip: {
        status: "SUCCESS",
        paymentId,
        orderId,
        amountInr: amountInr && amountInr > 0 ? Math.round(amountInr) : null,
        donorName: donorName || null,
        email: email || null,
        panNumber: panNumber || null,
        campaignTitle: campaignTitle || "Support a Cause",
        paidAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("donation-intents verify failed", error);
    return NextResponse.json(
      { error: "Unable to verify payment right now." },
      { status: 500 },
    );
  }
}
