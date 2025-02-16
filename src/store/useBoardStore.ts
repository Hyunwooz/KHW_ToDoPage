import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { boardService } from '@/services/boardService';
import { useStatusStore } from '@/store/useStatusStore';

interface BoardStore {
  lastBoardNo: number;
  draggedBoard: {
    statusNo: number;
    index: number;
  } | null;
  setDraggedBoard: (info: { statusNo: number; index: number } | null) => void;
  reorderBoards: (statusNo: number, fromIndex: number, toIndex: number) => void;
  addBoard: (statusNo: number, title: string) => void;
  moveBoard: (
    fromStatusNo: number,
    toStatusNo: number,
    fromIndex: number,
    toIndex?: number,
  ) => void;
  deleteBoard: (statusNo: number, boardNo: number) => void;
  updateBoardTitle: (statusNo: number, boardNo: number, title: string) => void;
  toggleArchiveBoard: (statusNo: number, boardNo: number) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      lastBoardNo: 0,
      draggedBoard: null,

      setDraggedBoard: (info) => set({ draggedBoard: info }),

      addBoard: (statusNo, title) =>
        set((state) => {
          useStatusStore.setState((statusState) => ({
            statuses: boardService.addBoard(
              statusState.statuses,
              statusNo,
              title,
              state.lastBoardNo + 1,
            ),
          }));

          return { lastBoardNo: state.lastBoardNo + 1 };
        }),

      reorderBoards: (statusNo, fromIndex, toIndex) =>
        useStatusStore.setState((statusState) => ({
          statuses: boardService.reorderBoards(
            statusState.statuses,
            statusNo,
            fromIndex,
            toIndex,
          ),
        })),

      moveBoard: (fromStatusNo, toStatusNo, fromIndex, toIndex) =>
        useStatusStore.setState((statusState) => ({
          statuses: boardService.moveBoard(
            statusState.statuses,
            fromStatusNo,
            toStatusNo,
            fromIndex,
            toIndex,
          ),
        })),

      deleteBoard: (statusNo, boardNo) =>
        useStatusStore.setState((statusState) => ({
          statuses: boardService.deleteBoard(
            statusState.statuses,
            statusNo,
            boardNo,
          ),
        })),

      updateBoardTitle: (statusNo, boardNo, title) =>
        useStatusStore.setState((statusState) => ({
          statuses: boardService.updateBoardTitle(
            statusState.statuses,
            statusNo,
            boardNo,
            title,
          ),
        })),

      toggleArchiveBoard: (statusNo, boardNo) =>
        useStatusStore.setState((statusState) => ({
          statuses: boardService.toggleArchiveBoard(
            statusState.statuses,
            statusNo,
            boardNo,
          ),
        })),
    }),
    {
      name: 'board-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
