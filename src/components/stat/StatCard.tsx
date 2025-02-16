import { Stat } from '@/shared/types/stat';

interface StatCardProps {
  stat: Stat;
}

const StatCard = ({ stat }: StatCardProps) => {
  return (
    <div className='flex justify-between rounded-lg border border-solid border-gray-200 bg-white p-6'>
      <div>
        <dt className='font-semibold text-gray-700'>{stat.label}</dt>
        <p className='mt-2 text-sm text-gray-500'>{stat.description}</p>
      </div>
      <dd className='mt-2'>
        <span className='text-3xl font-semibold text-gray-900'>
          {stat.value}
        </span>
      </dd>
    </div>
  );
};

export default StatCard;
