import axiosAuth from '@/api/axios-auth'
import type { User } from '@/modules/user/types'
import type { ApiResponse } from '@/types/api'

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = LoginPayload & {
  username: string
  avatar?: string
}

export const authApis = {
  login: async (payload: LoginPayload) => {
    const response = await axiosAuth.post<
      ApiResponse<{ accessToken: string }>
    >('/auth/login', payload)

    return response.data.data.accessToken
  },

  register: async (payload: RegisterPayload) => {
    const response = await axiosAuth.post<ApiResponse<User>>(
      '/auth/register',
      payload,
    )

    return response.data.data
  },
}
