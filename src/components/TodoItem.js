"use client";

export default function TodoItem({ todo, onEdit, onDelete, onToggle }) {
  return (
    <li className="flex flex-col border p-3 rounded bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span className={`font-semibold ${todo.completed ? "line-through text-gray-500" : ""}`}>
            {todo.title}
          </span>
        </div>

        <div className="flex gap-2">
          <button className="bg-yellow-400 px-2 rounded" onClick={() => onEdit(todo)}>
            Edit
          </button>
          <button className="bg-red-500 text-white px-2 rounded" onClick={() => onDelete(todo.id)}>
            Delete
          </button>
        </div>
      </div>

      {/* Description */}
      {todo.description && (
        <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
      )}

      {/* Dates */}
      <p className="text-xs text-gray-500 mt-1">
        Created: {todo.createdAt}
      </p>
      <p className="text-xs text-gray-500">
        Updated: {todo.updatedAt}
      </p>
    </li>
  );
}
