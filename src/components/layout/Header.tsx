'use client';

import SearchBar from './search/SearchBar';
import NavLink from '@/components/layout/navigation/NavLink';
import Link from 'next/link';
import { navItems } from './navigation/navItems';

const Header = () => {
  return (
    <header className='border-b border-solid border-gray-200 px-4 py-4'>
      <div className='mx-auto flex max-w-primary flex-col justify-between gap-4 md:flex-row md:items-center'>
        <div className='flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-10'>
          <Link href='/'>
            <h1 className='text-4xl font-extrabold text-blue-700'>ToDo</h1>
          </Link>

          <nav className='flex items-center gap-4'>
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
