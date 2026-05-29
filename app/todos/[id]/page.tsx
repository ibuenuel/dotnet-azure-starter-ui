import { Suspense } from "react";
import { TodoDetail } from "@/components/todos/TodoDetail";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function DetailShell({ params }: PageProps) {
  const { id } = await params;
  return <TodoDetail id={id} />;
}

export default function TodoDetailPage({ params }: PageProps) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Suspense
        fallback={
          <div className="flex justify-center py-16">
            <LoadingSpinner className="size-8" />
          </div>
        }
      >
        <DetailShell params={params} />
      </Suspense>
    </main>
  );
}
