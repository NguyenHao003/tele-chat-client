import { create } from 'zustand'

import type { ChatMessage } from '@/modules/message/types'

type ChatState = {
  messages: ChatMessage[]
  addMessage: (message: ChatMessage) => void
  setMessages: (messages: ChatMessage[]) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setMessages: (messages) => set({ messages }),
}))
