import StatusCardBox from '@/components/status/statusContainer';

import { TaskStatus } from '@/shared/types/status';

const Home = () => {
  const statusMocData: TaskStatus[] = [
    { name: 'To Do', totalTasks: 4, color: 'blue', tasks: [] },
    {
      name: 'In Progress',
      totalTasks: 2,
      color: 'yellow',
      tasks: [{ title: '할 일 제목', index: 0, toDoLists: ['첫 번째 할 일'] }],
    },
    { name: 'On Hold', totalTasks: 6, color: 'red', tasks: [] },
    {
      name: 'Done',
      totalTasks: 8,
      color: 'green',
      tasks: [{ title: '할 일 제목', index: 0, toDoLists: ['첫 번째 할 일'] }],
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-4'>
      {statusMocData &&
        statusMocData.map((status, index) => {
          return <StatusCardBox key={index} status={status} />;
        })}
    </div>
  );
};

export default Home;
