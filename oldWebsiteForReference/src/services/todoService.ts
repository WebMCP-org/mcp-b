import { z } from 'zod';

// Simple Todo type
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  created_at: string;
};

// Simple Zod schema for validation
const todoSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  completed: z.boolean(),
  created_at: z.string(),
});

// Sort parameters type
export type SortParams = {
  sortBy: 'created_at' | 'updated_at' | 'text' | 'completed';
  sortOrder: 'asc' | 'desc';
  completed?: boolean;
  search?: string;
};

export const DEFAULT_SORT_PARAMS: SortParams = {
  sortBy: 'created_at',
  sortOrder: 'desc',
};

const TODOS_KEY = 'todos';
const SORT_PARAMS_KEY = 'todo-sort-params';

// Basic localStorage operations
const getTodos = (): Todo[] => {
  // Return empty array during SSR
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(TODOS_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveTodos = (todos: Todo[]) => {
  // Skip during SSR
  if (typeof window === 'undefined') return;

  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  // Dispatch custom event for same-tab updates
  window.dispatchEvent(new CustomEvent('todos-updated'));
};

// Helper function for artificial delay
const delay = () => new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 700));

// Simple API
export const todoService = {
  getAll(): Todo[] {
    return getTodos();
  },

  async create(text: string): Promise<Todo> {
    await delay();

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      created_at: new Date().toISOString(),
    };

    const todos = getTodos();
    todos.push(newTodo);
    saveTodos(todos);

    return newTodo;
  },

  async update(
    id: string,
    updates: Partial<Pick<Todo, 'text' | 'completed'>>
  ): Promise<Todo | null> {
    await delay();

    const todos = getTodos();
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) return null;

    todos[index] = { ...todos[index], ...updates };
    saveTodos(todos);

    return todos[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay();

    const todos = getTodos();
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) return false;

    todos.splice(index, 1);
    saveTodos(todos);

    return true;
  },

  async deleteAll(): Promise<void> {
    await delay();
    saveTodos([]);
  },
};

// Sort params functions
export const getSortParamsFromStorage = (): SortParams => {
  // Return defaults during SSR
  if (typeof window === 'undefined') return DEFAULT_SORT_PARAMS;

  try {
    const stored = localStorage.getItem(SORT_PARAMS_KEY);
    if (!stored) return DEFAULT_SORT_PARAMS;
    return { ...DEFAULT_SORT_PARAMS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_SORT_PARAMS;
  }
};

export const updateSortParams = (newParams: Partial<SortParams>): void => {
  // Skip during SSR
  if (typeof window === 'undefined') return;

  const current = getSortParamsFromStorage();
  const updated = { ...current, ...newParams };
  localStorage.setItem(SORT_PARAMS_KEY, JSON.stringify(updated));

  // Dispatch custom event for same-tab updates
  window.dispatchEvent(new CustomEvent('todoSortParamsChanged'));
};

export const resetSortParams = (): void => {
  // Skip during SSR
  if (typeof window === 'undefined') return;

  localStorage.setItem(SORT_PARAMS_KEY, JSON.stringify(DEFAULT_SORT_PARAMS));

  // Dispatch custom event for same-tab updates
  window.dispatchEvent(new CustomEvent('todoSortParamsChanged'));
};
