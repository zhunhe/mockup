import { useState } from 'react';
import Lists from './components/Lists';
import Form from './components/Form';
import type { TodoItem } from './types/todo';
import './App.css';

export default function App() {
  const initialTodoData: TodoItem[] = localStorage.getItem('todoData')
    ? JSON.parse(localStorage.getItem('todoData')!)
    : [];

  const [todoData, setTodoData] = useState<TodoItem[]>(initialTodoData);
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newTodo: TodoItem = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData([...todoData, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue('');
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        <Lists todoData={todoData} setTodoData={setTodoData} />

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
