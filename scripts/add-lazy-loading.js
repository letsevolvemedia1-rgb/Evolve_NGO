/**
 * add-lazy-loading.js
 * Adds loading="lazy" to all raw <img> tags in .tsx/.ts source files.
 * Hero/spacer/above-fold images get loading="eager" instead.
 */

const fs = require("fs");
const path = require("path");

function getAllFiles(dir, results = []) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) getAllFiles(fp, results);
    else if (e.name.endsWith(".tsx") || e.name.endsWith(".ts"))
      results.push(fp);
  });
  return results;
}

// Patterns that indicate an above-the-fold / hero image → load eagerly
const EAGER_PATTERNS = [
  'alt="spacer"',
  "aria-hidden",
  "Hero Slide",
  "HERO_IMAGES[0]",
  "heroSlides[0]",
  "invisible",
  "opacity-0",
];

function isEager(tag) {
  return EAGER_PATTERNS.some((p) => tag.includes(p));
}

const SRC_DIR = path.join(__dirname, "../src");
const files = getAllFiles(SRC_DIR);

let totalLazy = 0;
let totalEager = 0;
let filesUpdated = 0;

for (const f of files) {
  let content = fs.readFileSync(f, "utf8").replace(/\r\n/g, "\n");
  let changed = false;

  // Match <img ...> tags including multiline ones
  content = content.replace(/<img(\s[\s\S]*?)(\/>|>)/g, (fullTag, attrs, closing) => {
    // Skip if already has loading attribute
    if (attrs.includes("loading=")) return fullTag;

    changed = true;
    if (isEager(fullTag)) {
      totalEager++;
      return `<img${attrs} loading="eager"${closing}`;
    } else {
      totalLazy++;
      return `<img${attrs} loading="lazy"${closing}`;
    }
  });

  if (changed) {
    fs.writeFileSync(f, content, "utf8");
    filesUpdated++;
    console.log("  Updated: " + path.relative(path.join(__dirname, ".."), f));
  }
}

console.log("\n=== SUMMARY ===");
console.log("Files updated:        " + filesUpdated);
console.log('loading="lazy" added: ' + totalLazy);
console.log('loading="eager" added: ' + totalEager);
console.log("\nDone!");
