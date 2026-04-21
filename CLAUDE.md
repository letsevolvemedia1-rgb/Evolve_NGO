# CLAUDE.md — Evolve Sangh Foundation Design System

This document provides comprehensive rules and context for implementing Figma designs into this codebase using the Model Context Protocol (MCP). Read this before making any UI changes.

---

## Stack Overview

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript (strict) |
| Icons | lucide-react |
| Components | Radix UI + CVA |
| Class utility | `cn()` from `src/lib/utils.ts` |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout — fonts, Header, Footer
│   ├── globals.css             # Global styles, CSS vars, .section-title
│   ├── page.tsx                # Homepage
│   ├── about-us/page.tsx
│   ├── contact-us/page.tsx
│   ├── activities/
│   │   ├── access-to-education/
│   │   ├── environment-care/
│   │   ├── free-food-drive/
│   │   ├── mental-wellness-program/
│   │   ├── skill-development/
│   │   └── youth-welfare-centers/
│   │       └── stories/[id]/
│   ├── join-us/
│   └── support-a-cause/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Nav, dropdowns, mobile menu
│   │   └── Footer.tsx          # Links, social icons, contact
│   ├── ui/
│   │   └── button.tsx          # CVA button — all button usage goes here
│   └── sections/               # Page section components
│       ├── Hero.tsx
│       ├── MissionSection.tsx
│       ├── ImpactSection.tsx
│       ├── ActivitiesSection.tsx
│       ├── CampaignSection.tsx
│       ├── VisionMissionSection.tsx
│       ├── IdentitySection.tsx
│       ├── ProjectLocationsSection.tsx
│       ├── ProjectReportsSection.tsx
│       ├── AboutHero.tsx
│       ├── AboutImpactSection.tsx
│       ├── youth-welfare/
│       │   ├── HeroSlider.tsx
│       │   ├── WhatWeDo.tsx
│       │   ├── OurFocus.tsx
│       │   ├── StoriesOfChange.tsx
│       │   ├── StoryCard.tsx
│       │   ├── StoryDetail.tsx
│       │   ├── InterventionsTabs.tsx
│       │   └── storiesData.ts
│       └── mental-wellness/
│           └── MentalWellnessSlider.tsx
├── data/
│   └── stories.json            # Story content (typed via storiesData.ts)
└── lib/
    └── utils.ts                # cn() helper
