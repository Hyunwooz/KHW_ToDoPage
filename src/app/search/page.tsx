'use client';

import { useSearchBoards } from '@/hooks/useSearchBoards';
import ReadOnlyBoardCard from '@/components/common/ReadOnlyBoardCard';

export default function SearchPage() {
  const { searchResults } = useSearchBoards();

  return (
    <div className='space-y-4 py-10'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>
          총 {searchResults.length}개의 보드
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {searchResults.map((board) => (
          <ReadOnlyBoardCard key={board.boardNo} board={board} />
        ))}
      </div>

      {searchResults.length === 0 && (
        <div className='rounded-lg border border-gray-200 p-8 text-center'>
          <p className='text-gray-500'>검색 결과가 없습니다</p>
        </div>
      )}
    </div>
  );
}
