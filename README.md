# Carlos García — Portfolio / CV

Personal portfolio and online CV of Carlos García, Senior Backend / Platform Engineer.

🌐 **Live site:** [https://cagm-website.vercel.app](https://cagm-website.vercel.app) (English) · [https://cagm-website.vercel.app/es](https://cagm-website.vercel.app/es) (Español)

Built with [Nuxt 3](https://nuxt.com), Tailwind CSS and `@nuxtjs/i18n`, deployed on Vercel.

## Content

All CV content (experience, skills, projects, education, SEO texts) lives in the locale files:

- `locales/en-US.ts` — English (default locale, served at `/`)
- `locales/es-ES.ts` — Spanish (served at `/es`)

Every visitor starts in English (no browser-language redirect). Old `/en/...` links
redirect with a 301 to the same page without the prefix.

Both files must keep the same structure; a unit test fails if they drift apart.
Contact data and profile links live in `utils/profile.ts`.

The social preview image is generated with `bun scripts/generate-og-image.mjs`.

`/llms.txt` ([llmstxt.org](https://llmstxt.org)) summarizes the site and the CV in Markdown
for AI assistants and agents; it is generated from the English locale.

## Harvard CV

The CV is generated from the same locale files in Harvard format:

- `/cv` and `/es/cv` show it as a page (printable with the browser).
- `/cv/carlos-garcia-cv-es.pdf` and `/cv/carlos-garcia-cv-en.pdf` generate the PDF on
  the server with pdfkit (`server/routes/cv/[file].get.ts`), with selectable text for ATS.

Both render one model, `buildHarvardCv()` in `utils/harvard-cv.ts`. The PDF embeds the
Tinos font (`server/assets/fonts`, SIL Open Font License) at a readable 10 pt; longer
content continues on a second page, keeping each role's heading with its first lines.

## "Ask my CV" chat

A floating assistant answers visitors' questions using only the CV content
(`server/api/chat.post.ts`). It calls DeepSeek, streams the answer, and is rate
limited per IP and per day with Upstash Redis; see `.env.example` for all variables.

The widget stays hidden unless `GET /api/chat/status` confirms the chat can answer:
it is not turned off (`CHAT_ENABLED=false`), the DeepSeek key is set, Redis is reachable
with quota left today, and the DeepSeek account has balance. The result is cached for a
minute, and the reason it is hidden is logged on the server.

On Vercel the chat refuses to run without Redis. Locally, without Redis, it
falls back to an in-memory limit. The e2e tests use a mock DeepSeek server
(`tests/e2e/mock-deepseek.mjs`), so they never call the real API.

## Notion sync

Notion is the source of truth for the CV. The locale files are the published copy,
and `.github/workflows/notion-sync.yml` keeps them in step:

1. Once a day (11:17 UTC, or on demand from the Actions tab) it reads the Notion pages
   listed in `scripts/notion-sync/sources.ts` as Markdown.
2. If they differ from `content/notion-snapshot.md` (the version used in the last sync),
   DeepSeek receives the previous and current Notion text plus the current website
   content, and applies only what changed to both languages. It never invents facts,
   drops items marked as excluded from the CV, and keeps the `{years}` placeholder.
3. The answer is validated (same structure in es/en, known work modes and skill levels)
   and written to `locales/*.ts`. Website-only content (metrics, navigation, SEO texts,
   client projects, icons) is never touched.
4. A pull request on the `notion-sync` branch lists the changes. Nothing is published
   until you merge it. Lint and unit tests run first; if they fail, the PR is a draft.

Run it locally with `NOTION_TOKEN=... DEEPSEEK_API_KEY=... bun scripts/notion-sync/index.ts --dry-run`.

One-time setup:

- Create a Notion internal integration (Settings → Connections → Develop or manage
  integrations) with read access, and share the CV page (or its parent) with it.
- Add the repository secrets `NOTION_TOKEN` and `DEEPSEEK_API_KEY`.
- Enable Settings → Actions → General → "Allow GitHub Actions to create and approve
  pull requests".

Pull requests opened by the workflow do not start the CI workflow themselves
(a GitHub rule for `GITHUB_TOKEN`); the Vercel preview still builds.

## Setup

This project uses [Bun](https://bun.sh) (also on Vercel):

```bash
bun install
```

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Development server on `http://localhost:3000` |
| `bun run build` | Production build |
| `bun run preview` | Preview the production build |
| `bun run lint` | ESLint |
| `bun run test` | Unit tests (Vitest) |
| `bun run test:e2e` | E2E tests (Playwright) against the production build — run `bun run build` first |

The first time, install the Playwright browser with `bunx playwright install chromium`.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs lint, unit tests and the build on every
pull request, then the Playwright suite on desktop and mobile viewports.
`notion-sync.yml` runs the Notion sync described above.
