import BoardCardTitle from './BoardCardTitle';
import BoardCardMenu from './BoardCardMenu';

interface BoardHeaderProps {
  title: string;
  boardNo: number;
  statusNo: number;
}

const BoardCardHeader = ({ title, boardNo, statusNo }: BoardHeaderProps) => {
  return (
    <div className='flex items-center justify-between'>
      <BoardCardTitle title={title} boardNo={boardNo} statusNo={statusNo} />
      <BoardCardMenu boardNo={boardNo} statusNo={statusNo} />
    </div>
  );
};

export default BoardCardHeader;
