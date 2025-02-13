'use client';

import BoardContainer from '@/components/boardContainer';

const Home = () => {
  return (
    <div>
      <header className='px-4 py-14'>
        <div className='mx-auto flex max-w-primary flex-col justify-between gap-4 lg:flex-row lg:items-end'>
          <div>
            <h1 className='mb-4 text-5xl font-extrabold'>To Do List</h1>
            <div>
              <p className='font-medium text-gray-700'>
                Here all tasks in the project.
              </p>
              <p className='font-medium text-gray-700'>
                You will find information for each as well as assignees
                responsible for completion
              </p>
            </div>
          </div>
          <button className='h-12 w-32 rounded-xl bg-black font-bold text-white'>
            + New Board
          </button>
        </div>
      </header>
      <BoardContainer />
    </div>
  );
};

export default Home;
