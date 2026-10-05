import { useEffect, useState } from 'react'
import { AddressForm } from '../AddressForm'
import { Button } from '../Button'
import { ConfirmModal } from '../ConfirmModal'
import { deleteAddress, fetchAddresses, setMainAddress } from '../../store/slices/addressSlice'
import type { Address } from '../../store/slices/addressSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Actions, Card, Content, Fields, List, Tag, Title } from './styles'

interface AddressListProps {
  userId: number
  canEdit?: boolean
}

export function AddressList({ userId, canEdit = false }: AddressListProps) {
  const dispatch = useAppDispatch()
  const { addresses, loading } = useAppSelector((state) => state.address)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null)

  useEffect(() => {
    dispatch(fetchAddresses(userId))
  }, [dispatch, userId])

  const sorted = [...addresses].sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
  const nextMainAddress = addressToDelete ? sorted.find((item) => item.id !== addressToDelete.id) : undefined

  const handleDelete = () => {
    if (addressToDelete?.id) {
      dispatch(deleteAddress({ id: addressToDelete.id, userId }))
    }
    setAddressToDelete(null)
  }

  const renderDeleteMessage = (address: Address) => {
    if (!address.isMainAddress) {
      return (
        <p>
          Deseja realmente excluir o endereço{' '}
          <strong>
            {address.street}, {address.number}
          </strong>
          ?
        </p>
      )
    }
    if (nextMainAddress) {
      return (
        <p>
          O endereço principal está sendo excluído. O endereço{' '}
          <strong>
            {nextMainAddress.street}, {nextMainAddress.number}
          </strong>{' '}
          passará a ser o novo endereço principal.
        </p>
      )
    }
    return (
      <p>
        Você está excluindo o seu único endereço principal. Lembre-se de cadastrar um novo endereço principal.
      </p>
    )
  }

  if (loading) {
    return <p>Carregando endereços...</p>
  }

  if (sorted.length === 0) {
    return <p>Nenhum endereço cadastrado.</p>
  }

  return (
    <>
      <List>
        {sorted.map((address) =>
          editingId === address.id ? (
            <AddressForm
              key={address.id}
              userId={userId}
              address={address}
              onClose={() => setEditingId(null)}
            />
          ) : (
            <Card key={address.id}>
              <Content>
                <Title>
                  <strong>
                    {address.street}, {address.number}
                  </strong>
                  <Tag $main={address.isMainAddress}>{address.isMainAddress ? 'Principal' : 'Secundário'}</Tag>
                </Title>
                <Fields>
                  <div>
                    <dt>CEP:</dt>
                    <dd>{address.zipCode}</dd>
                  </div>
                  <div>
                    <dt>Logradouro:</dt>
                    <dd>{address.street}</dd>
                  </div>
                  <div>
                    <dt>Número:</dt>
                    <dd>{address.number}</dd>
                  </div>
                  <div>
                    <dt>Complemento:</dt>
                    <dd>{address.complement || '—'}</dd>
                  </div>
                  <div>
                    <dt>Bairro:</dt>
                    <dd>{address.neighborhood}</dd>
                  </div>
                  <div>
                    <dt>Cidade:</dt>
                    <dd>{address.city}</dd>
                  </div>
                  <div>
                    <dt>Estado:</dt>
                    <dd>{address.state}</dd>
                  </div>
                </Fields>
              </Content>
              <Actions>
                {!address.isMainAddress && (
                  <Button type="button" variant="secondary" onClick={() => dispatch(setMainAddress(address))}>
                    Tornar principal
                  </Button>
                )}
                {canEdit && (
                  <Button type="button" onClick={() => setEditingId(address.id ?? null)}>
                    Editar
                  </Button>
                )}
                <Button type="button" variant="danger" onClick={() => setAddressToDelete(address)}>
                  Excluir
                </Button>
              </Actions>
            </Card>
          ),
        )}
      </List>
      {addressToDelete && (
        <ConfirmModal
          title={addressToDelete.isMainAddress ? 'Excluir endereço principal' : 'Excluir endereço'}
          confirmLabel="Excluir"
          confirmVariant="danger"
          onConfirm={handleDelete}
          onCancel={() => setAddressToDelete(null)}
        >
          {renderDeleteMessage(addressToDelete)}
        </ConfirmModal>
      )}
    </>
  )
}
