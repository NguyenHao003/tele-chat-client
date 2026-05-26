import type { SearchConversationItem } from '@/modules/room/types'

const gradients = [
  'from-[#a7a7a7] to-[#737373]',
  'from-[#ffb23f] to-[#ff7a45]',
  'from-[#ff74a5] to-[#d959b8]',
  'from-[#9278ee] to-[#6d5ee7]',
  'from-[#71d06b] to-[#34b84d]',
  'from-[#57c7df] to-[#32a2c7]'
]

export function getSearchAvatar(item: SearchConversationItem) {
  const title = item.title.trim()
  const initials = title
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const stableId = getSearchItemKey(item)
  const hash = stableId
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)

  return {
    color: gradients[Math.abs(hash) % gradients.length],
    image: item.avatar ?? item.targetUser?.avatar ?? null,
    initials
  }
}

export function getSearchItemKey(item: SearchConversationItem) {
  return item.roomId ?? item.userId ?? item.title
}
