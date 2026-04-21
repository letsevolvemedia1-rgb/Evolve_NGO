import { NextResponse } from "next/server";

import { validateDonationIntent, isDatabaseConfigured } from "@/lib/form-submissions";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured yet. Set DATABASE_URL and DIRECT_URL first." },
      { status: 503 },
    );
  }

  try {
    const payload = await request.json();
    const validation = validateDonationIntent(payload);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const campaign = validation.data.causeCode
      ? await prisma.campaign.findUnique({
          where: { causeCode: validation.data.causeCode },
          select: { id: true },
        })
      : null;

    await prisma.donationIntent.create({
      data: {
        donorName: validation.data.donorName,
        email: validation.data.email,
        phone: validation.data.phone,
        amountInr: validation.data.amountInr,
        dateOfBirth: validation.data.dateOfBirth,
        panNumber: validation.data.panNumber,
        country: validation.data.country,
        state: validation.data.state,
        city: validation.data.city,
        address: validation.data.address,
        pincode: validation.data.pincode,
        consentToContact: validation.data.consentToContact,
        campaignId: campaign?.id ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("donation-intents POST failed", error);
    return NextResponse.json({ error: "Unable to submit the form right now." }, { status: 500 });
  }
}
