import React, { useEffect, useState } from 'react'

export const InputAI = ({
  text,
  speed = 20,
  ...props
}: {
  text: string
  speed?: number
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <div className="font-sans text-sm whitespace-pre-wrap" {...props}>
      {displayedText}
    </div>
  )
}
