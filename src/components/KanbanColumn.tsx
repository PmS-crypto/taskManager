import React from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import TodoList from './TodoList';
import { Todo } from '../types';

interface KanbanColumnProps {
  title: string;
  todos: Todo[];
  onComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const KanbanColumn = ({ title, todos, onComplete, onDelete }: KanbanColumnProps) => {
  const [, ref] = useDrop({
    accept: 'TODO',
    drop: () => ({ name: title }),
  });

  return (
    <Column ref={ref}>
      <h2>{title}</h2>
      <TodoList todos={todos} onComplete={onComplete} onDelete={onDelete} />
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
