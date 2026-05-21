import { create } from 'zustand'

import type { ChatMessage } from '@/modules/message/types'

type ChatState = {
  messages: ChatMessage[]
  selectedRoomId: string | null
  addMessage: (message: ChatMessage) => void
  selectRoom: (roomId: string | null) => void
  setMessages: (messages: ChatMessage[]) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  selectedRoomId: null,
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  selectRoom: (roomId) => set({ selectedRoomId: roomId }),
  setMessages: (messages) => set({ messages }),
}))
