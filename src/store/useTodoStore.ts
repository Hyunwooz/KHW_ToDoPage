import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { todoService } from '@/services/todoService';
import { useStatusStore } from '@/store/useStatusStore';

interface TodoStore {
  lastTodoNo: number;
  addTodo: (boardNo: number) => void;
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
  moveTodo: (
    fromStatusNo: number,
    fromBoardNo: number,
    todoNo: number,
    toBoardNo: number,
  ) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      lastTodoNo: 0,

      addTodo: (boardNo) =>
        set((state) => {
          useStatusStore.setState((statusState) => ({
            statuses: todoService.addTodo(
              statusState.statuses,
              boardNo,
              '',
              state.lastTodoNo + 1,
            ),
          }));

          return { lastTodoNo: state.lastTodoNo + 1 };
        }),

      updateTodoContent: (statusNo, boardNo, todoNo, content) =>
        useStatusStore.setState((statusState) => ({
          statuses: todoService.updateTodoContent(
            statusState.statuses,
            statusNo,
            boardNo,
            todoNo,
            content,
          ),
        })),

      toggleTodo: (statusNo, boardNo, todoNo) =>
        useStatusStore.setState((statusState) => ({
          statuses: todoService.toggleTodo(
            statusState.statuses,
            statusNo,
            boardNo,
            todoNo,
          ),
        })),

      deleteTodo: (statusNo, boardNo, todoNo) =>
        useStatusStore.setState((statusState) => ({
          statuses: todoService.deleteTodo(
            statusState.statuses,
            statusNo,
            boardNo,
            todoNo,
          ),
        })),

      reorderTodos: (statusNo, boardNo, fromIndex, toIndex) =>
        useStatusStore.setState((statusState) => ({
          statuses: todoService.reorderTodos(
            statusState.statuses,
            statusNo,
            boardNo,
            fromIndex,
            toIndex,
          ),
        })),

      moveTodo: (fromStatusNo, fromBoardNo, todoNo, toBoardNo) =>
        useStatusStore.setState((statusState) => ({
          statuses: todoService.moveTodo(
            statusState.statuses,
            fromStatusNo,
            fromBoardNo,
            todoNo,
            toBoardNo,
          ),
        })),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
