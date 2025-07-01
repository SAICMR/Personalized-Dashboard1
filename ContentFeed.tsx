'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { RootState, AppDispatch } from '@/store'
import { loadMoreContent } from '@/store/slices/contentSlice'
import { ContentCard } from './ContentCard'
import { LoadingSpinner } from './LoadingSpinner'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export function ContentFeed() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, hasMore, page } = useSelector((state: RootState) => state.content)
  const { categories } = useSelector((state: RootState) => state.preferences)

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(loadMoreContent({ categories, page: page + 1 }))
    }
  }

  const loadingRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: handleLoadMore,
  })

  if (items.length === 0 && !loading) {
    return (
      <div className="text-center py-12" data-testid="no-content">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No content available
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your category preferences to see more content.
        </p>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6" data-testid="content-feed">
        {/* Category Indicator */}
        {categories.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Active Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <ContentCard
              key={`${item.id}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </div>
        
        {/* Loading indicator for infinite scroll */}
        <div ref={loadingRef} className="flex justify-center py-8" data-testid="loading-spinner">
          {loading && <LoadingSpinner />}
        </div>
        
        {/* End of content message */}
        {!hasMore && items.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              You've reached the end of the content.
            </p>
          </div>
        )}
      </div>
    </DndProvider>
  )
} 