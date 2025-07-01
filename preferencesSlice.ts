import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PreferencesState } from '@/types'

const initialState: PreferencesState = {
  categories: ['technology', 'sports', 'business', 'entertainment'],
  theme: 'light',
  language: 'en',
  notifications: true,
  loading: false,
  error: null,
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload)
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(cat => cat !== action.payload)
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.notifications = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    resetPreferences: (state) => {
      state.categories = initialState.categories
      state.theme = initialState.theme
      state.language = initialState.language
      state.notifications = initialState.notifications
    },
  },
})

export const {
  setCategories,
  addCategory,
  removeCategory,
  setTheme,
  setLanguage,
  setNotifications,
  setLoading,
  setError,
  resetPreferences,
} = preferencesSlice.actions

export default preferencesSlice.reducer 