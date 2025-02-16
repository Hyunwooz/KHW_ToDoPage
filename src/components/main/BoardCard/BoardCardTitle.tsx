import { useEditableTitle } from '@/hooks/useEditableTitle';
import { useBoardStore } from '@/store/useBoardStore';
import { useAutoResizeTextarea } from '@/hooks/useAutoResizeTextarea';

interface BoardTitleProps {
  title: string;
  boardNo: number;
  statusNo: number;
}

const BoardCardTitle = ({ title, boardNo, statusNo }: BoardTitleProps) => {
  const { updateBoardTitle } = useBoardStore();

  const {
    editTitle,
    setEditTitle,
    isEditing,
    setIsEditing,
    handleTitleSubmit,
  } = useEditableTitle(title, (newTitle) =>
    updateBoardTitle(statusNo, boardNo, newTitle),
  );

  const textareaRef = useAutoResizeTextarea([editTitle, isEditing]);

  return (
    <div className='min-w-0 flex-1'>
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleTitleSubmit}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleTitleSubmit();
            } else if (e.key === 'Escape') {
              setEditTitle(title);
              setIsEditing(false);
            }
          }}
          className='w-full resize-none overflow-hidden rounded border border-gray-300 p-1 text-xl font-semibold focus:border-gray-400 focus:outline-none'
          autoFocus
          rows={1}
        />
      ) : (
        <h3
          className={`cursor-text break-all border border-solid border-transparent p-1 text-xl font-semibold ${
            !title ? 'text-gray-400' : ''
          }`}
          onClick={() => setIsEditing(true)}
        >
          {title || '제목을 입력하세요!'}
        </h3>
      )}
    </div>
  );
};

export default BoardCardTitle;
