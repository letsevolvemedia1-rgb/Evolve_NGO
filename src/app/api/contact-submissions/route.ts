import { NextResponse } from "next/server";

import { validateContactSubmission, isDatabaseConfigured } from "@/lib/form-submissions";
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
    const validation = validateContactSubmission(payload);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: validation.data,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact-submissions POST failed", error);
    return NextResponse.json({ error: "Unable to submit the form right now." }, { status: 500 });
  }
}
