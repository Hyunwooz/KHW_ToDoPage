'use client';

import BoardCardBox from './BoardCardBox';
import { Status } from '@/shared/types/status';
import { useStats } from '@/hooks/useStats';
import StatCard from '@/components/stat/StatCard';

interface BoardContainerProps {
  statuses: Status[];
}

const BoardContainer = ({ statuses }: BoardContainerProps) => {
  const { stats } = useStats();

  return (
    <>
      <div className='mb-8 grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-10'>
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4'>
        {statuses.map((status) => (
          <BoardCardBox key={status.statusNo} status={status} />
        ))}
      </div>
    </>
  );
};

export default BoardContainer;
