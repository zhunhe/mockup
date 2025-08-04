import { useState } from 'react';
import { deleteTodo, updateTodo } from '../services/api';
import type { TodoItem } from '../types/todo';

interface ListProps {
  todoData: TodoItem;
  fetchTodos: () => void;
}

export default function List({ todoData, fetchTodos }: ListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todoData.title);

  const btnStyle = {
    color: '#000',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right' as const,
  };

  const getStyle = (done: boolean) => {
    return {
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: done ? 'line-through' : 'none',
    };
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleDone = async () => {
    todoData.done = !todoData.done;
    await updateTodo(todoData.id, todoData);
    fetchTodos();
  };

  const handleTitleEditing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleEdited = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    todoData.title = editedTitle;
    await updateTodo(todoData.id, todoData);
    fetchTodos();
  };

  if (isEditing) {
    return (
      <form style={getStyle(todoData.done)} onSubmit={handleTitleEdited}>
        <input value={editedTitle} autoFocus onChange={handleTitleEditing} />
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
      <div style={getStyle(todoData.done)}>
        <input
          type="checkbox"
          onChange={() => handleDone()}
          checked={todoData.done}
        />
        {todoData.title}
        <button style={btnStyle} onClick={() => handleDelete(todoData.id)}>
          X
        </button>
        <button style={btnStyle} onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </div>
    );
  }
}
