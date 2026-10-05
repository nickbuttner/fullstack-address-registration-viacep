import { useEffect } from 'react'
import { hideToast } from '../../store/slices/toastSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Box, CloseButton } from './styles'

export function Toast() {
  const dispatch = useAppDispatch()
  const { id, message, type } = useAppSelector((state) => state.toast)

  useEffect(() => {
    if (!message) {
      return
    }
    const timer = setTimeout(() => dispatch(hideToast()), 3500)
    return () => clearTimeout(timer)
  }, [id, message, dispatch])

  if (!message) {
    return null
  }

  return (
    <Box role="status" $type={type}>
      <span>{message}</span>
      <CloseButton type="button" aria-label="Fechar alerta" onClick={() => dispatch(hideToast())}>
        ×
      </CloseButton>
    </Box>
  )
}
