import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'
import type { AuthPayload, AuthUser, Role } from '../types'

interface AuthState {
  user: AuthUser | null
  token: string | null
  loading: boolean
  error: string | null
}

const storedToken = localStorage.getItem('token')
const storedUser = localStorage.getItem('user')

const initialState: AuthState = {
  token: storedToken,
  user: storedUser ? (JSON.parse(storedUser) as AuthUser) : null,
  loading: false,
  error: null,
}

function persist(payload: AuthPayload) {
  localStorage.setItem('token', payload.token)
  localStorage.setItem('user', JSON.stringify(payload.user))
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { cpf: string; password: string }) => {
    const response = await api.post<AuthPayload>('/auth/login', credentials)
    persist(response.data)
    return response.data
  },
)

export const register = createAsyncThunk(
  'auth/register',
  async (payload: { name: string; cpf: string; birthDate: string; password: string; role: Role }) => {
    const response = await api.post<AuthPayload>('/auth/register', payload)
    persist(response.data)
    return response.data
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Falha no login.'
      })
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Falha no cadastro.'
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
