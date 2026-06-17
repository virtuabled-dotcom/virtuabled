# Virtuabled

South Africa's disability talent network — placing qualified professionals with disabilities into real, permanent roles, aligned to the 3% Employment Equity target.

React 19 + TypeScript + Vite 6 + Tailwind 4. Video heroes, local-first candidate portal, and an AI guide (Elmarie) powered by NVIDIA NIM.

## Run locally

**Prerequisites:** Node.js 18+

1. Install dependencies: `npm install`
2. (Optional, for AI features) copy `.env.example` to `.env` and set `NVIDIA_API_KEY`.
3. Run the app: `npm run dev`

The site works fully without any keys — Elmarie falls back to quick answers + email, and the candidate portal stores data locally. The AI features (`/api/elmarie`, `/api/parse-cv`) activate once `NVIDIA_API_KEY` is set and the app is deployed (or run via `vercel dev`).

## Deploy (Vercel)

The repo is Vercel-ready (`vercel.json` + serverless functions in `/api`).

1. Push to GitHub (`virtuabled-dotcom/virtuabled`).
2. In Vercel: **New Project → Import** this repo. Framework auto-detects as **Vite** (build `npm run build`, output `dist`).
3. **Settings → Environment Variables**, add:
   - `NVIDIA_API_KEY` — from https://build.nvidia.com (powers Elmarie + CV parsing)
   - `NVIDIA_MODEL` *(optional)* — defaults to `meta/llama-3.3-70b-instruct`
4. Deploy. Add the custom domain **virtuabled.com** under **Settings → Domains**.

### What's live after deploy
- **Elmarie AI chat** — `/api/elmarie`, grounded in Virtuabled's facts/voice, key server-side only.
- **CV parsing** — `/api/parse-cv` turns CV text into a structured candidate profile.
- **Contact** — `hello@virtuabled.com` (CVs & enquiries), `partners@virtuabled.com` (NPOs & business). Forms open the visitor's email client (no backend needed).

## Architecture notes
- Heroes are video (`HeroVideo`) + an animated aurora backdrop (`HeroAuroraBackdrop`); no WebGL.
- Candidate media (photo + intro video) is captured in `Apply` and stored in IndexedDB (`src/utils/mediaStore.ts`) — this maps cleanly onto cloud storage when a database is added.
- Persistence today is local-first (`src/utils/localStore.ts`). The full server-backed pipeline (auth, DB, storage) is the next phase — see the plan file.
