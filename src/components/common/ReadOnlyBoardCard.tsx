import { Board } from '@/shared/types/board';
import { StatusColor } from '@/shared/types/status';
import TodoItem from './TodoItem';
import { ArchiveIcon, ActiveIcon } from '@/components/icons/Icon';
import getStatusColor from '@/shared/utils/getStatusColor';

interface BoardCardProps {
  board: Board & {
    statusName: string;
    statusColor: StatusColor;
  };
  onUnarchive?: (statusNo: number, boardNo: number) => void;
}

const ReadOnlyBoardCard = ({ board, onUnarchive }: BoardCardProps) => {
  const { ring, ringText } = getStatusColor(board.statusColor);

  return (
    <div className='group flex min-h-[10rem] flex-col rounded-lg border border-solid border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md'>
      <div className='mb-4 space-y-2'>
        <div className='flex items-center justify-end'>
          {board.isArchived ? (
            <>
              <div className='flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600'>
                <ArchiveIcon />
                <span>보관됨</span>
              </div>
            </>
          ) : (
            <div className='flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs text-emerald-600'>
              <ActiveIcon />
              <span>활성화</span>
            </div>
          )}
        </div>
        <div className='flex items-start justify-between gap-2'>
          <div className='min-w-0 flex-1'>
            <h3 className='break-all text-lg font-medium text-gray-900'>
              {board.title || '(제목 없음)'}
            </h3>
          </div>
        </div>
        <div className='flex gap-2'>
          <span
            className={`inline-flex items-center rounded-lg px-3 py-1 text-sm font-semibold ${ring} ${ringText}`}
          >
            {board.statusName}
          </span>
        </div>
      </div>

      <div className='mt-auto space-y-2'>
        {board.todos.length > 0 ? (
          <div className='space-y-1'>
            {board.todos.map((todo) => (
              <TodoItem
                key={todo.todoNo}
                content={todo.content}
                isCompleted={todo.isCompleted}
                todoNo={todo.todoNo}
              />
            ))}
          </div>
        ) : (
          <p className='text-sm text-gray-500'>할 일이 없습니다</p>
        )}
      </div>
      {onUnarchive && (
        <button
          onClick={() => onUnarchive(board.statusNo, board.boardNo)}
          className='mt-3 rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100'
        >
          보관 해제
        </button>
      )}
    </div>
  );
};

export default ReadOnlyBoardCard;
