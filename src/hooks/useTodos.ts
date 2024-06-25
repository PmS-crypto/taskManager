import { useState, useEffect } from 'react';
import { getTodos, addTodo, editTodo, deleteTodo } from '../services/api';
import { Todo } from '../types';

export const useTodos = (userId: number) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [localTodos, setLocalTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await getTodos(userId);
        setTodos(response.data.todos);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch todos');
        setLoading(false);
      }
    };
    fetchTodos();
  }, [userId]);

  const addNewTodo = async (todo: string) => {
    try {
      const response = await addTodo({
        todo,
        completed: false,
        userId,
      });
      setLocalTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const updateTodo = async (id: number, completed: boolean) => {
    try {
      // Check if the todo is local or from the server
      const isLocalTodo = localTodos.some(todo => todo.id === id);
      if (isLocalTodo) {
        setLocalTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed } : todo
          )
        );
      } else {
        await editTodo(id, { completed });
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed } : todo
          )
        );
      }
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const removeTodo = async (id: number) => {
    try {
      // Check if the todo is local or from the server
      const isLocalTodo = localTodos.some(todo => todo.id === id);
      if (isLocalTodo) {
        setLocalTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        await deleteTodo(id);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const allTodos = [...todos, ...localTodos];

  return {
    todos: allTodos,
    loading,
    error,
    addNewTodo,
    updateTodo,
    removeTodo,
  };
};
