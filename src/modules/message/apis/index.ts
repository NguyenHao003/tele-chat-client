import axiosAuth from '@/api/axios-auth'
import type { ChatMessage } from '@/modules/message/types'
import type {
  ApiResponse,
  BaseQueryParams,
  PaginationResponse
} from '@/types/api'

export type CreateMessagePayload = {
  roomId?: string
  receiverId?: string
  content: string
  type?: 'TEXT' | 'IMAGE' | 'FILE'
}

export const messageApis = {
  getMessages: async (roomId: string, query: BaseQueryParams = {}) => {
    const response = await axiosAuth.get<PaginationResponse<ChatMessage>>(
      `/messages/room/${roomId}`,
      {
        params: {
          page: query.page ?? 1,
          pageSize: query.pageSize ?? 50
        }
      }
    )

    return response.data
  },

  createMessage: async (payload: CreateMessagePayload) => {
    const response = await axiosAuth.post<ApiResponse<ChatMessage>>(
      '/messages',
      {
        type: 'TEXT',
        ...payload
      }
    )

    return response.data.data
  },

  sendMessage: (payload: CreateMessagePayload) =>
    messageApis.createMessage(payload)
}
