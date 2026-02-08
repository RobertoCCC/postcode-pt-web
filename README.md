# postcode-pt-web

[![CI](https://github.com/RobertoCCC/postcode-pt-web/actions/workflows/ci.yml/badge.svg)](https://github.com/RobertoCCC/postcode-pt-web/actions/workflows/ci.yml)
[![Live demo](https://img.shields.io/badge/demo-postcode--pt--web.vercel.app-black?logo=vercel)](https://postcode-pt-web.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Frontend para a API [postcode-pt](https://github.com/RobertoCCC/postcode-pt) — pesquisa códigos postais portugueses (CP4-CP3) e explora a hierarquia distrito → concelho → localidade.

**Demo ao vivo:** https://postcode-pt-web.vercel.app

## Funcionalidades

- **Pesquisa de código postal** — introduz 7 dígitos (com ou sem hífen) e vê todas as entradas associadas, incluindo arruamento, localidade, concelho e distrito.
- **Browser de distritos** — lista dos 29 distritos portugueses com drill-down para os concelhos de cada um.
- **Dark mode** — alternância claro/escuro/sistema persistida via `next-themes`.
- **Mobile-first responsivo** — layouts adaptados a telemóvel, tablet e desktop.
- **Server Components + cache** — fetches no servidor com revalidate de 1 dia para dados estáticos.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Server Components) |
| Linguagem | TypeScript 5 (strict) |
| Estilos | Tailwind CSS 4 |
| Componentes | shadcn/ui (Base UI) |
| Temas | next-themes |
| Lint | ESLint 9 |
| Deploy | Vercel |
| CI | GitHub Actions |

## Estrutura

```
src/
├── app/
│   ├── layout.tsx                # Root layout + ThemeProvider + SiteHeader
│   ├── page.tsx                  # Home: search form + districts link
│   ├── districts/
│   │   ├── page.tsx              # Lista dos 29 distritos
│   │   └── [code]/page.tsx       # Distrito + concelhos
│   └── postal-codes/
│       └── [code]/
│           ├── page.tsx          # Detalhes do código postal
│           └── not-found.tsx     # Mensagem para CP inválido/inexistente
├── components/
│   ├── site-header.tsx           # Header com nav + theme toggle
│   ├── theme-provider.tsx        # Wrapper next-themes
│   ├── theme-toggle.tsx          # Dropdown claro/escuro/sistema
│   ├── search-form.tsx           # Client form com validação CP4-CP3
│   └── ui/                       # shadcn primitives
└── lib/
    └── api.ts                    # Cliente tipado + helpers de normalização
```

## Desenvolvimento

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

A app consome `https://postcode-pt.onrender.com/v1` por defeito. Para apontar a um backend local, cria `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/v1
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento (Turbopack) |
| `npm run build` | Build de produção |
| `npm run start` | Servir build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificação de tipos (`tsc --noEmit`) |

## CI/CD

Cada push para `main` e cada PR despoletam GitHub Actions com `lint`, `typecheck` e `build`. A Vercel reage também a cada push em `main` e publica automaticamente em https://postcode-pt-web.vercel.app.

## Roadmap

- [ ] Histórico de pesquisas (localStorage)
- [ ] Página de cada concelho com lista de localidades
- [ ] Sugestões/autocomplete de localidades a partir do nome
- [ ] Sitemap.xml + OpenGraph images dinâmicos
- [ ] Testes E2E (Playwright)

## Licença

[MIT](LICENSE)
