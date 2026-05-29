import { vi } from "vitest";

export const useRouter = vi.fn().mockReturnValue({
  push: vi.fn(),
  back: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
});

export const usePathname = vi.fn().mockReturnValue("/todos");
export const useSearchParams = vi.fn().mockReturnValue(new URLSearchParams());
