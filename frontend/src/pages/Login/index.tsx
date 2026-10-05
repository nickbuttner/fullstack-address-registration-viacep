import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { login } from '../../store/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Card, ErrorText, Page } from './styles'

export function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, error } = useAppSelector((state) => state.auth)
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const result = await dispatch(login({ cpf, password }))
    if (login.fulfilled.match(result)) {
      navigate('/')
    }
  }

  return (
    <Page>
      <Card onSubmit={handleSubmit}>
        <h1>Entrar</h1>
        <Input label="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <ErrorText>{error}</ErrorText>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
        <p>
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </Card>
    </Page>
  )
}
