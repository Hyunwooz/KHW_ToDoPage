import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SearchStore {
  recentSearches: string[];
  addRecentSearch: (term: string) => void;
  removeRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      recentSearches: [],
      addRecentSearch: (term: string) => {
        const trimmedTerm = term.trim();
        if (!trimmedTerm) return;

        set((state) => {
          const filtered = state.recentSearches.filter(
            (t) => t !== trimmedTerm,
          );
          return {
            recentSearches: [trimmedTerm, ...filtered].slice(0, 5), // 최근 5개만 유지
          };
        });
      },
      removeRecentSearch: (term: string) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter((t) => t !== term),
        })),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    },
  ),
);
