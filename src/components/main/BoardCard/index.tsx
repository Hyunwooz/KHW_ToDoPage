'use client';

import getStatusColor from '@/shared/utils/getStatusColor';
import { StatusColor } from '@/shared/types/status';
import { Board } from '@/shared/types/board';
import { Todo } from '@/shared/types/todo';
import { useTodoStore } from '@/store/useTodoStore';
import BoardCardHeader from './BoardCardHeader';

import TodoItem from './TodoItem';

interface BoardCardProps {
  color: StatusColor;
  board: Board;
  statusNo: number;
}

const BoardCard = ({ color, board, statusNo }: BoardCardProps) => {
  const { border } = getStatusColor(color);
  const { addTodo } = useTodoStore();

  return (
    <div
      className={`group relative min-h-40 w-full space-y-4 border-t-4 border-solid ${border} bg-white p-4 shadow hover:bg-gray-50`}
    >
      <div className='flex items-center justify-between'>
        <BoardCardHeader
          statusNo={statusNo}
          boardNo={board.boardNo}
          title={board.title}
        />
      </div>
      <ul className='flex flex-col gap-1'>
        {board.todos.length > 0 ? (
          board.todos.map((todo: Todo, index: number) => (
            <TodoItem
              key={todo.todoNo}
              todo={todo}
              statusNo={statusNo}
              boardNo={board.boardNo}
              index={index}
            />
          ))
        ) : (
          <li className='cursor-default px-2 py-1 text-gray-400'>
            새로운 할 일을 추가해보세요.
          </li>
        )}
      </ul>

      <button
        onClick={() => {
          addTodo(board.boardNo);
        }}
        className='w-full rounded border border-solid border-gray-200 py-1 text-center text-sm font-medium text-gray-500 hover:bg-gray-200'
      >
        + 할 일 추가
      </button>
    </div>
  );
};

export default BoardCard;
