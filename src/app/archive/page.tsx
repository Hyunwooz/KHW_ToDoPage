'use client';

import ArchivedBoardHeader from '@/components/archive/ArchivedBoardHeader';
import ReadOnlyBoardCard from '@/components/common/ReadOnlyBoardCard';
import { useArchivedBoards } from '@/hooks/useArchivedBoards';

const ArchivedPage = () => {
  const { archivedBoards, toggleArchiveBoard } = useArchivedBoards();

  return (
    <div className='py-10'>
      <div className='space-y-6'>
        <ArchivedBoardHeader count={archivedBoards.length} />

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {archivedBoards.map((board) => (
            <ReadOnlyBoardCard
              key={board.boardNo}
              board={board}
              onUnarchive={toggleArchiveBoard}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchivedPage;
