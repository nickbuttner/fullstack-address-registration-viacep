export type Role = 'USER' | 'ADMIN'

export interface AuthUser {
  id: number
  name: string
  cpf: string
  birthDate: string
  role: Role
}

export interface AuthPayload {
  token: string
  user: AuthUser
}
