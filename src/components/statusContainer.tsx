interface StatusCardBoxProps {
  name: string;
  tasks: number;
  ringColor: string;
}

const StatusCardBox = ({ name, tasks, ringColor }: StatusCardBoxProps) => {
  return (
    <div>
      <div className='border-b-2 border-solid border-gray-300 pb-6'>
        <div className='mb-2 flex items-center gap-4'>
          <p className='text-2xl font-bold'>{name}</p>
          <div
            className={`${ringColor} h-6 w-6 rounded-full text-xl font-bold`}
          ></div>
        </div>
        <p className='text-sm text-gray-500'>{tasks} Tasks</p>
      </div>
    </div>
  );
};

export default StatusCardBox;
