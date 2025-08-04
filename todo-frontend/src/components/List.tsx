import { useState } from 'react';
import type { TodoItem } from '../types/todo';

interface ListProps {
  title: string;
  completed: boolean;
  id: number;
  todoData: TodoItem[];
  setTodoData: (data: TodoItem[]) => void;
}

export default function List({
  title,
  completed,
  id,
  todoData,
  setTodoData,
}: ListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const btnStyle = {
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right' as const,
  };

  const getStyle = (completed: boolean) => {
    return {
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: completed ? 'line-through' : 'none',
    };
  };

  const handleClick = (id: number) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };

  const handleCompleteChange = (id: number) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.title = editedTitle;
      }
      return data;
    });

    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form style={getStyle(completed)} onSubmit={handleSubmit}>
        <input value={editedTitle} autoFocus onChange={handleEditChange} />
        <button
          type="button"
          style={btnStyle}
          onClick={() => setIsEditing(false)}
        >
          X
        </button>
        <button type="submit" style={btnStyle}>
          Save
        </button>
      </form>
    );
  } else {
    return (
      <div style={getStyle(completed)}>
        <input
          type="checkbox"
          onChange={() => handleCompleteChange(id)}
          checked={completed}
        />
        {title}
        <button style={btnStyle} onClick={() => handleClick(id)}>
          X
        </button>
        <button style={btnStyle} onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </div>
    );
  }
}
