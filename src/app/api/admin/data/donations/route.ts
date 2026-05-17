import { NextResponse } from "next/server";

import { parseDonationFilters } from "@/lib/admin-filters";
import { isDatabaseConfigured } from "@/lib/form-submissions";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }

  const params = new URL(request.url).searchParams;
  const { where, pagination } = parseDonationFilters(params);

  try {
    const [total, rows] = await Promise.all([
      prisma.donationIntent.count({ where }),
      prisma.donationIntent.findMany({
        where,
        include: { campaign: { select: { title: true, causeCode: true, slug: true } } },
        orderBy: { createdAt: "desc" },
        skip: pagination.skip,
        take: pagination.take,
      }),
    ]);

    return NextResponse.json({ total, page: pagination.page, pageSize: pagination.pageSize, rows });
  } catch (error) {
    console.error("admin/data/donations failed", error);
    return NextResponse.json({ error: "Failed to load donations." }, { status: 500 });
  }
}
