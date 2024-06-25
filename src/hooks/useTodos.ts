import { useState, useEffect } from 'react';
import axios from 'axios';
import { Todo } from '../types';

const uniqueId = () => Math.floor(Math.random() * 100000);

export const useTodos = (userId: number) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/todos/user/${userId}`);
        setTodos(response.data.todos);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchTodos();
  }, [userId]);

  const addNewTodo = (title: string) => {
    const newTodo: Todo = {
      id: uniqueId(),
      todo: title,
      completed: false,
      userId,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodo = async (id: number, completed: boolean) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.completed = completed;
        setTodos([...todos]);
        await axios.put(`https://dummyjson.com/todos/${id}`, { completed });
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const removeTodo = async (id: number) => {
    try {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      await axios.delete(`https://dummyjson.com/todos/${id}`);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return {
    todos,
    addNewTodo,
    updateTodo,
    removeTodo,
  };
};
