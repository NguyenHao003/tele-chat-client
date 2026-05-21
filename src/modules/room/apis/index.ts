import axiosAuth from '@/api/axios-auth'
import type {
  Room,
  RoomType,
  SearchConversationsResult,
} from '@/modules/room/types'
import type { ApiResponse, BaseQueryParams } from '@/types/api'

export const roomApis = {
  getRooms: async () => {
    const response = await axiosAuth.get<ApiResponse<Room[]>>('/rooms')

    return response.data.data
  },

  createRoom: async (payload: {
    type: RoomType
    name?: string
    memberIds: string[]
  }) => {
    const response = await axiosAuth.post<ApiResponse<Room>>('/rooms', payload)

    return response.data.data
  },

  searchConversations: async (query: BaseQueryParams = {}) => {
    const response = await axiosAuth.get<ApiResponse<SearchConversationsResult>>(
      '/search/conversations',
      {
        params: {
          keyword: query.keyword,
          page: query.page ?? 1,
          pageSize: query.pageSize ?? 20,
        },
      },
    )

    return response.data.data
  },
}
