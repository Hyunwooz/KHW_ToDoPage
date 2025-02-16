import { useCallback } from 'react';

export const useTodoDragAndDrop = (
  boardNo: number,
  reorderTodos: (
    statusNo: number,
    boardNo: number,
    fromIndex: number,
    toIndex: number,
  ) => void,
  statusNo: number,
) => {
  const handleTodoDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      e.stopPropagation();
      e.dataTransfer.setData(
        'application/json',
        JSON.stringify({
          fromBoardNo: boardNo,
          index,
        }),
      );
      e.dataTransfer.setData('application/todo-drag', 'true');
    },
    [boardNo],
  );

  const handleTodoDrop = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      if (e.dataTransfer.types.includes('application/todo-drag')) {
        try {
          const data = JSON.parse(e.dataTransfer.getData('application/json'));
          if (data.fromBoardNo === boardNo && data.index !== index) {
            reorderTodos(statusNo, boardNo, data.index, index);
          }
        } catch {
          console.error('Invalid drag data');
        }
      }
    },
    [boardNo, reorderTodos, statusNo],
  );

  return { handleTodoDragStart, handleTodoDrop };
};
