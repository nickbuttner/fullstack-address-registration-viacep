import styled from 'styled-components'

export const Card = styled.section`
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  h2 {
    margin: 0;
  }
`

export const Fields = styled.dl`
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr);
  }

  dt {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  dd {
    margin: ${({ theme }) => theme.spacing.xs} 0 0;
    font-weight: 600;
  }
`
