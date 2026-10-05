import styled from 'styled-components'

export const Page = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
`

export const Card = styled.form`
  width: 100%;
  max-width: 480px;
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  margin: 0;
`

export const HintText = styled.small`
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  select {
    padding: ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.card};
    color: ${({ theme }) => theme.colors.text};
  }
`
