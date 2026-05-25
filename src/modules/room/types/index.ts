import type { ChatMessage } from '@/modules/message/types'
import type { User } from '@/modules/user/types'

export type RoomType = 'direct' | 'group'

export type RoomMember = {
  id: string
  roomId?: string
  userId?: string
  user: User
  joinedAt?: string
}

export type Room = {
  id: string
  name?: string | null
  avatar?: string | null
  type: RoomType
  members: RoomMember[]
  createdAt: string
  updatedAt?: string
  lastMessage?: Pick<ChatMessage, 'id' | 'content' | 'createdAt' | 'type' | 'senderId'> | null
}

export type SearchConversationItem = {
  type: 'room' | 'user'
  hasRoom: boolean
  roomId?: string
  roomType?: RoomType
  userId?: string
  title: string
  avatar?: string | null
  targetUser: Pick<User, 'id' | 'username' | 'avatar' | 'isOnline'> | null
  lastMessage: Pick<ChatMessage, 'id' | 'content' | 'createdAt' | 'type'> | null
}

export type SearchConversationsResult = {
  keyword?: string
  mode?: 'recent'
  items: SearchConversationItem[]
}
