"use client";

import { useState } from "react";
import { WifiOff } from "lucide-react";
import { useHealth } from "@/hooks/useHealth";
import { Button } from "@/components/ui/button";

export function HealthBanner() {
  const { isHealthy } = useHealth();
  const [dismissed, setDismissed] = useState(false);

  if (isHealthy || dismissed) return null;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-destructive/20 bg-destructive/5 px-4 py-2 text-sm text-destructive">
      <div className="flex items-center gap-2">
        <WifiOff className="size-4 shrink-0" aria-hidden="true" />
        <span>Cannot reach the API. Some features may be unavailable.</span>
      </div>
      <Button variant="ghost" size="xs" onClick={() => setDismissed(true)} aria-label="Dismiss">
        Dismiss
      </Button>
    </div>
  );
}
