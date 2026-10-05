import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Button } from '../Button'
import { Actions, Bar, Brand, NavItem } from './styles'

export function Header() {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <Bar>
      <Brand to="/">Cadastro</Brand>
      {user && (
        <Actions>
          <NavItem to="/" end title="Meus dados e endereços">
            {user.name}
          </NavItem>
          {user.role === 'ADMIN' && (
            <NavItem to="/admin" title="Painel do administrador">
              Painel do administrador
            </NavItem>
          )}
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              dispatch(logout())
              navigate('/login')
            }}
          >
            Sair
          </Button>
        </Actions>
      )}
    </Bar>
  )
}
