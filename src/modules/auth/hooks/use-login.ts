import { useMutation, type MutateOptions } from '@tanstack/react-query'

import { setAccessToken } from '@/helpers/auth-token'
import { authApis, type LoginPayload } from '@/modules/auth/apis'

export function useLogin() {
  const mutation = useMutation({
    mutationFn: (payload: LoginPayload) => authApis.login(payload),
    onSuccess: setAccessToken,
  })

  const login = (
    values: LoginPayload,
    options?: MutateOptions<string, Error, LoginPayload>,
  ) => {
    mutation.mutate(values, options)
  }

  return {
    login,
    ...mutation,
  }
}
