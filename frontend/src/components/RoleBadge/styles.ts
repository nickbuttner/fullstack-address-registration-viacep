import styled from 'styled-components'

export const Badge = styled.span<{ $admin: boolean }>`
  display: inline-block;
  background: ${({ theme, $admin }) => ($admin ? theme.colors.primary : theme.colors.secondary)};
  color: white;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: bold;
`
