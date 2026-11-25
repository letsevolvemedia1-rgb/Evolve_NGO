import "server-only";
import fs from "fs";
import path from "path";

export type ContentType = "TEXT" | "IMAGE" | "NUMBER";

export interface ContentEntry {
  key: string;
  label: string;
  type: ContentType;
  value: string;
  page: string;
  section: string;
}

export type PageVisibilityMap = Record<string, { label: string; enabled: boolean }>;

const CONTENT_FILE = path.join(process.cwd(), "src", "data", "site-content.json");
const PAGES_FILE = path.join(process.cwd(), "public", "page-visibility.json");

export function readAllContent(): ContentEntry[] {
  try {
    const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
    return JSON.parse(raw) as ContentEntry[];
  } catch {
    return [];
  }
}

export function readContentByKey(key: string): ContentEntry | undefined {
  return readAllContent().find((e) => e.key === key);
}

export function readContentByPage(page: string): ContentEntry[] {
  return readAllContent().filter((e) => e.page === page);
}

export function writeContent(key: string, value: string): boolean {
  try {
    const all = readAllContent();
    const idx = all.findIndex((e) => e.key === key);
    if (idx === -1) return false;
    all[idx].value = value;
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(all, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}

export function readPageVisibility(): PageVisibilityMap {
  try {
    const raw = fs.readFileSync(PAGES_FILE, "utf-8");
    return JSON.parse(raw) as PageVisibilityMap;
  } catch {
    return {};
  }
}

export function writePageVisibility(pageKey: string, enabled: boolean): boolean {
  try {
    const all = readPageVisibility();
    if (!all[pageKey]) return false;
    all[pageKey].enabled = enabled;
    fs.writeFileSync(PAGES_FILE, JSON.stringify(all, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}
