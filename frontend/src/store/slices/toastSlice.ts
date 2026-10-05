import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  createAddress,
  deleteAddress,
  setMainAddress,
  updateAddress,
} from './addressSlice'

type ToastType = 'success' | 'error'

interface ToastState {
  id: number
  message: string | null
  type: ToastType
}

const initialState: ToastState = {
  id: 0,
  message: null,
  type: 'success',
}

function notify(state: ToastState, message: string, type: ToastType) {
  state.id += 1
  state.message = message
  state.type = type
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    hideToast(state) {
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddress.fulfilled, (state) => {
        notify(state, 'Endereço cadastrado com sucesso!', 'success')
      })
      .addCase(updateAddress.fulfilled, (state) => {
        notify(state, 'Endereço atualizado com sucesso!', 'success')
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        notify(state, 'Endereço excluído com sucesso!', 'success')
      })
      .addCase(setMainAddress.fulfilled, (state) => {
        notify(state, 'Endereço definido como principal com sucesso!', 'success')
      })
      .addMatcher(
        isAnyOf(
          createAddress.rejected,
          updateAddress.rejected,
          deleteAddress.rejected,
          setMainAddress.rejected,
        ),
        (state, action) => {
          notify(state, action.error.message ?? 'Não foi possível concluir a operação.', 'error')
        },
      )
  },
})

export const { hideToast } = toastSlice.actions
export default toastSlice.reducer
