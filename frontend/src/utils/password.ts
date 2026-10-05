const STRONG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

export const PASSWORD_RULE_MESSAGE =
  'A senha deve ter no mínimo 8 caracteres, com 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial.'

export function isStrongPassword(password: string): boolean {
  return STRONG_PASSWORD.test(password)
}
