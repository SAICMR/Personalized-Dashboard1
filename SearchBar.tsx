'use client'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Search, X } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { searchContent, clearSearch } from '@/store/slices/searchSlice'
import { AppDispatch } from '@/store'

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export function SearchBar({ placeholder = 'Search...', className = '' }: SearchBarProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(searchContent(debouncedQuery))
    } else {
      dispatch(clearSearch())
    }
  }, [debouncedQuery, dispatch])

  const handleClear = () => {
    setQuery('')
    dispatch(clearSearch())
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder={placeholder}
        data-testid="search-bar"
      />
      
      {query && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          data-testid="search-clear"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
        </button>
      )}
    </div>
  )
} 