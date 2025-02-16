interface BoardHeaderProps {
  count: number;
}

const ArchivedBoardHeader = ({ count }: BoardHeaderProps) => {
  return (
    <div className='flex items-center gap-2'>
      <h2 className='text-xl font-semibold text-gray-900'>보관된 보드</h2>
      <span className='rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800'>
        {count}개
      </span>
    </div>
  );
};

export default ArchivedBoardHeader;
