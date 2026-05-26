import { cn } from '@/helpers/common'
import { searchTabs } from '@/modules/room/constants/search-tabs'

export function RoomSearchTabs() {
  return (
    <nav className='flex h-[58px] shrink-0 items-end overflow-x-auto border-b border-[#eef0f2] px-5'>
      {searchTabs.map((tab, index) => (
        <button
          className={cn(
            'relative h-full shrink-0 px-5 text-[19px] font-semibold text-[#707579] transition-colors hover:text-[#3f8cff]',
            index === 0 && 'text-[#3f8cff]'
          )}
          key={tab}
          type='button'
        >
          {tab}
          {index === 0 ? (
            <span className='absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-[#3f8cff]' />
          ) : null}
        </button>
      ))}
    </nav>
  )
}
