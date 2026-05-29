export const TodoPriority = {
  High: 1,
  Medium: 2,
  Low: 3,
} as const;
export type TodoPriority = (typeof TodoPriority)[keyof typeof TodoPriority];

export const PRIORITY_LABEL: Record<TodoPriority, string> = {
  [TodoPriority.High]: "High",
  [TodoPriority.Medium]: "Medium",
  [TodoPriority.Low]: "Low",
};

export const PRIORITY_CLASS: Record<TodoPriority, string> = {
  [TodoPriority.High]: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  [TodoPriority.Medium]: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
  [TodoPriority.Low]: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
};

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
