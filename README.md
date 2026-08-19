# Digital Gram Panchayat — Sonegaon Tarf Satara

A production-quality, **Marathi-first** Digital Gram Panchayat website for Indian village citizens. Configured for **Sonegaon Tarf Satara** (Satara taluka, Satara district, Maharashtra).

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- React Router v6
- Lucide Icons
- PWA-ready (`vite-plugin-pwa`)

## Getting Started

**Requirements:** Node.js 20+ (see `.nvmrc`)

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Environment variables (optional)

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `VITE_SITE_URL` | Public site URL (no trailing slash). Used for canonical and Open Graph URLs. |

## Build

```bash
npm run build
npm run preview
```

Production output is written to `dist/`.

## Deploy on Netlify

This project is ready for [Netlify](https://www.netlify.com/) with zero extra configuration when connected to Git.

### Option A — Connect Git repository (recommended)

1. Push this repo to GitHub, GitLab, or Bitbucket.
2. In Netlify: **Add new site → Import an existing project**.
3. Netlify reads `netlify.toml` automatically:

   | Setting | Value |
   |---------|--------|
   | Build command | `npm run build` |
   | Publish directory | `dist` |
   | Node version | `20` (from `.nvmrc` / `netlify.toml`) |

4. Add environment variable (optional but recommended):

   - **Key:** `VITE_SITE_URL`
   - **Value:** `https://your-site-name.netlify.app` (or your custom domain)

5. Deploy. Client-side routes (e.g. `/schemes`, `/contact`) work via SPA fallback in `netlify.toml`.

### Option B — Netlify CLI

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

For continuous deploys, link the site once:

```bash
netlify init
git push
```

### After first deploy

1. Set `VITE_SITE_URL` in Netlify to your live URL and **trigger a redeploy** so SEO meta tags pick it up.
2. Update `public/robots.txt` with your real sitemap URL if you add one.
3. Replace placeholder contact/official names in `src/config/village.ts` when available.

### Custom domain

In Netlify: **Domain management → Add custom domain**. No code changes required; update `VITE_SITE_URL` to match the custom domain.

## Project structure

```
src/
├── config/village.ts    # Village name, stats, contact — edit for your GP
├── config/images.ts     # Image paths
├── data/                # Mock announcements, schemes, projects, etc.
├── services/            # Mock API layer (swap for real backend later)
├── pages/               # Route pages
├── components/          # UI, layout, home sections
└── locales/             # Marathi (mr) and English (en) strings
public/
└── images/village/      # Local village photos
```

## Features

- Marathi-first UI with English toggle
- Accessibility toolbar (text size, high contrast)
- Village-wide search
- Government schemes with guided finder
- Complaint registration & tracking (mock)
- Projects, facilities, announcements, downloadable forms
- Mobile-first layout with bottom navigation
- Configuration-driven village data
- Service layer ready for API integration

## Village configuration

Edit `src/config/village.ts` to customize village name, taluka, district, census stats, contact details, and officials.

Sample/mock content lives in `src/data/` and is marked with `isSample: true` where applicable.

## License

Private / project use — adjust as needed for your Gram Panchayat deployment.
