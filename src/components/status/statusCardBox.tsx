'use client';

import { useState } from 'react';
import getStatusColor from '@/shared/utils/getStatusColor';
import { TaskStatus } from '@/shared/types/status';
import StatusCard from './statusCard';

interface StatusCardBoxProps {
  status: TaskStatus;
}

const StatusCardBox = ({ status }: StatusCardBoxProps) => {
  const { ring } = getStatusColor(status.color);
  const [tasks, setTasks] = useState(status.tasks); // 할 일 상태 관리

  return (
    <div className='min-h-[300px] rounded-lg bg-gray-50 p-4'>
      <div className='mb-4 border-b-2 border-solid border-gray-300 pb-6'>
        <div className='mb-2 flex items-center gap-4'>
          <h2 className='text-2xl font-bold'>{status.name}</h2>
          <div className={`${ring} h-6 w-6 rounded-full`}></div>
        </div>
        <p className='text-sm text-gray-500'>{tasks.length} Tasks</p>
      </div>

      {tasks.length > 0 && (
        <div className='mb-4 flex flex-col gap-3'>
          {tasks.map((task, index) => (
            <StatusCard
              key={index}
              color={status.color}
              task={task}
              onReorder={reorderToDoLists}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusCardBox;
