import styled from 'styled-components'

export const Box = styled.div<{ $type: 'success' | 'error' }>`
  position: fixed;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme, $type }) => ($type === 'success' ? theme.colors.success : theme.colors.danger)};
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 360px;
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
`
