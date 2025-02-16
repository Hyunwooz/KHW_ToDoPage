import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { boardService } from '@/services/boardService';
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
    toIndex?: number,
  ) => void;
  addTodo: (boardNo: number, content: string) => void;
  setDraggedBoard: (info: { statusNo: number; index: number } | null) => void;
  deleteBoard: (statusNo: number, boardNo: number) => void;
  updateBoardTitle: (statusNo: number, boardNo: number, title: string) => void;
  updateTodoContent: (
    statusNo: number,
    boardNo: number,
    todoNo: number,
    content: string,
  ) => void;
  reorderTodos: (
    statusNo: number,
    boardNo: number,
    fromIndex: number,
    toIndex: number,
  ) => void;
  toggleTodo: (statusNo: number, boardNo: number, todoNo: number) => void;
  deleteTodo: (statusNo: number, boardNo: number, todoNo: number) => void;
  toggleArchiveBoard: (statusNo: number, boardNo: number) => void;
  getAllBoards: () => Status[];
  getActiveBoards: () => Status[];
  getArchivedBoards: () => Status[];
  moveTodo: (
    fromStatusNo: number,
    fromBoardNo: number,
    todoNo: number,
    toBoardNo: number,
  ) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set, get) => ({
      lastBoardNo: 0,
      lastTodoNo: 0,
      statuses: [
        { statusNo: 1, name: '해야 할 일', color: 'blue', boards: [] },
        { statusNo: 2, name: '진행 중', color: 'green', boards: [] },
        { statusNo: 3, name: '보류', color: 'red', boards: [] },
        { statusNo: 4, name: '완료됨', color: 'gray', boards: [] },
      ],
      draggedBoard: null,

      addBoard: (statusNo, title) =>
        set((state) => ({
          lastBoardNo: state.lastBoardNo + 1,
          statuses: boardService.addBoard(
            state.statuses,
            statusNo,
            title,
            state.lastBoardNo,
          ),
        })),

      addTodo: (boardNo, content) =>
        set((state) => ({
          lastTodoNo: state.lastTodoNo + 1,
          statuses: boardService.addTodo(
            state.statuses,
            boardNo,
            content,
            state.lastTodoNo,
          ),
        })),

      reorderBoards: (statusNo, fromIndex, toIndex) =>
        set((state) => ({
          statuses: boardService.reorderBoards(
            state.statuses,
            statusNo,
            fromIndex,
            toIndex,
          ),
        })),

      moveBoard: (fromStatusNo, toStatusNo, fromIndex, toIndex?: number) =>
        set((state) => ({
          statuses: boardService.moveBoard(
            state.statuses,
            fromStatusNo,
            toStatusNo,
            fromIndex,
            toIndex,
          ),
        })),

      setDraggedBoard: (info) => set({ draggedBoard: info }),

      deleteBoard: (statusNo, boardNo) =>
        set((state) => ({
          statuses: boardService.deleteBoard(state.statuses, statusNo, boardNo),
        })),

      updateBoardTitle: (statusNo, boardNo, title) =>
        set((state) => ({
          statuses: boardService.updateBoardTitle(
            state.statuses,
            statusNo,
            boardNo,
            title,
          ),
        })),

      updateTodoContent: (statusNo, boardNo, todoNo, content) =>
        set((state) => ({
          statuses: boardService.updateTodoContent(
            state.statuses,
            statusNo,
            boardNo,
            todoNo,
            content,
          ),
        })),

      reorderTodos: (statusNo, boardNo, fromIndex, toIndex) =>
        set((state) => ({
          statuses: boardService.reorderTodos(
            state.statuses,
            statusNo,
            boardNo,
            fromIndex,
            toIndex,
          ),
        })),

      toggleTodo: (statusNo, boardNo, todoNo) =>
        set((state) => ({
          statuses: boardService.toggleTodo(
            state.statuses,
            statusNo,
            boardNo,
            todoNo,
          ),
        })),

      deleteTodo: (statusNo, boardNo, todoNo) =>
        set((state) => ({
          statuses: boardService.deleteTodo(
            state.statuses,
            statusNo,
            boardNo,
            todoNo,
          ),
        })),

      toggleArchiveBoard: (statusNo, boardNo) =>
        set((state) => ({
          statuses: boardService.toggleArchiveBoard(
            state.statuses,
            statusNo,
            boardNo,
          ),
        })),

      getAllBoards: () => {
        const { statuses } = get();
        return boardService.getAllBoards(statuses);
      },

      getActiveBoards: () => {
        const { statuses } = get();
        return boardService.getActiveBoards(statuses);
      },

      getArchivedBoards: () => {
        const { statuses } = get();
        return boardService.getArchivedBoards(statuses);
      },

      moveTodo: (fromStatusNo, fromBoardNo, todoNo, toBoardNo) =>
        set((state) => ({
          statuses: boardService.moveTodo(
            state.statuses,
            fromStatusNo,
            fromBoardNo,
            todoNo,
            toBoardNo,
          ),
        })),
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
