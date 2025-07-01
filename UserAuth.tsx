'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { User, LogIn, LogOut, Settings, UserPlus } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export function UserAuth() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple mock login - in real app, this would call an API
    if (formData.email && formData.password) {
      const mockUser: User = {
        id: '1',
        name: formData.name || 'User',
        email: formData.email,
        avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face`
      }
      setUser(mockUser)
      setIsLoggedIn(true)
      setShowLoginModal(false)
      setFormData({ email: '', password: '', name: '' })
      
      // Show success notification
      if (typeof window !== 'undefined' && (window as any).addNotification) {
        (window as any).addNotification({
          type: 'success',
          title: 'Login Successful',
          message: `Welcome back, ${mockUser.name}!`
        })
      }
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple mock signup - in real app, this would call an API
    if (formData.email && formData.password && formData.name) {
      const mockUser: User = {
        id: '1',
        name: formData.name,
        email: formData.email,
        avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face`
      }
      setUser(mockUser)
      setIsLoggedIn(true)
      setShowSignupModal(false)
      setFormData({ email: '', password: '', name: '' })
      
      // Show success notification
      if (typeof window !== 'undefined' && (window as any).addNotification) {
        (window as any).addNotification({
          type: 'success',
          title: 'Account Created',
          message: `Welcome to Personalized Dashboard, ${mockUser.name}!`
        })
      }
    }
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
    setShowDropdown(false)
    
    // Show notification
    if (typeof window !== 'undefined' && (window as any).addNotification) {
      (window as any).addNotification({
        type: 'info',
        title: 'Logged Out',
        message: 'You have been successfully logged out.'
      })
    }
  }

  return (
    <>
      {/* User Button */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        >
          {isLoggedIn && user ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-6 w-6 rounded-full"
            />
          ) : (
            <User className="h-6 w-6" />
          )}
        </button>

        {/* User Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            {isLoggedIn && user ? (
              <>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <a
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Sign in to your account
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setShowLoginModal(true)
                      setShowDropdown(false)
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <LogIn className="h-4 w-4 mr-3" />
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setShowSignupModal(true)
                      setShowDropdown(false)
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <UserPlus className="h-4 w-4 mr-3" />
                    Create Account
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Sign In
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Create Account
            </h2>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => setShowSignupModal(false)}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
} 