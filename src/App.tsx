import { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // Leer tareas en tiempo real
  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("text"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Todo[]
      );
    });
    return () => unsubscribe();
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await addDoc(collection(db, "todos"), {
      text: input.trim(),
      completed: false,
    });
    setInput("");
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    await updateDoc(doc(db, "todos", id), { completed: !completed });
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const startEdit = (id: string, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = async (id: string) => {
    await updateDoc(doc(db, "todos", id), { text: editText });
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
          onToggle={(id) => {
            const todo = todos.find((t) => t.id === id);
            if (todo) toggleTodo(id, todo.completed);
          }}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
