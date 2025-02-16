'use client';

import { useRef } from 'react';
import { SearchIcon } from '@/components/icons/Icon';
import SearchItem from './SearchItem';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useSearch } from '@/hooks/useSearch';

export default function SearchBar() {
  const {
    searchTerm,
    setSearchTerm,
    isDropdownOpen,
    setIsDropdownOpen,
    recentSearches,
    removeRecentSearch,
    clearRecentSearches,
    handleSubmit,
    handleRecentSearchClick,
  } = useSearch();

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <div className='relative'>
      <form onSubmit={handleSubmit}>
        <input
          id='search-input'
          type='text'
          placeholder='보드 검색...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          className='w-64 rounded-lg border border-gray-200 py-1.5 pl-9 pr-3 text-sm text-gray-500 outline-none focus:border-blue-500'
        />
        <SearchIcon />
      </form>

      {isDropdownOpen && recentSearches.length > 0 && (
        <div
          ref={dropdownRef}
          className='absolute top-full z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white py-2 shadow-lg'
        >
          <div className='flex items-center justify-between px-3 pb-2'>
            <span className='text-xs font-medium text-gray-500'>
              최근 검색어
            </span>
            <button
              onClick={() => {
                clearRecentSearches();
                setIsDropdownOpen(false);
              }}
              className='text-xs text-gray-400 hover:text-gray-600'
            >
              전체 삭제
            </button>
          </div>
          <div className='max-h-48 overflow-y-auto'>
            {recentSearches.map((term) => (
              <SearchItem
                key={term}
                term={term}
                onItemClick={handleRecentSearchClick}
                onRemove={removeRecentSearch}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
