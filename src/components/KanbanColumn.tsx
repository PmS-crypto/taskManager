import React from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../dndtypes';
import TodoItem from './TodoItem';
import { Todo } from '../types';

interface KanbanColumnProps {
  title: string;
  todos: Todo[];
  onDrop: (id: number, completed: boolean) => void;
  onComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const KanbanColumn = ({ title, todos, onDrop, onComplete, onDelete }: KanbanColumnProps) => {
  const [, ref] = useDrop(() => ({
    accept: ItemTypes.TODO,
    drop: (item: { id: number }) => {
      const completed = title === 'Complete';
      onDrop(item.id, completed);
    },
  }));

  return (
    <Column ref={ref}>
      <h2>{title}</h2>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </Column>
  );
};

const Column = styled.div`
  flex: 1;
  padding: 20px;
  background: #e0e0e0;
  border-radius: 5px;
  margin: 0 10px;
`;

export default KanbanColumn;
