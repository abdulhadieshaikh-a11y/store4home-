# STEALTH FITNESS — Website

A dark, premium, multi-page website for **Stealth Fitness**, Basement, 31C, Khayaban-e-Rahat, DHA Phase 6, Karachi.

It is plain static HTML, CSS and JavaScript: no framework, no build step and no third-party scripts. Upload the folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel) and it works.

```
stealth-fitness/
├── index.html          Home — cinematic brand experience
├── about.html          Philosophy, principles, environment
├── training.html       Experience, personal training, progress
├── facilities.html     Full gallery (with lightbox), equipment, location
├── programs.html       Seven training disciplines in detail
├── contact.html        Location, hours, map, enquiry
├── 404.html
├── assets/css/main.css Design system (tokens at the top)
├── assets/js/main.js   Interactions + site settings (top of file)
├── assets/fonts/       Bebas Neue + Manrope (self-hosted, SIL OFL)
├── assets/img/         Responsive WebP images, icons, social image
├── site.webmanifest  robots.txt  sitemap.xml
```

Preview locally with `python3 -m http.server` inside this folder, then open http://localhost:8000.

---

## ⚠️ Before going live: things only the owner can confirm

The brief said not to invent business information, so these items are either left out or flagged.

| Item | Where | Action |
|---|---|---|
| **Imagery** | `assets/img/` | All images are **original 3D renders** made for this site as art-directed stand-ins, because no Stealth photographs or logo were supplied. They show generic equipment, not the actual gym. Replace them with real photography (see below). |
| **Logo** | header, footer, `favicon.svg` | No logo was supplied, so a typographic "STEALTH / FITNESS" wordmark and a simple "S" favicon are used. Swap in the real logo, then adjust `--steel` in `main.css` to match the brand's accent. |
| **Programs list** | `programs.html`, home "Train with purpose", enquiry dropdown | Strength, Functional, Conditioning, Personal Training, Cardio, Mobility & Movement and General Fitness come from the brief. Remove any the gym does not offer. In the generated pages, each program is one `<article class="program">` or one `<li>` row. |
| **Personal training** | `training.html#personal-training` | Shown because the brief lists it. Delete the section if it isn't offered. No trainer names or qualifications are claimed. |
| **Equipment** | "Equipped to perform" sections | The copy is deliberately general ("Grip / Iron / Control"). Adjust it once real equipment photos are in. |
| **Instagram** | `assets/js/main.js` → `SITE.INSTAGRAM_URL` | The handle was not provided, so every "Follow Stealth" and Instagram link stays hidden until you paste the real profile URL there. The social grid images are placeholders for real posts. |
| **Testimonials** | `about.html` → `#voices` | Built but `hidden`. Add genuine member quotes only, then remove the `hidden` attribute. |
| **Membership / pricing** | — | Not shown. The site sends people to call or visit. |
| **Domain** | `sitemap.xml`, `robots.txt` | Replace `YOUR-DOMAIN`. Optionally add `<link rel="canonical">` and `og:url` to each page. |

## Replacing images with real photography

Each image is referenced by name, with several widths generated (for example `hero-640.webp`, `hero-1280.webp`, `hero-1920.webp`, `hero-2400.webp`). The simplest swap is to export real photos **with the same file names and widths** and overwrite the files. Keep aspect ratios close to the originals:

| Name | Used for | Ratio | Brief for the real photo |
|---|---|---|---|
| `hero` / `hero-mobile` | Home hero (desktop / portrait phone) | 16:9 / 9:16 | Athlete mid-lift or the training floor under dramatic light; keep the left side darker for the headline |
| `about` | About, "More than a gym" | 2:3 | Rack or athlete preparing, single light source |
| `exp-strength`, `exp-performance`, `exp-discipline`, `exp-community` | Experience panels | 3:4 | Heavy lift · conditioning movement · focused athlete · members training together |
| `prog-*`, `dumbbells` | Program rows and blocks | 16:10 | One photo per discipline; `prog-personal` = coach correcting a client's technique |
| `performance` / `performance-mobile` | "Built for performance" | 21:9 / 3:4 | Explosive athlete moment, chalk, sweat, backlight |
| `floor`, `ceiling`, `racks`, `stairs` | Facilities gallery | various | Real interior: training floor, lighting, rack line, the stairway down to the basement entrance |
| `knurl`, `eq-dumbbell`, `eq-kettlebell` | Equipment close-ups | 16:9, 1:1 | Macro details of the gym's own equipment |
| `progress-1/2/3` | Consistency → Discipline → Progress | 3:4 | Keep them conceptual; never use fabricated before/after photos |
| `og-stealth-fitness.jpg` | Social share preview | 1200×630 | Best hero shot |

A consistent grade across the photos (cool, low-saturation, deep blacks, controlled highlights) will keep the site feeling like one campaign.

## Editing

- **Colours and type:** CSS custom properties at the top of `assets/css/main.css`.
- **Phone, hours, Instagram:** the `SITE` object at the top of `assets/js/main.js`. It drives the live "Open now / Closed" indicator, which uses Karachi time. Phone and hours also appear in the HTML: search for `0337 8031654` and `10:30`.
- **Map:** it loads only when the visitor presses "Show map", so there are no Google requests on page load. It's a keyless Google Maps embed of the full address.
- **Enquiry form:** there is no server. Submitting builds a pre-filled text message to 0337 8031654 (opened directly on phones) and offers a call button. To collect enquiries by email instead, point the form at a form service (Formspree, Netlify Forms, etc.).

## What's built in

- Page transitions (dark curtain → wordmark → reveal), a nav that goes from transparent to blurred obsidian on scroll, and a fullscreen mobile menu.
- Line-by-line headline reveals, clipped image reveals, slow parallax, a pinned horizontal "Stealth Experience" scroll on desktop, a cursor-follow preview on program rows (desktop only), and a fullscreen gallery (keyboard arrows, swipe, Esc).
- A mobile fixed bar (Call now / Directions) that appears after the hero and hides at the footer.
- SEO: unique titles and descriptions per page, Open Graph and Twitter cards, `ExerciseGym` JSON-LD with address and opening hours, semantic landmarks, one H1 per page, and alt text on every image.
- Accessibility: skip link, visible focus states, `aria-expanded` and `inert` on the menu, a native `<dialog>` lightbox, labelled form fields with inline errors, and full `prefers-reduced-motion` support.
- Performance: WebP images with `srcset` and `sizes`, lazy loading below the fold, a preloaded hero, two self-hosted WOFF2 fonts, and about 14 KB of unminified JavaScript with no dependencies.

Checked with no horizontal overflow and no console errors at 1440, 390, 375 and 320 px.
