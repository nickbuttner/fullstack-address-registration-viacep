import styled from 'styled-components'

export const Page = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
`

export const Card = styled.form`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
`

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  margin: 0;
`
