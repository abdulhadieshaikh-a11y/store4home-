# Carnage Gym — Website

A premium black & white website for **Carnage Gym**, Ittehad Commercial Area, Phase 6, DHA, Karachi.

Built with **Next.js 14 (App Router)**, **TypeScript** and **Tailwind CSS**. No UI libraries and no animation libraries: every page is statically pre-rendered, and the whole site ships about 87 kB of shared JavaScript.

## Pages

| Route         | Purpose                                                                  |
| ------------- | ------------------------------------------------------------------------ |
| `/`           | Cinematic hero, philosophy, featured facilities, environment, why Carnage, hours, location, CTA |
| `/about`      | Brand story, philosophy, training mindset, verified facts                |
| `/facilities` | Zone index, mosaic gallery with hover reveals, gym environment feature   |
| `/membership` | Placeholder plan cards (no prices), how to join, FAQ, enquiry CTAs       |
| `/hours`      | Mon–Sat 24 hours / Sunday closed, week bar, live open status, day-by-day |
| `/contact`    | Click-to-call, address, directions, contact form, Google Map             |

Also: custom 404, `sitemap.xml`, `robots.txt`, a generated Open Graph image, and `HealthClub` JSON-LD structured data.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the live domain.

## Editing content

Almost everything you'll want to change lives in three files:

- **`lib/site.ts`**: name, phone, address, hours, social links, navigation.
- **`lib/content.ts`**: facilities / training zones, "Why Carnage" pillars, membership plans, FAQ.
- **`lib/images.ts`**: every photo on the site.

### Things to replace before launch

1. **Logo.** No logo file was supplied, so a typographic wordmark is used. Add the official logo to `/public` (SVG preferred) and set `LOGO` in `components/Logo.tsx`. It supports separate light and dark versions. The favicon is `app/icon.svg`.
2. **Photography.** The photos are representative Unsplash images, shown in monochrome. Put the gym's own photos in `/public/images/` and point `lib/images.ts` at them (e.g. `'/images/floor.jpg'`). If a remote image ever fails to load, the site shows a textured dark panel instead of a broken image.
3. **Membership plans.** The cards are clearly marked placeholders ("On enquiry", "Details soon") and show no prices. In `lib/content.ts`, fill in `name`, `price`, `period` and `features`, then set `placeholder: false`.
4. **Facilities.** The zones describe general training areas. Confirm them with the gym and add, remove or reorder them in `lib/content.ts`. The layouts adapt automatically.
5. **Social media.** Add URLs in `lib/site.ts → social`. Until then the icons show as "Soon".
6. **Hero video (optional).** Pass `videoSrc="/video/hero.mp4"` to `<Hero />` in `app/page.tsx`.

## Contact form

The form validates on the client and on the server (`app/api/contact/route.ts`). It has a honeypot for spam, plus loading, success and error states.

To deliver enquiries by email, set these environment variables (uses [Resend](https://resend.com)):

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=owner@example.com
CONTACT_FROM_EMAIL="Carnage Gym <website@yourdomain.com>"
```

If they are **not** set:

- In development, submissions are logged to the console and the form shows success.
- In production, the form shows an error asking visitors to call. Enquiries are never silently lost.

## Design system

- **Type:** Anton (display) + Inter (body), loaded with `next/font`. Nothing extra is fetched when a page loads.
- **Colour:** `void #050505`, `coal`, `iron`, `ash`, `fog`, `bone #EDEBE6`, `chalk #F7F6F3`. No accent colour.
- **Motion:** CSS-only entrance animations, plus one shared IntersectionObserver for scroll reveals. Everything respects `prefers-reduced-motion`.
- **Accessibility:** semantic landmarks, a skip link, visible focus states, a keyboard-trapped mobile menu with Escape to close, labelled form fields with `aria-invalid` and linked error messages, and live regions for status.
