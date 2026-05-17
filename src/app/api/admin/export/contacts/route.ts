import { NextResponse } from "next/server";

import { CONTACT_COLUMNS, parseContactFilters } from "@/lib/admin-filters";
import { buildWorkbookBuffer, exportFilename } from "@/lib/excel-export";
import { isDatabaseConfigured } from "@/lib/form-submissions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const MAX_ROWS = 50000;

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }

  const params = new URL(request.url).searchParams;
  const { where } = parseContactFilters(params);

  try {
    const rows = await prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: MAX_ROWS,
    });

    const buffer = await buildWorkbookBuffer({
      sheetName: "Contacts",
      columns: CONTACT_COLUMNS,
      rows,
    });

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${exportFilename("contacts")}"`,
        "Cache-Control": "no-store",
        "X-Row-Count": String(rows.length),
        "X-Row-Limit": String(MAX_ROWS),
      },
    });
  } catch (error) {
    console.error("admin/export/contacts failed", error);
    return NextResponse.json({ error: "Failed to export contacts." }, { status: 500 });
  }
}
