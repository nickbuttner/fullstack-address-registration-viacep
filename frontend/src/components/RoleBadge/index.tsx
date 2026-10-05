import type { Role } from '../../store/types'
import { Badge } from './styles'

export function RoleBadge({ role }: { role: Role }) {
  return <Badge $admin={role === 'ADMIN'}>{role === 'ADMIN' ? 'Administrador' : 'Usuário Comum'}</Badge>
}
