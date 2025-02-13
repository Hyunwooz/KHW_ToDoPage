'use client';

import { useState } from 'react';
import getStatusColor from '@/shared/utils/getStatusColor';
import { Status } from '@/shared/types/status';
import BoardCard from './boardCard';
import { useBoardStore } from '@/store/useBoardStore';

interface BoardCardBoxProps {
  status: Status;
}

const BoardCardBox = ({ status }: BoardCardBoxProps) => {
  const { ring } = getStatusColor(status.color);
  const { reorderBoards } = useBoardStore();
  const [draggedBoardIndex, setDraggedBoardIndex] = useState<number | null>(
    null,
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedBoardIndex(index);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.preventDefault();
    setHoveredIndex(index);
  };

  const handleDragLeave = () => {
    setHoveredIndex(null);
  };

  const handleDrop = (index: number) => {
    if (draggedBoardIndex === null || draggedBoardIndex === index) {
      setDraggedBoardIndex(null);
      setHoveredIndex(null);
      return;
    }

    reorderBoards(status.statusNo, draggedBoardIndex, index);
    setDraggedBoardIndex(null);
    setHoveredIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedBoardIndex(null);
    setHoveredIndex(null);
  };

  return (
    <div className='min-h-[300px] rounded-lg bg-gray-50 p-4'>
      <div className='mb-4 border-b-2 border-solid border-gray-300 pb-6'>
        <div className='mb-2 flex items-center gap-4'>
          <h2 className='text-2xl font-bold'>{status.name}</h2>
          <div className={`${ring} h-6 w-6 rounded-full`}></div>
        </div>
        <p className='text-sm text-gray-500'>{status.boards.length} Boards</p>
      </div>

      {status.boards.length > 0 && (
        <div className='mb-4 flex flex-col gap-3'>
          {status.boards.map((board, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`cursor-pointer rounded-lg border p-1 transition-all ${draggedBoardIndex === index ? 'opacity-50' : ''} ${hoveredIndex === index ? 'border-dashed border-blue-500' : ''} `}
            >
              <BoardCard board={board} color={status.color} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardCardBox;
