import List from './List';
import type { TodoItem } from '../types/todo';

interface ListsProps {
  fetchTodos: () => void;
  todoData: TodoItem[];
}

export default function Lists({ fetchTodos, todoData }: ListsProps) {
  return (
    <div>
      {todoData.map((data) => {
        return <List key={data.id} todoData={data} fetchTodos={fetchTodos} />;
      })}
    </div>
  );
}
