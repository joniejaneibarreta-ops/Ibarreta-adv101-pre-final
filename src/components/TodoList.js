"use client";

import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  activeTab,
  search,
  onEdit,
  onDelete,
  onToggle,
}) {
  const filtered = todos
    .filter((t) => (activeTab === "todo" ? !t.completed : t.completed))
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <ul className="space-y-3 mt-4">
      {filtered.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}

      {filtered.length === 0 && (
        <p className="text-center text-gray-500">No tasks found.</p>
      )}
    </ul>
  );
}
