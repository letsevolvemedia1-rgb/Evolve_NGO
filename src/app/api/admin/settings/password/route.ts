import { NextResponse, type NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { getSessionUser, verifyCredentials } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newUsername, newPassword } = (await req.json()) as {
    currentPassword: string;
    newUsername?: string;
    newPassword: string;
  };

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const valid = verifyCredentials(user, currentPassword);
  if (!valid) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 403 });
  }

  const targetUsername = newUsername?.trim() || user;
  if (!targetUsername) {
    return NextResponse.json({ error: "Username cannot be empty" }, { status: 400 });
  }

  const envPath = path.join(process.cwd(), ".env.local");
  let envContent = "";
  try {
    envContent = fs.readFileSync(envPath, "utf-8");
  } catch {
    envContent = "";
  }

  const newEntry = `${targetUsername}:${newPassword}`;
  if (/^ADMIN_USERS=.*/m.test(envContent)) {
    envContent = envContent.replace(/^ADMIN_USERS=.*/m, `ADMIN_USERS=${newEntry}`);
  } else {
    envContent = envContent.trimEnd() + `\nADMIN_USERS=${newEntry}\n`;
  }

  fs.writeFileSync(envPath, envContent, "utf-8");

  return NextResponse.json({
    success: true,
    message: "Credentials updated! Please restart the dev server and log in again with your new credentials.",
  });
}
