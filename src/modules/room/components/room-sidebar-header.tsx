import { LogOut, Menu, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/enums/routes'
import { removeAccessToken } from '@/helpers/auth-token'

export function RoomSidebarHeader() {
  const navigate = useNavigate()

  function handleLogout() {
    removeAccessToken()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <header className='flex h-12 items-center gap-3 px-3'>
      <button
        className='grid size-8 shrink-0 place-items-center rounded-full text-[#707579] hover:bg-[#f1f3f4]'
        title='Menu'
        type='button'
      >
        <Menu className='size-5' />
      </button>

      <label className='flex h-8 min-w-0 flex-1 items-center gap-2 rounded-full bg-[#f1f3f4] px-3'>
        <Search className='size-4 text-[#8b8f93]' />
        <input
          className='min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#8b8f93]'
          placeholder='Search'
        />
      </label>
      <button
        className='grid size-8 shrink-0 place-items-center rounded-full text-[#9aa0a6] transition hover:bg-[#f1f3f4] hover:text-[#707579]'
        onClick={handleLogout}
        title='Đăng xuất'
        type='button'
      >
        <LogOut className='size-4' />
      </button>
    </header>
  )
}
