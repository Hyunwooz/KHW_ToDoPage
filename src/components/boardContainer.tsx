'use client';

import StatusCardBox from './status/statusCardBox';
import { TaskStatus } from '@/shared/types/status';

export default function BoardContainer() {
  const statusMockData: TaskStatus[] = [
    { name: '해야 할 일', color: 'blue', tasks: [] },
    {
      name: '진행 중',
      color: 'yellow',
      tasks: [
        {
          title: '제목',
          toDoLists: ['첫 번째 할 일', '두 번째 할 일', '세 번째 할 일'],
        },
      ],
    },
    {
      name: '보류',
      color: 'red',
      tasks: [{ title: '제목', toDoLists: [] }],
    },
    {
      name: '완료됨',
      color: 'green',
      tasks: [{ title: '제목', toDoLists: ['첫 번째 할 일'] }],
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-4'>
      {statusMockData.map((status, index) => (
        <StatusCardBox key={index} status={status} />
      ))}
    </div>
  );
}
