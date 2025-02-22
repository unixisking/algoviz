'use client'

import { useChat } from '@ai-sdk/react'
import clsx from 'clsx'
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
        parts.push(
          <div className="flex flex-col rounded-3xl bg-slate-50 p-4 dark:bg-slate-800 px-5 py-2.5">
            {content.substring(lastIndex, match.index)}
          </div>
        )
      }
      const language = match[1] || ''
      const code = match[2]
      parts.push(
        <div className="flex flex-col rounded-3xl bg-slate-50 p-4 dark:bg-slate-800 px-5 py-2.5">
          <Highlight key={lastIndex} className={clsx(language, 'text-sm')}>
            {code}
          </Highlight>
        </div>
      )
      lastIndex = regex.lastIndex
    }
    // Add any remaining text after the last code block.
    if (lastIndex < content.length) {
      parts.push(
        <div className="flex flex-col rounded-3xl bg-slate-50 p-4 dark:bg-slate-800 px-5 py-2.5">
          {content.substring(lastIndex)}
        </div>
      )
    }
    return parts
  }

  return (
    <div className="flex flex-col h-full">
      {/* {messages.length === 0 && (
        <div className="bg-slate-200 text-center py-1">
          <h3 className="mx-auto font-bold">What can I help with?</h3>
        </div>
      )} */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="flex-1 space-y-6 overflow-y-auto rounded-xl bg-slate-200 text-sm leading-6 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-300 sm:text-base sm:leading-7">
          {messages.map((m) => (
            <div
              key={m.id}
              className="flex-1 space-y-6 overflow-y-auto rounded-xl bg-slate-200 p-2 text-sm leading-6 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-300 sm:text-base sm:leading-7"
            >
              {m.role === 'user' ? (
                <div className="flex gap-2  flex-row-reverse items-center">
                  <img
                    alt=""
                    className="mr-2 h-8 w-8 rounded-full"
                    src="https://dummyimage.com/128x128/363536/ffffff&text=U"
                  />
                  <div className="flex rounded-3xl bg-slate-50 p-4 dark:bg-slate-800 px-5 py-2.5">
                    <p>{m.content}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 items-start">
                  {/* <p>{m.content}</p> */}
                  {m.content.length > 0 ? (
                    renderMessageContent(m.content)
                  ) : (
                    <div className="flex flex-col rounded-3xl bg-slate-50 p-4 dark:bg-slate-800 px-5 py-2.5">
                      <span className="italic font-light">
                        {'calling tool: ' + m?.toolInvocations?.[0].toolName}
                      </span>
                    </div>
                  )}
                  <div className="mr-2 mt-1 flex flex-col-reverse gap-2 text-slate-500 sm:flex-row">
                    <button className="hover:text-blue-600" type="button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
                        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
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
