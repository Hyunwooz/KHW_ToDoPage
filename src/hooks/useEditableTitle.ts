import { useState } from 'react';

export const useEditableTitle = (
  initialTitle: string,
  onSubmit: (title: string) => void,
) => {
  const [editTitle, setEditTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleSubmit = () => {
    if (editTitle.trim() && editTitle !== initialTitle) {
      onSubmit(editTitle.trim());
    } else {
      setEditTitle(initialTitle);
    }
    setIsEditing(false);
  };

  return {
    editTitle,
    setEditTitle,
    isEditing,
    setIsEditing,
    handleTitleSubmit,
  };
};
