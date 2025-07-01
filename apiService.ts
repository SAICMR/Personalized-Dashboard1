import axios from 'axios'
import { NewsApiResponse, TMDBResponse, SocialApiResponse } from '@/types'

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || 'demo'
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'demo'

// News API Service
const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2',
  params: {
    apiKey: NEWS_API_KEY,
    language: 'en',
    sortBy: 'publishedAt',
  },
})

// TMDB API Service
const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
})

// Mock Social API Service
const mockSocialApi = {
  async fetchPosts(hashtags: string[], page: number = 1): Promise<SocialApiResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockPosts = [
      {
        id: `social-${page}-1`,
        content: `Exciting news about #${hashtags[0] || 'technology'}! The latest developments are truly amazing. 🚀`,
        author: {
          name: 'Tech Enthusiast',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        },
        hashtags: hashtags.length > 0 ? hashtags : ['technology', 'innovation'],
        likes: Math.floor(Math.random() * 1000),
        shares: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString(),
        type: 'social' as const,
      },
      {
        id: `social-${page}-2`,
        content: `Just discovered an incredible breakthrough in #${hashtags[0] || 'science'}! This could change everything. 🔬`,
        author: {
          name: 'Science Explorer',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        },
        hashtags: hashtags.length > 0 ? hashtags : ['science', 'discovery'],
        likes: Math.floor(Math.random() * 800),
        shares: Math.floor(Math.random() * 50),
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'social' as const,
      },
      {
        id: `social-${page}-3`,
        content: `The future of #${hashtags[0] || 'AI'} is here! What do you think about these developments? 🤖`,
        author: {
          name: 'AI Researcher',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        },
        hashtags: hashtags.length > 0 ? hashtags : ['AI', 'future'],
        likes: Math.floor(Math.random() * 1200),
        shares: Math.floor(Math.random() * 200),
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: 'social' as const,
      },
    ]

    return {
      posts: mockPosts,
      total: mockPosts.length,
    }
  },
}

export const apiService = {
  // News API
  async fetchNews(category: string, page: number = 1): Promise<NewsApiResponse> {
    try {
      const response = await newsApi.get('/everything', {
        params: {
          q: category,
          page,
          pageSize: 10,
        },
      })
      return response.data
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn('News API failed, using mock data:', error)
      return {
        status: 'ok',
        totalResults: 10,
        articles: [
          {
            id: `mock-news-1`,
            title: `Latest ${category} news and updates`,
            description: `Stay updated with the latest ${category} news, trends, and developments from around the world.`,
            url: 'https://example.com',
            urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop',
            publishedAt: new Date().toISOString(),
            source: { name: 'Mock News' },
            category,
            type: 'news' as const,
          },
          {
            id: `mock-news-2`,
            title: `Breaking: Major developments in ${category}`,
            description: `Important updates and breaking news in the ${category} industry that you need to know.`,
            url: 'https://example.com',
            urlToImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&h=200&fit=crop',
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            source: { name: 'Mock News' },
            category,
            type: 'news' as const,
          },
        ],
      }
    }
  },

  // TMDB API
  async fetchMovies(page: number = 1): Promise<TMDBResponse> {
    try {
      const response = await tmdbApi.get('/movie/popular', {
        params: {
          page,
        },
      })
      return response.data
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn('TMDB API failed, using mock data:', error)
      return {
        page,
        results: [
          {
            id: 1,
            title: 'The Amazing Adventure',
            overview: 'An epic journey through unknown worlds with stunning visuals and compelling storytelling.',
            poster_path: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop',
            release_date: '2024-01-15',
            vote_average: 8.5,
            genre_ids: [12, 28, 878],
            type: 'movie' as const,
          },
          {
            id: 2,
            title: 'Mystery of the Deep',
            overview: 'A thrilling underwater adventure that explores the mysteries of the ocean depths.',
            poster_path: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop',
            release_date: '2024-02-20',
            vote_average: 7.8,
            genre_ids: [12, 53, 10751],
            type: 'movie' as const,
          },
        ],
        total_pages: 10,
        total_results: 100,
      }
    }
  },

  // Social API
  async fetchSocialPosts(hashtags: string[], page: number = 1): Promise<SocialApiResponse> {
    return mockSocialApi.fetchPosts(hashtags, page)
  },
} 