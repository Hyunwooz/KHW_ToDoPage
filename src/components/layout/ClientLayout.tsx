'use client';

import Header from '@/components/layout/Header';
import { useState, useEffect } from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-700'></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className='mx-auto min-h-[70vh] max-w-primary px-4 py-4 2xl:px-0'>
        {children}
      </main>
    </>
  );
};

export default ClientLayout;
