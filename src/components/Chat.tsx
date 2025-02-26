'use client'
import { useChat } from '@ai-sdk/react'
import clsx from 'clsx'
import { BotMessageSquare, UserCircle } from 'lucide-react'
import Highlight from 'react-highlight'
import { useTheme } from './ThemeProvider'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 3,
  })
  const { appliedTheme } = useTheme()
  const renderMessageContent = (content: string) => {
    if (!content.includes('```')) {
      return <AIMessage content={content} />
    }
    const regex = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []
    let lastIndex = 0
    let match
    // Loop over each code block match.
    while ((match = regex.exec(content)) !== null) {
      // Add any text before the code block.
      if (match.index > lastIndex) {
        parts.push(
          <AIMessage content={content.substring(lastIndex, match.index)} />
        )
      }
      const language = match[1] || ''
      const code = match[2]
      parts.push(
        <div className="flex flex-col rounded-3xl px-5 py-2.5 w-[80%]">
          <Highlight
            key={lastIndex}
            className={clsx(language, 'text-sm rounded-lg', {
              'hljs-dark': appliedTheme === 'dark',
              'hljs-light': appliedTheme === 'light',
            })}
          >
            {code}
          </Highlight>
        </div>
      )
      lastIndex = regex.lastIndex
    }
    if (lastIndex < content.length) {
      parts.push(<AIMessage content={content.substring(lastIndex)} />)
    }
    return parts
  }
  return (
    <div className="flex flex-col h-full px-3 py-2 dark:bg-zinc-900">
      <div className="flex-1 overflow-auto bg-white dark:bg-zinc-900">
        <div className="flex items-center mb-4 pb-2 border-b border-slate-200 dark:border-zinc-700">
          <div className="flex justify-between w-full items-center">
            <p className="text-lg font-bold dark:text-zinc-100">
              AlgoTeach AI{' '}
            </p>
            <p className="text-sm text-green-600 font-bold dark:text-green-400">
              gpt-4o
            </p>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <AIMessage content="Hello! How can I help you today?" />
          <UserMessage content="Sure, I have a question." />
          {messages.map((message) =>
            message.role === 'user' ? (
              <UserMessage key={message.id} content={message.content} />
            ) : message.content.length > 0 ? (
              renderMessageContent(message.content)
            ) : (
              <AIMessage
                key={message.id}
                content={`calling tool ${message.toolInvocations?.[0].toolName}`}
              />
            )
          )}
        </div>
      </div>
      <form className="mb-2 mt-4 flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 py-2 px-3 rounded-lg bg-gray-100 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400 focus:outline-none"
          value={input}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-3 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  )
}
const UserMessage = ({ content, ...rest }: { content: string }) => (
  <div className="flex items-center justify-end gap-2" {...rest}>
    <div className="bg-blue-500 p-3 rounded-lg w-[80%] dark:bg-blue-600">
      <p className="text-white text-sm">{content}</p>
    </div>
    <UserCircle className="flex-shrink-0 text-blue-500 dark:text-blue-400" />
  </div>
)
const AIMessage = ({ content, ...rest }: { content: string }) => (
  <div className="flex items-center" {...rest}>
    <BotMessageSquare className="flex-shrink-0 dark:text-zinc-100" />
    <div className="ml-3 bg-gray-100 p-3 rounded-lg w-[80%] dark:bg-zinc-800">
      <p className="text-sm text-gray-800 dark:text-zinc-100">{content}</p>
    </div>
  </div>
)
