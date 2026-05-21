import { useMutation, type MutateOptions } from '@tanstack/react-query'

import { authApis, type RegisterPayload } from '@/modules/auth/apis'
import type { User } from '@/modules/user/types'

export function useRegister() {
  const mutation = useMutation({
    mutationFn: (payload: RegisterPayload) => authApis.register(payload),
  })

  const register = (
    values: RegisterPayload,
    options?: MutateOptions<User, Error, RegisterPayload>,
  ) => {
    mutation.mutate(values, options)
  }

  return {
    register,
    ...mutation,
  }
}
