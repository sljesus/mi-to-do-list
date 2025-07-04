import React from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  editId: number | null;
  editText: string;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveEdit: (id: number) => void;
  onCancelEdit: () => void;
  onStartEdit: (id: number, text: string) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
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
          onSaveEdit={() => onSaveEdit(todo.id)}
          onCancelEdit={onCancelEdit}
          onStartEdit={() => onStartEdit(todo.id, todo.text)}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
