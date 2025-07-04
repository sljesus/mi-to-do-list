import React from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  editText: string;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onStartEdit: () => void;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isEditing,
  editText,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  onStartEdit,
  onToggle,
  onDelete,
}) => {
  return (
    <li className={todo.completed ? "completed" : ""}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={onEditChange}
            className="edit-input"
          />
          <button onClick={onSaveEdit} className="save-btn">
            Guardar
          </button>
          <button onClick={onCancelEdit} className="cancel-btn">
            Cancelar
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggle}
            className="check-done"
          />
          <span
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
              marginLeft: 8,
            }}
          >
            {todo.text}
          </span>
          <button onClick={onStartEdit} className="edit-btn">
            Editar
          </button>
          <button onClick={onDelete} className="delete-btn">
            Eliminar
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
