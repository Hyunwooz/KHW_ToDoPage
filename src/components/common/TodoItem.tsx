interface TodoItemProps {
  content: string;
  isCompleted: boolean;
  todoNo: number;
}

const TodoItem = ({ content, isCompleted, todoNo }: TodoItemProps) => {
  return (
    <div key={todoNo} className='flex items-center gap-2 text-sm text-gray-600'>
      <input
        type='checkbox'
        checked={isCompleted}
        disabled
        className='h-4 w-4 rounded border-gray-300'
      />
      <span className={isCompleted ? 'text-gray-400 line-through' : ''}>
        {content || '(내용 없음)'}
      </span>
    </div>
  );
};

export default TodoItem;
