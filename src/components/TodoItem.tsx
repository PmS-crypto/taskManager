import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../dndtypes';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onComplete, onDelete }: TodoItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TODO,
    item: { id: todo.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '4px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        cursor: 'move',
      }}
    >
      <p>{todo.todo}</p>
      <button onClick={() => onComplete(todo.id, !todo.completed)}>
        {todo.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
