import { Route, Routes } from 'react-router-dom'

import { ROUTES } from '@/enums/routes'
import ChatPage from '@/pages/chat'
import LoginPage from '@/pages/login'
import NotFoundPage from '@/pages/not-found'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<ChatPage />} path={ROUTES.HOME} />
      <Route element={<ChatPage />} path={ROUTES.CHAT} />
      <Route element={<ChatPage />} path={`${ROUTES.CHAT}/:roomId`} />
      <Route element={<LoginPage />} path={ROUTES.LOGIN} />
      <Route element={<NotFoundPage />} path='*' />
    </Routes>

  )
}
