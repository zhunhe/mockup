import { useState, useEffect } from 'react';
import Lists from './components/Lists';
import Form from './components/Form';
import type { TodoItem } from './types/todo';
import { getTodos } from './services/api';
import './App.css';

export default function App() {
  const [todoData, setTodoData] = useState<TodoItem[]>([]);

  const fetchTodos = async () => {
    try {
      const todos = await getTodos();
      setTodoData(todos);
    } catch (error) {
      console.error('할 일 목록을 가져오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        <Lists fetchTodos={fetchTodos} todoData={todoData} />

        <Form fetchTodos={fetchTodos} />
      </div>
    </div>
  );
}
