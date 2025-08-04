import { useState } from 'react';
import { createTodo } from '../services/api';

export default function Form({ fetchTodos }: { fetchTodos: () => void }) {
  const [input, setInput] = useState<string>('');

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createTodo({
        title: input,
        done: false,
      });
      setInput('');
      fetchTodos();
    } catch (error) {
      console.error('할 일 생성에 실패했습니다:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form style={{ display: 'flex' }} onSubmit={handleCreate}>
      <input
        type="text"
        style={{ flex: '10', padding: '5px' }}
        placeholder="할 일을 입력하세요"
        value={input}
        onChange={handleChange}
      />
      <input type="submit" value="입력" className="btn" style={{ flex: '1' }} />
    </form>
  );
}
