# Body Art Gym — Website

A vintage bodybuilding gym website for **Body Art Gym**, BMCHS Sharafabad, Karachi.
Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript** and **Tailwind CSS**. It has no other runtime dependencies.

> Old-school bodybuilding. Modern digital experience.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
npm run lint && npm run typecheck
```

Requires Node 18.17+ (Node 20+ recommended).

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, intro, training, programs, facilities, hours, CTA |
| `/about` | Philosophy, fitness culture, "the old-school code" |
| `/training` | The method, disciplines, late-hours band |
| `/facilities` | Gallery walk-through |
| `/programs` | Program structure that you can edit |
| `/membership` | "Ready to train?" enquiry form (`/enquire` and `/join` redirect here) |
| `/hours` | Opening-hours poster and weekly table |
| `/contact` | Address, click-to-call, directions, map that loads on click, form |

SEO extras: per-page titles, descriptions and canonicals; Open Graph and Twitter cards; a generated OG image (`/opengraph-image`); `ExerciseGym` JSON-LD with address, phone and opening hours; `sitemap.xml`; `robots.txt`; web manifest.

## Editing content

All verified business facts are in **`lib/site.ts`**: name, phone, address, hours and map links. Change them there and the header, footer, pages and structured data all update.

Programs, facility areas, principles and marquee words are in **`lib/content.ts`**.

- **Programs:** fill in `schedule` (e.g. `'Mon / Wed / Fri · 7 PM'`) and `details` (a list of strings). Anything left `null` shows as "On enquiry". Add objects to the array to add programs.
- **Facilities:** edit titles and text, or add areas.

No prices, trainers, awards, history or statistics are shown, because none were supplied. Add them only once they are verified.

## Replacing the illustrations with real photos

Every image slot currently shows an **original hand-built SVG illustration** (`components/art/Art.tsx`), styled like a lit studio shot on a vintage poster. To use real photography:

1. Put optimised photos in `public/images/` (JPG/WebP, about 2000px on the long edge).
2. Set `image: '/images/your-photo.jpg'` on a program or facility in `lib/content.ts`, or pass `image="/images/…"` to any `<Visual />`.

Photos get the same warm film grade automatically (sepia, contrast and a burnt-orange multiply), so they match the palette. Next.js serves them as AVIF/WebP with lazy loading.

## Logo

`components/art/Emblem.tsx` is an **original stand-in emblem** built to badge proportions. If the gym has an official logo, add it to `public/brand/` and swap it into `Wordmark` (navigation) and `SiteFooter`. The layout will not need to change.

## Enquiry form delivery

The forms post to `app/api/enquire/route.ts`. That route checks the fields on the server and silently drops spam caught by a hidden honeypot field. Copy `.env.example` to `.env.local` and configure **one** delivery method:

- `ENQUIRY_WEBHOOK_URL`: any JSON webhook (Formspree, Make, Zapier, Slack, etc.), **or**
- `RESEND_API_KEY` + `ENQUIRY_TO_EMAIL` (+ `ENQUIRY_FROM_EMAIL`): email via [Resend](https://resend.com).

Without either:

- **In development**, enquiries are logged to the console and the form shows success.
- **In production**, the form shows a friendly error asking visitors to call 0344 2886383.

Also set `NEXT_PUBLIC_SITE_URL` to the live domain. Canonical URLs, the sitemap and Open Graph links all use it.

## Design system

- **Colours** (`tailwind.config.ts`):
  - `iron`: deep dark brown
  - `ember`: burnt orange
  - `cream`: warm off-white
  - `brass`: antique tan and gold
- **Type:**
  - Anton for poster headlines
  - Oswald for labels and navigation
  - Libre Baskerville for serif accents
  - DM Sans for body text

  All four are self-hosted through `next/font`.
- **Texture:** one 11 KB tiled grain PNG and a halftone pattern, both used lightly.
- **Motion:**
  - Hero headline rises in line by line
  - Content reveals as you scroll (fade-up and image mask)
  - Slow zoom on the hero image
  - Slowly rotating emblem
  - Marquee ticker

  All of it is turned off under `prefers-reduced-motion`.
- **Accessibility:**
  - Semantic landmarks, skip link and a correct heading order
  - Visible focus states throughout
  - Mobile menu traps focus and closes on Escape
  - Form errors are announced to screen readers
  - Contrast-checked palette
