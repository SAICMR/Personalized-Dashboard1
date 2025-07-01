// Content Types
export interface NewsArticle {
  id: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
  }
  category: string
  type: 'news'
}

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  type: 'movie'
}

export interface SocialPost {
  id: string
  content: string
  author: {
    name: string
    avatar: string
  }
  hashtags: string[]
  likes: number
  shares: number
  timestamp: string
  type: 'social'
}

export type ContentItem = NewsArticle | Movie | SocialPost

// User Preferences
export interface UserPreferences {
  categories: string[]
  theme: 'light' | 'dark'
  language: string
  notifications: boolean
}

// API Response Types
export interface NewsApiResponse {
  status: string
  totalResults: number
  articles: NewsArticle[]
}

export interface TMDBResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface SocialApiResponse {
  posts: SocialPost[]
  total: number
}

// Redux State Types
export interface PreferencesState {
  categories: string[]
  theme: 'light' | 'dark'
  language: string
  notifications: boolean
  loading: boolean
  error: string | null
}

export interface ContentState {
  items: ContentItem[]
  favorites: string[]
  loading: boolean
  error: string | null
  hasMore: boolean
  page: number
}

export interface SearchState {
  query: string
  results: ContentItem[]
  loading: boolean
  error: string | null
}

export interface RootState {
  preferences: PreferencesState
  content: ContentState
  search: SearchState
}

// Component Props
export interface ContentCardProps {
  item: ContentItem
  onFavorite: (id: string) => void
  onShare: (item: ContentItem) => void
  isFavorite: boolean
}

export interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export interface CategoryFilterProps {
  categories: string[]
  selectedCategories: string[]
  onCategoryChange: (category: string) => void
}

// API Service Types
export interface ApiService {
  fetchNews: (category: string, page?: number) => Promise<NewsApiResponse>
  fetchMovies: (page?: number) => Promise<TMDBResponse>
  fetchSocialPosts: (hashtags: string[], page?: number) => Promise<SocialApiResponse>
} 