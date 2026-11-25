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

function isPageDisabled(pathname: string): boolean {
  const raw = process.env.DISABLED_PAGES ?? "";
  if (!raw) return false;
  // Normalize pathname: strip leading/trailing slash, default to "home"
  const stripped = pathname.replace(/^\//, "").replace(/\/$/, "") || "home";
  const disabled = raw.split(",").map((s) => s.trim()).filter(Boolean);
  return disabled.some((d) => stripped === d || stripped.startsWith(d + "/"));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --- Admin routes ---
  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";

  if (isLoginPage || isLoginApi) return NextResponse.next();

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin/")) {
    if (isAuthorized(req)) return NextResponse.next();
    if (pathname.startsWith("/api/admin/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  // --- Page visibility check ---
  if (isPageDisabled(pathname)) {
    const homeUrl = req.nextUrl.clone();
    homeUrl.pathname = "/";
    homeUrl.search = "?page_disabled=1";
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/((?!_next/static|_next/image|favicon\\.ico|uploads/|new/|About/|public/).*)",
  ],
};
