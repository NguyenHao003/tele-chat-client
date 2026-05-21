import { UsersRound } from 'lucide-react'

import { cn } from '@/helpers/common'

type GradientAvatarProps = {
  color: string
  initials: string
}

export function GradientAvatar({ color, initials }: GradientAvatarProps) {
  return (
    <div
      className={cn(
        'grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[16px] font-medium text-white',
        color,
      )}
    >
      {initials || <UsersRound className='size-4' />}
    </div>
  )
}
