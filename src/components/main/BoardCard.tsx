'use client';

import { useState, useRef } from 'react';
import getStatusColor from '@/shared/utils/getStatusColor';
import { StatusColor } from '@/shared/types/status';
import { Board } from '@/shared/types/board';
import { Todo } from '@/shared/types/todo';
import { useAvailableMoveBoards } from '@/hooks/useAvailableMoveBoards';
import { useTodoDragAndDrop } from '@/hooks/useTodoDragAndDrop';
import { useBoardStore } from '@/store/useBoardStore';
import { useTodoStore } from '@/store/useTodoStore';

import { useClickOutside } from '@/hooks/useClickOutside';
import { useEditableTitle } from '@/hooks/useEditableTitle';
import { useTodoEditing } from '@/hooks/useTodoEditing';
import { useAutoResizeTextarea } from '@/hooks/useAutoResizeTextarea';
import {
  LargeMoreVerticalIcon,
  SmallMoreVerticalIcon,
} from '@/components/icons/Icon';

interface BoardCardProps {
  color: StatusColor;
  board: Board;
  statusNo: number;
}

const BoardCard = ({ color, board, statusNo }: BoardCardProps) => {
  const { border } = getStatusColor(color);
  const { availableBoards } = useAvailableMoveBoards(board);
  const { updateBoardTitle, deleteBoard, toggleArchiveBoard } = useBoardStore();
  const {
    addTodo,
    updateTodoContent,
    toggleTodo,
    deleteTodo,
    moveTodo,
    reorderTodos,
  } = useTodoStore();

  const modalRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  const todoMenuRef = useRef<HTMLDivElement>(null);
  const [todoMenuOpen, setTodoMenuOpen] = useState<number | null>(null);

  useClickOutside(modalRef, () => setShowModal(false));
  useClickOutside(todoMenuRef, () => setTodoMenuOpen(null));

  const {
    editTitle,
    setEditTitle,
    isEditing,
    setIsEditing,
    handleTitleSubmit,
  } = useEditableTitle(board.title, (newTitle) =>
    updateBoardTitle(statusNo, board.boardNo, newTitle),
  );

  const { handleTodoDragStart, handleTodoDrop } = useTodoDragAndDrop(
    board.boardNo,
    reorderTodos,
    statusNo,
  );

  const {
    editingTodoNo,
    setEditingTodoNo,
    editTodoContent,
    setEditTodoContent,
    handleTodoSubmit,
  } = useTodoEditing(board.todos, updateTodoContent, statusNo, board.boardNo);

  useAutoResizeTextarea('[data-todo-textarea]', [
    editTodoContent,
    editingTodoNo,
  ]);
  useAutoResizeTextarea('[data-title-textarea]', [editTitle, isEditing]);

  return (
    <div
      className={`group relative min-h-40 w-full space-y-4 border-t-4 border-solid ${border} bg-white p-4 shadow hover:bg-gray-50`}
    >
      <div className='flex items-center justify-between'>
        <div className='min-w-0 flex-1'>
          {isEditing ? (
            <textarea
              data-title-textarea
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
              onBlur={handleTitleSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleTitleSubmit();
                } else if (e.key === 'Escape') {
                  setEditTitle(board.title);
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
                !board.title ? 'text-gray-400' : ''
              }`}
              onClick={() => setIsEditing(true)}
            >
              {board.title || '제목을 입력하세요!'}
            </h3>
          )}
        </div>
        <div className='ml-2 flex-shrink-0'>
          <button
            onClick={() => setShowModal(!showModal)}
            className='invisible absolute right-0 top-3 text-gray-600 hover:text-gray-900 group-hover:visible'
          >
            <LargeMoreVerticalIcon />
          </button>

          {showModal && (
            <div
              ref={modalRef}
              className='absolute right-0 top-4 z-10 w-36 rounded-lg border border-gray-200 bg-white p-3 shadow-lg'
            >
              <button
                onClick={() => {
                  addTodo(board.boardNo, '');
                  setShowModal(false);
                }}
                className='flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                할 일 추가
              </button>
              <button
                onClick={() => {
                  toggleArchiveBoard(statusNo, board.boardNo);
                  setShowModal(false);
                }}
                className='flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                보관하기
              </button>
              <button
                onClick={() => {
                  if (confirm('정말로 이 보드를 삭제하시겠습니까?')) {
                    deleteBoard(statusNo, board.boardNo);
                  }
                  setShowModal(false);
                }}
                className='flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
      <ul className='flex flex-col gap-1'>
        {board.todos.length > 0 ? (
          board.todos.map((todo: Todo, index: number) => (
            <li
              key={todo.todoNo}
              draggable
              data-todo-drag='true'
              onDragStart={(e) => handleTodoDragStart(e, index)}
              onDragEnd={(e) => {
                e.stopPropagation();
              }}
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
                  onChange={() =>
                    toggleTodo(statusNo, board.boardNo, todo.todoNo)
                  }
                  onClick={(e) => e.stopPropagation()}
                  className='mt-1.5 h-4 w-4 cursor-pointer rounded border-gray-300'
                />
                {editingTodoNo === todo.todoNo ? (
                  <div className='min-w-0 flex-1'>
                    <textarea
                      data-todo-textarea
                      value={editTodoContent}
                      onChange={(e) => {
                        setEditTodoContent(e.target.value);
                      }}
                      onBlur={() => {
                        if (editingTodoNo === todo.todoNo) {
                          handleTodoSubmit(todo.todoNo);
                        }
                      }}
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
                  </div>
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
                                  board.boardNo,
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
                          deleteTodo(statusNo, board.boardNo, todo.todoNo);
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
          ))
        ) : (
          <li className='cursor-default px-2 py-1 text-gray-400'>
            새로운 할 일을 추가해보세요.
          </li>
        )}
      </ul>

      <button
        onClick={() => {
          addTodo(board.boardNo, '');
        }}
        className='w-full rounded border border-solid border-gray-200 py-1 text-center text-sm font-medium text-gray-500 hover:bg-gray-200'
      >
        + 할 일 추가
      </button>
    </div>
  );
};

export default BoardCard;
