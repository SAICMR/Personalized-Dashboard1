import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ContentState, ContentItem, NewsArticle, Movie, SocialPost } from '@/types'
import { apiService } from '@/services/apiService'

const initialState: ContentState = {
  items: [],
  favorites: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 1,
}

// Async thunks
export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async ({ categories, page = 1 }: { categories: string[], page?: number }, { rejectWithValue }) => {
    try {
      const allContent: ContentItem[] = []
      
      // Fetch news for each category
      for (const category of categories) {
        const newsResponse = await apiService.fetchNews(category, page)
        const newsWithIds = newsResponse.articles.map((article, index) => ({
          ...article,
          id: `${category}-${page}-${index}`,
          category,
          type: 'news' as const,
        }))
        allContent.push(...newsWithIds)
      }
      
      // Fetch movies
      const moviesResponse = await apiService.fetchMovies(page)
      const moviesWithIds = moviesResponse.results.map((movie, index) => ({
        ...movie,
        id: `movie-${page}-${index}`,
        type: 'movie' as const,
      }))
      allContent.push(...moviesWithIds)
      
      // Fetch social posts
      const socialResponse = await apiService.fetchSocialPosts(categories, page)
      const socialWithIds = socialResponse.posts.map((post, index) => ({
        ...post,
        id: `social-${page}-${index}`,
        type: 'social' as const,
      }))
      allContent.push(...socialWithIds)
      
      return {
        content: allContent,
        hasMore: moviesResponse.total_pages > page,
        page,
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch content')
    }
  }
)

export const loadMoreContent = createAsyncThunk(
  'content/loadMore',
  async ({ categories, page }: { categories: string[], page: number }, { rejectWithValue }) => {
    try {
      const allContent: ContentItem[] = []
      
      // Fetch news for each category
      for (const category of categories) {
        const newsResponse = await apiService.fetchNews(category, page)
        const newsWithIds = newsResponse.articles.map((article, index) => ({
          ...article,
          id: `${category}-${page}-${index}`,
          category,
          type: 'news' as const,
        }))
        allContent.push(...newsWithIds)
      }
      
      // Fetch movies
      const moviesResponse = await apiService.fetchMovies(page)
      const moviesWithIds = moviesResponse.results.map((movie, index) => ({
        ...movie,
        id: `movie-${page}-${index}`,
        type: 'movie' as const,
      }))
      allContent.push(...moviesWithIds)
      
      // Fetch social posts
      const socialResponse = await apiService.fetchSocialPosts(categories, page)
      const socialWithIds = socialResponse.posts.map((post, index) => ({
        ...post,
        id: `social-${page}-${index}`,
        type: 'social' as const,
      }))
      allContent.push(...socialWithIds)
      
      return {
        content: allContent,
        hasMore: moviesResponse.total_pages > page,
        page,
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to load more content')
    }
  }
)

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload)
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload)
    },
    clearContent: (state) => {
      state.items = []
      state.page = 1
      state.hasMore = true
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.content
        state.hasMore = action.payload.hasMore
        state.page = action.payload.page
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(loadMoreContent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadMoreContent.fulfilled, (state, action) => {
        state.loading = false
        state.items = [...state.items, ...action.payload.content]
        state.hasMore = action.payload.hasMore
        state.page = action.payload.page
      })
      .addCase(loadMoreContent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const {
  addToFavorites,
  removeFromFavorites,
  clearContent,
  setError,
} = contentSlice.actions

export default contentSlice.reducer 