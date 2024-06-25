import React from 'react';
import KanbanColumn from './components/KanbanColumn';
import TodoForm from './components/TodoForm';
import { useTodos } from './hooks/useTodos';

const App = () => {
  const { todos, addNewTodo, updateTodo, removeTodo } = useTodos(1);

  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completeTodos = todos.filter((todo) => todo.completed);

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <KanbanColumn
        title="Incomplete"
        todos={incompleteTodos}
        onComplete={updateTodo}
        onDelete={removeTodo}
      />
      <KanbanColumn
        title="Complete"
        todos={completeTodos}
        onComplete={updateTodo}
        onDelete={removeTodo}
      />
      <TodoForm onAdd={addNewTodo} />
    </div>
  );
};

export default App;
