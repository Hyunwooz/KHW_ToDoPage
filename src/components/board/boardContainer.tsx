'use client';

import BoardCardBox from './boardCardBox';
import { useBoardStore } from '@/store/useBoardStore';

export default function BoardContainer() {
  const { statuses } = useBoardStore();

  return (
    <div className='grid grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-4'>
      {statuses.map((status) => (
        <BoardCardBox key={status.statusNo} status={status} />
      ))}
    </div>
  );
}
