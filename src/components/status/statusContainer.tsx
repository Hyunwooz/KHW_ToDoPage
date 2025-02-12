import getStatusColor from '@/shared/utils/getStatusColor';
import { TaskStatus } from '@/shared/types/status';
import StatusCard from './statusCard';

interface StatusCardBoxProps {
  status: TaskStatus;
}

const StatusCardBox = ({ status }: StatusCardBoxProps) => {
  const { ring } = getStatusColor(status.color);

  return (
    <div>
      <div className='mb-4 border-b-2 border-solid border-gray-300 pb-6'>
        <div className='mb-2 flex items-center gap-4'>
          <p className='text-2xl font-bold'>{status.name}</p>
          <div className={`${ring} h-6 w-6 rounded-full`}></div>
        </div>
        <p className='text-sm text-gray-500'>{status.totalTasks} Tasks</p>
      </div>
      {status.tasks?.length > 0 && (
        <div className='mb-4 flex flex-col gap-3'>
          {status.tasks.map((task, index) => (
            <StatusCard key={index} color={status.color} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusCardBox;
