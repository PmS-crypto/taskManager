import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../dndTypes';
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
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TODO,
    drop: (item: { id: number }) => onDrop(item.id, title === "DONE"),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} style={{ padding: '16px', backgroundColor: isOver ? '#f0f0f0' : '#e0e0e0', borderRadius: '8px', flex: 1 }}>
      <h2>{title}</h2>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onComplete={onComplete} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default KanbanColumn;
