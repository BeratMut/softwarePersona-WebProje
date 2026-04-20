/**
 * Initial data structure and mock data for the Kanban board
 * This provides the default state and column structure
 */

export const initialData = {
  tasks: {
    task1: {
      id: "task1",
      title: "Design system setup",
      description: "Create design tokens and components",
      category: "Design",
      progress: 0,
    },
    task2: {
      id: "task2",
      title: "React component architecture",
      description: "Plan and structure reusable components",
      category: "Frontend",
      progress: 0,
    },
    task3: {
      id: "task3",
      title: "Implement drag-and-drop",
      description: "Integrate @hello-pangea/dnd library",
      category: "Feature",
      progress: 75,
    },
    task4: {
      id: "task4",
      title: "Add localStorage persistence",
      description: "Save and restore task state",
      category: "Backend",
      progress: 50,
    },
    task5: {
      id: "task5",
      title: "Testing and optimization",
      description: "Improve performance and fix bugs",
      category: "QA",
      progress: 100,
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task1", "task2"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task3", "task4"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task5"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

/**
 * Generates a unique ID for new tasks
 */
export const generateId = () => {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generates a unique column ID if needed
 */
export const generateColumnId = () => {
  return `column-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
