import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { MessagePanel } from '@/modules/message/components/message-panel'
import { useGetInfiniteMessages } from '@/modules/message/hooks/use-get-infinite-messages'
import { RoomList } from '@/modules/room/components/room-list'
import { RoomSearchPanel } from '@/modules/room/components/room-search-panel'
import { RoomSidebarHeader } from '@/modules/room/components/room-sidebar-header'
import { useGetRooms } from '@/modules/room/hooks/use-get-rooms'
import { getCurrentUserId } from '@/modules/user/lib/auth'

export default function ChatRoutePage() {
  const { roomId } = useParams()
  const selectedRoomId = roomId ?? null
  const { roomsData } = useGetRooms()
  const currentUserId = getCurrentUserId()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const activeRoom = roomsData.find((room) => room.id === selectedRoomId)

  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useGetInfiniteMessages(selectedRoomId, {
    pageSize: 10
  })

  const messagesList = useMemo(() => {
    const messages = messagesData?.pages
      .slice()
      .reverse()
      .flatMap((page) => page.items) ?? []
    const messagesById = new Map(
      messages.map((message) => [message.id, message])
    )

    return Array.from(messagesById.values())
  }, [messagesData])

  return (
    <main className='h-svh overflow-hidden bg-white text-[#202124]'>
      <div className='grid h-full grid-cols-[465px_minmax(0,1fr)]'>
        <aside className='flex min-h-0 flex-col border-r border-[#d9d9d9] bg-white'>
          <RoomSidebarHeader
            isSearchOpen={isSearchOpen}
            onCloseSearch={() => {
              setIsSearchOpen(false)
              setSearchValue('')
            }}
            onOpenSearch={() => setIsSearchOpen(true)}
            onSearchChange={setSearchValue}
            searchValue={searchValue}
          />

          {isSearchOpen ? (
            <RoomSearchPanel
              isOpen={isSearchOpen}
              keyword={searchValue}
              onClose={() => {
                setIsSearchOpen(false)
                setSearchValue('')
              }}
            />
          ) : (
            <RoomList />
          )}
        </aside>

        <MessagePanel
          activeRoom={activeRoom}
          currentUserId={currentUserId}
          isLoading={isLoading}
          isFetchingOlderMessages={isFetchingNextPage}
          hasOlderMessages={hasNextPage}
          messagesList={messagesList}
          onLoadOlderMessages={() => fetchNextPage()}
          selectedRoomId={selectedRoomId}
        />
      </div>
    </main>
  )
}
