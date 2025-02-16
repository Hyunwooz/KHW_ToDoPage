import { Status } from '@/shared/types/status';

export const todoService = {
  addTodo(
    statuses: Status[],
    boardNo: number,
    content: string,
    lastTodoNo: number,
  ): Status[] {
    return statuses.map((status) => ({
      ...status,
      boards: status.boards.map((board) =>
        board.boardNo === boardNo
          ? {
              ...board,
              todos: [
                ...board.todos,
                {
                  todoNo: lastTodoNo + 1,
                  content,
                  isCompleted: false,
                },
              ],
            }
          : board,
      ),
    }));
  },

  updateTodoContent(
    statuses: Status[],
    statusNo: number,
    boardNo: number,
    todoNo: number,
    content: string,
  ): Status[] {
    const newStatuses = [...statuses];
    const status = newStatuses.find((s) => s.statusNo === statusNo);
    if (!status) return statuses;

    status.boards = status.boards.map((board) =>
      board.boardNo === boardNo
        ? {
            ...board,
            todos: board.todos.map((todo) =>
              todo.todoNo === todoNo ? { ...todo, content } : todo,
            ),
            updatedAt: new Date().toISOString(),
          }
        : board,
    );

    return newStatuses;
  },

  reorderTodos(
    statuses: Status[],
    statusNo: number,
    boardNo: number,
    fromIndex: number,
    toIndex: number,
  ): Status[] {
    const newStatuses = [...statuses];
    const status = newStatuses.find((s) => s.statusNo === statusNo);
    if (!status) return statuses;

    const board = status.boards.find((b) => b.boardNo === boardNo);
    if (!board) return statuses;

    const todos = [...board.todos];
    const [movedTodo] = todos.splice(fromIndex, 1);
    todos.splice(toIndex, 0, movedTodo);

    status.boards = status.boards.map((b) =>
      b.boardNo === boardNo ? { ...b, todos } : b,
    );

    return newStatuses;
  },

  toggleTodo(
    statuses: Status[],
    statusNo: number,
    boardNo: number,
    todoNo: number,
  ): Status[] {
    const newStatuses = [...statuses];
    const status = newStatuses.find((s) => s.statusNo === statusNo);
    if (!status) return statuses;

    status.boards = status.boards.map((board) =>
      board.boardNo === boardNo
        ? {
            ...board,
            todos: board.todos.map((todo) =>
              todo.todoNo === todoNo
                ? { ...todo, isCompleted: !todo.isCompleted }
                : todo,
            ),
            updatedAt: new Date().toISOString(),
          }
        : board,
    );

    return newStatuses;
  },

  deleteTodo(
    statuses: Status[],
    statusNo: number,
    boardNo: number,
    todoNo: number,
  ): Status[] {
    const newStatuses = [...statuses];
    const status = newStatuses.find((s) => s.statusNo === statusNo);
    if (!status) return statuses;

    status.boards = status.boards.map((board) =>
      board.boardNo === boardNo
        ? {
            ...board,
            todos: board.todos.filter((todo) => todo.todoNo !== todoNo),
            updatedAt: new Date().toISOString(),
          }
        : board,
    );

    return newStatuses;
  },

  moveTodo: (
    statuses: Status[],
    fromStatusNo: number,
    fromBoardNo: number,
    todoNo: number,
    toBoardNo: number,
  ): Status[] => {
    const newStatuses = [...statuses];

    // 원본 할 일 찾기
    const fromStatus = newStatuses.find((s) => s.statusNo === fromStatusNo);
    const fromBoard = fromStatus?.boards.find((b) => b.boardNo === fromBoardNo);
    const todoIndex = fromBoard?.todos.findIndex((t) => t.todoNo === todoNo);

    if (!fromBoard || todoIndex === undefined || todoIndex === -1)
      return statuses;

    // 이동할 할 일
    const [todo] = fromBoard.todos.splice(todoIndex, 1);

    // 대상 보드 찾기 및 할 일 추가
    const toBoard = newStatuses
      .flatMap((s) => s.boards)
      .find((b) => b.boardNo === toBoardNo);

    if (!toBoard) return statuses;

    toBoard.todos.push(todo);
    toBoard.updatedAt = new Date().toISOString();

    return newStatuses;
  },
};
