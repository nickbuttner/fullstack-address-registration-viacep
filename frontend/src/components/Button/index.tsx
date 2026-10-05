import type { ButtonHTMLAttributes } from 'react'
import { StyledButton } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'secondary'
}

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <StyledButton $variant={variant} {...props} />
}
