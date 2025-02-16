'use client';

import { useState } from 'react';
import SearchBar from './search/SearchBar';
import NavLink from '@/components/layout/navigation/NavLink';
import Link from 'next/link';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: '메인' },
    { href: '/stats', label: '통계' },
    { href: '/archive', label: '보관함' },
  ];

  return (
    <header className='border-b border-solid border-gray-200 px-4 py-4'>
      <div className='mx-auto flex max-w-primary flex-col justify-between gap-4 lg:flex-row lg:items-center'>
        <div className='flex items-center justify-between lg:gap-10'>
          <Link href='/'>
            <h1 className='text-4xl font-extrabold text-blue-700'>TaskFlow</h1>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='lg:hidden'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>

          <nav className='hidden items-center gap-4 lg:flex'>
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
        </div>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
          <nav className='flex flex-col gap-2'>
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
        </div>

        <div className='flex items-center gap-4'>
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
