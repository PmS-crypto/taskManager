import React, { useState } from 'react';

interface TodoFormProps {
  onAdd: (todo: string) => void;
}

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [newTodo, setNewTodo] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAdd(newTodo);
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
