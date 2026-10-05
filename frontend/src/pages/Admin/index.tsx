import { Fragment, useEffect, useState } from 'react'
import { AddressForm } from '../../components/AddressForm'
import { AddressList } from '../../components/AddressList'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { RoleBadge } from '../../components/RoleBadge'
import { UserInfoCard } from '../../components/UserInfoCard'
import { fetchUsers } from '../../store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { formatCpf } from '../../utils/format'
import { ExpandedCell, Page, Table } from './styles'

export function AdminPage() {
  const dispatch = useAppDispatch()
  const { users, loading } = useAppSelector((state) => state.user)
  const [search, setSearch] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const term = search.trim().toLowerCase()
  const digits = term.replace(/\D/g, '')
  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(term) || (digits !== '' && user.cpf.includes(digits)),
  )

  return (
    <>
      <Header />
      <Page>
        <h1>Usuários</h1>
        <Input
          label="Buscar por nome ou CPF"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Digite um nome ou CPF"
        />
        {loading && <p>Carregando...</p>}
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Nascimento</th>
              <th>Perfil</th>
              <th>Endereços</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const isSelected = user.id === selectedUserId
              return (
                <Fragment key={user.id}>
                  <tr>
                    <td>{user.name}</td>
                    <td>{formatCpf(user.cpf)}</td>
                    <td>{user.birthDate}</td>
                    <td>
                      <RoleBadge role={user.role} />
                    </td>
                    <td>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setSelectedUserId(isSelected ? null : user.id)}
                      >
                        {isSelected ? 'Ocultar' : 'Gerenciar'}
                      </Button>
                    </td>
                  </tr>
                  {isSelected && (
                    <tr>
                      <ExpandedCell colSpan={5}>
                        <div>
                          <UserInfoCard user={user} title="Dados do usuário" />
                          <h3>Endereços</h3>
                          <AddressForm userId={user.id} />
                          <AddressList userId={user.id} canEdit />
                        </div>
                      </ExpandedCell>
                    </tr>
                  )}
                </Fragment>
              )
            })}
            {!loading && filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5}>Nenhum usuário encontrado.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Page>
    </>
  )
}
