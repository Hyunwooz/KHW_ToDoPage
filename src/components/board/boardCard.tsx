'use client';

import getStatusColor from '@/shared/utils/getStatusColor';
import { StatusColor } from '@/shared/types/status';
import { Board } from '@/shared/types/board';

interface StatusCardProps {
  color: StatusColor;
  board: Board;
}

const BoardCard = ({ color, board }: StatusCardProps) => {
  const { border } = getStatusColor(color);

  return (
    <div
      className={`min-h-40 w-full cursor-pointer space-y-4 border-t-4 border-solid ${border} bg-white p-4 shadow hover:bg-gray-50`}
    >
      <h3 className='text-xl font-semibold'>{board.title}</h3>
      <ul className='flex flex-col gap-1'>
        {board.todos.length > 0 ? (
          board.todos.map((value, index) => (
            <li
              key={index}
              draggable
              className='w-fit cursor-move rounded px-2 py-1 hover:bg-gray-100'
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

export default BoardCard;
