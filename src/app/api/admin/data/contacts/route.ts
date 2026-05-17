import { NextResponse } from "next/server";

import { parseContactFilters } from "@/lib/admin-filters";
import { isDatabaseConfigured } from "@/lib/form-submissions";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }

  const params = new URL(request.url).searchParams;
  const { where, pagination } = parseContactFilters(params);

  try {
    const [total, rows] = await Promise.all([
      prisma.contactSubmission.count({ where }),
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: pagination.skip,
        take: pagination.take,
      }),
    ]);

    return NextResponse.json({ total, page: pagination.page, pageSize: pagination.pageSize, rows });
  } catch (error) {
    console.error("admin/data/contacts failed", error);
    return NextResponse.json({ error: "Failed to load contacts." }, { status: 500 });
  }
}
