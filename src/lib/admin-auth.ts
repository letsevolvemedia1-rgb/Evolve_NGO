import "server-only";

import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "es_admin";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function parseAdminUsers(): Map<string, string> {
  const raw = process.env.ADMIN_USERS ?? "";
  const map = new Map<string, string>();

  for (const entry of raw.split(",")) {
    const trimmed = entry.trim();
    if (!trimmed) continue;

    const idx = trimmed.indexOf(":");
    if (idx <= 0 || idx === trimmed.length - 1) continue;

    const user = trimmed.slice(0, idx).trim();
    const pass = trimmed.slice(idx + 1).trim();
    if (!user || !pass) continue;

    map.set(user, pass);
  }

  return map;
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) {
    timingSafeEqual(ab, ab);
    return false;
  }
  return timingSafeEqual(ab, bb);
}

export function isAdminAuthConfigured() {
  return parseAdminUsers().size > 0;
}

export function verifyCredentials(username: string, password: string): boolean {
  if (!username || !password) return false;
  const users = parseAdminUsers();
  const expected = users.get(username);
  if (!expected) return false;
  return safeEqual(password, expected);
}

export function isKnownAdminUser(username: string | undefined | null): boolean {
  if (!username) return false;
  return parseAdminUsers().has(username);
}

export async function getSessionUser(): Promise<string | null> {
  const store = await cookies();
  const value = store.get(ADMIN_COOKIE)?.value;
  if (!value) return null;
  if (!isKnownAdminUser(value)) return null;
  return value;
}

export async function setSessionCookie(username: string) {
  const store = await cookies();
  store.set({
    name: ADMIN_COOKIE,
    value: username,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.set({
    name: ADMIN_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
