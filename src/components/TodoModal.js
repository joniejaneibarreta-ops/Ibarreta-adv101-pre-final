"use client";
import { useEffect, useState } from "react";

export default function TodoModal({ open, onClose, onSave, editingTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTodo]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">

        <h2 className="text-xl font-bold mb-4">
          {editingTodo ? "Edit Task" : "Add Task"}
        </h2>

        {/* Title */}
        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Task Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <textarea
          className="w-full border p-2 rounded mb-4"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => onSave(title, description)}
          >
            {editingTodo ? "Update" : "Add"}
          </button>
        </div>

      </div>
    </div>
  );
}
