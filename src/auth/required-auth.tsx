import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { ROUTES } from '@/enums/routes'
import { getAccessToken } from '@/helpers/auth-token'

export default function RequireAuth() {
  const accessToken = getAccessToken()
  const location = useLocation()

  if (!accessToken) {
    return <Navigate replace state={{ from: location }} to={ROUTES.LOGIN} />
  }

  return <Outlet />
}
