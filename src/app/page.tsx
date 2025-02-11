import StatusCardBox from '@/components/statusContainer';

const Home = () => {
  const statusMocData = [
    { name: 'To Do', tasks: 4, ringColor: 'bg-blue-300' },
    { name: 'In Progress', tasks: 2, ringColor: 'bg-yellow-300' },
    { name: 'On Hold', tasks: 6, ringColor: 'bg-red-300' },
    { name: 'Done', tasks: 8, ringColor: 'bg-green-300' },
  ];
  return (
    <div className='grid grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-4'>
      {statusMocData &&
        statusMocData.map((data, index) => {
          return (
            <StatusCardBox
              key={index}
              name={data.name}
              tasks={data.tasks}
              ringColor={data.ringColor}
            />
          );
        })}
    </div>
  );
};

export default Home;
