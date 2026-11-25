import { NextResponse, type NextRequest } from "next/server";
import { readPageVisibility, writePageVisibility } from "@/lib/content";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const pages = readPageVisibility();
  return NextResponse.json(pages);
}

export async function PATCH(req: NextRequest) {
  const { pageKey, enabled } = (await req.json()) as { pageKey: string; enabled: boolean };
  if (!pageKey || typeof enabled !== "boolean") {
    return NextResponse.json({ error: "Missing pageKey or enabled" }, { status: 400 });
  }
  const ok = writePageVisibility(pageKey, enabled);
  if (!ok) return NextResponse.json({ error: "Page not found" }, { status: 404 });

  // Sync disabled pages to .env.local so middleware can read them
  const allPages = readPageVisibility();
  const disabled = Object.entries(allPages)
    .filter(([, v]) => !v.enabled)
    .map(([k]) => k);

  const envPath = path.join(process.cwd(), ".env.local");
  let envContent = "";
  try {
    envContent = fs.readFileSync(envPath, "utf-8");
  } catch {
    envContent = "";
  }

  const newVal = disabled.join(",");
  if (/^DISABLED_PAGES=.*/m.test(envContent)) {
    envContent = envContent.replace(/^DISABLED_PAGES=.*/m, `DISABLED_PAGES=${newVal}`);
  } else {
    envContent = envContent.trimEnd() + `\nDISABLED_PAGES=${newVal}\n`;
  }
  fs.writeFileSync(envPath, envContent, "utf-8");

  revalidatePath("/", "layout");
  return NextResponse.json({ success: true });
}
