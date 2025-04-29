'use client';

import { create } from 'zustand';
import { z } from 'zod';

const TodoSchema = z.object({
  id: z.string(),
  text: z.string().min(1, '할 일을 입력해주세요.'),
  completed: z.boolean().default(false),
});

export type Todo = z.infer<typeof TodoSchema>;

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],

  addTodo: (text: string) => {
    try {
      const newTodo = TodoSchema.parse({
        id: Date.now().toString(),
        text,
        completed: false,
      });

      set((state) => ({
        todos: [...state.todos, newTodo],
      }));
    } catch (error) {
      console.error('유효하지 않은 Todo:', error);
    }
  },

  toggleTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    }));
  },

  deleteTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
}));
