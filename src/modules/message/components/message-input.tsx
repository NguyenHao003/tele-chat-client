import { Mic, Paperclip, Smile } from 'lucide-react'

export function MessageInput() {
  return (
    <div className='relative z-10 flex h-12 items-center gap-2 border-t border-[#d7d7d7] bg-white px-3'>
      <Paperclip className='size-6 shrink-0 text-[#8b8f93]' />
      <input
        className='h-full min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#8b8f93]'
        placeholder='Write a message...'
      />
      <button
        className='grid size-8 place-items-center rounded-md text-[#8b8f93] hover:bg-[#f1f3f4]'
        type='button'
      >
        <span className='rounded border border-[#8b8f93] px-1 text-[12px] leading-4'>
          /
        </span>
      </button>
      <Smile className='size-6 shrink-0 text-[#8b8f93]' />
      <button
        className='grid size-9 place-items-center rounded-full text-[#8b8f93] hover:bg-[#f1f3f4] hover:text-[#3390ec]'
        type='button'
      >
        <Mic className='size-5' />
      </button>
    </div>
  )
}
