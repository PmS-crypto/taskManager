import React from 'react';
import KanbanColumn from './components/KanbanColumn';
import TodoForm from './components/TodoForm';
import { useTodos } from './hooks/useTodos';

const App = () => {
  const { todos, addNewTodo, updateTodo, removeTodo } = useTodos(1);

  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completeTodos = todos.filter((todo) => todo.completed);

  const handleDrop = (id: number, completed: boolean) => {
    updateTodo(id, completed);
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <KanbanColumn
        title="Incomplete"
        todos={incompleteTodos}
        onDrop={handleDrop}
        onComplete={updateTodo}
        onDelete={removeTodo}
      />
      <KanbanColumn
        title="Complete"
        todos={completeTodos}
        onDrop={handleDrop}
        onComplete={updateTodo}
        onDelete={removeTodo}
      />
      <TodoForm onAdd={addNewTodo} />
    </div>
  );
};

export default App;
