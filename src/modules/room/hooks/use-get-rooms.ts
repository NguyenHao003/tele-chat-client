import { useQuery } from '@tanstack/react-query'

import { roomApis } from '@/modules/room/apis'

export const ROOM_QUERY_KEYS = {
  list: ['rooms'] as const,
}

export function useGetRooms() {
  const { data, ...res } = useQuery({
    queryKey: ROOM_QUERY_KEYS.list,
    queryFn: roomApis.getRooms
  })

  return {
    roomsData: data ?? [],
    ...res
  }
}
