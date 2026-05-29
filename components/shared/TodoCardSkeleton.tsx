export function TodoCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-xl border bg-card animate-pulse">
      <div className="flex items-start justify-between gap-2 p-6 pb-2">
        <div className="space-y-1.5 flex-1">
          <div className="h-4 w-3/4 rounded bg-muted" />
          <div className="h-3 w-1/2 rounded bg-muted" />
        </div>
        <div className="h-5 w-14 shrink-0 rounded-full bg-muted" />
      </div>
      <div className="flex-1 space-y-2 px-6 pb-3">
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-2/3 rounded bg-muted" />
        <div className="flex items-center gap-2 pt-1">
          <div className="h-4 w-4 rounded bg-muted" />
          <div className="h-3 w-28 rounded bg-muted" />
        </div>
      </div>
      <div className="flex justify-between px-6 py-4">
        <div className="h-3 w-10 rounded bg-muted" />
        <div className="h-7 w-16 rounded bg-muted" />
      </div>
    </div>
  );
}
