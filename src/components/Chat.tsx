'use client'

import { useChat } from '@ai-sdk/react'
import { SendIcon } from 'lucide-react'
import Highlight from 'react-highlight'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 3,
  })

  // Function to render message content.
  const renderMessageContent = (content: string) => {
    // If there are no code blocks, return the content as is.
    if (!content.includes('```')) {
      return content
    }

    // Regex to capture code blocks with an optional language.
    const regex = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []
    let lastIndex = 0
    let match

    // Loop over each code block match.
    while ((match = regex.exec(content)) !== null) {
      // Add any text before the code block.
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index))
      }
      const language = match[1] || ''
      const code = match[2]
      parts.push(
        <Highlight key={lastIndex} className={language}>
          {code}
        </Highlight>
      )
      lastIndex = regex.lastIndex
    }
    // Add any remaining text after the last code block.
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex))
    }
    return parts
  }

  return (
    <div className="flex flex-col h-full">
      {messages.length === 0 && (
        <div className="bg-slate-200 text-center py-1">
          <h3 className="mx-auto font-bold">What can I help with?</h3>
        </div>
      )}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold capitalize">{m.role}</div>
              <p>
                {m.content.length > 0 ? (
                  renderMessageContent(m.content)
                ) : (
                  <span className="italic font-light">
                    {'calling tool: ' + m?.toolInvocations?.[0].toolName}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-2 border-t border-gray-300"
      >
        <div className="relative">
          <input
            className="w-full pl-4 pr-2 py-2 border border-gray-300 rounded"
            value={input}
            placeholder="Ask AlgoTeach AI about this !"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  )
}
