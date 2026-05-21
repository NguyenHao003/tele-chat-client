import { CheckCheck } from 'lucide-react'

import { GradientAvatar } from '@/components/ui/avatar'
import { cn } from '@/helpers/common'
import type { RoomListItem } from '@/modules/room/types/ui'

type RoomListItemProps = {
  item: RoomListItem
}

export function RoomListItem({ item }: RoomListItemProps) {
  return (
    <button
      className={cn(
        'grid h-[59px] w-full grid-cols-[48px_minmax(0,1fr)_54px] items-center gap-2 px-4 text-left transition-colors hover:bg-[#f4f4f5]',
        item.active && 'bg-[#40a7e3] text-white hover:bg-[#40a7e3]',
      )}
      type='button'
    >
      <GradientAvatar color={item.color} initials={item.initials} />
      <div className='min-w-0'>
        <p className='truncate text-[13px] font-semibold'>{item.title}</p>
        <p
          className={cn(
            'mt-1 truncate text-[12px] text-[#707579]',
            item.active && 'text-white',
          )}
        >
          {item.preview}
        </p>
      </div>
      <div
        className={cn(
          'self-start pt-2 text-right text-[12px] text-[#8b8f93]',
          item.active && 'text-white',
        )}
      >
        <p>{item.time}</p>
        {item.checks ? (
          <CheckCheck className='ml-auto mt-2 size-4 text-[#55c96f]' />
        ) : null}
      </div>
    </button>
  )
}
