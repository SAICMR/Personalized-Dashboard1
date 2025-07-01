import { useEffect, useCallback, useRef } from 'react'

interface UseInfiniteScrollOptions {
  loading: boolean
  hasMore: boolean
  onLoadMore: () => void
  threshold?: number
}

export function useInfiniteScroll({
  loading,
  hasMore,
  onLoadMore,
  threshold = 100,
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && hasMore && !loading) {
        onLoadMore()
      }
    },
    [hasMore, loading, onLoadMore]
  )

  useEffect(() => {
    const element = loadingRef.current
    if (!element) return

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: `${threshold}px`,
    })

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver, threshold])

  return loadingRef
} 