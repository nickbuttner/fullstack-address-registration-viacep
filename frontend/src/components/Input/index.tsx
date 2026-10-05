import type { InputHTMLAttributes } from 'react'
import { InputGroup, Label, StyledInput } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Input({ label, id, ...props }: InputProps) {
  const inputId = id ?? label
  return (
    <InputGroup>
      <Label htmlFor={inputId}>{label}</Label>
      <StyledInput id={inputId} {...props} />
    </InputGroup>
  )
}
