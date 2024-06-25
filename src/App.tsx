import React from 'react';
import { ThemeProvider } from './contexts/ThemeProvider';
import { GlobalStyles } from './styles/globalStyles';
import KanbanColumn from './components/KanbanColumn';
import TodoForm from './components/TodoForm';
import { useTodos } from './hooks/useTodos';

const App = () => {
  const { todos, addNewTodo, updateTodo, removeTodo } = useTodos(1);

  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completeTodos = todos.filter((todo) => todo.completed);

  return (
    <ThemeProvider>
      <GlobalStyles />
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
      </div>
      <TodoForm onAdd={addNewTodo} />
    </ThemeProvider>
  );
};

export default App;
