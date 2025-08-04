import List from './List';
import type { TodoItem } from '../types/todo';

interface ListsProps {
  todoData: TodoItem[];
  setTodoData: (data: TodoItem[]) => void;
}

export default function Lists({ todoData, setTodoData }: ListsProps) {
  return (
    <div>
      {todoData.map((data) => (
        <List
          key={data.id}
          title={data.title}
          completed={data.completed}
          id={data.id}
          todoData={todoData}
          setTodoData={setTodoData}
        />
      ))}
    </div>
  );
}
