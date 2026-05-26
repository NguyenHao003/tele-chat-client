import { useMutation, useQueryClient, type MutateOptions } from '@tanstack/react-query'

import { roomApis } from '@/modules/room/apis'
import { ROOM_QUERY_KEYS } from '@/modules/room/hooks/use-get-rooms'
import type { Room } from '@/modules/room/types'

export function useCreateDirectRoom() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (memberIds: string[]) =>
      roomApis.createRoom({
        type: 'direct',
        memberIds,
      }),
    onSuccess: (room) => {
      queryClient.invalidateQueries({ queryKey: ROOM_QUERY_KEYS.list })

      return room
    },
  })

  const createDirectRoom = (
    memberIds: string[],
    options?: MutateOptions<Room, Error, string[]>,
  ) => {
    mutation.mutate(memberIds, options)
  }

  return {
    createDirectRoom,
    ...mutation,
  }
}
