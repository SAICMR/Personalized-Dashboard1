'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { clearSearch } from '@/store/slices/searchSlice'
import { ContentCard } from './ContentCard'
import { LoadingSpinner } from './LoadingSpinner'
import { Search, X } from 'lucide-react'

export function SearchResults() {
  const dispatch = useDispatch<AppDispatch>()
  const { query, results, loading } = useSelector((state: RootState) => state.search)

  const handleClearSearch = () => {
    dispatch(clearSearch())
  }

  if (!query.trim()) {
    return null
  }

  return (
    <div className="space-y-6" data-testid="search-results">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Search Results
          </h2>
        </div>
        <button
          onClick={handleClearSearch}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          data-testid="search-clear"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </button>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Found {results.length} results for "{query}"
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search terms or browse our content categories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item, index) => (
            <ContentCard
              key={`search-${item.id}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  )
} 