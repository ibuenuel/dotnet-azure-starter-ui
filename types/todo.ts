export const TodoPriority = {
  High: 1,
  Medium: 2,
  Low: 3,
} as const;
export type TodoPriority = (typeof TodoPriority)[keyof typeof TodoPriority];

export interface TodoItem {
  id: string;
  title: string;
  description?: string | null;
  isCompleted: boolean;
  dueDate?: string | null;
  priority: TodoPriority;
  isOverdue: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string | null;
  dueDate?: string | null;
  priority: TodoPriority;
}

export interface UpdateTodoRequest {
  title: string;
  description?: string | null;
  isCompleted: boolean;
  dueDate?: string | null;
  priority: TodoPriority;
}
