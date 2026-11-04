/**
 * convert-svg-to-webp.js
 * Converts all photo-based SVG files in public/ to WebP format.
 * Skips real vector SVGs (< 50KB) and Next.js built-in SVGs.
 * After conversion, updates all .tsx/.ts src references from .svg to .webp.
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "../public");
const SRC_DIR = path.join(__dirname, "../src");
const SIZE_THRESHOLD_KB = 50; // skip real vector SVGs smaller than this

// SVGs to always skip (Next.js defaults + logo/icon SVGs)
const SKIP_FILES = new Set([
  "file.svg",
  "globe.svg",
  "vercel.svg",
  "window.svg",
  "next.svg",
  "EVOLVE_final_LOGO 1.svg", // keep logo as SVG
]);

function getAllFiles(dir, ext, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, ext, results);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function convertSvgs() {
  const svgFiles = getAllFiles(PUBLIC_DIR, ".svg");
  const converted = [];
  const skipped = [];

  console.log(`\nFound ${svgFiles.length} SVG files in public/\n`);

  for (const svgPath of svgFiles) {
    const fileName = path.basename(svgPath);
    const sizeKB = fs.statSync(svgPath).size / 1024;

    // Skip tiny/vector SVGs and explicitly listed files
    if (SKIP_FILES.has(fileName) || sizeKB < SIZE_THRESHOLD_KB) {
      skipped.push({ file: svgPath, reason: sizeKB < SIZE_THRESHOLD_KB ? "vector SVG (too small)" : "explicitly skipped" });
      console.log(`  SKIP  ${fileName} (${sizeKB.toFixed(0)} KB)`);
      continue;
    }

    const webpPath = svgPath.replace(/\.svg$/i, ".webp");
    const sizeMB = (sizeKB / 1024).toFixed(2);

    try {
      await sharp(svgPath)
        .webp({ quality: 85, effort: 4 })
        .toFile(webpPath);

      const newSizeKB = fs.statSync(webpPath).size / 1024;
      const newSizeMB = (newSizeKB / 1024).toFixed(2);
      const saved = (((sizeKB - newSizeKB) / sizeKB) * 100).toFixed(0);

      converted.push({ svgPath, webpPath, sizeMB, newSizeMB });
      console.log(`  ✓  ${fileName}`);
      console.log(`     ${sizeMB} MB  →  ${newSizeMB} MB  (${saved}% saved)`);
    } catch (err) {
      console.error(`  ✗  FAILED: ${fileName} — ${err.message}`);
    }
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Converted: ${converted.length} files`);
  console.log(`Skipped:   ${skipped.length} files`);

  if (converted.length === 0) {
    console.log("Nothing to update in source code.");
    return;
  }

  // Build a map of relative paths: /Folder/file.svg -> /Folder/file.webp
  const replacements = converted.map(({ svgPath, webpPath }) => {
    const relSvg = "/" + path.relative(PUBLIC_DIR, svgPath).replace(/\\/g, "/");
    const relWebp = "/" + path.relative(PUBLIC_DIR, webpPath).replace(/\\/g, "/");
    return { from: relSvg, to: relWebp };
  });

  // Update all .tsx and .ts source files
  console.log(`\nUpdating source code references...\n`);
  const sourceFiles = [
    ...getAllFiles(SRC_DIR, ".tsx"),
    ...getAllFiles(SRC_DIR, ".ts"),
  ];

  let totalFilesUpdated = 0;

  for (const srcFile of sourceFiles) {
    let content = fs.readFileSync(srcFile, "utf8");
    let updated = false;

    for (const { from, to } of replacements) {
      // Escape special regex chars in the path
      const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "g");
      if (regex.test(content)) {
        content = content.replace(new RegExp(escaped, "g"), to);
        updated = true;
      }
    }

    if (updated) {
      fs.writeFileSync(srcFile, content, "utf8");
      const relFile = path.relative(path.join(__dirname, ".."), srcFile);
      console.log(`  Updated: ${relFile}`);
      totalFilesUpdated++;
    }
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Source files updated: ${totalFilesUpdated}`);
  console.log(`\nDone! Now verify the site locally before committing.\n`);
  console.log(`Next steps:`);
  console.log(`  1. Run: npm run dev`);
  console.log(`  2. Check all pages look correct`);
  console.log(`  3. Run: git add public/ src/ && git commit -m "Convert SVG images to WebP for faster loading"`);
  console.log(`  4. Run: git push origin main`);
}

convertSvgs().catch(console.error);
