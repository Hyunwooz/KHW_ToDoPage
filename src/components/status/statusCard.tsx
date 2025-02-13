'use client';

import { useState } from 'react';
import getStatusColor from '@/shared/utils/getStatusColor';
import { Task, StatusColor } from '@/shared/types/status';

interface StatusCardProps {
  color: StatusColor;
  task: Task;
  onReorder: (taskId: string, newToDoLists: string[]) => void;
}

const StatusCard = ({ color, task, onReorder }: StatusCardProps) => {
  const { border } = getStatusColor(color);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const updatedToDoLists = [...task.toDoLists];
    const [movedItem] = updatedToDoLists.splice(draggedItemIndex, 1);
    updatedToDoLists.splice(index, 0, movedItem);

    onReorder(task.title, updatedToDoLists);
    setDraggedItemIndex(null);
  };

  return (
    <div
      className={`min-h-40 w-full cursor-pointer space-y-4 border-t-4 border-solid ${border} bg-white p-4 shadow hover:bg-gray-50`}
    >
      <h3 className='text-xl font-semibold'>{task.title}</h3>
      <ul className='flex flex-col gap-1'>
        {task.toDoLists.length > 0 ? (
          task.toDoLists.map((value, index) => (
            <li
              key={index}
              draggable
              className='w-fit cursor-move rounded px-2 py-1 hover:bg-gray-100'
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
            >
              {value}
            </li>
          ))
        ) : (
          <li className='px-2 py-1 text-gray-400'>
            새로운 할 일을 추가해보세요.
          </li>
        )}
      </ul>

      <button className='w-full rounded border border-solid border-gray-200 py-1 text-center text-sm font-medium text-gray-500 hover:bg-gray-200'>
        + 할 일 추가
      </button>
    </div>
  );
};

export default StatusCard;
