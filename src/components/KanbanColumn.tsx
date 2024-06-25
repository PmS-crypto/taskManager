import React from 'react';
import { useDrop } from 'react-dnd';
import TodoItem from './TodoItem';
import { ItemTypes } from '../dndTypes';
import { Todo } from '../types';

interface KanbanColumnProps {
  title: string;
  todos: Todo[];
  onDrop: (id: number, completed: boolean) => void;
  onComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const KanbanColumn = ({
  title,
  todos,
  onDrop,
  onComplete,
  onDelete,
}: KanbanColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TODO,
    drop: (item: { id: number }) => onDrop(item.id, title === 'Complete'),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? '#e0e0e0' : '#f0f0f0',
        padding: '8px',
        width: '300px',
        minHeight: '400px',
        borderRadius: '4px',
      }}
    >
      <h2>{title}</h2>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default KanbanColumn;
