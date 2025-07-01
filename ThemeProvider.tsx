'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { setTheme } from '@/store/slices/preferencesSlice'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const { theme } = useSelector((state: RootState) => state.preferences)

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    // Check system preference on mount
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      dispatch(setTheme(e.matches ? 'dark' : 'light'))
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [dispatch])

  return <>{children}</>
} 