import type { TodoItem } from '../types/todo';

const API_BASE_URL = 'http://localhost:4000/api';

export const getTodos = async (): Promise<TodoItem[]> => {
  const response = await fetch(`${API_BASE_URL}/todos`);
  return response.json();
};

export const createTodo = async (
  todo: Omit<TodoItem, 'id'>,
): Promise<TodoItem> => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const updateTodo = async (
  id: string,
  todo: TodoItem,
): Promise<TodoItem> => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
};
