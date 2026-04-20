import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

/**
 * Column Component
 * Represents a Kanban column (To Do, In Progress, Done)
 * Contains tasks that can be dragged between columns
 */
const Column = ({ column, tasks, onDeleteTask, onEditTask }) => {
  return (
    <div className="flex-1 min-w-[350px] max-w-[400px] flex flex-col rounded-lg p-5 column-premium column-enhanced shadow-card">
      {/* Column Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-text-primary">
          {column.title}
        </h2>
        <p className="text-xs text-text-secondary mt-1">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </p>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 rounded-lg p-2
              transition-all duration-200
              ${snapshot.isDraggingOver ? "bg-light-tertiary/70" : "bg-light/50"}
              min-h-[400px] max-h-[500px] overflow-y-auto
            `}
          >
            {tasks.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-text-secondary/50">No tasks yet</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  columnId={column.id}
                  onDelete={onDeleteTask}
                  onEdit={onEditTask}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
