import { UsersRound } from 'lucide-react'

import { cn } from '@/helpers/common'

type GradientAvatarProps = {
  className?: string
  color: string
  initials: string
}

export function GradientAvatar({ className, color, initials }: GradientAvatarProps) {
  return (
    <div
      className={cn(
        'grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[16px] font-medium text-white',
        color,
        className,
      )}
    >
      {initials || <UsersRound className='size-4' />}
    </div>
  )
}
