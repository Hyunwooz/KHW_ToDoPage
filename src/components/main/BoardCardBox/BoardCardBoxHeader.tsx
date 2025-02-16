import { useBoardStore } from '@/store/useBoardStore';
import getStatusColor from '@/shared/utils/getStatusColor';
import { Status } from '@/shared/types/status';

interface BoardCardBoxHeaderProps {
  status: Status;
  boardCount: number;
}

const BoardCardBoxHeader = ({
  status,
  boardCount,
}: BoardCardBoxHeaderProps) => {
  const { ring, ringText, ringHover } = getStatusColor(status.color);
  const { addBoard } = useBoardStore();
  return (
    <div className='mb-4 border-b-2 border-gray-300 pb-6'>
      <div className='mb-2 flex items-center justify-between gap-4'>
        <h2 className='text-2xl font-bold'>{status.name}</h2>
        <button
          onClick={() => addBoard(status.statusNo)}
          className={`flex h-8 w-20 items-center justify-center rounded-md text-black ${ringHover} ${ring} ${ringText}`}
        >
          <span className='text-sm font-semibold'>+ 새 보드</span>
        </button>
      </div>
      <p className='text-sm text-gray-500'>{boardCount} Boards</p>
    </div>
  );
};

export default BoardCardBoxHeader;
