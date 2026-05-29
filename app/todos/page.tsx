import { TodoList } from "@/components/todos/TodoList";

export const metadata = {
  title: "Todos — dotnet-azure-starter-ui",
};

export default function TodosPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Todos</h1>
        <p className="text-muted-foreground">Manage your tasks</p>
      </div>
      <TodoList />
    </main>
  );
}
