import { useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { useEffect } from 'react'

import { getMessageSocket } from '@/modules/message/apis/socket'
import { MESSAGE_QUERY_KEYS } from '@/modules/message/hooks/use-get-messages'
import type { ChatMessage } from '@/modules/message/types'
import { ROOM_QUERY_KEYS } from '@/modules/room/hooks/use-get-rooms'
import type { PaginationResponse } from '@/types/api'

type MessagesInfiniteData = InfiniteData<
  PaginationResponse<ChatMessage>,
  number
>

function appendMessageToInfiniteData(
  data: MessagesInfiniteData | undefined,
  message: ChatMessage
) {
  if (!data) {
    return data
  }

  const hasMessage = data.pages.some((page) =>
    page.items.some((item) => item.id === message.id)
  )

  if (hasMessage) {
    return data
  }

  const [firstPage, ...restPages] = data.pages

  if (!firstPage) {
    return data
  }

  return {
    ...data,
    pages: [
      {
        ...firstPage,
        items: [...firstPage.items, message],
        metadata: {
          ...firstPage.metadata,
          totalItems: firstPage.metadata.totalItems + 1
        }
      },
      ...restPages
    ]
  }
}

export function useMessageRealtime(roomId: string | null) {
  const queryClient = useQueryClient()

  useEffect(() => {
    const socket = getMessageSocket()

    socket.on('connect', () => {
      console.log('socket connected:', socket.id)
    })

    socket.on('connect_error', (error) => {
      console.log('Socket connect error:', error.message)
    })

    if (!socket.connected) {
      socket.connect()
    }

    socket.emit('joinRoom', { roomId })

    const handleMessageCreated = (message: ChatMessage) => {
      queryClient.invalidateQueries({
        queryKey: MESSAGE_QUERY_KEYS.roomBase(message.roomId)
      })

      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.list
      })
    }

    const handleRoomUpdated = () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.list
      })
    }

    socket.on('roomUpdated', handleRoomUpdated)

    socket.on('messageCreated', handleMessageCreated)

    return () => {
      socket.off('messageCreated', handleMessageCreated)
      socket.off('roomUpdated', handleRoomUpdated)
    }
  }, [queryClient, roomId])
}
