import getStatusColor from '@/shared/utils/getStatusColor';
import { Task, StatusColor } from '@/shared/types/status';

interface StatusCardProps {
  color: StatusColor;
  task: Task;
}

const StatusCard = ({ color, task }: StatusCardProps) => {
  const { border } = getStatusColor(color);

  return (
    <div
      className={`min-h-40 w-full cursor-pointer space-y-4 border-t-4 border-solid ${border} p-4 shadow hover:bg-gray-100`}
    >
      <p className='text-2xl font-bold'>{task.title}</p>

      <ul className='flex flex-col gap-1'>
        {task.toDoLists && task.toDoLists.length > 0 ? (
          task.toDoLists.map((value, index) => {
            return (
              <li
                key={index}
                className={`w-fit rounded px-2 py-1 hover:bg-gray-200`}
              >
                {index + 1}. {value}
              </li>
            );
          })
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
