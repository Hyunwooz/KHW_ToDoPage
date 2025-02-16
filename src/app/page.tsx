'use client';

import BoardContainer from '@/components/main/BoardContainer';
import { useStatusStore } from '@/store/useStatusStore';

const Home = () => {
  const { getActiveBoards } = useStatusStore();

  return (
    <div className='pb-10'>
      <BoardContainer statuses={getActiveBoards()} />
    </div>
  );
};

export default Home;
