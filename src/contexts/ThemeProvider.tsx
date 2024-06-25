// contexts/ThemeProvider.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext({
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState(theme.light);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === theme.light ? theme.dark : theme.light
    );
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// hooks/useTodos.ts
import { useState, useEffect } from 'react';
import { getTodos, addTodo, editTodo, deleteTodo } from '../services/api';

export const useTodos = (userId: number) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getTodos(userId);
      setTodos(response.data.todos);
    })();
  }, [userId]);

  const addNewTodo = async (todo: string) => {
    const response = await addTodo({
      todo,
      completed: false,
      userId,
    });
    setTodos([...todos, response.data]);
  };

  const updateTodo = async (id: number, completed: boolean) => {
    await editTodo(id, { completed });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  };

  const removeTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return { todos, addNewTodo, updateTodo, removeTodo };
};
