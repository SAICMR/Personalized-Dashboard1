'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Heart, 
  TrendingUp, 
  Settings, 
  X,
  Film,
  Newspaper,
  MessageCircle
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { categories } = useSelector((state: RootState) => state.preferences)

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Favorites', href: '/favorites', icon: Heart },
    { name: 'Trending', href: '/trending', icon: TrendingUp },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  const categoryIcons = {
    movies: Film,
    news: Newspaper,
    social: MessageCircle,
    technology: Film,
    sports: Film,
    business: Film,
    entertainment: Film,
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {/* Main Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                      ${isActive(item.href)
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                    onClick={onClose}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Categories */}
          <div className="pt-6">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="space-y-1">
              {categories.map((category) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons] || Film
                return (
                  <div
                    key={category}
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300"
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    <span className="capitalize">{category}</span>
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-500" />
                  </div>
                )
              })}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
} 