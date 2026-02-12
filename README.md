# postcode-pt-web

[![CI](https://github.com/RobertoCCC/postcode-pt-web/actions/workflows/ci.yml/badge.svg)](https://github.com/RobertoCCC/postcode-pt-web/actions/workflows/ci.yml)
[![Live demo](https://img.shields.io/badge/demo-postcode--pt--web.vercel.app-black?logo=vercel)](https://postcode-pt-web.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Frontend for the [postcode-pt](https://github.com/RobertoCCC/postcode-pt) API — search Portuguese postal codes (CP4-CP3) and browse the district → municipality → locality hierarchy.

**Live demo:** https://postcode-pt-web.vercel.app

## Features

- **Postal code search** — type 7 digits (with or without the hyphen) and get every entry for that code, including street, locality, municipality and district.
- **District browser** — list of all 29 Portuguese districts with drill-down to each district's municipalities.
- **Dark mode** — light / dark / system toggle persisted via `next-themes`.
- **Mobile-first responsive** — layouts adapted for phone, tablet and desktop.
- **Server Components + cache** — data fetched on the server with a 1-day revalidate for static endpoints.

## Stack

| Layer      | Technology                                                  |
| ---------- | ----------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack, Server Components)       |
| Language   | TypeScript 5 (strict)                                       |
| Styling    | Tailwind CSS 4                                              |
| Components | shadcn/ui (Base UI)                                         |
| Theming    | next-themes                                                 |
| Linting    | ESLint 9                                                    |
| Hosting    | Vercel                                                      |
| CI         | GitHub Actions                                              |

## Project structure

```
src/
├── app/
│   ├── layout.tsx                # Root layout + ThemeProvider + SiteHeader
│   ├── page.tsx                  # Home: search form + districts link
│   ├── districts/
│   │   ├── page.tsx              # List of the 29 districts
│   │   └── [code]/page.tsx       # District + municipalities
│   └── postal-codes/
│       └── [code]/
│           ├── page.tsx          # Postal code details
│           └── not-found.tsx     # Message for invalid / missing codes
├── components/
│   ├── site-header.tsx           # Header with nav + theme toggle
│   ├── theme-provider.tsx        # next-themes wrapper
│   ├── theme-toggle.tsx          # Light / dark / system dropdown
│   ├── search-form.tsx           # Client form with CP4-CP3 validation
│   └── ui/                       # shadcn primitives
└── lib/
    └── api.ts                    # Typed client + normalization helpers
```

## Development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

The app consumes `https://postcode-pt.onrender.com/v1` by default. To point at a local backend, create `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/v1
```

## Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Development server (Turbopack)           |
| `npm run build`     | Production build                         |
| `npm run start`     | Serve the production build               |
| `npm run lint`      | ESLint                                   |
| `npm run typecheck` | Type-check (`tsc --noEmit`)              |

## CI/CD

Every push to `main` and every PR runs GitHub Actions with `lint`, `typecheck` and `build`. Vercel also reacts to every push on `main` and publishes automatically to https://postcode-pt-web.vercel.app.

## Related projects

- [postcode-pt](https://github.com/RobertoCCC/postcode-pt) — FastAPI service that powers this frontend
- [postcode-pt-cli](https://github.com/RobertoCCC/postcode-pt-cli) — Go CLI for the same API (`pcpt 1100-038`)

## Roadmap

- [ ] Search history (localStorage)
- [ ] Per-municipality page with the list of localities
- [ ] Locality name suggestions / autocomplete
- [ ] Sitemap.xml + dynamic OpenGraph images
- [ ] E2E tests (Playwright)

## License

[MIT](LICENSE)
