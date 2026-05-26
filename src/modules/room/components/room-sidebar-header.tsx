import { ArrowLeft, LogOut, Menu, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/enums/routes'
import { removeAccessToken } from '@/helpers/auth-token'
import { cn } from '@/helpers/common'

type RoomSidebarHeaderProps = {
  isSearchOpen: boolean
  searchValue: string
  onCloseSearch: () => void
  onOpenSearch: () => void
  onSearchChange: (value: string) => void
}

export function RoomSidebarHeader({
  isSearchOpen,
  searchValue,
  onCloseSearch,
  onOpenSearch,
  onSearchChange,
}: RoomSidebarHeaderProps) {
  const navigate = useNavigate()

  function handleLogout() {
    removeAccessToken()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <header className='flex h-[66px] shrink-0 items-center gap-3 px-5'>
      <button
        className='grid size-8 shrink-0 place-items-center rounded-full text-[#707579] hover:bg-[#f1f3f4]'
        onClick={isSearchOpen ? onCloseSearch : undefined}
        title={isSearchOpen ? 'Back' : 'Menu'}
        type='button'
      >
        {isSearchOpen ? <ArrowLeft className='size-6' /> : <Menu className='size-5' />}
      </button>

      <label
        className={cn(
          'flex h-[52px] min-w-0 flex-1 items-center gap-3 rounded-full px-5 transition-colors',
          isSearchOpen
            ? 'border-2 border-[#3f8cff] bg-white'
            : 'border-2 border-transparent bg-[#f1f3f4]',
        )}
      >
        <Search className={cn('size-6 shrink-0', isSearchOpen ? 'text-[#3f8cff]' : 'text-[#8b8f93]')} />
        <input
          className='min-w-0 flex-1 bg-transparent text-[20px] outline-none placeholder:text-[#9aa0a6]'
          onChange={(event) => onSearchChange(event.target.value)}
          onFocus={onOpenSearch}
          placeholder='Search'
          value={searchValue}
        />
      </label>

      {!isSearchOpen ? (
        <button
          className='grid size-8 shrink-0 place-items-center rounded-full text-[#9aa0a6] transition hover:bg-[#f1f3f4] hover:text-[#707579]'
          onClick={handleLogout}
          title='Đăng xuất'
          type='button'
        >
          <LogOut className='size-4' />
        </button>
      ) : null}
    </header>
  )
}
