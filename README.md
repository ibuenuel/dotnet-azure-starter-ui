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
- Skeleton loaders, contextual error states with retry, and empty state UX
- API health banner — polls `GET /health` every 30 s and surfaces connectivity issues

The project is deployed independently to **Azure Static Web Apps (Free Tier)** in the same subscription and resource group as the backend.

---

## Tech Stack

| Concern      | Technology                                  |
| ------------ | ------------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack)          |
| Language     | TypeScript 5 (strict mode)                  |
| Styling      | Tailwind CSS v4                             |
| Components   | shadcn/ui + @base-ui/react                  |
| Server state | TanStack Query v5                           |
| HTTP client  | Native `fetch` + typed wrapper              |
| Forms        | React Hook Form + Zod                       |
| Linting      | ESLint v9 Flat Config + Prettier            |
| Testing      | Vitest + React Testing Library + Playwright |
| Deployment   | Azure Static Web Apps (Free)                |
| IaC          | Azure Bicep                                 |

---

## Project Status

| Phase | Description                                                                       | Status   |
| ----- | --------------------------------------------------------------------------------- | -------- |
| 1     | Scaffold — Next.js 16, TypeScript strict, Tailwind v4, shadcn/ui, ESLint/Prettier | Complete |
| 2     | API Client — typed `apiClient`, `ApiResponse<T>` types, `.env` setup              | Complete |
| 3     | Todo Feature — list, detail, create, edit, delete (hooks + components)            | Complete |
| 4     | Polish — loading skeletons, error states, empty states, health banner             | Complete |
| 5     | Tests — Vitest component tests, msw API mocking, Playwright E2E                   | Complete |
| 6     | IaC + CI/CD — Bicep, GitHub Actions CI, Azure SWA deploy workflow                 | Complete |
| 7     | Documentation — screenshots, architecture diagram                                 | Planned  |

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

| Command              | Description                             |
| -------------------- | --------------------------------------- |
| `npm run dev`        | Start dev server (Turbopack)            |
| `npm run build`      | Production build                        |
| `npm run start`      | Serve production build                  |
| `npm run type-check` | TypeScript type-check (no emit)         |
| `npm run lint`       | ESLint + Prettier check                 |
| `npm run format`     | Prettier write (auto-fix formatting)    |
| `npm test`           | Vitest unit/component tests             |
| `npm run e2e`        | Playwright E2E tests (requires backend) |

---

## Project Structure (Phase 1 – 6)

```
dotnet-azure-starter-ui/
├── app/
│   ├── layout.tsx          # Root layout — Geist fonts, metadata, HealthBanner, Providers
│   ├── page.tsx            # Landing page — tech stack showcase
│   ├── providers.tsx       # QueryClientProvider (Client Component)
│   ├── globals.css         # Tailwind v4 base + CSS theme variables
│   └── todos/
│       ├── page.tsx        # Paginated todo list (Server Component)
│       └── [id]/
│           └── page.tsx    # Todo detail — Suspense + async shell (cacheComponents compat)
│
├── components/
│   ├── ui/                 # shadcn/ui base components (badge, button, card, input, label, separator)
│   ├── todos/
│   │   ├── TodoList.tsx        # Paginated grid + Base UI Dialog for create
│   │   ├── TodoCard.tsx        # Todo card — priority badge, overdue date, completion toggle
│   │   ├── TodoForm.tsx        # Create/edit form — React Hook Form + Zod v4
│   │   ├── TodoDeleteButton.tsx # Delete button — loading + inline error state
│   │   └── TodoDetail.tsx      # Detail view with inline edit toggle
│   └── shared/
│       ├── LoadingSpinner.tsx  # Animated spinner
│       ├── Pagination.tsx      # Previous/Next pagination controls
│       ├── TodoCardSkeleton.tsx # Skeleton placeholder matching TodoCard layout
│       ├── TodoDetailSkeleton.tsx # Skeleton placeholder matching TodoDetail layout
│       ├── ErrorState.tsx      # Error message with optional retry button
│       └── HealthBanner.tsx    # API health banner — shown only when backend unreachable
│
├── hooks/
│   ├── useTodos.ts         # GET /api/todos (paginated)
│   ├── useTodo.ts          # GET /api/todos/:id
│   ├── useCreateTodo.ts    # POST /api/todos
│   ├── useUpdateTodo.ts    # PUT /api/todos/:id
│   ├── useDeleteTodo.ts    # DELETE /api/todos/:id
│   └── useHealth.ts        # GET /health — polls every 30 s
│
├── lib/
│   ├── apiClient.ts        # Typed fetch wrapper — all HTTP calls go through here
│   ├── queryClient.ts      # makeQueryClient() factory
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
│
├── types/
│   ├── api.ts              # ApiResponse<T>, PagedResult<T>, PaginationRequest
│   └── todo.ts             # TodoItem, TodoPriority, PRIORITY_LABEL/CLASS, CreateTodoRequest, UpdateTodoRequest
│
├── __mocks__/
│   └── next/
│       ├── link.tsx        # Manual mock — renders plain <a> in tests
│       └── navigation.ts   # Manual mock — vi.fn() stubs for useRouter, usePathname
│
├── __tests__/
│   ├── setup.ts            # MSW server lifecycle + jest-dom + env vars
│   ├── mocks/
│   │   ├── factories.ts    # Type-safe test data builders (makeTodo, makeApiResponse, …)
│   │   ├── handlers.ts     # Default MSW happy-path handlers for all 6 endpoints
│   │   └── server.ts       # setupServer(…handlers)
│   ├── utils/
│   │   └── renderWithProviders.tsx  # QueryClient wrapper + createWrapper() for renderHook
│   ├── components/         # 22 component tests (ErrorState, HealthBanner, TodoCard, TodoForm, TodoList, TodoDeleteButton)
│   └── hooks/              # 12 hook tests (all 6 CRUD + useHealth hooks)
│
├── e2e/
│   └── todos.spec.ts       # Playwright — view list, create, edit, delete flows
│
├── infra/
│   └── static-web-app.bicep  # Azure Static Web Apps Free Tier — prefix/environment/backendUrl params
│
├── .github/
│   └── workflows/
│       └── ci.yml          # CI — type-check → lint → vitest → next build (PR + push to main)
│
├── .env.example            # Environment variable documentation
├── components.json         # shadcn/ui configuration
├── eslint.config.mjs       # ESLint v9 Flat Config
├── next.config.ts          # cacheComponents: true
├── playwright.config.ts    # Playwright — Chromium, webServer: npm run dev
├── postcss.config.mjs      # @tailwindcss/postcss
├── tsconfig.json           # strict: true
└── vitest.config.ts        # jsdom, globals, setupFiles, vite-tsconfig-paths
```

