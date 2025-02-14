'use client';

import { useState, useEffect } from 'react';
import getStatusColor from '@/shared/utils/getStatusColor';
import { Status } from '@/shared/types/status';
import BoardCard from './boardCard';
import { useBoardStore } from '@/store/useBoardStore';

interface BoardCardBoxProps {
  status: Status;
}

const BoardCardBox = ({ status }: BoardCardBoxProps) => {
  const { ring, border } = getStatusColor(status.color);
  const { reorderBoards, moveBoard, draggedBoard, setDraggedBoard } =
    useBoardStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    if (!draggedBoard) {
      setIsDragging(false);
      setIsDraggingOver(false);
      setHoveredIndex(null);
    }
  }, [draggedBoard]);

  const handleDragStart = (index: number) => {
    setDraggedBoard({ statusNo: status.statusNo, index });
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsDraggingOver(false);
    setHoveredIndex(null);
    setDraggedBoard(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedBoard) return;
    const { statusNo: fromStatusNo, index: fromIndex } = draggedBoard;

    if (fromStatusNo === status.statusNo && fromIndex === index) {
      handleDragEnd();
      return;
    }

    if (fromStatusNo === status.statusNo) {
      if (fromIndex !== index) {
        reorderBoards(status.statusNo, fromIndex, index);
      }
    } else {
      moveBoard(fromStatusNo, status.statusNo, fromIndex);
    }

    // 상태 변경 여부와 관계없이 스타일 초기화
    handleDragEnd();
  };

  return (
    <div
      className={`min-h-[300px] rounded-lg ${
        isDragging || isDraggingOver ? 'border-2 border-dashed' : 'border-2'
      } ${border} bg-gray-50 p-4`}
      onDragOver={(e) => {
        e.preventDefault();
        if (!hoveredIndex && draggedBoard?.statusNo !== status.statusNo) {
          setIsDraggingOver(true);
        }
      }}
      onDragLeave={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const { clientX, clientY } = e;
        if (
          clientX <= rect.left ||
          clientX >= rect.right ||
          clientY <= rect.top ||
          clientY >= rect.bottom
        ) {
          setIsDraggingOver(false);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (hoveredIndex !== null || !draggedBoard) return;

        const { statusNo: fromStatusNo, index: fromIndex } = draggedBoard;

        if (fromStatusNo !== status.statusNo) {
          moveBoard(fromStatusNo, status.statusNo, fromIndex);
        }

        // 상태 변경 여부와 관계없이 스타일 초기화
        handleDragEnd();
      }}
    >
      <div className='mb-4 border-b-2 border-solid border-gray-300 pb-6'>
        <div className='mb-2 flex items-center gap-4'>
          <h2 className='text-2xl font-bold'>{status.name}</h2>
          <div className={`${ring} h-6 w-6 rounded-full`}></div>
        </div>
        <p className='text-sm text-gray-500'>{status.boards.length} Boards</p>
      </div>

      {status.boards.length > 0 ? (
        <div className='mb-4 flex flex-col gap-3'>
          {status.boards.map((board, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnd={handleDragEnd}
              onDrop={(e) => handleDrop(e, index)}
              className={`cursor-pointer border p-1 ${
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
            >
              <BoardCard board={board} color={status.color} />
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
      )}
    </div>
  );
};

export default BoardCardBox;
