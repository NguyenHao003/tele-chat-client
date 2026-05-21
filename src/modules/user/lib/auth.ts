import { getAccessToken } from '@/helpers/auth-token'

export function getCurrentUserId() {
  const token = getAccessToken()

  if (!token) {
    return null
  }

  try {
    const [, payload] = token.split('.')
    const parsed = JSON.parse(atob(payload)) as { sub?: string }

    return parsed.sub ?? null
  } catch {
    return null
  }
}
