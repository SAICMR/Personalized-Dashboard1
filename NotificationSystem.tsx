'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  duration?: number
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const { notifications: notificationsEnabled } = useSelector((state: RootState) => state.preferences)

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    const newNotification = { ...notification, id }
    setNotifications(prev => [...prev, newNotification])

    // Auto-remove notification after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const getNotificationStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
      case 'info':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800'
    }
  }

  // Expose addNotification globally for testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).addNotification = addNotification
    }
  }, [])

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 relative"
        >
          <Bell className="h-6 w-6" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
                <button
                  onClick={() => setShowDropdown(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 ${getNotificationStyles(notification.type)}`}
                  >
                    <div className="flex items-start">
                      {getNotificationIcon(notification.type)}
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {notification.message}
                        </p>
                      </div>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.slice(0, 3).map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg border ${getNotificationStyles(notification.type)} max-w-sm`}
          >
            <div className="flex items-start">
              {getNotificationIcon(notification.type)}
              <div className="ml-3 flex-1">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
} 