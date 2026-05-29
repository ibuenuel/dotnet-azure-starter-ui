import { Suspense } from "react";
import { TodoDetail } from "@/components/todos/TodoDetail";
import { TodoDetailSkeleton } from "@/components/shared/TodoDetailSkeleton";

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
      <Suspense fallback={<TodoDetailSkeleton />}>
        <DetailShell params={params} />
      </Suspense>
    </main>
  );
}
