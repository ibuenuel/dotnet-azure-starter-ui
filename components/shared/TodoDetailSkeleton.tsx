export function TodoDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="h-8 w-2/3 rounded bg-muted" />
          <div className="flex items-center gap-2">
            <div className="h-5 w-14 rounded-full bg-muted" />
            <div className="h-5 w-20 rounded-full bg-muted" />
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <div className="h-8 w-16 rounded bg-muted" />
          <div className="h-8 w-16 rounded bg-muted" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <div className="h-3 w-20 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-1">
              <div className="h-3 w-16 rounded bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <div className="h-8 w-32 rounded bg-muted" />
      </div>
    </div>
  );
}
