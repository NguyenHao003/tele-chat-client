import axios from 'axios'

import { ENV } from '@/constants/env'
import { ROUTES } from '@/enums/routes'
import { getAccessToken, removeAccessToken } from '@/helpers/auth-token'

const axiosAuth = axios.create({
  baseURL: `${ENV.API_URL}/api`,
})

axiosAuth.interceptors.request.use((config) => {
  const token = getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      removeAccessToken()

      if (window.location.pathname !== ROUTES.LOGIN) {
        window.location.href = ROUTES.LOGIN
      }
    }

    return Promise.reject(error)
  }
)

export default axiosAuth