public/
├── About/                      # Logo and about page images
├── AccessToEducation/          # Program images (SVG/PNG)
├── Activity/                   # Activity images (JPG/SVG)
├── Hero/                       # Hero carousel slides (SVG)
├── Homepage/                   # Hero JPGs, campaign images
├── Living/                     # Living section images (PNG)
├── MentalWellness/             # Slider images (PNG)
├── YouthWellfare/              # Slider, avatars (SVG)
└── nav/                        # Logo SVG for header
```

---

## Design Tokens

### Colors

All colors are applied via Tailwind arbitrary values (e.g. `bg-[#0067A5]`). There is no separate token file — use the values below directly.

```
Brand Blues:
  Primary Blue       #0067A5   → headers, footers, section borders, nav
  Dark Navy          #003056   → activity card titles, stat numbers
  Medium Blue        #005089   → hover states, story card headers
  Darker Blue        #003d6b   → deep hover states
  Link Blue          #0077B6   → borders, card outlines, text links
  Link Hover         #005a8c   → link hover states
  Tab Blue           #0077C0   → tab component borders
  Section Title Blue #004476   → .section-title color (defined in globals.css)

Accent:
  Cyan               #00BCD4   → labels, accents, hover text effects
  Light Blue Bar     #C8E8FF   → section separator bars, decorative backgrounds

CTA / Warning:
  Orange             #FFA500   → "Support a Cause" CTA button (button variant: "warning")

Backgrounds:
  White              #ffffff   → page background, card backgrounds
  Tab Content        #fdf6e3   → intervention tabs content area
  Footer Bottom      #1a1a1a   → footer bottom bar

Neutral / Text:
  Foreground         #171717   → default body text
  Dark Mode BG       #0a0a0a   → dark mode (media query only)
  Dark Mode Text     #ededed   → dark mode text
  Placeholder Gray   #D9D9D9   → image placeholders, skeleton backgrounds
```

### CSS Variables (globals.css)

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

/* Mapped into Tailwind via @theme inline: */
--color-background: var(--background)
--color-foreground: var(--foreground)
--font-sans: var(--font-inter)
--font-heading: var(--font-oswald)
```

---

## Typography

### Font Families

All four fonts are loaded in `src/app/layout.tsx` via `next/font/google` and exposed as CSS variables on `<body>`.

| Variable | Font | Weights | Tailwind Class | Use |
|---|---|---|---|---|
| `--font-inter` | Inter | 400–700 | `font-sans` | Body text (default) |
| `--font-oswald` | Oswald | 400–700 | `font-heading` | Sub-headings, labels |
| `--font-open-sans` | Open Sans | 300, 400, 600, 700 | inline style only | Body copy, descriptions |
| `--font-league-gothic` | League Gothic | 400 | `font-league-gothic` | Section titles, display text |

### Typography Rules

**Section titles** — always use the `.section-title` class (defined in `globals.css`):
```tsx
<h2 className="section-title">Our Activities</h2>
```
```css
/* .section-title */
font-family: var(--font-league-gothic);
font-weight: 400;
font-size: 64px;        /* 36px on mobile (max-width: 768px) */
line-height: 100%;
letter-spacing: 0%;
text-align: center;
text-transform: uppercase;
color: #004476;
```

**Body copy / descriptions** — Open Sans via inline style (no Tailwind class):
```tsx
style={{
  fontFamily: "'Open Sans', sans-serif",
  fontWeight: 400,
  fontSize: "20px",
  lineHeight: "160%",
  letterSpacing: "0%",
  textAlign: "justify",
}}
```

**Campaign display titles** — League Gothic, large:
```tsx
style={{
  fontFamily: "var(--font-league-gothic), sans-serif",
  fontWeight: 400,
  fontSize: "42px",
}}
```

**Caption / small body** — Open Sans small:
```tsx
style={{
  fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "160%",
}}
```

---

## Spacing & Layout

### Responsive Padding (section-level)

These are the standard padding patterns used across all sections:

```tsx
// Section outer padding
className="px-4 md:px-12 lg:px-20"      // horizontal
className="py-12 md:py-16 lg:py-24"     // vertical

// Wide layout (activities, campaigns)
className="px-6 md:px-16 lg:px-28"

// Narrow layout (forms, single column)
className="px-4 md:px-12"
```

### Grid Patterns

```tsx
// 3-column activity/campaign grid
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10"

// 2-column layout (image + text)
className="flex flex-col md:flex-row items-center gap-12"

// 4-column impact stats
className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
```

### Breakpoints

Standard Tailwind v4 breakpoints used in this project:

| Prefix | Min-width | Primary use |
|---|---|---|
| (none) | 0px | Mobile base |
| `sm:` | 640px | 2-col grids |
| `md:` | 768px | Main layout shift, font size change |
| `lg:` | 1024px | Max padding, 3–4 col grids |

---

## Component Patterns

### `cn()` Utility — Always use for class merging

```tsx
import { cn } from "@/lib/utils"

// Correct
className={cn("base-classes", condition && "conditional-class", className)}

// Never concatenate strings directly for conditional classes
```

### Button Component — `src/components/ui/button.tsx`

Always use this for any button element. Never create raw `<button>` with custom styles.

```tsx
import { Button } from "@/components/ui/button"

// Variants
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="warning">Support a Cause</Button>   // orange CTA

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><SearchIcon /></Button>

// Composition (renders as <a>)
<Button asChild variant="outline">
  <Link href="/about">Read More</Link>
</Button>
```

### Images — Always use `next/image`

**Never use plain `<img>` tags.** All images must go through `next/image`.

```tsx
import Image from "next/image"

// Full-bleed / fill container (sliders, hero, cards)
// Parent must be: position: relative, overflow: hidden
<div className="relative w-[219px] h-[219px] overflow-hidden rounded-lg">
  <Image
    src="/path/to/image.jpg"
    alt="Descriptive alt text"
    fill
    className="object-cover"
    sizes="219px"                        // match container width
    priority={isFirstSlide}              // only for above-the-fold
  />
</div>

// Fixed size
<Image
  src="/About/EVOLVE_final_LOGO 1.png"
  alt="Evolve Sangh Foundation"
  width={224}
  height={224}
  className="object-contain"
/>

// Full-width responsive
<Image
  src={src}
  alt="..."
  fill
  className="object-cover object-center"
  priority={index === 0}
  sizes="100vw"
/>
```

**External images** require `next.config.ts` `remotePatterns`. Currently configured:
- `https://www.gstatic.com`

### Carousel / Slider Pattern

Used in: `Hero.tsx`, `HeroSlider.tsx`, `MentalWellnessSlider.tsx`, `ActivitiesSection.tsx`

```tsx
const [currentSlide, setCurrentSlide] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, 5000)
  return () => clearInterval(timer)
}, [])

// Render all slides, toggle opacity
{slides.map((slide, index) => (
  <div
    key={slide.id}
    className={cn(
      "absolute inset-0 transition-opacity duration-1000 ease-in-out",
      index === currentSlide ? "opacity-100" : "opacity-0"
    )}
  >
    <Image ... priority={index === 0} sizes="100vw" />
  </div>
))}

// Navigation dots
<div className="absolute bottom-6 right-6 flex gap-2 z-10">
  {slides.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentSlide(index)}
      className={cn(
        "w-3 h-3 rounded-full transition-all duration-300",
        index === currentSlide
          ? "bg-white scale-110"
          : "bg-white/50 hover:bg-white/80"
      )}
      aria-label={`Go to slide ${index + 1}`}
    />
  ))}
</div>
```

### Animated Counter Pattern

Used in: `ImpactSection.tsx`, `AboutImpactSection.tsx`

```tsx
// Uses IntersectionObserver to trigger on scroll
// Custom useCountUp hook with cubic-ease, 2000ms duration
// Supports delay for staggered animations

const useCountUp = (target: number, duration = 2000, delay = 0) => { ... }

// Trigger
const ref = useRef<HTMLDivElement>(null)
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { setStartCount(true); observer.disconnect() } },
    { threshold: 0.3 }
  )
  if (ref.current) observer.observe(ref.current)
  return () => observer.disconnect()
}, [])
```

### Tab Pattern

Used in: `InterventionsTabs.tsx`

```tsx
const [activeTab, setActiveTab] = useState(0)

// Tab buttons
<button
  onClick={() => setActiveTab(i)}
  className={cn(
    "border border-[#0077C0] px-4 py-2 text-sm font-bold uppercase",
    activeTab === i
      ? "bg-[#0067A5] text-white"
      : "bg-white text-[#0067A5] hover:bg-[#C8E8FF]"
  )}
>
  {tab.label}
</button>

// Tab content area background: #fdf6e3
```

### Dropdown / Nav Pattern

Used in: `Header.tsx`

```tsx
const [openDropdown, setOpenDropdown] = useState<string | null>(null)

// Hover-triggered
onMouseEnter={() => setOpenDropdown(key)}
onMouseLeave={() => setOpenDropdown(null)}

// Dropdown panel
className="absolute top-full left-0 bg-white shadow-lg z-50 min-w-[200px]"
```

---

## Icon System

### lucide-react (primary icon library)

```tsx
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

// Standard usage
<ChevronLeft className="w-6 h-6" />
<Search className="w-5 h-5 text-[#0067A5]" />
```

### Custom SVG Icons (inline)

Used for intervention cards in `InterventionsTabs.tsx`. Inline SVG with `currentColor`. Standard viewBox `0 0 24 24`, size `18x18` to `24x24`.

### Social Media Icons

Custom SVG paths in `Footer.tsx`. All 24x24, `fill="currentColor"` for color inheritance.

---

## Asset Management

### Public Folder Organization

```
public/
├── About/              Logo PNG, identity images
├── AccessToEducation/  Slider, WhatWeDo, Why, Ourfocus, Glimpses (SVG)
├── Activity/           food-distribution.jpg, youth-welfare-center.jpg, Living2.svg
├── Hero/               Group 16–18.svg (hero carousel)
├── Homepage/           hero-bg.jpg, hero-bg-2.jpg, Rectangle.png, image.svg, image.png
├── Living/             image.png, image-1.png, Rectangle 104.png
├── MentalWellness/     Slider.png, Slider2.png, Slider3.png
├── YouthWellfare/      Slider1–3.svg, Satyam.svg, Abhishek.svg, Aman.svg, Why.svg
└── nav/                EVOLVE_final_LOGO 1.svg
```

### Asset Rules

- **All paths are case-sensitive** on Linux/production. Use exact case as in the `public/` folder (e.g. `/About/`, `/YouthWellfare/` — note the capital letters).
- Reference assets with root-relative paths: `src="/About/EVOLVE_final_LOGO 1.png"`
- No CDN configured — all assets served statically from Next.js.
- **Avoid SVG files over 1MB** — the large SVGs in `YouthWellfare/` and `AccessToEducation/` are unoptimized and cause slow loads. When adding new assets, use compressed WebP/PNG.

---

## Figma → Code Mapping

### Colors

When a Figma design uses a brand color, map it to the hex value directly:

| Figma Color Name | Hex | Usage in Code |
|---|---|---|
| Primary Blue | `#0067A5` | `bg-[#0067A5]` / `text-[#0067A5]` |
| Dark Navy | `#003056` | `text-[#003056]` |
| Cyan Accent | `#00BCD4` | `text-[#00BCD4]` |
| Light Blue BG | `#C8E8FF` | `bg-[#C8E8FF]` |
| Section Title | `#004476` | `.section-title` class |
| Orange CTA | `#FFA500` | `<Button variant="warning">` |

### Typography

| Figma Text Style | Code Implementation |
|---|---|
| Section Title / Hero Heading | `<h2 className="section-title">` |
| Sub-heading / Nav | `font-heading` (Oswald via Tailwind) |
| Body paragraph | `style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "160%" }}` |
| Campaign card title | `style={{ fontFamily: "var(--font-league-gothic), sans-serif", fontSize: "42px" }}` |
| Small caption | `style={{ fontFamily: "var(--font-open-sans)", fontWeight: 600, fontSize: "12px", lineHeight: "160%" }}` |

### Components

| Figma Element | Code Component |
|---|---|
| Any button | `<Button>` from `src/components/ui/button.tsx` |
| Orange/CTA button | `<Button variant="warning">` |
| Full-page image | `<Image fill sizes="100vw" priority>` |
| Card image | `<Image fill sizes="Xpx">` inside relative container |
| Auto-rotating hero | Copy `Hero.tsx` carousel pattern |
| Tab UI | Copy `InterventionsTabs.tsx` pattern |
| Animated number | Copy `useCountUp` + IntersectionObserver from `ImpactSection.tsx` |

### Section Layout Template

Every new section should follow this shell:

```tsx
export function MySectionName() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="w-full px-6 md:px-16 lg:px-24">
        <h2 className="section-title mb-12">Section Title</h2>
        {/* content */}
      </div>
    </section>
  )
}
```

---

## Shadows & Decorative Elements

```tsx
// Card shadow (campaign cards)
style={{ boxShadow: "0px 0px 7px 0px #00000040" }}

// Decorative rings (impact section, campaign section)
<div className="absolute top-10 right-[-40px] w-40 h-40 rounded-full border-[6px] border-[#C8E8FF]/50" />

// Image overlay gradient (campaign cards)
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

// Tailwind shadow utilities used
shadow-md   // carousel buttons, dropdowns
shadow-lg   // nav panels, modals
```

---

## Transitions & Animations

```tsx
// Standard hover transitions
className="transition-colors duration-300"    // color changes
className="transition-transform duration-500" // scale effects
className="transition-opacity duration-1000"  // slide fades

// Hover effects
className="group"                             // parent
className="group-hover:scale-110"             // child zoom
className="group-hover:text-[#00BCD4]"        // child color shift

// Scroll-triggered animations
className="animate-in fade-in duration-500"
className="animate-in fade-in slide-in-from-bottom-2 duration-500"
```

---

## Data & Types

### Story Data

Stories are stored in `src/data/stories.json` and typed via `src/components/sections/youth-welfare/storiesData.ts`.

```typescript
// Always use StoryData interface — never bypass with `as any`
export interface StoryData {
  id: string
  name: string
  quote: string
  achievement?: string
  achievement2?: string
  image?: string
}
```

### JSON data with extra fields

Use a proper local interface when mapping JSON that has more fields than the exported type:

```typescript
interface StoryJson {
  id: string
  name: string
  quote: string
  achievement?: string
  achievement2?: string
  image?: string
  role?: string
  company?: string
  socialLinks?: Record<string, string>
  paragraphs?: string[]
}

export const storiesData = (storiesJson as StoryJson[]).map((s) => ({ ... }))
```

---

## "use client" Rule

Mark a component `"use client"` only when it uses:
- `useState`, `useEffect`, `useRef`, `useCallback`
- Browser APIs (IntersectionObserver, setInterval)
- Event handlers (onClick, onMouseEnter)

Server components (no interactivity, no hooks) should NOT have `"use client"`.

---

## Do Not

- Use plain `<img>` tags — always `next/image`
- Use lowercase paths for `public/` assets — paths are case-sensitive in production
- Leave `console.log` in components
- Use `(value as any)` to bypass TypeScript — define a proper interface
- Use CSS `backgroundImage` inline style for content images — use `<Image fill>`
- Create raw `<button>` with custom styles — use `<Button>` component
- Hardcode font-family strings for Inter/Oswald — use `font-sans` / `font-heading` Tailwind classes
- Add SVG files larger than 1MB to `public/` — export as WebP/PNG instead
