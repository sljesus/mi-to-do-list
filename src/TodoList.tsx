import React from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  editId: string | null;
  editText: string;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onStartEdit: (id: string, text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  editId,
  editText,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  onStartEdit,
  onToggle,
  onDelete,
}) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editId === todo.id}
          editText={editText}
          onEditChange={onEditChange}
          onSaveEdit={() => onSaveEdit(String(todo.id))}
          onCancelEdit={onCancelEdit}
          onStartEdit={() => onStartEdit(String(todo.id), todo.text)}
          onToggle={() => onToggle(String(todo.id))}
          onDelete={() => onDelete(String(todo.id))}
        />
      ))}
    </ul>
  );
};

export default TodoList;
