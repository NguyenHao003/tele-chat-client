import { Virtuoso } from 'react-virtuoso'

import { RoomListItem } from './room-list-item'
import { useGetRooms } from '../hooks/use-get-rooms'

export function RoomList() {
  const { roomsData, isLoading } = useGetRooms()

  return (
    <div className='min-h-0 flex-1 bg-white'>
      {isLoading ? (
        <div className='flex h-32 items-center justify-center text-sm text-[#707579]'>
          Đang tải danh sách phòng...
        </div>
      ) : roomsData.length === 0 ? (
        <div className='flex h-32 items-center justify-center text-sm text-[#707579]'>
          Chưa có cuộc trò chuyện nào
        </div>
      ) : (
        <Virtuoso
          className='h-full'
          data={roomsData}
          itemContent={(_, room) => <RoomListItem room={room} />}
        />
      )}
    </div>
  )
}
