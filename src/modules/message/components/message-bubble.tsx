import { GradientAvatar } from '@/components/ui/avatar'
import { cn } from '@/helpers/common'
import type { UiMessage } from '@/modules/message/types/ui'

type MessageBubbleProps = {
  message: UiMessage
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className='flex items-end gap-2'>
      {!message.mine ? (
        <GradientAvatar
          color='from-[#52b9ef] to-[#358de3]'
          initials={message.avatar}
        />
      ) : null}
      <article
        className={cn(
          'max-w-[min(560px,72%)] rounded-[10px] px-3 py-1.5 text-[13px] leading-5 shadow-[0_1px_1px_rgba(0,0,0,0.18)]',
          message.mine
            ? 'rounded-br-sm bg-[#d9fdd3]'
            : 'rounded-bl-sm bg-white',
        )}
      >
        {!message.mine ? (
          <p className='mb-0.5 font-medium text-[#168acd]'>
            {message.author}
          </p>
        ) : null}
        <p className='whitespace-pre-wrap break-words text-[#111]'>
          {message.content}
        </p>
        <time className='float-right ml-3 mt-0.5 text-[12px] leading-4 text-[#8b8f93]'>
          {message.time}
        </time>
      </article>
    </div>
  )
}
