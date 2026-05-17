import { NextResponse } from "next/server";

import {
  isAdminAuthConfigured,
  setSessionCookie,
  verifyCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin auth is not configured. Set ADMIN_USERS first." },
      { status: 503 },
    );
  }

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const username = typeof payload?.username === "string" ? payload.username.trim() : "";
    const password = typeof payload?.password === "string" ? payload.password : "";

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    if (!verifyCredentials(username, password)) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    await setSessionCookie(username);
    return NextResponse.json({ ok: true, username });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
