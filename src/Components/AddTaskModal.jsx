import React, { useEffect, useRef } from "react";

/**
 * AddTaskModal Component
 * Modal for creating a new task with complete details
 * Includes: title, description, category, and progress
 */
const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
  const [taskTitle, setTaskTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("Feature");
  const [progress, setProgress] = React.useState(0);
  const inputRef = useRef(null);

  const categories = ["Design", "Frontend", "Feature", "Backend", "QA"];

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAdd({
        title: taskTitle.trim(),
        description: description.trim(),
        category,
        progress,
      });
      // Reset form
      resetForm();
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setTaskTitle("");
    setDescription("");
    setCategory("Feature");
    setProgress(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-light border border-border-light rounded-xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="border-b border-border-light px-6 py-4 flex items-center justify-between sticky top-0 bg-light">
          <h3 className="text-lg font-semibold text-text-primary">
            ✨ Create New Task
          </h3>
          <button
            onClick={handleClose}
            className="text-text-secondary hover:text-text-primary p-1 hover:bg-light-tertiary rounded transition-all"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Task Title *
            </label>
            <input
              ref={inputRef}
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter task title..."
              className="
                w-full bg-light-secondary border border-border-light rounded-lg px-4 py-3
                text-text-primary placeholder-text-secondary/50
                focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20
                text-sm font-medium
              "
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add task description (optional)..."
              className="
                w-full bg-light-secondary border border-border-light rounded-lg px-4 py-3
                text-text-primary placeholder-text-secondary/50
                focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20
                text-sm font-medium resize-none
              "
              rows="3"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
                w-full bg-light-secondary border border-border-light rounded-lg px-4 py-3
                text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20
                text-sm font-medium cursor-pointer
              "
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Progress */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Initial Progress: {progress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              className="
                w-full h-2 bg-light-secondary rounded-full
                accent-accent cursor-pointer
              "
            />
          </div>

          {/* Modal Footer */}
          <div className="flex gap-3 pt-4 border-t border-border-light">
            <button
              type="button"
              onClick={handleClose}
              className="
                flex-1 px-4 py-2 rounded-lg border border-border-light
                text-text-secondary hover:text-text-primary
                hover:bg-light-tertiary transition-all
                text-sm font-semibold
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!taskTitle.trim()}
              className="
                flex-1 px-4 py-2 rounded-lg bg-accent text-white
                hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed
                transition-all text-sm font-semibold shadow-card hover:shadow-hover
              "
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
