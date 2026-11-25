import { NextResponse, type NextRequest } from "next/server";
import { readAllContent, writeContent } from "@/lib/content";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page");
  const all = readAllContent();
  const result = page ? all.filter((e) => e.page === page) : all;
  return NextResponse.json(result);
}

export async function PATCH(req: NextRequest) {
  const { key, value } = (await req.json()) as { key: string; value: string };
  if (!key || value === undefined) {
    return NextResponse.json({ error: "Missing key or value" }, { status: 400 });
  }
  const ok = writeContent(key, value);
  if (!ok) return NextResponse.json({ error: "Key not found" }, { status: 404 });
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true });
}
