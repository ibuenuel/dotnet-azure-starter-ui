import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const STACK = [
  { label: "Next.js 16", description: "App Router, Turbopack, Cache Components" },
  { label: "React 19", description: "Server Components, concurrent features" },
  { label: "TypeScript 5", description: "Strict mode — no any, full type safety" },
  { label: "Tailwind v4", description: "Utility-first, inline theme, zero runtime" },
  { label: "shadcn/ui", description: "Code-owned components, no opaque dependency" },
  { label: "TanStack Query v5", description: "Async state, caching, pagination" },
  { label: "React Hook Form + Zod", description: "Schema-validated forms" },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24">
      <div className="w-full max-w-2xl space-y-10">
        <div className="space-y-4">
          <Badge variant="outline" className="text-xs font-mono">
            dotnet-azure-starter-ui
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Full-stack boilerplate showcase
          </h1>
          <p className="text-lg text-muted-foreground">
            A production-grade Next.js frontend consuming the{" "}
            <a
              href="https://github.com/ibuenuel/dotnet-azure-starter"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              dotnet-azure-starter
            </a>{" "}
            REST API. Clean architecture, typed API client, optimistic updates.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/todos" className={buttonVariants({ size: "lg" })}>
            View Todos
          </Link>
          <a
            href="https://github.com/ibuenuel/dotnet-azure-starter-ui"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Frontend
          </a>
          <a
            href="https://github.com/ibuenuel/dotnet-azure-starter"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Backend
          </a>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {STACK.map(({ label, description }) => (
              <Card key={label} className="border-border/60">
                <CardHeader className="pb-1 pt-4 px-4">
                  <CardTitle className="text-sm font-semibold">{label}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4 px-4">
                  <CardDescription className="text-xs">{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
