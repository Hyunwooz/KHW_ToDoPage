import { useRef, useState } from 'react';
import { useTodoEditing } from '@/hooks/useTodoEditing';
import { useTodoDragAndDrop } from '@/hooks/useTodoDragAndDrop';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Todo } from '@/shared/types/todo';
import { SmallMoreVerticalIcon } from '@/components/icons/Icon';
import { useAutoResizeTextarea } from '@/hooks/useAutoResizeTextarea';
import { useAvailableMoveBoards } from '@/hooks/useAvailableMoveBoards';

import { useTodoStore } from '@/store/useTodoStore';

interface TodoItemProps {
  todo: Todo;
  statusNo: number;
  boardNo: number;
  index: number;
}

export const TodoItem = ({ todo, statusNo, boardNo, index }: TodoItemProps) => {
  const { updateTodoContent, toggleTodo, deleteTodo, moveTodo, reorderTodos } =
    useTodoStore();
  const {
    editingTodoNo,
    setEditingTodoNo,
    editTodoContent,
    setEditTodoContent,
    handleTodoSubmit,
  } = useTodoEditing(todo, updateTodoContent, statusNo, boardNo);
  const { availableBoards } = useAvailableMoveBoards(boardNo);

  const todoMenuRef = useRef<HTMLDivElement>(null);
  const [todoMenuOpen, setTodoMenuOpen] = useState<number | null>(null);
  useClickOutside(todoMenuRef, () => setTodoMenuOpen(null));

  const { handleTodoDragStart, handleTodoDrop } = useTodoDragAndDrop(
    boardNo,
    reorderTodos,
    statusNo,
  );

  const textareaRef = useAutoResizeTextarea([editTodoContent, editingTodoNo]);

  return (
    <li
      key={todo.todoNo}
      draggable
      data-todo-drag='true'
      onDragStart={(e) => handleTodoDragStart(e, index)}
      onDragEnd={(e) => e.stopPropagation()}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => handleTodoDrop(e, index)}
      className='group/todo relative cursor-move rounded px-6 py-1 hover:bg-gray-100'
    >
      <div className='group/item flex items-start gap-2'>
        <input
          type='checkbox'
          checked={todo.isCompleted}
          onChange={() => toggleTodo(statusNo, boardNo, todo.todoNo)}
          onClick={(e) => e.stopPropagation()}
          className='mt-1.5 h-4 w-4 cursor-pointer rounded border-gray-300'
        />
        {editingTodoNo === todo.todoNo ? (
          <textarea
            value={editTodoContent}
            ref={textareaRef}
            onChange={(e) => setEditTodoContent(e.target.value)}
            onBlur={() => handleTodoSubmit(todo.todoNo)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleTodoSubmit(todo.todoNo);
              } else if (e.key === 'Escape') {
                setEditTodoContent(todo.content);
                setEditingTodoNo(null);
              }
            }}
            className='w-full resize-none overflow-hidden rounded border border-gray-300 p-1 focus:border-gray-400 focus:outline-none'
            autoFocus
            rows={1}
          />
        ) : (
          <div
            onClick={() => {
              setEditingTodoNo(todo.todoNo);
              setEditTodoContent(todo.content);
            }}
            className={`min-w-0 flex-1 cursor-text break-all border border-solid border-transparent p-1 ${
              todo.isCompleted ? 'text-gray-400 line-through' : ''
            } ${!todo.content ? 'text-gray-400' : ''}`}
          >
            {todo.content || '할 일을 입력하세요!'}
          </div>
        )}
      </div>
      <div className='group/todo absolute right-1 top-2'>
        <button
          onClick={() => setTodoMenuOpen(todo.todoNo)}
          className='invisible flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 group-hover/todo:visible'
        >
          <SmallMoreVerticalIcon />
        </button>

        {todoMenuOpen === todo.todoNo && (
          <div
            ref={todoMenuRef}
            className='absolute right-0 top-0 z-10 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg'
          >
            <div className='max-h-48 overflow-y-auto'>
              {availableBoards.length > 0 && (
                <>
                  <div className='px-3 py-1'>
                    <p className='text-xs font-medium text-gray-500'>
                      다른 보드로 이동
                    </p>
                  </div>
                  {availableBoards.map((targetBoard) => (
                    <button
                      key={targetBoard.boardNo}
                      onClick={() => {
                        moveTodo(
                          statusNo,
                          boardNo,
                          todo.todoNo,
                          targetBoard.boardNo,
                        );
                        setTodoMenuOpen(null);
                      }}
                      className='flex w-full items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50'
                    >
                      <span className='flex-1 truncate'>
                        {targetBoard.title}
                      </span>
                      <span className='ml-2 text-xs text-gray-400'>
                        {targetBoard.statusName}
                      </span>
                    </button>
                  ))}
                  <div className='my-1 border-t border-gray-100' />
                </>
              )}
              <button
                onClick={() => {
                  deleteTodo(statusNo, boardNo, todo.todoNo);
                  setTodoMenuOpen(null);
                }}
                className='flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50'
              >
                삭제
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
