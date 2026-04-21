import { NextResponse } from "next/server";

import { validateDonationIntent, isDatabaseConfigured } from "@/lib/form-submissions";
import { prisma } from "@/lib/prisma";

const campaignMetadata: Record<
  string,
  { slug: string; title: string; formTitle: string }
> = {
  education: {
    slug: "siksha-na-ruke",
    title: "SIKSHA NA RUKE",
    formTitle: "DONATE TO SUPPORT EDUCATION",
  },
  food: {
    slug: "hunger-free-night",
    title: "HUNGER FREE NIGHT",
    formTitle: "DONATE TO SUPPORT FOOD",
  },
  future: {
    slug: "tyari-kal-ki",
    title: "TYARI KAL KI",
    formTitle: "DONATE TO SUPPORT FUTURE",
  },
};

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

    const campaignConfig = validation.data.causeCode
      ? campaignMetadata[validation.data.causeCode]
      : null;

    const campaign =
      validation.data.causeCode && campaignConfig
        ? await prisma.campaign.upsert({
            where: { causeCode: validation.data.causeCode },
            update: {
              slug: campaignConfig.slug,
              title: campaignConfig.title,
              formTitle: campaignConfig.formTitle,
            },
            create: {
              causeCode: validation.data.causeCode,
              slug: campaignConfig.slug,
              title: campaignConfig.title,
              formTitle: campaignConfig.formTitle,
            },
            select: { id: true, title: true },
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
        campaignLabel: campaign?.title ?? campaignConfig?.title ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("donation-intents POST failed", error);
    return NextResponse.json({ error: "Unable to submit the form right now." }, { status: 500 });
  }
}
