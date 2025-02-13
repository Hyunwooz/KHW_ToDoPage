import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Status } from '@/shared/types/status';

interface BoardStore {
  statuses: Status[];
  addBoard: (statusNo: number, title: string) => void;
  reorderBoards: (statusNo: number, fromIndex: number, toIndex: number) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      statuses: [
        { statusNo: 1, name: '해야 할 일', color: 'blue', boards: [] },
        { statusNo: 2, name: '진행 중', color: 'yellow', boards: [] },
        { statusNo: 3, name: '보류', color: 'red', boards: [] },
        { statusNo: 4, name: '완료됨', color: 'green', boards: [] },
      ],

      addBoard: (statusNo, title) =>
        set((state) => ({
          statuses: state.statuses.map((status) =>
            status.statusNo === statusNo
              ? {
                  ...status,
                  boards: [...status.boards, { statusNo, title, todos: [] }],
                }
              : status,
          ),
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
    }),
    {
      name: 'board-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
