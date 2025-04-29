'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/atomics/button';
import { useTodoStore } from '@/store/todoStore';

export function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim().length > 0) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">할 일 목록</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-l focus:outline-none"
          placeholder="할 일을 입력하세요"
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <Button onClick={handleAddTodo} className="rounded-l-none">
          추가
        </Button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-3 border rounded">
            <div className="flex items-center">
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} className="mr-2" />
              <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
            </div>
            <Button variant="destructive" size="sm" onClick={() => deleteTodo(todo.id)}>
              삭제
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
