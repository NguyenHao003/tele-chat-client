import { GradientAvatar } from '@/components/ui/avatar'
import { getSearchAvatar } from '@/modules/room/helpers/search-conversation'
import type { SearchConversationItem } from '@/modules/room/types'

type RecentSearchItemProps = {
  item: SearchConversationItem
  onSelect: () => void
}

export function RecentSearchItem({ item, onSelect }: RecentSearchItemProps) {
  const avatar = getSearchAvatar(item)

  return (
    <button
      className='flex w-[74px] shrink-0 flex-col items-center gap-2 text-center'
      onClick={onSelect}
      type='button'
    >
      {avatar.image ? (
        <img
          alt={item.title}
          className='size-[66px] rounded-full object-cover'
          src={avatar.image}
        />
      ) : (
        <GradientAvatar
          className='size-[66px] text-[25px]'
          color={avatar.color}
          initials={avatar.initials}
        />
      )}
      <span className='line-clamp-2 w-full text-[14px] leading-4 text-black'>
        {item.title}
      </span>
    </button>
  )
}
