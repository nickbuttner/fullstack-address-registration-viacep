import styled from 'styled-components'

export const StyledButton = styled.button<{ $variant?: 'primary' | 'danger' | 'secondary' }>`
  background: ${({ theme, $variant }) =>
    $variant === 'danger'
      ? theme.colors.danger
      : $variant === 'secondary'
        ? theme.colors.secondary
        : theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
