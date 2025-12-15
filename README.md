# Soundloadmate

Offline-first audio trimming, merging, normalization, and export that runs entirely in the browser. No uploads required. Live site: https://soundloadmate.xyh.wiki

## Tech stack
- React + TypeScript + Vite
- Web Audio API for decode/trim/merge/normalize
- MediaRecorder (when available) for OGG/WEBM export; WAV export always available
- i18n with auto language detection (EN default, ES included)
- Light/dark themes with system preference respect

## Getting started
```bash
npm install
npm run dev
```
Visit `http://localhost:5173`.

## Build & preview
```bash
npm run build
npm run preview
```
Build output is written to `dist/`.

## Environment variables
Create `.env` from `.env.example`.
- `VITE_API_BASE` (optional): base URL for a lightweight heartbeat/analytics endpoint. If omitted, the app runs fully client-side with no network calls.

## Deployment (Dokploy + Nixpacks)
- Set repo root to `soundloadmate/`.
- Use Nixpacks with Node 18–25 (see `engines`).
- Install step: `npm install`
- Build step: `npm run build`
- Start/serve: static `dist/` (Dokploy static site or `npm run preview` behind a static server).
- Provide environment variables in Dokploy UI; no `.env` committed.

## SEO & assets
- Meta title/description, OG/Twitter tags, JSON-LD (WebApplication, FAQPage, BreadcrumbList).
- robots.txt and sitemap.xml in `public/`.
- Favicon set (ICO + PNG sizes 16/32/48/96/192/512 + apple-touch-icon) and `site.webmanifest`.

## Browser limitations & guidance
- Recommended input: <30 MB or <15 minutes per file; large files can spike memory on low-end mobile devices.
- Remote URLs must send permissive CORS headers; otherwise fetch fails—download locally first.
- MP3 export is **not** available because browsers cannot encode MP3 natively. Use WAV (lossless) or OGG/WEBM when MediaRecorder supports it.
- Rendering happens locally; keep other tabs minimal on constrained devices. Clear/reset workspace if performance degrades.

## Privacy guarantees
- Audio never leaves the browser; processing uses Web Audio API locally.
- Optional analytics heartbeat only sends anonymous metadata when `VITE_API_BASE` is set; otherwise no network requests occur.
- No third-party trackers.

## Project structure
```
soundloadmate/
  public/          # favicons, robots, sitemap, manifest
  src/
    components/    # layout + audio workspace
    sections/      # hero, how-it-works, use-cases, faq, about, related
    i18n/          # translations and provider
    theme/         # theme provider
    utils/         # audio helpers (decode, merge, export)
    styles/        # global styles and variables
    config/        # related links config
```

## Known limitations
- Requires browsers with Web Audio and (for OGG/WEBM) MediaRecorder support.
- URL ingest depends on CORS.
- Audio editing is linear (sequential merge) and not a full DAW; for multitrack editing use dedicated software.
