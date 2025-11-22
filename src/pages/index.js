"use client";

import { useState } from "react";
import TodoList from "@/components/TodoList";
import TodoModal from "@/components/TodoModal";
import { generateId } from "@/utils/generateId";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("todo");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // --- OPEN MODALS ---
  const openAddModal = () => {
    setEditingTodo(null);
    setModalOpen(true);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setModalOpen(true);
  };

  // --- SAVE TODO (CREATE or UPDATE) ---
  const saveTodo = (title, description) => {
    if (!title.trim()) return;

    const now = new Date().toLocaleString();

    if (editingTodo) {
      // Update existing
      setTodos(
        todos.map((t) =>
          t.id === editingTodo.id
            ? { ...t, title, description, updatedAt: now }
            : t
        )
      );
    } else {
      // Create new
      setTodos([
        ...todos,
        {
          id: generateId(),
          title,
          description,
          createdAt: now,
          updatedAt: now,
          completed: false,
        },
      ]);
    }

    setModalOpen(false);
  };

  // --- TOGGLE COMPLETED ---
  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toLocaleString() } : t
      )
    );
  };

  // --- DELETE TODO ---
  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">To-Do App</h1>

      {/* Add Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={openAddModal}
      >
        + Add Task
      </button>

      {/* Search */}
      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "todo"
              ? "bg-gray-800 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("todo")}
        >
          To Do
        </button>

        <button
          className={`px-4 py-2 rounded ${
            activeTab === "completed"
              ? "bg-gray-800 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      {/* Todo List */}
      <TodoList
        todos={todos}
        activeTab={activeTab}
        search={search}
        onEdit={openEditModal}
        onDelete={deleteTodo}
        onToggle={toggleComplete}
      />

      {/* Modal */}
      <TodoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={saveTodo}
        editingTodo={editingTodo}
      />
    </div>
  );
}
