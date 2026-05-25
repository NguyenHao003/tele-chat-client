import { useQuery } from '@tanstack/react-query'

import { messageApis } from '@/modules/message/apis'
import type { BaseQueryParams } from '@/types/api'

export const MESSAGE_QUERY_KEYS = {
  all: ['messages'] as const,
  roomBase: (roomId: string) => [...MESSAGE_QUERY_KEYS.all, 'room', roomId] as const,
  room: (roomId: string, query?: BaseQueryParams) =>
    [...MESSAGE_QUERY_KEYS.roomBase(roomId), query] as const,
}

export function useGetMessages(roomId: string | null, query?: BaseQueryParams) {
  return useQuery({
    queryKey: MESSAGE_QUERY_KEYS.room(roomId ?? '', query),
    queryFn: () => messageApis.getMessages(roomId!, query),
    enabled: !!roomId,
  })
}
