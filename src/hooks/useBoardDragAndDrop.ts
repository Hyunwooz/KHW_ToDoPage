import { useState, useEffect, useCallback } from 'react';
import { useBoardStore } from '@/store/useBoardStore';

interface BoardDragAndDropProps {
  statusNo: number;
  boardCount: number;
}

export const useBoardDragAndDrop = ({
  statusNo,
  boardCount,
}: BoardDragAndDropProps) => {
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
    setDraggedBoard({ statusNo, index });
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsDraggingOver(false);
    setHoveredIndex(null);
    setDraggedBoard(null);
  };

  const handleDrop = (index: number) => {
    if (!draggedBoard) return;
    const { statusNo: fromStatusNo, index: fromIndex } = draggedBoard;

    if (fromStatusNo === statusNo && fromIndex === index) {
      handleDragEnd();
      return;
    }

    if (fromStatusNo === statusNo) {
      reorderBoards(statusNo, fromIndex, index);
    } else {
      moveBoard(fromStatusNo, statusNo, fromIndex, index);
    }

    handleDragEnd();
  };

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
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

      // 현재 마우스 위치 기준 보드 위치 계산
      const boardElements = Array.from(
        e.currentTarget.getElementsByClassName('board-item'),
      );
      const mouseY = e.clientY;

      const hoverIndex = boardElements.findIndex((boardElement) => {
        const rect = boardElement.getBoundingClientRect();
        return mouseY < rect.top + rect.height / 2;
      });

      const newHoverIndex = hoverIndex === -1 ? boardCount : hoverIndex;

      // 같은 인덱스면 업데이트하지 않음
      if (
        draggedBoard?.statusNo === statusNo &&
        draggedBoard?.index === newHoverIndex
      ) {
        setHoveredIndex(null);
      } else {
        setHoveredIndex(newHoverIndex);
      }

      if (draggedBoard?.statusNo !== statusNo) {
        setIsDraggingOver(true);
      }
    },
    [draggedBoard, statusNo, boardCount],
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
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
  }, []);

  const handleBoxDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (!draggedBoard) return;

      const { statusNo: fromStatusNo, index: fromIndex } = draggedBoard;

      if (fromStatusNo !== statusNo) {
        const targetIndex = hoveredIndex ?? boardCount;
        moveBoard(fromStatusNo, statusNo, fromIndex, targetIndex);
      }

      setDraggedBoard(null);
      setIsDragging(false);
      setIsDraggingOver(false);
      setHoveredIndex(null);
    },
    [draggedBoard, moveBoard, statusNo, hoveredIndex, boardCount],
  );

  return {
    isDragging,
    isDraggingOver,
    hoveredIndex,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    setHoveredIndex,
    setIsDraggingOver,
    setIsDragging,
    handleDragOver,
    handleDragLeave,
    handleBoxDrop,
  };
};
