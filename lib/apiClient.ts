import type { ApiResponse, PagedResult } from "@/types/api";
import type { TodoItem, CreateTodoRequest, UpdateTodoRequest } from "@/types/todo";

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${base}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  return res.json() as Promise<ApiResponse<T>>;
}

export const apiClient = {
  getTodos: (page = 1, pageSize = 20) =>
    apiFetch<PagedResult<TodoItem>>(`/api/todos?page=${page}&pageSize=${pageSize}`),

  getTodo: (id: string) => apiFetch<TodoItem>(`/api/todos/${id}`),

  createTodo: (body: CreateTodoRequest) =>
    apiFetch<TodoItem>(`/api/todos`, { method: "POST", body: JSON.stringify(body) }),

  updateTodo: (id: string, body: UpdateTodoRequest) =>
    apiFetch<TodoItem>(`/api/todos/${id}`, { method: "PUT", body: JSON.stringify(body) }),

  deleteTodo: (id: string) =>
    apiFetch<object>(`/api/todos/${id}`, { method: "DELETE" }),
};
