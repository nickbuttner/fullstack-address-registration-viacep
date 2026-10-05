import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { register } from '../../store/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import type { Role } from '../../store/types'
import { isStrongPassword, PASSWORD_RULE_MESSAGE } from '../../utils/password'
import { Card, ErrorText, Field, HintText, Page } from './styles'

export function RegisterPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, error } = useAppSelector((state) => state.auth)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    birthDate: '',
    password: '',
    role: 'USER' as Role,
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!isStrongPassword(form.password)) {
      setPasswordError(PASSWORD_RULE_MESSAGE)
      return
    }
    const result = await dispatch(register(form))
    if (register.fulfilled.match(result)) {
      navigate('/')
    }
  }

  return (
    <Page>
      <Card onSubmit={handleSubmit}>
        <h1>Cadastro</h1>
        <Input
          label="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          label="CPF"
          value={form.cpf}
          onChange={(e) => setForm({ ...form, cpf: e.target.value })}
          required
        />
        <Input
          label="Data de nascimento"
          type="date"
          value={form.birthDate}
          onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
          required
        />
        <Input
          label="Senha"
          type="password"
          value={form.password}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value })
            setPasswordError(null)
          }}
          required
        />
        <HintText>{PASSWORD_RULE_MESSAGE}</HintText>
        {passwordError && <ErrorText>{passwordError}</ErrorText>}
        <Field>
          <label htmlFor="role">Tipo de perfil</label>
          <select
            id="role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
          >
            <option value="USER">Usuário Comum</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </Field>
        {error && <ErrorText>{error}</ErrorText>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Criar conta'}
        </Button>
        <p>
          Já possui conta? <Link to="/login">Entrar</Link>
        </p>
      </Card>
    </Page>
  )
}
