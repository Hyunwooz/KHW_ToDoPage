import { useSearchParams } from 'next/navigation';
import { useStatusStore } from '@/store/useStatusStore';

export const useSearchBoards = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const { getAllBoards } = useStatusStore();

  const searchResults = searchTerm
    ? getAllBoards()
        .flatMap((status) =>
          status.boards.map((board) => ({
            ...board,
            statusName: status.name,
            statusColor: status.color,
          })),
        )
        .filter((board) =>
          board.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    : [];

  return {
    searchTerm,
    searchResults,
  };
};
