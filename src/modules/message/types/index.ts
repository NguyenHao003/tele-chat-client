import type { User } from '@/modules/user/types'

export type MessageType = 'TEXT' | 'IMAGE' | 'FILE'

export type ChatMessage = {
  id: string
  roomId: string
  senderId: string
  content: string
  type: MessageType
  createdAt: string
  updatedAt: string
  sender?: User
}
