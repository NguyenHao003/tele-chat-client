import axiosAuth from '@/api/axios-auth'
import type { ChatMessage } from '@/modules/message/types'
import type { ApiResponse, BaseQueryParams, PaginationResponse } from '@/types/api'

export const messageApis = {
  getMessages: async (roomId: string, query: BaseQueryParams = {}) => {
    const response = await axiosAuth.get<PaginationResponse<ChatMessage>>(
      `/messages/room/${roomId}`,
      {
        params: {
          page: query.page ?? 1,
          pageSize: query.pageSize ?? 50,
          sortOrder: query.sortOrder ?? 'DESC',
        },
      },
    )

    return response.data
  },

  sendMessage: async (payload: {
    roomId?: string
    receiverId?: string
    content: string
    type?: 'TEXT' | 'IMAGE' | 'FILE'
  }) => {
    const response = await axiosAuth.post<ApiResponse<ChatMessage>>(
      '/messages',
      {
        type: 'TEXT',
        ...payload,
      },
    )

    return response.data.data
  },
}
