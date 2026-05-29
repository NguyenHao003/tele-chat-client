import { io, type Socket } from 'socket.io-client'

import { ENV } from '@/constants/env'
import { getAccessToken } from '@/helpers/auth-token'
import type { ChatMessage, MessageType } from '@/modules/message/types'

type ServerToClientEvents = {
  joinedRoom: (data: { roomId: string }) => void
  messageCreated: (message: ChatMessage) => void
  newMessage: (message: ChatMessage) => void
}

type ClientToServerEvents = {
  joinRoom: (data: { roomId: string }) => void
  sendMessage: (data: {
    roomId: string
    content: string
    type: MessageType
  }) => void
  sendDirectMessage: (data: {
    receiverId: string
    content: string
    type: MessageType
  }) => void
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null

export function getMessageSocket() {
  if (!socket) {
    socket = io(ENV.SOCKET_URL, {
      autoConnect: false,
      auth: {
        token: getAccessToken()
      },
      transports: ['websocket']
    })
  }

  socket.auth = {
    token: getAccessToken()
  }

  return socket
}
