import { Status } from '@/shared/types/status';

export const statusService = {
  getAllBoards(statuses: Status[]): Status[] {
    return statuses.map((status) => ({
      ...status,
      boards: status.boards,
    }));
  },

  getActiveBoards(statuses: Status[]): Status[] {
    return statuses.map((status) => ({
      ...status,
      boards: status.boards.filter((board) => !board.isArchived),
    }));
  },

  getArchivedBoards(statuses: Status[]): Status[] {
    return statuses.map((status) => ({
      ...status,
      boards: status.boards.filter((board) => board.isArchived),
    }));
  },
};
