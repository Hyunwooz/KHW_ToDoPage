import BoardCard from '../BoardCard';
import getStatusColor from '@/shared/utils/getStatusColor';
import { useBoardStore } from '@/store/useBoardStore';
import { Status } from '@/shared/types/status';

interface BoardCardListProps {
  status: Status;
  hoveredIndex?: number | null | undefined;
  handleDragStart: (index: number) => void;
  handleDragEnd: () => void;
  handleDrop: (index: number) => void;
}

const BoardCardList = ({
  status,
  hoveredIndex,
  handleDragStart,
  handleDragEnd,
  handleDrop,
}: BoardCardListProps) => {
  const { border } = getStatusColor(status.color);
  const { draggedBoard } = useBoardStore();

  return status.boards.length > 0 ? (
    <div className='mb-4 flex flex-col gap-3'>
      {status.boards.map((board, index) => (
        <div
          key={board.boardNo}
          className={`board-item cursor-pointer border p-1 ${
            draggedBoard?.index !== index ||
            draggedBoard?.statusNo !== status.statusNo
              ? border
              : ''
          } rounded-lg transition-all ${
            draggedBoard?.index === index &&
            draggedBoard?.statusNo === status.statusNo
              ? 'opacity-50'
              : ''
          } ${hoveredIndex === index ? 'border-dashed' : ''}`}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnd={handleDragEnd}
          onDrop={() => handleDrop(index)}
        >
          <BoardCard
            board={board}
            color={status.color}
            statusNo={status.statusNo}
          />
        </div>
      ))}
    </div>
  ) : (
    <div className='flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-gray-300'>
      <p className='text-center text-gray-500'>
        새로운 보드를 추가해보세요!
        <br />
        <span className='text-sm text-gray-400'>
          다른 상태의 보드를 이곳에 끌어다 놓을 수 있습니다
        </span>
      </p>
    </div>
  );
};

export default BoardCardList;
