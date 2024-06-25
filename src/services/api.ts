import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com/',
});

export const getTodos = (userId: number) => api.get(`/todos/user/${userId}`);
export const addTodo = (todo: { todo: string; completed: boolean; userId: number }) => api.post('/todos/add', todo);
export const editTodo = (id: number, todo: { completed: boolean }) => api.put(`/todos/${id}`, todo);
export const deleteTodo = (id: number) => api.delete(`/todos/${id}`);
