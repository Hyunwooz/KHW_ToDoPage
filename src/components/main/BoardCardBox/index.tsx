'use client';

import getStatusColor from '@/shared/utils/getStatusColor';
import { Status } from '@/shared/types/status';
import BoardCardBoxHeader from './BoardCardBoxHeader';
import BoardCardList from './BoardCardList';
import { useBoardDragAndDrop } from '@/hooks/useBoardDragAndDrop';

interface BoardCardBoxProps {
  status: Status;
}

const BoardCardBox = ({ status }: BoardCardBoxProps) => {
  const { border } = getStatusColor(status.color);
  const {
    isDragging,
    isDraggingOver,
    hoveredIndex,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleBoxDrop,
  } = useBoardDragAndDrop({
    statusNo: status.statusNo,
    boardCount: status.boards.length,
  });

  return (
    <div
      className={`min-h-[300px] rounded-lg ${
        isDragging || isDraggingOver ? 'border-2 border-dashed' : 'border-2'
      } ${border} bg-gray-50 p-4`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleBoxDrop}
    >
      <BoardCardBoxHeader status={status} boardCount={status.boards.length} />
      <BoardCardList
        key={status.statusNo}
        status={status}
        hoveredIndex={hoveredIndex}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleDrop={handleDrop}
      />
    </div>
  );
};

export default BoardCardBox;
