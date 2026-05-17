import { NextResponse, type NextRequest } from "next/server";

const ADMIN_COOKIE = "es_admin";

function adminUsernames(): Set<string> {
  const raw = process.env.ADMIN_USERS ?? "";
  const set = new Set<string>();
  for (const entry of raw.split(",")) {
    const trimmed = entry.trim();
    if (!trimmed) continue;
    const idx = trimmed.indexOf(":");
    if (idx <= 0) continue;
    const user = trimmed.slice(0, idx).trim();
    if (user) set.add(user);
  }
  return set;
}

function isAuthorized(req: NextRequest) {
  const value = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  return adminUsernames().has(value);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";

  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  if (isAuthorized(req)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
