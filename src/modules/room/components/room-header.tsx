import { MoreVertical, Search, SquareSplitHorizontal } from 'lucide-react'

export function RoomHeader() {
  return (
    <header className='relative z-10 flex h-[50px] items-center justify-between border-b border-[#d9d9d9] bg-white px-5'>
      <div className='min-w-0'>
        <h2 className='truncate text-[14px] font-semibold leading-5'>AG HRM</h2>
        <p className='text-[12px] leading-4 text-[#707579]'>7 members</p>
      </div>
      <div className='flex items-center gap-4 text-[#8b8f93]'>
        <Search className='size-5' />
        <SquareSplitHorizontal className='size-5' />
        <MoreVertical className='size-5' />
      </div>
    </header>
  )
}
