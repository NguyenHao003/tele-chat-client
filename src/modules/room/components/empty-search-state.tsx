import { Search } from 'lucide-react'

type EmptySearchStateProps = {
  title: string
}

export function EmptySearchState({ title }: EmptySearchStateProps) {
  return (
    <div className='flex h-40 flex-col items-center justify-center gap-3 text-center text-[#707579]'>
      <Search className='size-8 text-[#b6babf]' />
      <p className='text-[14px]'>{title}</p>
    </div>
  )
}
