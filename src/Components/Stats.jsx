import React from "react";

/**
 * Stats Component
 * Displays statistics dashboard showing task counts
 * Updates in real-time as tasks are moved between columns
 */
const Stats = ({ totalTasks, toDoCount, inProgressCount, doneCount }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Tasks */}
      <div className="stat-card stat-total">
        <div className="flex items-start justify-between">
          <div>
            <p className="stat-label mb-2">Total Tasks</p>
            <p className="stat-value text-3xl font-bold text-accent">
              {totalTasks}
            </p>
          </div>
          <div className="text-4xl text-accent/20">📊</div>
        </div>
      </div>

      {/* To Do Count */}
      <div className="stat-card stat-todo">
        <div className="flex items-start justify-between">
          <div>
            <p className="stat-label mb-2">To Do</p>
            <p className="stat-value text-3xl font-bold text-red-500">
              {toDoCount}
            </p>
          </div>
          <div className="text-4xl">📝</div>
        </div>
      </div>

      {/* In Progress Count */}
      <div className="stat-card stat-progress">
        <div className="flex items-start justify-between">
          <div>
            <p className="stat-label mb-2">In Progress</p>
            <p className="stat-value text-3xl font-bold text-orange-500">
              {inProgressCount}
            </p>
          </div>
          <div className="text-4xl">⚡</div>
        </div>
      </div>

      {/* Done Count */}
      <div className="stat-card stat-done">
        <div className="flex items-start justify-between">
          <div>
            <p className="stat-label mb-2">Done</p>
            <p className="stat-value text-3xl font-bold text-green-500">
              {doneCount}
            </p>
          </div>
          <div className="text-4xl">✅</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
