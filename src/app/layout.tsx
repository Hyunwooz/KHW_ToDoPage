import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/global.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'ToDo Page',
  description: '업무의 효율을 증진시키기 위한 칸반형태의 To-Do List 입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.className}`}>
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
              + New Tasks
            </button>
          </div>
        </header>
        <main className='mx-auto min-h-[70vh] max-w-primary px-4'>
          {children}
        </main>
      </body>
    </html>
  );
}
