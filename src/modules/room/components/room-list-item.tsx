import { CheckCheck } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { GradientAvatar } from '@/components/ui/avatar'
import { cn } from '@/helpers/common'
import { formattedDate } from '@/helpers/date'
import type { Room } from '@/modules/room/types'
import { getCurrentUserId } from '@/modules/user/lib/auth'

type RoomListItemProps = {
  room: Room
}

export function RoomListItem({ room }: RoomListItemProps) {
  const navigate = useNavigate()
  const { roomId } = useParams()
  const currentUserId = getCurrentUserId()

  const isActive = room.id === roomId


  // Calculate title
  let title = room.name || ''
  if (room.type === 'direct') {
    const otherMember = room.members.find((m) => m.user.id !== currentUserId) ?? room.members[0]
    title = otherMember?.user?.username || 'Direct Chat'
  } else if (!title) {
    title = 'Group Chat'
  }

  // Calculate initials
  const initials = title
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  // Calculate preview
  const preview = room.lastMessage?.content || 'Chưa có tin nhắn'

  // Calculate formatted time
  const messageTime = room.lastMessage?.createdAt || room.createdAt
  const time = formattedDate(messageTime, 'time')

  // Calculate gradient color
  const gradients = [
    'from-[#a7a7a7] to-[#737373]',
    'from-[#ffb23f] to-[#ff7a45]',
    'from-[#ff74a5] to-[#d959b8]',
    'from-[#9278ee] to-[#6d5ee7]',
    'from-[#71d06b] to-[#34b84d]',
    'from-[#ff7c61] to-[#ed4f42]',
    'from-[#57c7df] to-[#32a2c7]',
  ]
  const hash = room.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const color = gradients[Math.abs(hash) % gradients.length]

  const checks = room.lastMessage?.senderId === currentUserId

  return (
    <button
      className={cn(
        'grid h-[59px] w-full grid-cols-[48px_minmax(0,1fr)_54px] items-center gap-2 px-4 text-left transition-colors hover:bg-[#f4f4f5]',
        isActive && 'bg-[#40a7e3] text-white hover:bg-[#40a7e3]',
      )}
      onClick={() => navigate(`/chat/${room.id}`)}
      type='button'
    >
      <GradientAvatar color={color} initials={initials} />
      <div className='min-w-0'>
        <p className='truncate text-[13px] font-semibold'>{title}</p>
        <p
          className={cn(
            'mt-1 truncate text-[12px] text-[#707579]',
            isActive && 'text-white',
          )}
        >
          {preview}
        </p>
      </div>
      <div
        className={cn(
          'self-start pt-2 text-right text-[12px] text-[#8b8f93]',
          isActive && 'text-white',
        )}
      >
        <p>{time}</p>
        {checks ? (
          <CheckCheck className={cn('ml-auto mt-2 size-4 text-[#55c96f]', isActive && 'text-white')} />
        ) : null}
      </div>
    </button>
  )
}
