import React from 'react';
import styled from 'styled-components';

interface TodoItemProps {
  todo: { id: number; todo: string; completed: boolean };
  onComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onComplete, onDelete }: TodoItemProps) => {
  return (
    <Item>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onComplete(todo.id, !todo.completed)}
      />
      <span>{todo.todo}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </Item>
  );
};

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
`;

export default TodoItem;