---

## Environment Variables

| Variable              | Description                              | Example                 |
| --------------------- | ---------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL — no trailing slash | `http://localhost:8080` |

Copy `.env.example` to `.env.local` before running `npm run dev`. In production, this is set as an Application Setting in Azure Static Web Apps via Bicep — never committed to source control.

---

## Deployment

The project deploys to **Azure Static Web Apps (Free Tier)** in the same subscription and resource group as the backend. Infrastructure is defined in [`infra/static-web-app.bicep`](infra/static-web-app.bicep).

### Prerequisites

- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) installed and logged in (`az login`)
- An existing Azure resource group (e.g. `rg-dotnetazstarter-dev`)
- The backend API already deployed and its URL available

### 1 — Provision the Static Web App

```bash
az deployment group create --resource-group rg-dotnetazstarter-dev --template-file infra/static-web-app.bicep --parameters prefix=dotnetazstarter environment=dev backendUrl=https://app-dotnetazstarter-dev.azurewebsites.net
```

This creates the `swa-dotnetazstarter-dev` resource and injects `NEXT_PUBLIC_API_URL` as an Azure Application Setting — the production URL is never committed to source control.

### 2 — Connect GitHub and set the deploy token

Because the Bicep template does not include GitHub repository parameters, the GitHub connection must be established manually after provisioning.

**2a — Get the deploy token from Azure:**

```bash
az staticwebapp secrets list --name swa-dotnetazstarter-dev --resource-group rg-dotnetazstarter-dev --query "properties.apiKey" -o tsv
```

**2b — Add it as a GitHub Secret:**

Repository → Settings → Secrets and variables → Actions → New repository secret

| Name                              | Value                  |
| --------------------------------- | ---------------------- |
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | _(token from step 2a)_ |

**2c — Connect the GitHub repo in Azure Portal:**

Open the SWA resource → **GitHub Actions** → **Configure** → select your repository and `main` branch. Azure pushes a `.github/workflows/azure-static-web-apps-<hash>.yml` file to the repo automatically.

From that point on, CI/CD is fully automatic:

| Event               | Result                                               |
| ------------------- | ---------------------------------------------------- |
| Push to `main`      | Build + deploy to production                         |
| Pull request opened | Build + deploy to preview URL (posted as PR comment) |
| Pull request closed | Preview environment deleted                          |

### 3 — Deployed URL

```bash
az staticwebapp show --name swa-dotnetazstarter-dev --resource-group rg-dotnetazstarter-dev --query "defaultHostname" -o tsv
```

### GitHub Secrets summary

| Secret                            | Set by                 |
| --------------------------------- | ---------------------- |
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | Manually (see step 2b) |

`NEXT_PUBLIC_API_URL` is **not** a GitHub Secret — it is managed as an Azure Application Setting via Bicep.

---

## Related

- **Backend:** [dotnet-azure-starter](https://github.com/ibuenuel/dotnet-azure-starter) — .NET 10 REST API on Azure App Service

---

_Author: Ismail Bünül — Senior Software Engineer & Deputy Head of IT_
