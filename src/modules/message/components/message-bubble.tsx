import { GradientAvatar } from '@/components/ui/avatar'
import { cn } from '@/helpers/common'
import { formattedDate } from '@/helpers/date'
import type { ChatMessage } from '@/modules/message/types'
import { getCurrentUserId } from '@/modules/user/lib/auth'

type MessageBubbleProps = {
  message: ChatMessage
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const currentUserId = getCurrentUserId()
  const mine = message.senderId === currentUserId

  const author = message.sender?.username || 'User'
  const initials = author
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const time = formattedDate(message.createdAt, 'time')

  return (
    <div
      className={cn(
        'flex w-full items-end gap-2',
        mine ? 'justify-end' : 'justify-start',
      )}
    >
      {!mine ? (
        <GradientAvatar
          color='from-[#52b9ef] to-[#358de3]'
          initials={initials}
        />
      ) : null}
      <article
        className={cn(
          'inline-flex min-w-[104px] max-w-[70%] flex-col rounded-[10px] px-3 py-1.5 text-[13px] leading-5 shadow-[0_1px_1px_rgba(0,0,0,0.18)]',
          mine
            ? 'rounded-br-sm bg-[#d9fdd3]'
            : 'rounded-bl-sm bg-white',
        )}
      >
        {!mine ? (
          <p className='mb-0.5 font-medium text-[#168acd]'>
            {author}
          </p>
        ) : null}
        <p className='whitespace-pre-wrap break-words text-[#111]'>
          {message.content}
        </p>
        <time className='self-end whitespace-nowrap text-[12px] leading-4 text-[#8b8f93]'>
          {time}
        </time>
      </article>
    </div>
  )
}
