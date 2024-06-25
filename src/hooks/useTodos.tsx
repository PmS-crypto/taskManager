import { useState, useEffect } from 'react';
import { getTodos, addTodo, editTodo, deleteTodo } from '../services/api';
import { Todo } from '../types';

export const useTodos = (userId: number) => {
  const [todos, setTodos] = useState<Todo[]>([]);
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
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const updateTodo = async (id: number, completed: boolean) => {
    try {
      await editTodo(id, { completed });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const removeTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  return {
    todos,
    loading,
    error,
    addNewTodo,
    updateTodo,
    removeTodo,
  };
};
