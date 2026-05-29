# dotnet-azure-starter-ui

Production-grade Next.js frontend for the [dotnet-azure-starter](https://github.com/ibuenuel/dotnet-azure-starter) REST API. Serves as the visual layer of the boilerplate and as a standalone portfolio piece showing full-stack engineering across independently deployable repositories.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![Azure](https://img.shields.io/badge/Azure-Static_Web_Apps-0078d4?logo=microsoftazure)

---

## Overview

This frontend consumes the `dotnet-azure-starter` .NET 10 REST API and demonstrates:

- Paginated todo list with full CRUD (create, edit, delete)
- Typed API client wrapping native `fetch` against `ApiResponse<T>` envelopes
- Optimistic updates via TanStack Query v5
- Schema-validated forms with React Hook Form + Zod
- Loading skeletons, error boundaries, and empty states

The project is deployed independently to **Azure Static Web Apps (Free Tier)** in the same subscription and resource group as the backend.

---

## Tech Stack

| Concern      | Technology                        |
| ------------ | --------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack) |
| Language     | TypeScript 5 (strict mode)        |
| Styling      | Tailwind CSS v4                   |
| Components   | shadcn/ui + @base-ui/react        |
| Server state | TanStack Query v5                 |
| HTTP client  | Native `fetch` + typed wrapper    |
| Forms        | React Hook Form + Zod             |
| Linting      | ESLint v9 Flat Config + Prettier  |
| Testing      | Vitest + React Testing Library + Playwright |
| Deployment   | Azure Static Web Apps (Free)      |
| IaC          | Azure Bicep                       |

---

## Project Status

| Phase | Description | Status |
| ----- | ----------- | ------ |
| 1 | Scaffold — Next.js 16, TypeScript strict, Tailwind v4, shadcn/ui, ESLint/Prettier | Complete |
| 2 | API Client — typed `apiClient`, `ApiResponse<T>` types, `.env` setup | Planned |
| 3 | Todo Feature — list, detail, create, edit, delete (hooks + components) | Planned |
| 4 | Polish — loading skeletons, error states, empty states, health banner | Planned |
| 5 | Tests — Vitest component tests, msw API mocking, Playwright E2E | Planned |
| 6 | IaC + CI/CD — Bicep, GitHub Actions CI, Azure SWA deploy workflow | Planned |
| 7 | Documentation — screenshots, architecture diagram | Planned |

---

## Prerequisites

- **Node.js 20.9+**
- **Backend running locally** — see [dotnet-azure-starter](https://github.com/ibuenuel/dotnet-azure-starter) (`docker compose up`)

---

## Local Development

```bash
# 1. Clone this repo
git clone https://github.com/ibuenuel/dotnet-azure-starter-ui
cd dotnet-azure-starter-ui

# 2. Start the backend (requires dotnet-azure-starter cloned separately)
# cd ../dotnet-azure-starter && docker compose up --build -d

# 3. Install dependencies
npm install

# 4. Configure environment
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL=http://localhost:8080

# 5. Start dev server
npm run dev
# → http://localhost:3000
```

---

## Available Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint + Prettier check |
| `npm run format` | Prettier write (auto-fix formatting) |

---

## Project Structure (Phase 1)

```
dotnet-azure-starter-ui/
├── app/
│   ├── layout.tsx          # Root layout — Geist fonts, metadata
│   ├── page.tsx            # Landing page — tech stack showcase
│   └── globals.css         # Tailwind v4 base + CSS theme variables
│
├── components/
│   └── ui/                 # shadcn/ui base components (badge, button, card, input, label, separator)
│
├── lib/
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
│
├── .env.example            # Environment variable documentation
├── components.json         # shadcn/ui configuration
├── eslint.config.mjs       # ESLint v9 Flat Config
├── next.config.ts          # cacheComponents: true
├── postcss.config.mjs      # @tailwindcss/postcss
└── tsconfig.json           # strict: true
```

---

## Environment Variables

| Variable | Description | Example |
| -------- | ----------- | ------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL — no trailing slash | `http://localhost:8080` |

Copy `.env.example` to `.env.local` before running `npm run dev`. In production, this is set as an Application Setting in Azure Static Web Apps via Bicep — never committed to source control.

---

## Deployment

The project deploys to **Azure Static Web Apps (Free Tier)**. Azure auto-generates a GitHub Actions workflow on resource creation that handles build and deploy on push to `main` and creates preview environments for PRs.

Infrastructure is defined in `infra/static-web-app.bicep` (Phase 6).

---

## Related

- **Backend:** [dotnet-azure-starter](https://github.com/ibuenuel/dotnet-azure-starter) — .NET 9 REST API on Azure App Service

---

_Author: Ismail Bünül — Senior Software Engineer & Deputy Head of IT_
