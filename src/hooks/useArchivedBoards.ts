import { useBoardStore } from '@/store/useBoardStore';

export const useArchivedBoards = () => {
  const { getArchivedBoards, toggleArchiveBoard } = useBoardStore();

  const archivedBoards = getArchivedBoards()
    .flatMap((status) =>
      status.boards.map((board) => ({
        ...board,
        statusName: status.name,
        statusColor: status.color,
      })),
    )
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

  return {
    archivedBoards,
    toggleArchiveBoard,
  };
};
