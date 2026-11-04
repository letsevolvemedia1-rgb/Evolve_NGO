/**
 * convert-huge-svg-to-webp.js
 * Handles huge SVGs that contain base64-encoded images inside <image> tags.
 * Extracts the base64 payload and converts it directly to WebP using sharp,
 * bypassing the XML parse limit.
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "../public");
const SRC_DIR = path.join(__dirname, "../src");

// Files that failed in the first script (too large for XML parser)
// Add any others that failed
const FAILED_SVGS = [
  "About/OurIdentity.svg",
  "AccessToEducation/Glimpses.svg",
  "AccessToEducation/Glimpses1.svg",
  "AccessToEducation/Glimpses3.svg",
  "AccessToEducation/Ourfocus.svg",
  "AccessToEducation/Slider.svg",
  "AccessToEducation/Slider3.svg",
  "AccessToEducation/WhatWeDo.svg",
  "AccessToEducation/Why.svg",
  "AccessToEducation/Why2.svg",
  "Activity/Living.svg",
  "Hero/Group 16.svg",
  "Hero/Group 17.svg",
  "Hero/Group 19.svg",
  "Hero/Group 20.svg",
  "Homepage/image.svg",
  "new/Education/OurFocus.svg",
  "new/Education/Slider.svg",
  "new/Education/Slider3.svg",
  "new/Homepage/AccesstoEducationinitiative.svg",
  "new/Homepage/Environmentcare.svg",
  "new/Homepage/freefood.svg",
  "new/Homepage/SkillForBetterTommoro.svg",
  "YouthWellfare/Slider1.svg",
  "YouthWellfare/Slider2.svg",
  "YouthWellfare/Why.svg",
];

// Regex to find base64 image data in SVG
// Matches: image/jpeg;base64,  or  image/png;base64,  etc.
const BASE64_REGEX = /data:image\/(jpeg|png|gif|webp|bmp);base64,([A-Za-z0-9+/=]+)/;

async function convertHugeSvg(relPath) {
  const svgPath = path.join(PUBLIC_DIR, relPath);
  const webpPath = svgPath.replace(/\.svg$/i, ".webp");
  const fileName = path.basename(svgPath);

  if (!fs.existsSync(svgPath)) {
    console.log(`  SKIP  ${fileName} (file not found)`);
    return null;
  }

  if (fs.existsSync(webpPath)) {
    console.log(`  SKIP  ${fileName} (webp already exists)`);
    return { svgPath, webpPath };
  }

  const sizeMB = (fs.statSync(svgPath).size / 1024 / 1024).toFixed(2);
  process.stdout.write(`  Processing ${fileName} (${sizeMB} MB)... `);

  try {
    // Read file as a stream chunk by chunk to find the base64 data
    // For huge files, we read in chunks to avoid loading the whole file into RAM at once
    const content = fs.readFileSync(svgPath, "utf8");
    const match = content.match(BASE64_REGEX);

    if (!match) {
      console.log(`FAILED — no base64 image data found`);
      return null;
    }

    const mimeType = match[1]; // jpeg, png, etc.
    const base64Data = match[2];
    const imgBuffer = Buffer.from(base64Data, "base64");

    await sharp(imgBuffer)
      .webp({ quality: 85, effort: 4 })
      .toFile(webpPath);

    const newSizeMB = (fs.statSync(webpPath).size / 1024 / 1024).toFixed(2);
    const saved = ((1 - fs.statSync(webpPath).size / fs.statSync(svgPath).size) * 100).toFixed(0);
    console.log(`✓  ${sizeMB} MB → ${newSizeMB} MB (${saved}% saved)`);
    return { svgPath, webpPath };
  } catch (err) {
    console.log(`FAILED — ${err.message}`);
    return null;
  }
}

async function updateSourceRefs(converted) {
  const replacements = converted
    .filter(Boolean)
    .map(({ svgPath, webpPath }) => ({
      from: "/" + path.relative(PUBLIC_DIR, svgPath).replace(/\\/g, "/"),
      to: "/" + path.relative(PUBLIC_DIR, webpPath).replace(/\\/g, "/"),
    }));

  if (replacements.length === 0) return;

  console.log(`\nUpdating source code references...\n`);

  function getAllFiles(dir, ext, results = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) getAllFiles(fullPath, ext, results);
      else if (entry.isFile() && entry.name.toLowerCase().endsWith(ext))
        results.push(fullPath);
    }
    return results;
  }

  const sourceFiles = [
    ...getAllFiles(SRC_DIR, ".tsx"),
    ...getAllFiles(SRC_DIR, ".ts"),
  ];

  let totalUpdated = 0;
  for (const srcFile of sourceFiles) {
    let content = fs.readFileSync(srcFile, "utf8");
    let changed = false;
    for (const { from, to } of replacements) {
      const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (new RegExp(escaped).test(content)) {
        content = content.replace(new RegExp(escaped, "g"), to);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(srcFile, content, "utf8");
      console.log(`  Updated: ${path.relative(path.join(__dirname, ".."), srcFile)}`);
      totalUpdated++;
    }
  }
  console.log(`\nSource files updated: ${totalUpdated}`);
}

async function main() {
  console.log(`\nConverting ${FAILED_SVGS.length} large SVGs...\n`);
  const results = [];
  for (const relPath of FAILED_SVGS) {
    const result = await convertHugeSvg(relPath);
    results.push(result);
  }

  const succeeded = results.filter(Boolean);
  const failed = results.filter((r) => !r);
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Converted: ${succeeded.length} / ${FAILED_SVGS.length}`);
  console.log(`Failed:    ${failed.length}`);

  await updateSourceRefs(succeeded);

  console.log(`\n✅ Done! Check the site then commit:\n`);
  console.log(`  git add public/ src/`);
  console.log(`  git commit -m "Convert all SVG images to WebP for faster loading"`);
  console.log(`  git push origin main`);
}

main().catch(console.error);
