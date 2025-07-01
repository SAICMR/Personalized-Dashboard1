import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { SearchState, ContentItem } from '@/types'
import { apiService } from '@/services/apiService'

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
}

export const searchContent = createAsyncThunk(
  'search/searchContent',
  async (query: string, { rejectWithValue }) => {
    try {
      if (!query.trim()) {
        return { results: [] }
      }

      const allResults: ContentItem[] = []
      
      // Search in news
      try {
        const newsResponse = await apiService.fetchNews(query, 1)
        const newsWithIds = newsResponse.articles.map((article, index) => ({
          ...article,
          id: `search-news-${index}`,
          type: 'news' as const,
        }))
        allResults.push(...newsWithIds)
      } catch (error) {
        console.warn('News search failed:', error)
      }
      
      // Search in movies (using a general search)
      try {
        const moviesResponse = await apiService.fetchMovies(1)
        const filteredMovies = moviesResponse.results.filter(movie =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.overview.toLowerCase().includes(query.toLowerCase())
        )
        const moviesWithIds = filteredMovies.map((movie, index) => ({
          ...movie,
          id: `search-movie-${index}`,
          type: 'movie' as const,
        }))
        allResults.push(...moviesWithIds)
      } catch (error) {
        console.warn('Movie search failed:', error)
      }
      
      // Search in social posts
      try {
        const socialResponse = await apiService.fetchSocialPosts([query], 1)
        const filteredSocial = socialResponse.posts.filter(post =>
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.hashtags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        )
        const socialWithIds = filteredSocial.map((post, index) => ({
          ...post,
          id: `search-social-${index}`,
          type: 'social' as const,
        }))
        allResults.push(...socialWithIds)
      } catch (error) {
        console.warn('Social search failed:', error)
      }
      
      return { results: allResults }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Search failed')
    }
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    clearSearch: (state) => {
      state.query = ''
      state.results = []
      state.error = null
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchContent.pending, (state, action) => {
        state.loading = true
        state.error = null
        state.query = action.meta.arg
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.loading = false
        state.results = action.payload.results
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const {
  setQuery,
  clearSearch,
  setError,
} = searchSlice.actions

export default searchSlice.reducer 