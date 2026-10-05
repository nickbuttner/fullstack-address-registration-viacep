import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  z-index: 1000;
`

export const Dialog = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Message = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`
