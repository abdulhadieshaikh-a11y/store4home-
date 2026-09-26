# Karachi Executive Gym — Website

Premium single-page website for Karachi Executive Gym, Gulshan-e-Iqbal, Karachi.
Built with Next.js 14 (App Router), Tailwind CSS and lucide-react.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

- `lib/site.js` — business details (phone, WhatsApp, address, maps links) and all photo URLs.
- `components/` — one component per section (Hero, TrustStrip, About, WhyUs, Training,
  Facilities, LadiesGents, JoinCta, Location, Contact, Footer, Navbar, MobileActionBar).
- `app/layout.js` — SEO metadata and ExerciseGym structured data.
- `tailwind.config.js` / `app/globals.css` — design system (black + athletic red).

## Notes

- Photos are high-quality Unsplash stock images loaded via `next/image`. To use the gym's own
  photos, put them in `public/` and change the `src` values in `lib/site.js` (e.g. `'/hero.jpg'`).
- The enquiry form has no backend: it opens WhatsApp with the visitor's details pre-filled.
- Optional: set `NEXT_PUBLIC_SITE_URL` to the live domain for canonical URLs and the sitemap.
