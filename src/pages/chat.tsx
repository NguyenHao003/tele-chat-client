import { Virtuoso } from 'react-virtuoso'

import { cn } from '@/helpers/common'
import { MessageBubble } from '@/modules/message/components/message-bubble'
import { MessageInput } from '@/modules/message/components/message-input'
import { messages } from '@/modules/message/constants/mock-message'
import { RoomHeader } from '@/modules/room/components/room-header'
import { RoomListItem } from '@/modules/room/components/room-list-item'
import { RoomSidebarHeader } from '@/modules/room/components/room-sidebar-header'
import { roomItems } from '@/modules/room/constants/mock-room'

export default function ChatRoutePage() {
  return (
    <main className='h-svh overflow-hidden bg-white text-[#202124]'>
      <div className='grid h-full grid-cols-[465px_minmax(0,1fr)]'>
        <aside className='flex min-h-0 flex-col border-r border-[#d9d9d9] bg-white'>
          <RoomSidebarHeader />

          <div className='min-h-0 flex-1 bg-white'>
            <Virtuoso
              className='h-full'
              data={roomItems}
              itemContent={(_, item) => <RoomListItem item={item} />}
            />
          </div>
        </aside>

        <section className='telegram-wallpaper flex min-h-0 flex-col'>
          <RoomHeader />

          <div className='relative min-h-0 flex-1'>
            <Virtuoso
              className='relative z-10 h-full'
              data={messages}
              itemContent={(_, message) => (
                <div
                  className={cn(
                    'flex px-12 py-1',
                    message.mine ? 'justify-end' : 'justify-start',
                  )}
                >
                  <MessageBubble message={message} />
                </div>
              )}
            />
          </div>

          <MessageInput />
        </section>
      </div>
    </main>
  )
}
