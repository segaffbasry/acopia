# Acopia homepage (private prospect demo)

A one-page redesign of [acopia.co.uk](https://acopia.co.uk/) with Acopia's own logo, fonts, copy and photography. The look follows [kina.co](https://www.kina.co/), the motion follows [hunar.ai](https://hunar.ai/), and one interaction is copied from Kina: its footer ticker.

## Run

`npm install`, then `npm run dev` (http://127.0.0.1:3048). `npm run build` and `npm start` serve production. `npm run typecheck` checks TypeScript.

| Script | What it does |
| --- | --- |
| `npm run media` | Downloads every homepage image from the live WordPress uploads into `public/media` |
| `npm run logo` | Splits the official wordmark SVG into its nine shapes and writes `lib/logo.ts` |
| `node scripts/peek.mjs <urls>` | Prints a live page's text and image URLs (used to collect `lib/content.ts`) |
| `node scripts/shots.mjs <width> <dir>` | Scrolls the page in headless Chrome, saves screenshots, reports height, overflow, broken images, errors |
| `node scripts/intro.mjs <dir>` | Records the preloader at fixed times and checks the scroll lock |
| `node scripts/check-links.mjs` | Checks every link: live sitemap, HTTP status, new tab with `rel="noopener"` |

## The single route

`/` is the only page. `npm run build` produces 2 static pages (the homepage and Next's own not-found route) plus the favicon.

## Recon (phase 1)

- **Live homepage sections:** hero (title, subtitle, line); Challenges (4 photo cards); category statement with 4 pain points; Maturity Index promo; More with Less (6 tiles); How Retailers Deliver (3 processes); Trusted by Leading Retailers (copy plus 12 logos); CTA band; Insights (4); footer (2 groups, 5 socials, 3 legal links).
- **Brand:** the vector wordmark `acopia-logo-primary.svg` (9 paths: a, c, o, p, i, i-dot, a, ® ring, ® R) and the white "50 years" lockup, both from the live uploads. The favicon is the live `favicon-01.png`. **No brand film exists**: the YouTube channel only has product clips (Miniml, iTack, Velo), so the hero is photographic.
- **Fonts (from the live CSS):** Poppins for headings, Manrope for body. Both are self-hosted from `@fontsource` in `public/fonts`.
- **Palette (confirmed by the client team):** Navy `#002A3A`, Acopia Blue `#008FCC` (the logo fill), Green `#69A84F`, White. Pale bands are tints of the blue (`--paper`, `--mist`). The live site's magenta and purple bands were dropped.
- **Reference measurements:**
  - kina.co: an inset hero card 6 to 8px from the viewport edge with a 24px radius, h1 98px at line-height 1, h2 50px, card radius 16px, link transitions `0.4s cubic-bezier(0.44, 0, 0.56, 1)`.
  - hunar.ai: built in Framer, with no smooth-scroll library and no scroll recolouring. Its content simply fades up. Its product steps run as a pinned horizontal strip; that pin was not copied (clients have rejected scroll-jacking), but its blue gradient product band was.

## Sections and content counts

Desktop target is 6 to 8 viewport heights. Heights are measured by `scripts/shots.mjs`.

| Width | Page height | Viewports |
| --- | --- | --- |
| 1440 | 7,179px | 8.0 |
| 768 | 9,009px | 8.8 |
| 375 | 9,474px | 11.7 (card rows swipe sideways on phones) |

| Section | Live homepage | This build | Notes |
| --- | --- | --- | --- |
| Hero | title, subtitle, line, no CTA | same copy + 2 CTAs | CTAs are the live "Speak to a Retail Specialist" and "See Your Maturity Score" |
| Challenges | 4 | 4 | "Resiliance" typo corrected to the menu's "Resilience" |
| Statement + pain points | 1 + 4 | 1 + 4 | |
| Maturity Index | 1 | 1 | Beside the statement instead of a separate band |
| More with Less | 6 tiles | 6 (as 3 less-to-more pairs) + 5 pillars | Pillars are from `/about/more-with-less/` |
| Processes | 3 | 3 + MyAcopia band (4 facts) | Facts are from `/retail/processes/myacopia/` |
| Trusted | copy + 12 logos | copy + 12 logos + 3 facts + 11-step timeline | Facts and timeline are from `/about/who-we-are/` (1995, 1996 and 2000 merged into one step) |
| CTA | 1 | 1 | Over the live "Shop front" photo |
| Insights | 4 | 4 | Same four articles in the same order, with dates and read times from each article |
| Footer | 2 groups, 5 socials, 3 legal | same + Careers, MyAcopia | |

Nothing on the live homepage was cut. The only gap: the live site's HubSpot forms (two iframes) are not rebuilt.

## How it works

- **Preloader** (`components/Preloader.tsx`): Acopia signs its name using its own letter shapes from `lib/logo.ts`. The wordmark is plain lettering with no separate symbol, so a letter build fits it best:
  1. The six letters rise out of the baseline one by one, using the SVG's own bounds as the mask.
  2. The round i-dot drops onto its stem with a small overshoot, and the ® fades in.
  3. The wordmark then flies into the header logo position and turns white as it lands on the hero photo, while the white ground fades away.

  It runs on one GSAP timeline: build 0.1 to 0.85s, hold, exit 1.15 to 1.85s. Handover happens at the start of the exit: it removes `is-loading`, sets `data-intro="done"` and dispatches `intro:done`, so the hero entrance overlaps the exit. Lenis stays stopped until then, and a 2.2s guard means it can never block the page. It plays on every load. Reduced motion skips it, and `<noscript>` hides it.
- **Hero** (`components/home/Hero.tsx`): Kina's inset photo card. The headline sits bottom left on two lines (the second in brand green), with the line and actions beside it. On `intro:done` the photo settles from 1.08 scale and the headline lines rise out of their masks.
- **Smooth scroll** (`components/Motion.tsx`, `lib/scroll.ts`): Lenis (`lerp .12`) runs on the GSAP ticker and is synced with ScrollTrigger. Anchors go through Lenis. The menu and the preloader stop it. `overscroll-behavior-y: none` is set.
- **Backgrounds:** every section has a fixed ground (white, with navy panels and a blue to navy band), and nothing recolours on scroll. Hunar does not recolour either, and clients have rejected colour jumps.
- **Header** (`components/Header.tsx`): frameless. Its colour follows the section under it (`data-tone`). It hides on scroll down and returns on scroll up.
- **Menu:** a full-screen navy sheet. One GSAP timeline wipes it down and raises the groups, and closing reverses it. It traps focus, Esc closes it, and focus returns to the Menu button. Anchor items scroll the homepage; the rest point at live URLs, including the six product brands.
- **Copied interaction: Kina's ticker** (`components/Ticker.tsx`), measured on kina.co:
  - a 59px pill with a 100px radius;
  - items 64px apart, set in 16px text;
  - a linear drift of 30px per second (77px over 2.56s);
  - Kina's 16px "triangle dots" separator: three circles pulsing opacity 1, .65, .3, 1 over 1.8s, starting at 0, .6 and 1.2s.

  Kina's lime becomes Acopia Green and its plum text becomes Navy. The ticker carries the More with Less promise, pauses off-screen and stays still with reduced motion.
- **Signature visual** (`components/home/Story.tsx`): the real 1976 to 2025 milestones on a rail. Hover, focus or tap a year, or use the arrow keys.
- **Buttons and links:** colour shifts use Kina's `--ease-kina` curve over 0.4s. The arrow nudges 3px.
- **Photography** is shown in natural colour (saturate .92 on the two big photos only).

### Reveal moves (one set, used everywhere)

| Target | Attribute | Move |
| --- | --- | --- |
| Headings | `data-reveal="heading"` | Whole phrase fades and rises 18px, 1s |
| Paragraphs | `data-reveal="text"` | Line mask (`lib/split.ts`), lines rise 105%, .9s, .06s stagger; original markup restored afterwards |
| Labels, buttons, small rows | `data-reveal="fade"` | Fade and 8px rise, .6s |
| Cards | `data-reveal="card"` | Batched fade and 28px rise, .9s, .08s stagger |
| Images | `data-reveal="image"` | Frame clips open from 14% below, 1.1s; with `data-parallax` the photo drifts about 12% while scrolling |

All moves use `expo.out`, play once, and run 25% shorter inside `data-late` sections (Insights, CTA). The footer has no reveals, so the end of the page never jumps. Start states only apply when the `js` class is set, so without JavaScript or with reduced motion everything is visible.

## Private demo settings

- `robots: noindex, nofollow` is set in `app/layout.tsx`. There is no sitemap.
- PostHog (EU) and the 25/50/75/100 `scroll_depth` events live in `lib/posthog.ts`. The key can be overridden with `NEXT_PUBLIC_POSTHOG_KEY`. Surveys are disabled, and there is no visible tracking UI.
- **Links:** every outbound link has its real acopia.co.uk URL, `target="_blank"` and `rel="noopener"`, checked against the live post and page sitemaps (all 56 destinations answer 200). The two Resources category pages are live but missing from those sitemaps. The private-demo guard in `Motion.tsx` stops clicks on outbound links, so the prospect stays on the demo.
- Copy has no em or en dashes; the live copy's few dashes are rewritten.

## Where the images came from

All images are from `acopia.co.uk/wp-content/uploads`, downloaded by `scripts/media.sh`:

- **Hero and CTA:** Resources article photos (`Busy-Store`, `Shop-front`).
- **Challenge and process cards:** the live homepage.
- **Building photo:** Who We Are.
- **Maturity Index screenshot:** the homepage.
- **Insight images:** the four articles.
- **Logos:** the live homepage strip and the Products menu.
- **50 years lockup:** the live footer.
