import { useStatusStore } from '@/store/useStatusStore';

export const useAvailableMoveBoards = (boardNo: number) => {
  const { getActiveBoards } = useStatusStore();

  const availableBoards = getActiveBoards()
    .flatMap((status) => status.boards)
    .filter((b) => b.boardNo !== boardNo)
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
