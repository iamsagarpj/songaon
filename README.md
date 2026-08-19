# Digital Gram Panchayat

A production-quality, Marathi-first Digital Gram Panchayat website for Indian village citizens.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide Icons
- PWA-ready (vite-plugin-pwa)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Features

- Marathi-first with English toggle
- Accessibility toolbar (text size, high contrast)
- Village-wide search
- Government schemes with guided finder
- Complaint registration & tracking (mock)
- Projects, facilities, announcements, forms
- Mobile-first with bottom navigation
- Configuration-driven village data
- Service layer ready for API integration

## Village Configuration

Edit `src/config/village.ts` to customize village name, contact, stats, and officials.

## Mock Data

Sample data is in `src/data/`. All sample content is marked with `isSample: true` where applicable.
