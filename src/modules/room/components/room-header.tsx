import { MoreVertical, Search, SquareSplitHorizontal } from 'lucide-react'

import { getCurrentUserId } from '@/modules/user/lib/auth'
import type { Room } from '@/modules/room/types'

type RoomHeaderProps = {
  room?: Room
}

export function RoomHeader({ room }: RoomHeaderProps) {
  if (!room) return null

  const currentUserId = getCurrentUserId()

  // Calculate title
  let title = room.name || ''
  if (room.type === 'direct') {
    const otherMember = room.members.find((m) => m.user.id !== currentUserId) ?? room.members[0]
    title = otherMember?.user?.username || 'Direct Chat'
  } else if (!title) {
    title = 'Group Chat'
  }

  const membersCount = room.members?.length || 0

  return (
    <header className='relative z-10 flex h-[50px] items-center justify-between border-b border-[#d9d9d9] bg-white px-5'>
      <div className='min-w-0'>
        <h2 className='truncate text-[14px] font-semibold leading-5'>{title}</h2>
        <p className='text-[12px] leading-4 text-[#707579]'>
          {room.type === 'direct' ? 'Direct Chat' : `${membersCount} thành viên`}
        </p>
      </div>
      <div className='flex items-center gap-4 text-[#8b8f93]'>
        <Search className='size-5' />
        <SquareSplitHorizontal className='size-5' />
        <MoreVertical className='size-5' />
      </div>
    </header>
  )
}

