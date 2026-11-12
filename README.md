# Gemsteak — Sajith KP Portfolio

Single-page interactive CV in the Gemsteak style (ruby crystal + faceted stone, thick ink outlines).

**Stack:** [Astro 7](https://astro.build) (static output) · Tailwind CSS 4 · GSAP 3 (ScrollTrigger) · Lilita One + Nunito (self-hosted via Fontsource). Hosted on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs static site to dist/
npm run preview    # serve the built dist/
```

## Where things live

| Path | What |
| --- | --- |
| `src/data/cv.ts` | All CV text (hero, story, skills, experience, training). Edit here, not in components. |
| `src/data/vault.ts` | Projects, achievements and guilds shown in The Archives. |
| `src/components/` | One component per section (`Hero`, `Story`, `SkillTree`, `Archives`, `Experience`, `TrainingGuilds`, `Footer`) plus `Hud`, `GemLogo`, `Crystal`, `SectionHead`. |
| `src/styles/global.css` | Design tokens (`@theme`) and the Gemsteak component skins: `.panel-stone`, `.panel-slate`, `.gem-btn`, `.btn-stone`, `.slot`, `.level-card`, `.signpost`, `.banner`, `.board`. |
| `src/scripts/main.ts` | Star field, HUD/XP bar, hero parallax, scroll reveals, skill-tree vines, experience trail. Respects `prefers-reduced-motion`. |
| `public/textures/` | Low-poly faceted textures. Regenerate with `node scripts/gen-textures.mjs`. |
| `design/stitch/` | The Google Stitch output this build was based on (mockup, logo, DESIGN.md, prompt). Not deployed. |

## Deploy to Vercel

**Option A — Git (recommended):**
1. Push this folder to a GitHub repo.
2. In Vercel: *Add New → Project → Import* the repo. The framework is detected as Astro; `vercel.json` already sets the build command and the `dist` output.
3. Every push to `main` deploys to production, and every other branch or PR gets a preview URL.

**Option B — CLI:**

```bash
npm i -g vercel
vercel          # first run links the project and makes a preview deploy
vercel --prod   # production deploy
```

After the first deploy, set `site` in `astro.config.mjs` to your real URL (or custom domain) so the canonical and OG URLs are correct.

## Stitch MCP

The Stitch MCP server is registered for this project in `~/.claude.json` (local scope). Restart Claude Code to load its tools (`generate_screen_from_text`, `edit_screens`, …). The Stitch project ID is `11353744353586506062`.
