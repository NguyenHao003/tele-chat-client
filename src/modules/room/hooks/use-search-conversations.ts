import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { roomApis } from '@/modules/room/apis'
import type { BaseQueryParams } from '@/types/api'

export const SEARCH_CONVERSATIONS_QUERY_KEYS = {
  all: ['search-conversations'] as const,
  list: (query: BaseQueryParams) =>
    [
      ...SEARCH_CONVERSATIONS_QUERY_KEYS.all,
      {
        keyword: query.keyword?.trim() ?? '',
        page: query.page ?? 1,
        pageSize: query.pageSize ?? 20,
      },
    ] as const,
}

type UseSearchConversationsParams = BaseQueryParams & {
  enabled?: boolean
}

export function useSearchConversations({
  enabled = true,
  keyword,
  page = 1,
  pageSize = 20,
}: UseSearchConversationsParams = {}) {
  const normalizedQuery = {
    keyword: keyword?.trim() || undefined,
    page,
    pageSize,
  }
  const { data, ...res } = useQuery({
    queryKey: SEARCH_CONVERSATIONS_QUERY_KEYS.list(normalizedQuery),
    queryFn: () => roomApis.searchConversations(normalizedQuery),
    enabled,
    placeholderData: keepPreviousData,
  })

  return {
    searchConversationsResult: data,
    searchConversationsData: data?.items ?? [],
    searchMode: data?.mode,
    ...res,
  }
}
