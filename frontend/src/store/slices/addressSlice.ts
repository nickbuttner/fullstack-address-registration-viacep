import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import api from '../../services/api'

export interface Address {
  id?: number
  zipCode: string
  street: string
  neighborhood: string
  city: string
  state: string
  number: string
  complement?: string
  isMainAddress: boolean
  userId: number
}

interface AddressState {
  addresses: Address[]
  loading: boolean
}

const initialState: AddressState = {
  addresses: [],
  loading: false,
}

export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async (userId: number) => {
    const response = await api.get<Address[]>(`/users/${userId}/addresses`)
    return response.data
  },
)

export const createAddress = createAsyncThunk(
  'address/createAddress',
  async (address: Address) => {
    const response = await api.post<Address>('/addresses', address)
    return response.data
  },
)

export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async (address: Address) => {
    const response = await api.put<Address>(`/addresses/${address.id}`, address)
    return response.data
  },
)

export const setMainAddress = createAsyncThunk(
  'address/setMainAddress',
  async (address: Address) => {
    const response = await api.patch<Address>(`/addresses/${address.id}/main`)
    return response.data
  },
)

export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async ({ id, userId }: { id: number; userId: number }, { dispatch }) => {
    await api.delete(`/addresses/${id}`)
    dispatch(fetchAddresses(userId))
  },
)

function applyUpdated(state: AddressState, updated: Address) {
  state.addresses = state.addresses.map((item) => {
    if (item.id === updated.id) {
      return updated
    }
    if (updated.isMainAddress) {
      return { ...item, isMainAddress: false }
    }
    return item
  })
}

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAddresses.fulfilled, (state, action: PayloadAction<Address[]>) => {
        state.loading = false
        state.addresses = action.payload
      })
      .addCase(fetchAddresses.rejected, (state) => {
        state.loading = false
      })
      .addCase(createAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        if (action.payload.isMainAddress) {
          state.addresses = state.addresses.map((item) => ({ ...item, isMainAddress: false }))
        }
        state.addresses.push(action.payload)
      })
      .addCase(updateAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        applyUpdated(state, action.payload)
      })
      .addCase(setMainAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        applyUpdated(state, action.payload)
      })
  },
})

export default addressSlice.reducer
