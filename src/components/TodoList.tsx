import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Array<{ id: number; todo: string; completed: boolean }>;
  onComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoList = ({ todos, onComplete, onDelete }: TodoListProps) => {
  return (
    <List>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
};

const List = styled.div`
  padding: 20px;
  background: #f9f9f9;
  border-radius: 5px;
`;

export default TodoList;
