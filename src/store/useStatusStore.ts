import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { statusService } from '@/services/statusService';
import { Status } from '@/shared/types/status';

interface StatusStore {
  statuses: Status[];
  getAllBoards: () => Status[];
  getActiveBoards: () => Status[];
  getArchivedBoards: () => Status[];
  setStatuses: (newStatuses: Status[]) => void;
}

export const useStatusStore = create<StatusStore>()(
  persist(
    (set, get) => ({
      statuses: [
        { statusNo: 1, name: '해야 할 일', color: 'blue', boards: [] },
        { statusNo: 2, name: '진행 중', color: 'green', boards: [] },
        { statusNo: 3, name: '보류', color: 'red', boards: [] },
        { statusNo: 4, name: '완료됨', color: 'gray', boards: [] },
      ],

      setStatuses: (newStatuses) => set({ statuses: newStatuses }),

      getAllBoards: () => {
        const { statuses } = get();
        return statusService.getAllBoards(statuses);
      },

      getActiveBoards: () => {
        const { statuses } = get();
        return statusService.getActiveBoards(statuses);
      },

      getArchivedBoards: () => {
        const { statuses } = get();
        return statusService.getArchivedBoards(statuses);
      },
    }),
    {
      name: 'status-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
