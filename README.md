# DEPRECATED — DO NOT USE THIS REPOSITORY

This repository is **not** the production source for `tnic.help`.

Production is deployed from:

`https://github.com/tvsnic0419/tnic-longevity-new`

Vercel project `tnic-help` is linked to `tvsnic0419/tnic-longevity-new`, branch `main`.

Do not run this repo locally. Do not commit new site work here. Do not expect pushes here to deploy `tnic.help`.

This repo is retained only as a historical reference until the GitHub repository can be archived by an account admin.

---

# Historical README

Evidence-based longevity education platform at [tnic.help](https://tnic.help).

## Stack

- **Next.js 16** (App Router) · **React 19** · **Tailwind CSS 4**
- **Vercel** — production hosting, domain, cron
- **Vitest** — unit tests · **ESLint** — linting

## Local development

Stop. Use `../tnic-longevity-new` instead.

```bash
npm install
cp .env.example .env.local   # fill secrets as needed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest unit tests |
| `npm run typecheck` | TypeScript check |
| `npm run ci` | Full CI pipeline locally |

## Deployment

**Production URL:** `https://tnic.help`  
**Vercel project:** `tnic-projects/tnic-help`  
**Infra reference:** `infra/vercel-project.json`

### How deploys work

1. Push to `main` on GitHub → Vercel auto-deploys production
2. PR branches get preview URLs (use their `*.vercel.app` hostname)
3. GitHub Actions runs lint + test + build on every push/PR

### Required Vercel env vars (Production)

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical URL (`https://tnic.help`) |
| `CRON_SECRET` | Yes | Protects `/api/cron/brief` |
| `RESEND_API_KEY` | For email | Protocol Brief delivery |
| `RESEND_FROM_EMAIL` | For email | Sender address |
| `LAB_WEBHOOK_SECRET` | Yes | Partner webhook auth |

See `.env.example` for the full list.

### Domain

- **Registrar:** Vercel (nameservers already configured)
- **Canonical:** `tnic.help` (apex)
- **Redirect:** `www.tnic.help` → `tnic.help` (308, in `vercel.json` + `middleware.ts`)

### Weekly cron

Vercel calls `GET /api/cron/brief` every Monday 09:00 UTC with `Authorization: Bearer $CRON_SECRET`.

## Project structure

```
app/          # Next.js routes & API
components/   # UI components
lib/          # Business logic, SEO, integrations
infra/        # Committed deployment metadata (not secrets)
```
