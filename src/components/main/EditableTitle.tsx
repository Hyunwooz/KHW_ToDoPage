import { useState } from 'react';

interface EditableTitleProps {
  initialTitle: string;
  onSubmit: (newTitle: string) => void;
  placeholder?: string;
}

const EditableTitle = ({
  initialTitle,
  onSubmit,
  placeholder = '제목을 입력하세요!',
}: EditableTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(initialTitle);

  const handleSubmit = () => {
    if (editTitle.trim() && editTitle !== initialTitle) {
      onSubmit(editTitle.trim());
    } else {
      setEditTitle(initialTitle);
    }
    setIsEditing(false);
  };

  return isEditing ? (
    <input
      type='text'
      value={editTitle}
      onChange={(e) => setEditTitle(e.target.value)}
      onBlur={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSubmit();
        } else if (e.key === 'Escape') {
          setEditTitle(initialTitle);
          setIsEditing(false);
        }
      }}
      className='w-full rounded bg-transparent px-2 py-1 text-xl font-semibold focus:outline-none focus:ring-1 focus:ring-gray-300'
      autoFocus
    />
  ) : (
    <div className='flex flex-1 flex-col'>
      <h3
        className={`cursor-text rounded px-2 py-1 text-xl font-semibold hover:bg-gray-50 ${
          !initialTitle ? 'text-gray-400' : ''
        }`}
        onClick={() => setIsEditing(true)}
      >
        {initialTitle || placeholder}
      </h3>
    </div>
  );
};

export default EditableTitle;
