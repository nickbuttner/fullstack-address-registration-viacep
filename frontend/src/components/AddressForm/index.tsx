import { useState } from 'react'
import type { FocusEvent, FormEvent } from 'react'
import { createAddress, updateAddress } from '../../store/slices/addressSlice'
import type { Address } from '../../store/slices/addressSlice'
import { findZipCode } from '../../services/viaCep'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Button } from '../Button'
import { ConfirmModal } from '../ConfirmModal'
import { Input } from '../Input'
import { Actions, CheckLabel, FormContainer, Row } from './styles'

const emptyForm = {
  zipCode: '',
  street: '',
  neighborhood: '',
  city: '',
  state: '',
  number: '',
  complement: '',
  isMainAddress: false,
}

interface AddressFormProps {
  userId: number
  address?: Address
  onClose?: () => void
}

export function AddressForm({ userId, address, onClose }: AddressFormProps) {
  const dispatch = useAppDispatch()
  const isEditing = Boolean(address)
  const currentMainAddress = useAppSelector((state) =>
    state.address.addresses.find((item) => item.isMainAddress && item.id !== address?.id),
  )
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [formData, setFormData] = useState(
    address ? { ...emptyForm, ...address, complement: address.complement ?? '' } : emptyForm,
  )

  const applyZipCode = async (zipCode: string) => {
    const result = await findZipCode(zipCode)
    if (result) {
      setFormData((prev) => ({ ...prev, zipCode, ...result }))
    }
  }

  const handleZipCodeBlur = async (event: FocusEvent<HTMLInputElement>) => {
    await applyZipCode(event.target.value)
  }

  const saveAddress = async () => {
    const payload: Address = { ...formData, id: address?.id, userId }
    if (isEditing) {
      const result = await dispatch(updateAddress(payload))
      if (updateAddress.fulfilled.match(result)) {
        onClose?.()
      }
      return
    }
    const result = await dispatch(createAddress(payload))
    if (createAddress.fulfilled.match(result)) {
      setFormData(emptyForm)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (formData.isMainAddress && currentMainAddress) {
      setConfirmOpen(true)
      return
    }
    void saveAddress()
  }

  const handleConfirm = () => {
    setConfirmOpen(false)
    void saveAddress()
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Editar endereço' : 'Novo endereço'}</h2>
      <Row>
        <Input
          label="CEP"
          value={formData.zipCode}
          onChange={(e) => {
            const zipCode = e.target.value
            setFormData({ ...formData, zipCode })
            if (zipCode.replace(/\D/g, '').length === 8) {
              void applyZipCode(zipCode)
            }
          }}
          onBlur={handleZipCodeBlur}
          maxLength={8}
          required
        />
        <Input
          label="Número"
          value={formData.number}
          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
          required
        />
      </Row>
      <Input label="Logradouro" value={formData.street} readOnly required />
      <Row>
        <Input label="Bairro" value={formData.neighborhood} readOnly required />
        <Input label="Cidade" value={formData.city} readOnly required />
      </Row>
      <Row>
        <Input label="Estado" value={formData.state} readOnly required />
        <Input
          label="Complemento"
          value={formData.complement}
          onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
        />
      </Row>
      <CheckLabel>
        <input
          type="checkbox"
          checked={formData.isMainAddress}
          disabled={isEditing && address?.isMainAddress}
          onChange={(e) => setFormData({ ...formData, isMainAddress: e.target.checked })}
        />
        Definir como endereço principal
      </CheckLabel>
      <Actions>
        <Button type="submit">{isEditing ? 'Salvar alterações' : 'Salvar Endereço'}</Button>
        {isEditing && (
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        )}
      </Actions>
      {confirmOpen && currentMainAddress && (
        <ConfirmModal
          title="Definir como endereço principal?"
          confirmLabel="Sim, definir como principal"
          onConfirm={handleConfirm}
          onCancel={() => setConfirmOpen(false)}
        >
          <p>
            Este endereço será o novo endereço principal. O endereço{' '}
            <strong>
              {currentMainAddress.street}, {currentMainAddress.number}
            </strong>{' '}
            deixará de ser o principal.
          </p>
        </ConfirmModal>
      )}
    </FormContainer>
  )
}
