'use client';

import BoardContainer from '@/components/main/BoardContainer';
import { useBoardStore } from '@/store/useBoardStore';

const Home = () => {
  const { getActiveBoards } = useBoardStore();
  return (
    <div className='pb-10'>
      <BoardContainer boards={getActiveBoards()} />
    </div>
  );
};

export default Home;
