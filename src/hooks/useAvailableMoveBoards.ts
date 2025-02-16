import { useStatusStore } from '@/store/useStatusStore';
import { Board } from '@/shared/types/board';

export const useAvailableMoveBoards = (board: Board) => {
  const { getActiveBoards } = useStatusStore();

  const availableBoards = getActiveBoards()
    .flatMap((status) => status.boards)
    .filter((b) => b.boardNo !== board.boardNo)
    .map((b) => ({
      boardNo: b.boardNo,
      title: b.title || '(제목 없음)',
      statusName: getActiveBoards().find((s) =>
        s.boards.some((board) => board.boardNo === b.boardNo),
      )?.name,
    }));

  return {
    availableBoards,
  };
};
