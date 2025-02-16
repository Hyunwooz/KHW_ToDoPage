import { useState, useRef } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { LargeMoreVerticalIcon } from '@/components/icons/Icon';
import { useTodoStore } from '@/store/useTodoStore';
import { useBoardStore } from '@/store/useBoardStore';

interface BoardMenuProps {
  boardNo: number;
  statusNo: number;
}

const BoardCardMenu = ({ boardNo, statusNo }: BoardMenuProps) => {
  const { addTodo } = useTodoStore();
  const { toggleArchiveBoard, deleteBoard } = useBoardStore();

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, () => setShowModal(false));

  return (
    <div>
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
              addTodo(boardNo);
              setShowModal(false);
            }}
            className='flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            할 일 추가
          </button>
          <button
            onClick={() => {
              toggleArchiveBoard(statusNo, boardNo);
              setShowModal(false);
            }}
            className='flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            보관하기
          </button>
          <button
            onClick={() => {
              if (confirm('정말로 이 보드를 삭제하시겠습니까?')) {
                deleteBoard(statusNo, boardNo);
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
  );
};

export default BoardCardMenu;
