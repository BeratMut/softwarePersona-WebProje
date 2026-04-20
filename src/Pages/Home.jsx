import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../Components/Column";
import AddTaskModal from "../Components/AddTaskModal";
import Stats from "../Components/Stats";
import { initialData, generateId } from "../Interfaces/initialData";

/**
 * Home Page Component (Kanban Board Main View)
 * Manages the overall state of tasks and columns
 * Handles drag-and-drop, add/edit/delete operations
 * Persists data to localStorage
 */
const Home = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("kanban-data");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(data));
  }, [data]);

  /**
   * Handle drag end event from react-beautiful-dnd
   */
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside a droppable area
    if (!destination) return;

    // Task dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Copy the state
    const newData = { ...data };

    // If dragging within the same column
    if (source.droppableId === destination.droppableId) {
      const column = { ...newData.columns[source.droppableId] };
      const taskIds = Array.from(column.taskIds);
      const [movedTask] = taskIds.splice(source.index, 1);
      taskIds.splice(destination.index, 0, movedTask);
      column.taskIds = taskIds;
      newData.columns[source.droppableId] = column;
    } else {
      // If dragging between different columns
      const sourceColumn = { ...newData.columns[source.droppableId] };
      const destColumn = { ...newData.columns[destination.droppableId] };

      // Remove task from source column
      sourceColumn.taskIds = Array.from(sourceColumn.taskIds);
      const [movedTask] = sourceColumn.taskIds.splice(source.index, 1);

      // Add task to destination column
      destColumn.taskIds = Array.from(destColumn.taskIds);
      destColumn.taskIds.splice(destination.index, 0, movedTask);

      // Update columns
      newData.columns[source.droppableId] = sourceColumn;
      newData.columns[destination.droppableId] = destColumn;
    }

    setData(newData);
  };

  /**
   * Add a new task to the "To Do" column
   */
  const handleAddTask = (taskData) => {
    const newTaskId = generateId();
    const newData = { ...data };

    // Add new task with all details
    newData.tasks[newTaskId] = {
      id: newTaskId,
      title: taskData.title,
      description: taskData.description || "",
      category: taskData.category || "Feature",
      progress: taskData.progress || 0,
    };

    // Add to "To Do" column (first column)
    const toDoColumn = newData.columns["column-1"];
    toDoColumn.taskIds = [...toDoColumn.taskIds, newTaskId];

    setData(newData);
  };

  /**
   * Delete a task from the board
   */
  const handleDeleteTask = (taskId) => {
    const newData = { ...data };

    // Remove task from tasks
    delete newData.tasks[taskId];

    // Remove task from columns
    Object.keys(newData.columns).forEach((columnId) => {
      newData.columns[columnId].taskIds = newData.columns[
        columnId
      ].taskIds.filter((id) => id !== taskId);
    });

    setData(newData);
  };

  /**
   * Edit a task's details
   */
  const handleEditTask = (taskId, taskData) => {
    const newData = { ...data };
    if (newData.tasks[taskId]) {
      newData.tasks[taskId].title =
        taskData.title || newData.tasks[taskId].title;
      newData.tasks[taskId].description =
        taskData.description !== undefined
          ? taskData.description
          : newData.tasks[taskId].description;
      newData.tasks[taskId].category =
        taskData.category || newData.tasks[taskId].category;
      newData.tasks[taskId].progress =
        taskData.progress !== undefined
          ? taskData.progress
          : newData.tasks[taskId].progress;
      setData(newData);
    }
  };

  /**
   * Calculate statistics for dashboard
   */
  const calculateStats = () => {
    const totalTasks = Object.keys(data.tasks).length;
    const toDoCount = data.columns["column-1"]?.taskIds?.length || 0;
    const inProgressCount = data.columns["column-2"]?.taskIds?.length || 0;
    const doneCount = data.columns["column-3"]?.taskIds?.length || 0;

    return { totalTasks, toDoCount, inProgressCount, doneCount };
  };

  /**
   * Reset localStorage and return to initial state
   */
  const handleResetData = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all tasks? This action cannot be undone.",
      )
    ) {
      localStorage.removeItem("kanban-data");
      setData(initialData);
    }
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-light text-text-primary font-sans">
      {/* Header */}
      <header className="border-b border-border-light sticky top-0 z-40 bg-light/95 backdrop-blur-sm shadow-subtle">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">ZenFlow</h1>
            <p className="text-sm text-text-secondary mt-1">
              Modern Kanban Board
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="
                px-4 py-2 rounded-lg bg-accent text-white
                hover:bg-accent-hover transition-all font-medium text-sm
                flex items-center gap-2 shadow-card hover:shadow-hover
              "
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Task
            </button>
            <button
              onClick={handleResetData}
              className="
                px-4 py-2 rounded-lg border border-red-300 text-red-600
                hover:bg-red-50 transition-all font-medium text-sm
                flex items-center gap-2 shadow-subtle hover:shadow-card
              "
              title="Reset all tasks and clear localStorage"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset (LocalStorage Sıfırla)
            </button>
          </div>
        </div>
      </header>

      {/* Info Banner */}
      <div className="info-banner py-3 px-6 sticky top-14 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl bounce-hint">✋</div>
            <div>
              <p className="font-semibold text-text-primary">
                💡 Drag & Drop Tasks
              </p>
              <p className="text-sm text-text-secondary">
                Move tasks between columns to organize your workflow
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <Stats
        totalTasks={stats.totalTasks}
        toDoCount={stats.toDoCount}
        inProgressCount={stats.inProgressCount}
        doneCount={stats.doneCount}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
              );
            })}
          </div>
        </DragDropContext>
      </main>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
      />

      {/* Footer */}
      <footer className="border-t border-border-light mt-12 py-6 bg-light-secondary">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-text-secondary">
          <p>Built with React, Tailwind CSS & @hello-pangea/dnd</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
