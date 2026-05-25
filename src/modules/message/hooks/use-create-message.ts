import { useMutation, useQueryClient, type MutateOptions } from '@tanstack/react-query'

import { messageApis, type CreateMessagePayload } from '@/modules/message/apis'
import { MESSAGE_QUERY_KEYS } from '@/modules/message/hooks/use-get-messages'
import type { ChatMessage } from '@/modules/message/types'
import { ROOM_QUERY_KEYS } from '@/modules/room/hooks/use-get-rooms'

export function useCreateMessage() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (payload: CreateMessagePayload) =>
      messageApis.createMessage(payload),
    onSuccess: (message, payload) => {
      if (payload.roomId) {
        queryClient.invalidateQueries({
          queryKey: MESSAGE_QUERY_KEYS.roomBase(payload.roomId),
        })
      }

      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.list,
      })

      return message
    },
  })

  const createMessage = (
    values: CreateMessagePayload,
    options?: MutateOptions<ChatMessage, Error, CreateMessagePayload>,
  ) => {
    mutation.mutate(values, options)
  }

  return {
    createMessage,
    ...mutation,
  }
}
