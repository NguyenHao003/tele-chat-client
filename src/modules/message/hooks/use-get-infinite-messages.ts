import { useInfiniteQuery } from '@tanstack/react-query'

import { messageApis } from '@/modules/message/apis'
import { MESSAGE_QUERY_KEYS } from '@/modules/message/hooks/use-get-messages'
import type { BaseQueryParams } from '@/types/api'

export function useGetInfiniteMessages(
  roomId: string | null,
  query: Omit<BaseQueryParams, 'page'> = {},
) {
  return useInfiniteQuery({
    queryKey: MESSAGE_QUERY_KEYS.room(roomId ?? '', query),
    queryFn: ({ pageParam }) =>
      messageApis.getMessages(roomId!, {
        ...query,
        page: pageParam,
      }),
    initialPageParam: 1,
    enabled: !!roomId,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.metadata

      return page < totalPages ? page + 1 : undefined
    },
  })
}
