import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/useSearchStore';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  } = useSearchStore();

  // 검색 실행 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      addRecentSearch(searchTerm.trim());
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsDropdownOpen(false);
    }
  };

  // 최근 검색어 클릭 시 검색 실행
  const handleRecentSearchClick = (term: string) => {
    addRecentSearch(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
    setIsDropdownOpen(false);
  };

  return {
    searchTerm,
    setSearchTerm,
    isDropdownOpen,
    setIsDropdownOpen,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    handleSubmit,
    handleRecentSearchClick,
  };
};
