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

function isRazorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

export async function POST(request: Request) {
  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      { error: "Razorpay is not configured yet. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET first." },
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
    let persistedCampaignTitle: string | null = null;

    const razorpayAuth = Buffer.from(
      `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`,
    ).toString("base64");
    const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${razorpayAuth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: validation.data.amountInr * 100,
        currency: "INR",
        receipt: `don_${Date.now()}`,
        notes: {
          donorName: validation.data.donorName,
          causeCode: validation.data.causeCode ?? "general",
          email: validation.data.email,
          phone: validation.data.phone,
        },
      }),
    });

    const orderPayload = (await orderResponse.json()) as {
      id?: string;
      amount?: number;
      currency?: string;
      error?: { description?: string };
    };

    if (!orderResponse.ok || !orderPayload.id || !orderPayload.amount || !orderPayload.currency) {
      const errorMessage =
        orderPayload.error?.description ?? "Unable to create Razorpay order right now.";
      return NextResponse.json({ error: errorMessage }, { status: 502 });
    }

    if (isDatabaseConfigured()) {
      try {
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
        persistedCampaignTitle = campaign?.title ?? null;

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
      } catch (dbError) {
        console.error("donation-intents DB write failed (non-blocking)", dbError);
      }
    }

    return NextResponse.json({
      ok: true,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      orderId: orderPayload.id,
      amount: orderPayload.amount,
      currency: orderPayload.currency,
      campaignTitle: persistedCampaignTitle ?? campaignConfig?.title ?? "Support a Cause",
    });
  } catch (error) {
    console.error("donation-intents POST failed", error);
    return NextResponse.json({ error: "Unable to submit the form right now." }, { status: 500 });
  }
}
