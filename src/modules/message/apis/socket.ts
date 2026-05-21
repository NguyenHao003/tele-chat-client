import { io, type Socket } from 'socket.io-client'

import { ENV } from '@/constants/env'
import type { ChatMessage } from '@/modules/message/types'

type ServerToClientEvents = {
  message: (message: ChatMessage) => void
}

type ClientToServerEvents = {
  message: (message: ChatMessage) => void
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null

export function getMessageSocket() {
  if (!socket) {
    socket = io(ENV.SOCKET_URL, {
      autoConnect: false,
      transports: ['websocket'],
    })
  }

  return socket
}
