import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Status } from '@/shared/types/status';

interface BoardStore {
  statuses: Status[];
  lastBoardNo: number;
  lastTodoNo: number;
  draggedBoard: {
    statusNo: number;
    index: number;
  } | null;
  addBoard: (statusNo: number, title: string) => void;
  reorderBoards: (statusNo: number, fromIndex: number, toIndex: number) => void;
  moveBoard: (
    fromStatusNo: number,
    toStatusNo: number,
    fromIndex: number,
  ) => void;
  addTodo: (boardNo: number, content: string) => void;
  setDraggedBoard: (info: { statusNo: number; index: number } | null) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      lastBoardNo: 0,
      lastTodoNo: 0,
      statuses: [
        { statusNo: 1, name: '해야 할 일', color: 'blue', boards: [] },
        { statusNo: 2, name: '진행 중', color: 'yellow', boards: [] },
        { statusNo: 3, name: '보류', color: 'red', boards: [] },
        { statusNo: 4, name: '완료됨', color: 'green', boards: [] },
      ],
      draggedBoard: null,

      addBoard: (statusNo, title) =>
        set((state) => ({
          lastBoardNo: state.lastBoardNo + 1,
          statuses: state.statuses.map((status) =>
            status.statusNo === statusNo
              ? {
                  ...status,
                  boards: [
                    ...status.boards,
                    {
                      boardNo: state.lastBoardNo + 1,
                      statusNo,
                      title,
                      todos: [],
                    },
                  ],
                }
              : status,
          ),
        })),

      addTodo: (boardNo, content) =>
        set((state) => ({
          lastTodoNo: state.lastTodoNo + 1,
          statuses: state.statuses.map((status) => ({
            ...status,
            boards: status.boards.map((board) =>
              board.boardNo === boardNo
                ? {
                    ...board,
                    todos: [
                      ...board.todos,
                      {
                        todoNo: state.lastTodoNo + 1,
                        content,
                      },
                    ],
                  }
                : board,
            ),
          })),
        })),

      reorderBoards: (statusNo, fromIndex, toIndex) => {
        set((state) => {
          const newStatuses = [...state.statuses];
          const status = newStatuses.find((s) => s.statusNo === statusNo);
          if (!status) return state;

          const boards = [...status.boards];
          const [movedBoard] = boards.splice(fromIndex, 1);
          boards.splice(toIndex, 0, movedBoard);

          status.boards = boards;
          return { statuses: newStatuses };
        });
      },

      moveBoard: (fromStatusNo, toStatusNo, fromIndex) =>
        set((state) => {
          const newStatuses = [...state.statuses];
          const fromStatus = newStatuses.find(
            (s) => s.statusNo === fromStatusNo,
          );
          const toStatus = newStatuses.find((s) => s.statusNo === toStatusNo);

          if (!fromStatus || !toStatus) return state;

          const boardToMove = fromStatus.boards[fromIndex];
          if (!boardToMove) return state;

          // 원래 상태에서 보드 제거
          fromStatus.boards = [
            ...fromStatus.boards.slice(0, fromIndex),
            ...fromStatus.boards.slice(fromIndex + 1),
          ];

          // 새로운 상태로 보드 이동
          const updatedBoard = {
            ...boardToMove,
            statusNo: toStatusNo,
          };

          toStatus.boards.push(updatedBoard);

          return { statuses: newStatuses };
        }),

      setDraggedBoard: (info) => set({ draggedBoard: info }),
    }),
    {
      name: 'board-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        statuses: state.statuses,
        lastBoardNo: state.lastBoardNo,
        lastTodoNo: state.lastTodoNo,
      }),
    },
  ),
);
