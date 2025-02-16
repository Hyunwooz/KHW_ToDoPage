'use client';

import { useState, useEffect } from 'react';
import getStatusColor from '@/shared/utils/getStatusColor';
import { Status } from '@/shared/types/status';
import BoardCard from './BoardCard';
import { useBoardStore } from '@/store/useBoardStore';

interface BoardCardBoxProps {
  status: Status;
}

const BoardCardBox = ({ status }: BoardCardBoxProps) => {
  const { ring, border, ringText, ringHover } = getStatusColor(status.color);
  const { reorderBoards, moveBoard, draggedBoard, setDraggedBoard, addBoard } =
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
      moveBoard(fromStatusNo, status.statusNo, fromIndex, index);
    }

    handleDragEnd();
  };

  return (
    <div
      className={`min-h-[300px] rounded-lg ${
        isDragging || isDraggingOver ? 'border-2 border-dashed' : 'border-2'
      } ${border} bg-gray-50 p-4`}
      onDragOver={(e) => {
        e.preventDefault();
        const target = e.target as HTMLElement;

        // 할 일 드래그 중일 때는 보드 드래그 처리하지 않음
        if (
          target.closest('[data-todo-drag="true"]') ||
          e.dataTransfer.types.includes('application/todo-drag')
        ) {
          setIsDragging(false);
          setIsDraggingOver(false);
          setHoveredIndex(null);
          return;
        }

        // 보드 드래그 처리
        const boardElements = Array.from(
          e.currentTarget.getElementsByClassName('board-item'),
        );
        const mouseY = e.clientY;

        // 각 보드의 위치를 확인하여 마우스가 위치한 인덱스 찾기
        const hoverIndex = boardElements.findIndex((boardElement) => {
          const rect = boardElement.getBoundingClientRect();
          const midPoint = rect.top + rect.height / 2;
          return mouseY < midPoint;
        });

        // 마우스가 모든 보드보다 아래에 있으면 마지막 인덱스로
        const newHoverIndex =
          hoverIndex === -1 ? status.boards.length : hoverIndex;

        // 드래그 중인 보드와 같은 인덱스가 아닐 때만 hover 효과 적용
        if (
          draggedBoard?.statusNo === status.statusNo &&
          draggedBoard?.index === newHoverIndex
        ) {
          setHoveredIndex(null);
        } else {
          setHoveredIndex(newHoverIndex);
        }

        // 다른 status에서 드래그 중일 때만 isDraggingOver 설정
        if (draggedBoard?.statusNo !== status.statusNo) {
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

        if (!draggedBoard) return;

        const { statusNo: fromStatusNo, index: fromIndex } = draggedBoard;

        if (fromStatusNo !== status.statusNo) {
          // hoveredIndex가 null이면 boards.length를 사용 (맨 끝에 추가)
          const targetIndex = hoveredIndex ?? status.boards.length;
          moveBoard(fromStatusNo, status.statusNo, fromIndex, targetIndex);
        }

        handleDragEnd();
      }}
    >
      <div className='mb-4 border-b-2 border-solid border-gray-300 pb-6'>
        <div className='mb-2 flex items-center gap-4'>
          <div className='flex flex-1 items-center gap-4'>
            <h2 className='text-2xl font-bold'>{status.name}</h2>
          </div>
          <button
            onClick={() => {
              addBoard(status.statusNo, '');
            }}
            className={`flex h-8 w-20 items-center justify-center rounded-md text-black ${ringHover} ${ring} ${ringText}`}
          >
            <span className='text-sm font-semibold'>+ 새 보드</span>
          </button>
        </div>
        <p className='text-sm text-gray-500'>{status.boards.length} Boards</p>
      </div>

      {status.boards.length > 0 ? (
        <div className='mb-4 flex flex-col gap-3'>
          {status.boards.map((board, index) => (
            <div
              key={index}
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
              onDrop={(e) => handleDrop(e, index)}
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
      )}
    </div>
  );
};

export default BoardCardBox;
