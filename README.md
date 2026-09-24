# Atom Bench

A virtual chemistry lab and school for ages 8–18, in English and Romanian.
- 60 lessons in 4 stages.
- A realistic lab with 60+ guided experiments.
- All 118 elements and 80 molecules to build.
- A teacher (Professor Ion / Profesoara Iona) who talks you through it.

## How it's built
- `app/` is the source. The page is `head.html` + `body.html` plus the JS files listed in `app/build.sh`. Lessons are in `app/lessons/`, and `app/lessons/SPEC.md` explains how to write new ones.
- `public/index.html` is the built page, a single file. **Don't edit it by hand.** Run `npm run build` instead.
- `src/worker.js` is the Cloudflare Worker that serves the site.
- `extras/` holds the parked ElevenLabs voice server, for when lessons are paid.

## Deploys
Every push to `main` runs `.github/workflows/deploy.yml`: it builds the page and deploys to Cloudflare Workers. It needs two repository secrets:
- `CLOUDFLARE_API_TOKEN`, a token made from the "Edit Cloudflare Workers" template.
- `CLOUDFLARE_ACCOUNT_ID`

The site is served at `https://atom-bench.<account-subdomain>.workers.dev`. A custom domain can be added in Cloudflare under Workers & Pages → atom-bench → Settings → Domains & Routes.

## Local development
```bash
npm install
npm run dev      # builds and serves at http://localhost:8787
```
