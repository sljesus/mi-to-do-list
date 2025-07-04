import { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="main-column">
      <div className="menu-bar">
        <img
          src="/Logo Dorado WEB.webp"
          alt="Logo Dorado"
          style={{ height: 40, marginRight: 12, verticalAlign: "middle" }}
        />
        <h1 style={{ display: "inline", verticalAlign: "middle" }}>
          SST To Do List
        </h1>
      </div>
      <div className="todo-app">
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Agregar tarea"
          />
          <button type="submit">Agregar</button>
        </form>
        <TodoList
          todos={todos}
          editId={editId}
          editText={editText}
          onEditChange={(e) => setEditText(e.target.value)}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
          onStartEdit={startEdit}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
