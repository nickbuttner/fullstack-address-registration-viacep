import api from './api'

interface ZipCodeResult {
  street: string
  neighborhood: string
  city: string
  state: string
}

export async function findZipCode(zipCode: string): Promise<ZipCodeResult | null> {
  const cleanZipCode = zipCode.replace(/\D/g, '')
  if (cleanZipCode.length !== 8) {
    return null
  }
  try {
    const { data } = await api.get<ZipCodeResult>(`/addresses/zip-code/${cleanZipCode}`)
    return {
      street: data.street,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
    }
  } catch {
    return null
  }
}
