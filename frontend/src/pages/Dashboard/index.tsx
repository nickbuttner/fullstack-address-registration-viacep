import { AddressForm } from '../../components/AddressForm'
import { AddressList } from '../../components/AddressList'
import { Header } from '../../components/Header'
import { UserInfoCard } from '../../components/UserInfoCard'
import { useAppSelector } from '../../store/hooks'
import { Page } from './styles'

export function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user)

  if (!user) {
    return null
  }

  return (
    <>
      <Header />
      <Page>
        <UserInfoCard user={user} title="Meus dados" />
        <div>
          <h1>Meus endereços</h1>
          <p>O primeiro endereço cadastrado vira o principal automaticamente.</p>
        </div>
        <AddressForm userId={user.id} />
        <AddressList userId={user.id} canEdit={user.role === 'ADMIN'} />
      </Page>
    </>
  )
}
