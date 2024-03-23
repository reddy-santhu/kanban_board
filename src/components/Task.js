import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";

function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex }),
    );
  };

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className="w-[280px] first:my-5 rounded-lg bg-white dark:bg-[#2b2c37] shadow-md hover:shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer border border-gray-200 dark:border-gray-600 p-4"
      >
        <p className="font-bold tracking-wide text-base truncate">
          {task.title}
        </p>
        <p className="font-semibold text-xs mt-2 text-gray-500 dark:text-gray-400">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
