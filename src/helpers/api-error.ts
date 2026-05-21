import axios from 'axios'

type ErrorResponse = {
  message?: string | string[]
}

export function getApiErrorMessage(error: unknown, fallback = 'Có lỗi xảy ra') {
  if (!axios.isAxiosError<ErrorResponse>(error)) {
    return error instanceof Error ? error.message : fallback
  }

  const message = error.response?.data?.message

  if (Array.isArray(message)) {
    return message.join(', ')
  }

  return message ?? fallback
}
