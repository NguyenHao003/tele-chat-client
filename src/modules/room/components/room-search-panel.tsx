import { useNavigate } from 'react-router-dom'

import { EmptySearchState } from '@/modules/room/components/empty-search-state'
import { RecentSearchItem } from '@/modules/room/components/recent-search-item'
import { RoomSearchTabs } from '@/modules/room/components/room-search-tabs'
import { SearchResultItem } from '@/modules/room/components/search-result-item'
import { getSearchItemKey } from '@/modules/room/helpers/search-conversation'
import { useCreateDirectRoom } from '@/modules/room/hooks/use-create-direct-room'
import { useSearchConversations } from '@/modules/room/hooks/use-search-conversations'
import type { SearchConversationItem } from '@/modules/room/types'

type RoomSearchPanelProps = {
  keyword: string
  isOpen: boolean
  onClose: () => void
}

export function RoomSearchPanel({
  keyword,
  isOpen,
  onClose
}: RoomSearchPanelProps) {
  const navigate = useNavigate()
  const { searchConversationsData, isFetching, isLoading } =
    useSearchConversations({
      enabled: isOpen,
      keyword,
      pageSize: 999
    })
  const { createDirectRoom, isPending: isCreating } = useCreateDirectRoom()

  const trimmedKeyword = keyword.trim()
  const recentItems = searchConversationsData.slice(0, 5)

  function handleSelectItem(item: SearchConversationItem) {
    if (item.roomId) {
      navigate(`/chat/${item.roomId}`)
      onClose()
      return
    }

    if (item.targetUser?.id) {
      createDirectRoom([item.targetUser.id], {
        onSuccess: (room) => {
          navigate(`/chat/${room.id}`)
          onClose()
        }
      })
    }
  }

  return (
    <div className='min-h-0 flex-1 bg-white'>
      <RoomSearchTabs />

      {trimmedKeyword.length === 0 ? (
        <div>
          {recentItems.length > 0 ? (
            <div className='border-b border-[#eef0f2] px-4 pb-5 pt-6'>
              <div className='flex gap-6 overflow-x-auto'>
                {recentItems.map((item) => (
                  <RecentSearchItem
                    item={item}
                    key={getSearchItemKey(item)}
                    onSelect={() => handleSelectItem(item)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {isLoading ? (
            <EmptySearchState title='Đang tải gần đây...' />
          ) : recentItems.length === 0 ? (
            <EmptySearchState title='Nhập từ khóa để tìm cuộc trò chuyện' />
          ) : null}
        </div>
      ) : (
        <div className='h-full overflow-y-auto'>
          {searchConversationsData.length > 0 ? (
            <div className='py-2'>
              {searchConversationsData.map((item) => (
                <SearchResultItem
                  item={item}
                  isCreating={isCreating}
                  key={getSearchItemKey(item)}
                  onSelect={() => handleSelectItem(item)}
                />
              ))}
            </div>
          ) : isLoading || isFetching ? (
            <EmptySearchState title='Đang tìm kiếm...' />
          ) : (
            <EmptySearchState title='Không tìm thấy kết quả phù hợp' />
          )}
        </div>
      )}
    </div>
  )
}
