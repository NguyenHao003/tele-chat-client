import { Send, Mic, Paperclip, Smile } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'

import { useCreateMessage } from '@/modules/message/hooks/use-create-message'

type MessageInputProps = {
  roomId: string
}

export function MessageInput({ roomId }: MessageInputProps) {
  const [content, setContent] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { createMessage, isPending } = useCreateMessage()

  useEffect(() => {
    const input = inputRef.current

    if (!input) {
      return
    }

    input.style.height = 'auto'
    input.style.height = `${input.scrollHeight}px`
  }, [content])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedContent = content.trim()
    if (!trimmedContent || isPending) {
      return
    }

    setContent('')
    requestAnimationFrame(() => inputRef.current?.focus())

    createMessage(
      {
        roomId,
        content: trimmedContent,
      },
      {
        onError: () => {
          setContent((currentContent) => currentContent || trimmedContent)
        },
        onSettled: () => {
          requestAnimationFrame(() => inputRef.current?.focus())
        },
      },
    )
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) {
      return
    }

    event.preventDefault()
    event.currentTarget.form?.requestSubmit()
  }

  return (
    <form
      className='relative z-10 flex min-h-12 items-end gap-2 border-t border-[#d7d7d7] bg-white px-3 py-1.5'
      onSubmit={handleSubmit}
    >
      <Paperclip className='mb-1.5 size-6 shrink-0 text-[#8b8f93]' />
      <textarea
        className='textarea-scrollbar max-h-32 min-h-9 min-w-0 flex-1 resize-none bg-transparent py-2 text-[13px] leading-5 outline-none placeholder:text-[#8b8f93]'
        onChange={(event) => setContent(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Write a message...'
        ref={inputRef}
        rows={1}
        value={content}
      />
      <button
        className='mb-0.5 grid size-8 place-items-center rounded-md text-[#8b8f93] hover:bg-[#f1f3f4]'
        type='button'
      >
        <span className='rounded border border-[#8b8f93] px-1 text-[12px] leading-4'>
          /
        </span>
      </button>
      <Smile className='mb-1.5 size-6 shrink-0 text-[#8b8f93]' />
      <button
        className='grid size-9 place-items-center rounded-full text-[#8b8f93] hover:bg-[#f1f3f4] hover:text-[#3390ec]'
        disabled={!content.trim() || isPending}
        type='submit'
      >
        {content.trim() ? <Send className='size-5' /> : <Mic className='size-5' />}
      </button>
    </form>
  )
}
