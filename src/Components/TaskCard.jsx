import React from "react";
import { Draggable } from "@hello-pangea/dnd";

/**
 * TaskCard Component
 * Professional task card with progress bar, description, category, and column indicator
 * Supports drag-and-drop operations with visual feedback
 */
const TaskCard = ({ task, index, onDelete, onEdit, columnId }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editField, setEditField] = React.useState(null);
  const [editedTitle, setEditedTitle] = React.useState(task.title);
  const [editedDescription, setEditedDescription] = React.useState(
    task.description || "",
  );
  const [editedProgress, setEditedProgress] = React.useState(
    task.progress || 0,
  );
  const inputRef = React.useRef(null);

  const priorityConfig = {
    high: { color: "bg-red-100 text-red-700 border-red-300", emoji: "🔴" },
    medium: {
      color: "bg-orange-100 text-orange-700 border-orange-300",
      emoji: "🟠",
    },
    low: { color: "bg-green-100 text-green-700 border-green-300", emoji: "🟢" },
  };

  const categoryConfig = {
    Design: { color: "bg-purple-100 text-purple-700", icon: "🎨" },
    Frontend: { color: "bg-blue-100 text-blue-700", icon: "💻" },
    Feature: { color: "bg-pink-100 text-pink-700", icon: "✨" },
    Backend: { color: "bg-green-100 text-green-700", icon: "⚙️" },
    QA: { color: "bg-yellow-100 text-yellow-700", icon: "🧪" },
  };

  const columnConfig = {
    "column-1": { name: "To Do", icon: "📝", color: "text-red-600" },
    "column-2": { name: "In Progress", icon: "⚡", color: "text-orange-600" },
    "column-3": { name: "Done", icon: "✅", color: "text-green-600" },
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onEdit(task.id, {
        title: editedTitle.trim(),
        description: editedDescription,
        progress: editedProgress,
      });
      setIsEditing(false);
      setEditField(null);
    } else {
      setEditedTitle(task.title);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      setEditedTitle(task.title);
      setEditedDescription(task.description || "");
      setEditedProgress(task.progress || 0);
      setIsEditing(false);
      setEditField(null);
    }
  };

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (editField === "title") {
        inputRef.current.select();
      }
    }
  }, [isEditing, editField]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            group bg-light border border-border-light rounded-xl p-4 mb-4
            cursor-grab active:cursor-grabbing
            card-hover pulse-hint transition-all
            ${snapshot.isDragging ? "shadow-2xl ring-2 ring-accent/50 scale-105" : "hover:shadow-lg"}
          `}
        >
          {/* Header: Title + Delete Button */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              {editField === "title" ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={handleKeyDown}
                  className="
                    w-full font-bold text-base text-text-primary
                    bg-light-secondary border-2 border-accent rounded-lg px-3 py-2
                    focus:outline-none
                  "
                />
              ) : (
                <h3
                  onClick={() => {
                    setIsEditing(true);
                    setEditField("title");
                  }}
                  className="
                    font-bold text-base text-text-primary cursor-pointer
                    hover:text-accent transition-colors line-clamp-2
                  "
                >
                  {task.title}
                </h3>
              )}
            </div>
            <button
              onClick={() => onDelete(task.id)}
              className="
                flex-shrink-0 text-gray-400 hover:text-red-500
                opacity-0 group-hover:opacity-100 transition-all
                p-1.5 hover:bg-red-50 rounded-lg
              "
              title="Delete task"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          {/* Category Badge + Status Indicator */}
          <div className="flex items-center gap-2 mb-3">
            {task.category && (
              <span
                className={`
                  px-3 py-1 rounded-full text-xs font-semibold
                  ${categoryConfig[task.category]?.color || "bg-gray-100 text-gray-700"}
                `}
              >
                {categoryConfig[task.category]?.icon} {task.category}
              </span>
            )}
            {columnId && (
              <span
                className={`
                  px-3 py-1 rounded-full text-xs font-semibold
                  bg-gray-100 text-gray-700 ml-auto
                  ${columnConfig[columnId]?.color}
                `}
              >
                {columnConfig[columnId]?.icon} {columnConfig[columnId]?.name}
              </span>
            )}
          </div>

          {/* Description */}
          {editField === "description" ? (
            <textarea
              ref={inputRef}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={handleKeyDown}
              placeholder="Add description (Ctrl+Enter to save)..."
              className="
                w-full text-sm text-text-secondary
                bg-light-secondary border-2 border-accent rounded-lg px-3 py-2 mb-3
                focus:outline-none resize-none
              "
              rows="3"
            />
          ) : (
            <p
              onClick={() => {
                setIsEditing(true);
                setEditField("description");
              }}
              className="
                text-sm text-text-secondary mb-3 line-clamp-2
                cursor-pointer hover:text-accent transition-colors
                min-h-10 p-2 rounded hover:bg-light-secondary/50
              "
            >
              {task.description || "Click to add description..."}
            </p>
          )}

          {/* Progress Bar */}
          {editField === "progress" ? (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-text-primary">
                  Progress
                </label>
                <span className="text-xs font-bold text-accent">
                  {editedProgress}%
                </span>
              </div>
              <input
                ref={inputRef}
                type="range"
                min="0"
                max="100"
                value={editedProgress}
                onChange={(e) => setEditedProgress(parseInt(e.target.value))}
                onBlur={handleSaveEdit}
                onKeyDown={handleKeyDown}
                className="
                  w-full h-2 bg-light-secondary rounded-full
                  accent-accent cursor-pointer
                "
              />
            </div>
          ) : (
            <div
              onClick={() => {
                setIsEditing(true);
                setEditField("progress");
              }}
              className="mb-3 cursor-pointer hover:opacity-80 transition-opacity"
              title="Click to edit progress"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-text-primary">
                  Progress
                </span>
                <span className="text-xs font-bold text-accent">
                  {task.progress || 0}%
                </span>
              </div>
              <div className="w-full h-2 bg-light-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent via-blue-400 to-blue-300 rounded-full transition-all"
                  style={{ width: `${task.progress || 0}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
