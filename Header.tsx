'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { setTheme } from '@/store/slices/preferencesSlice'
import { Menu, X, Search } from 'lucide-react'
import { SearchBar } from './SearchBar'
import { ThemeToggle } from './ThemeToggle'
import { NotificationSystem } from './NotificationSystem'
import { UserAuth } from './UserAuth'

interface HeaderProps {
  onMenuToggle: () => void
  isSidebarOpen: boolean
}

export function Header({ onMenuToggle, isSidebarOpen }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [showSearch, setShowSearch] = useState(false)
  const { theme } = useSelector((state: RootState) => state.preferences)

  const handleThemeToggle = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            
            <div className="ml-4 lg:ml-0">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Personalized Dashboard
              </h1>
            </div>
          </div>

          {/* Center - Search (desktop) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {/* Mobile search toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Notification System */}
            <NotificationSystem />

            {/* User Authentication */}
            <UserAuth />

            {/* Theme Toggle */}
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
          </div>
        </div>

        {/* Mobile search bar */}
        {showSearch && (
          <div className="pb-4 md:hidden">
            <SearchBar />
          </div>
        )}
      </div>
    </header>
  )
} 
