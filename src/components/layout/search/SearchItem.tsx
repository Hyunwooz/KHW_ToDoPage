interface SearchItemProps {
  term: string;
  onItemClick: (term: string) => void;
  onRemove: (term: string) => void;
}

const SearchItem = ({ term, onItemClick, onRemove }: SearchItemProps) => {
  return (
    <div className='group flex items-center justify-between px-3 py-2 hover:bg-gray-50'>
      <button
        onClick={() => onItemClick(term)}
        className='text-sm text-gray-600'
      >
        {term}
      </button>
      <button
        onClick={() => onRemove(term)}
        className='invisible text-xs text-gray-400 hover:text-gray-600 group-hover:visible'
      >
        삭제
      </button>
    </div>
  );
};

export default SearchItem;
