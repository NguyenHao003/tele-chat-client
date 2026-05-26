import { CheckCheck, UserRound } from 'lucide-react'

import { GradientAvatar } from '@/components/ui/avatar'
import { formattedDate } from '@/helpers/date'
import { getSearchAvatar } from '@/modules/room/helpers/search-conversation'
import type { SearchConversationItem } from '@/modules/room/types'

type SearchResultItemProps = {
  item: SearchConversationItem
  isCreating: boolean
  onSelect: () => void
}

export function SearchResultItem({
  item,
  isCreating,
  onSelect
}: SearchResultItemProps) {
  const avatar = getSearchAvatar(item)
  const messageTime = item.lastMessage?.createdAt

  return (
    <button
      className='grid h-[68px] w-full grid-cols-[48px_minmax(0,1fr)_56px] items-center gap-3 px-5 text-left transition-colors hover:bg-[#f4f4f5] disabled:cursor-wait disabled:opacity-70'
      disabled={isCreating}
      onClick={onSelect}
      type='button'
    >
      {avatar.image ? (
        <img
          alt={item.title}
          className='size-12 rounded-full object-cover'
          src={avatar.image}
        />
      ) : (
        <GradientAvatar color={avatar.color} initials={avatar.initials} />
      )}

      <div className='min-w-0'>
        <p className='truncate text-[15px] font-semibold text-[#202124]'>
          {item.title}
        </p>
        <p className='mt-1 truncate text-[13px] text-[#707579]'>
          {item.lastMessage?.content ??
            (item.type === 'user' ? 'User' : 'No messages yet')}
        </p>
      </div>

      <div className='self-start pt-2 text-right text-[12px] text-[#8b8f93]'>
        {messageTime ? <p>{formattedDate(messageTime, 'time')}</p> : null}
        {item.hasRoom ? (
          <CheckCheck className='ml-auto mt-2 size-4 text-[#55c96f]' />
        ) : (
          <UserRound className='ml-auto mt-2 size-4' />
        )}
      </div>
    </button>
  )
}
