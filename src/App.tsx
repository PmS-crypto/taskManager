import React from 'react';
import KanbanColumn from './components/KanbanColumn';
import TodoForm from './components/TodoForm';
import { useTodos } from './hooks/useTodos';
import SideNavbar from './components/SideNavbar';

const App = () => {
  const { todos, addNewTodo, updateTodo, removeTodo } = useTodos(1);

  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completeTodos = todos.filter((todo) => todo.completed);

  const handleDrop = (id: number, completed: boolean) => {
    updateTodo(id, completed);
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar />
      <div style={{ display: 'flex', gap: '20px', padding: '20px', flex: 1 }}>
        <KanbanColumn
          title="TO DO"
          todos={incompleteTodos}
          onDrop={handleDrop}
          onComplete={updateTodo}
          onDelete={removeTodo}
        />
        <KanbanColumn
          title="DOING"
          todos={completeTodos}
          onDrop={handleDrop}
          onComplete={updateTodo}
          onDelete={removeTodo}
        />
      </div>
      <TodoForm onAdd={addNewTodo} />
    </div>
  );
};

export default App;
