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

  const handleCompleteClick = () => {
    onComplete(todo.id, !todo.completed);
  };

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '16px',
        margin: '8px 0',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'move',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <h4>{todo.todo}</h4>
        <button onClick={handleCompleteClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          {todo.completed ? 'Incomplete' : 'Complete'}
        </button>
      </div>
      {/* <p style={{ marginBottom: '8px' }}>{todo.description || ''}</p> */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {/* <span>{todo.date || '12th Jan'}</span> */}
        <button onClick={() => onDelete(todo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
