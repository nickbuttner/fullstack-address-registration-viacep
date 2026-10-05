import { configureStore } from '@reduxjs/toolkit'
import addressReducer from './slices/addressSlice'
import authReducer from './slices/authSlice'
import toastReducer from './slices/toastSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    address: addressReducer,
    toast: toastReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
