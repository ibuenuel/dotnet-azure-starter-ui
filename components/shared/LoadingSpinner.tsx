import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "inline-block size-6 animate-spin rounded-full border-2 border-current border-t-transparent text-muted-foreground",
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
