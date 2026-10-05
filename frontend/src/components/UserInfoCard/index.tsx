import { RoleBadge } from '../RoleBadge'
import type { AuthUser } from '../../store/types'
import { formatCpf } from '../../utils/format'
import { Card, Fields } from './styles'

interface UserInfoCardProps {
  user: AuthUser
  title: string
}

export function UserInfoCard({ user, title }: UserInfoCardProps) {
  return (
    <Card>
      <h2>{title}</h2>
      <Fields>
        <div>
          <dt>Nome completo</dt>
          <dd>{user.name}</dd>
        </div>
        <div>
          <dt>CPF</dt>
          <dd>{formatCpf(user.cpf)}</dd>
        </div>
        <div>
          <dt>Data de nascimento</dt>
          <dd>{user.birthDate}</dd>
        </div>
        <div>
          <dt>Perfil</dt>
          <dd>
            <RoleBadge role={user.role} />
          </dd>
        </div>
      </Fields>
    </Card>
  )
}
