import styled from 'styled-components'

export const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Card = styled.article`
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

export const Tag = styled.span<{ $main: boolean }>`
  background: ${({ theme, $main }) => ($main ? theme.colors.success : theme.colors.textSecondary)};
  color: white;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: bold;
`

export const Fields = styled.dl`
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr);
  }

  div {
    display: flex;
    gap: ${({ theme }) => theme.spacing.xs};
  }

  dt {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  dd {
    margin: 0;
    font-weight: 600;
    overflow-wrap: anywhere;
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 720px) {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`
