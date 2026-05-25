import { useEffect, useRef } from 'react'
import { Virtuoso } from 'react-virtuoso'
import type { VirtuosoHandle } from 'react-virtuoso'

import { cn } from '@/helpers/common'
import { MessageBubble } from '@/modules/message/components/message-bubble'
import { MessageInput } from '@/modules/message/components/message-input'
import type { ChatMessage } from '@/modules/message/types'
import { RoomHeader } from '@/modules/room/components/room-header'
import type { Room } from '@/modules/room/types'

type MessagePanelProps = {
  activeRoom?: Room
  currentUserId: string | null
  hasOlderMessages?: boolean
  isFetchingOlderMessages?: boolean
  isLoading: boolean
  messagesList: ChatMessage[]
  onLoadOlderMessages?: () => void
  selectedRoomId: string | null
}

export function MessagePanel({
  activeRoom,
  currentUserId,
  hasOlderMessages = false,
  isFetchingOlderMessages = false,
  isLoading,
  messagesList,
  onLoadOlderMessages,
  selectedRoomId,
}: MessagePanelProps) {
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const lastMessageId = messagesList.at(-1)?.id

  useEffect(() => {
    if (messagesList.length === 0) {
      return
    }

    requestAnimationFrame(() => {
      virtuosoRef.current?.scrollToIndex({
        index: 'LAST',
        align: 'end',
        behavior: 'smooth',
      })
    })
  }, [lastMessageId, selectedRoomId])

  const handleStartReached = () => {
    if (!hasOlderMessages || isFetchingOlderMessages) {
      return
    }

    onLoadOlderMessages?.()
  }

  if (!selectedRoomId) {
    return (
      <section className='telegram-wallpaper flex min-h-0 flex-col items-center justify-center'>
        <div className='rounded-full bg-[rgba(0,0,0,0.4)] px-4 py-1.5 text-[14px] font-semibold text-white'>
          Chọn một cuộc trò chuyện để bắt đầu gửi tin nhắn
        </div>
      </section>
    )
  }

  return (
    <section className='telegram-wallpaper flex min-h-0 flex-col'>
      <RoomHeader room={activeRoom} />

      <div className='relative min-h-0 flex-1'>
        {isLoading ? (
          <div className='absolute inset-0 z-20 flex items-center justify-center bg-[rgba(255,255,255,0.7)] text-sm text-[#707579]'>
            Đang tải tin nhắn...
          </div>
        ) : messagesList.length === 0 ? (
          <div className='absolute inset-0 z-10 flex items-center justify-center text-sm text-[#707579]'>
            Chưa có tin nhắn nào. Bắt đầu trò chuyện!
          </div>
        ) : (
          <Virtuoso
            alignToBottom
            components={{
              Header: () =>
                isFetchingOlderMessages ? (
                  <div className='py-2 text-center text-[12px] text-[#707579]'>
                    Đang tải tin nhắn cũ...
                  </div>
                ) : null,
            }}
            className='message-scrollbar relative z-10 h-full'
            data={messagesList}
            firstItemIndex={100_000 - messagesList.length}
            followOutput='smooth'
            initialTopMostItemIndex={{
              index: 'LAST',
              align: 'end',
            }}
            itemContent={(_, message) => (
              <div
                className={cn(
                  'flex w-full px-12 py-1',
                  message.senderId === currentUserId ? 'justify-end' : 'justify-start',
                )}
              >
                <MessageBubble message={message} />
              </div>
            )}
            ref={virtuosoRef}
            startReached={handleStartReached}
          />
        )}
      </div>

      <MessageInput roomId={selectedRoomId} />
    </section>
  )
}
