'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { setTheme, setNotifications, resetPreferences, addCategory, removeCategory } from '@/store/slices/preferencesSlice'
import { DashboardLayout } from '@/components/DashboardLayout'
import { ThemeToggle } from '@/components/ThemeToggle'
import { CategoryFilter } from '@/components/CategoryFilter'
import { Bell, BellOff, RotateCcw } from 'lucide-react'

export default function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { theme, notifications, categories } = useSelector((state: RootState) => state.preferences)

  const handleThemeToggle = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }

  const handleNotificationToggle = () => {
    dispatch(setNotifications(!notifications))
  }

  const handleCategoryChange = (category: string) => {
    if (categories.includes(category)) {
      dispatch(removeCategory(category))
    } else {
      dispatch(addCategory(category))
    }
  }

  const handleResetPreferences = () => {
    if (confirm('Are you sure you want to reset all preferences? This action cannot be undone.')) {
      dispatch(resetPreferences())
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your dashboard experience
          </p>
        </div>

        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Theme
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose between light and dark mode
              </p>
            </div>
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Notifications
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Push Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive updates about new content
              </p>
            </div>
            <button
              onClick={handleNotificationToggle}
              className={`p-2 rounded-md transition-colors ${
                notifications 
                  ? 'text-blue-600 hover:text-blue-700' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {notifications ? (
                <Bell className="h-6 w-6" />
              ) : (
                <BellOff className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Category Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Content Categories
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Select which categories of content you want to see
          </p>
          <CategoryFilter
            categories={['technology', 'sports', 'business', 'entertainment', 'science', 'health']}
            selectedCategories={categories}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Reset Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Reset Settings
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Reset All Preferences
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Reset all settings to their default values
              </p>
            </div>
            <button
              onClick={handleResetPreferences}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 