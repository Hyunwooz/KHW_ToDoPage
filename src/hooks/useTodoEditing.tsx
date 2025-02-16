import { useState } from 'react';

export const useTodoEditing = (
  boardTodos: { todoNo: number; content: string },
  updateTodoContent: (
    statusNo: number,
    boardNo: number,
    todoNo: number,
    content: string,
  ) => void,
  statusNo: number,
  boardNo: number,
) => {
  const [editingTodoNo, setEditingTodoNo] = useState<number | null>(null);
  const [editTodoContent, setEditTodoContent] = useState('');

  const handleTodoSubmit = (todoNo: number) => {
    updateTodoContent(statusNo, boardNo, todoNo, editTodoContent.trim());
    setEditingTodoNo(null);
  };

  return {
    editingTodoNo,
    setEditingTodoNo,
    editTodoContent,
    setEditTodoContent,
    handleTodoSubmit,
  };
};
