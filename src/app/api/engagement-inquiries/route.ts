import { NextResponse } from "next/server";

import { validateEngagementInquiry, isDatabaseConfigured } from "@/lib/form-submissions";
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
    const validation = validateEngagementInquiry(payload);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    await prisma.engagementInquiry.create({
      data: validation.data,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("engagement-inquiries POST failed", error);
    return NextResponse.json({ error: "Unable to submit the form right now." }, { status: 500 });
  }
}
