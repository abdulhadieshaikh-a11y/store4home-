# Organic Fitness Studio — Website

A premium, editorial single-page website for **Organic Fitness Studio**, Khayaban-e-Nishat Lane, DHA Phase 6, Karachi.

Pure HTML / CSS / vanilla JS. No build step and no dependencies.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080   # then visit http://localhost:8080
```

Deploy by uploading the folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel).

## Structure

```
index.html              All sections, SEO meta, Open Graph, JSON-LD (ExerciseGym)
assets/css/styles.css   Design system (tokens at the top), layout, motion, responsive rules
assets/js/main.js       Nav, mobile menu, reveals, parallax, experience switcher,
                        pinned equipment scroll, gallery lightbox, booking dialog,
                        live "open now" status (Asia/Karachi), lazy map
assets/img/favicon.svg  Monogram favicon
site.webmanifest, robots.txt
```

## Before launch: checklist

1. **Photography.** The page currently uses curated, hot-linked Unsplash photography (free licence) as art-directed stand-ins. Replace them with real photos of the studio when you can: search `data-photo=` in `index.html`. For self-hosted images, replace each `src`/`srcset` with your own files (WebP/AVIF, ~2200px wide for full-bleed images, ~1200px for the others). If an image ever fails to load, the page automatically swaps in a backup photo, then an elegant beige placeholder.
2. **Instagram.** Replace `https://www.instagram.com/` (search `data-instagram`) with the studio's profile URL.
3. **Domain.** Replace `https://organicfitnessstudio.pk/` in the `<head>` (canonical, `og:url`, JSON-LD) with the real domain.
4. **Testimonials.** No reviews are invented. Add real, permission-granted quotes using the commented template in the "In Their Words" section. With two or more, the slider arrows turn on automatically.
5. **Booking.** "Book a visit" opens a dialog. It pre-writes an SMS to 0335 8229378, and a Call button sits beside it. To use WhatsApp or a form service instead, change the `submit` handler in `main.js`.

## Built in

- Semantic landmarks, one H1, and an ordered H2/H3 hierarchy. Every image has descriptive alt text.
- Keyboard accessible: skip link, visible focus, Esc closes the menu and dialogs, arrow keys move through the gallery.
- `prefers-reduced-motion` turns off parallax, the pinned scroll and the reveal animations.
- Responsive `srcset`, lazy loading, a preloaded hero image, a map iframe that only loads near the viewport, and scroll effects that animate transforms only.
