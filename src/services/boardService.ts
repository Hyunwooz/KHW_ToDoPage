import { Status } from '@/shared/types/status';

export const boardService = {
  addBoard(
    statuses: Status[],
    statusNo: number,
    title: string,
    lastBoardNo: number,
  ): Status[] {
    return statuses.map((status) =>
      status.statusNo === statusNo
        ? {
            ...status,
            boards: [
              ...status.boards,
              {
                boardNo: lastBoardNo + 1,
                statusNo,
                title,
                todos: [],
                isArchived: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          }
        : status,
    );
  },

  moveBoard(
    statuses: Status[],
    fromStatusNo: number,
    toStatusNo: number,
    fromIndex: number,
    toIndex?: number,
  ): Status[] {
    const newStatuses = [...statuses];
    const fromStatus = newStatuses.find((s) => s.statusNo === fromStatusNo);
    const toStatus = newStatuses.find((s) => s.statusNo === toStatusNo);

    if (!fromStatus || !toStatus) return statuses;

    const boardToMove = fromStatus.boards[fromIndex];
    if (!boardToMove) return statuses;

    fromStatus.boards = [
      ...fromStatus.boards.slice(0, fromIndex),
      ...fromStatus.boards.slice(fromIndex + 1),
    ];

    const updatedBoard = {
      ...boardToMove,
      statusNo: toStatusNo,
      updatedAt: new Date().toISOString(),
    };

    if (typeof toIndex === 'number') {
      toStatus.boards.splice(toIndex, 0, updatedBoard);
    } else {
      toStatus.boards.push(updatedBoard);
    }

    return newStatuses;
  },

  reorderBoards(
    statuses: Status[],
    statusNo: number,
    fromIndex: number,
    toIndex: number,
  ): Status[] {
    const newStatuses = [...statuses];
    const status = newStatuses.find((s) => s.statusNo === statusNo);
    if (!status) return statuses;

    const boards = [...status.boards];
    const [movedBoard] = boards.splice(fromIndex, 1);
    boards.splice(toIndex, 0, movedBoard);

    status.boards = boards;
    return newStatuses;
  },

  deleteBoard(statuses: Status[], statusNo: number, boardNo: number): Status[] {
    const newStatuses = [...statuses];
    const status = newStatuses.find((s) => s.statusNo === statusNo);
    if (!status) return statuses;

    status.boards = status.boards.filter((board) => board.boardNo !== boardNo);
    return newStatuses;
  },

  updateBoardTitle(
    statuses: Status[],
    statusNo: number,
    boardNo: number,
    title: string,
  ): Status[] {
    const newStatuses = [...statuses];
    const status = newStatuses.find((s) => s.statusNo === statusNo);
    if (!status) return statuses;

    status.boards = status.boards.map((board) =>
      board.boardNo === boardNo
        ? {
            ...board,
            title,
            updatedAt: new Date().toISOString(),
          }
        : board,
    );

    return newStatuses;
  },

  toggleArchiveBoard(
    statuses: Status[],
    statusNo: number,
    boardNo: number,
  ): Status[] {
    const newStatuses = [...statuses];
    const status = newStatuses.find((s) => s.statusNo === statusNo);
    if (!status) return statuses;

    status.boards = status.boards.map((board) =>
      board.boardNo === boardNo
        ? {
            ...board,
            isArchived: !board.isArchived,
            updatedAt: new Date().toISOString(),
          }
        : board,
    );

    return newStatuses;
  },
};
