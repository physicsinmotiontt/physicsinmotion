# Physics in Motion — Next.js + Tailwind (Vercel-ready)

A production-ready landing page for CSEC Physics (Forms 3–5). Video-first hero with graceful fallbacks, mobile-friendly layout, and color-coded CTAs.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Then in the Vercel dashboard: Project → **Settings → Domains** → Add `physicsinmotion.com` and follow the DNS instructions shown (usually A/AAAA or CNAME).

### Notes
- Hero media prefers `https://i.imgur.com/ipAGpIZ.mp4` / `.webm`, then falls back to `.gif` → `.png` → `.jpg`.
- Non-hero images are lazy-loaded for performance.
- Colors: Register (blue), WhatsApp (green), Progress Reports (red).
