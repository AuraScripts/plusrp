# PLUS RP Website

Black & white FiveM server website built with Next.js 15 + Tailwind + Auth.js (Discord).

## Features

- Home page with stats
- Store (Tebex Credits packages)
- Playtime Leaderboard (txAdmin playersDB.json via VPS)
- Wiki sections
- Account panel (Discord OAuth → character data from ESX)

## Quick start

```bash
cd plusrp-web
cp .env.example .env.local
# Fill in Discord + Tebex values
npm install
npm run dev
```

Open http://localhost:3000

## Environment variables

See `.env.example`

### Discord Application
1. https://discord.com/developers/applications → New Application
2. OAuth2 → Redirects → add `http://localhost:3000/api/auth/callback/discord`
3. (Later) also add `https://plusrp.vercel.app/api/auth/callback/discord`
4. Copy Client ID + Client Secret into `.env.local`

### Tebex
- Store: https://plusrp.tebex.store
- Webhook URL (after deploy): `https://plusrp.vercel.app/api/tebex/webhook`

## VPS API (required for leaderboard + character data)

A small Node.js API needs to run on your VPS that:
- Reads `/home/fivem/txData/default/data/playersDB.json`
- Queries MySQL `users` table by `discord` column

Example endpoint structure will be provided separately.

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Import in Vercel
3. Add all environment variables
4. Deploy

Domain will be `plusrp.vercel.app` (or your custom domain).
