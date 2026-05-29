import type { ApiResponse, PagedResult } from "@/types/api";
import { TodoPriority, type TodoItem } from "@/types/todo";

export function makeTodo(overrides?: Partial<TodoItem>): TodoItem {
  return {
    id: "test-id-1",
    title: "Test Todo",
    description: null,
    isCompleted: false,
    dueDate: null,
    priority: TodoPriority.Medium,
    isOverdue: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

export function makePagedResult<T>(
  items: T[],
  overrides?: Partial<PagedResult<T>>,
): PagedResult<T> {
  return {
    items,
    page: 1,
    pageSize: 20,
    totalCount: items.length,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    ...overrides,
  };
}

export function makeApiResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    traceId: "test-trace-id",
  };
}

export function makeApiError(code: string, message: string): ApiResponse<never> {
  return {
    success: false,
    errorCode: code,
    errorMessage: message,
    traceId: "test-trace-id",
  };
}
