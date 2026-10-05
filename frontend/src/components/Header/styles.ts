import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Bar = styled.header`
  background: ${({ theme }) => theme.colors.card};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Brand = styled(Link)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const NavItem = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text};
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.border};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
`
