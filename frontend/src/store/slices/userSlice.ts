import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import api from '../../services/api'
import type { AuthUser } from '../types'

interface UserState {
  users: AuthUser[]
  loading: boolean
}

const initialState: UserState = {
  users: [],
  loading: false,
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await api.get<AuthUser[]>('/users')
  return response.data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<AuthUser[]>) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false
      })
  },
})

export default userSlice.reducer
