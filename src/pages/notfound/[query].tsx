import * as React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Index() {
  const query = useParams().query ?? ''
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    setDisplayText('N')
    const text = `Nothing found for "${query}"...`
    let index = 0

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index))
        index++
      } else {
        clearInterval(typingInterval)
      }
    }, 60)

    return () => clearInterval(typingInterval)
  }, [query])

  return (
    <div className="container mx-auto py-6 lt-sm:(px-4) h-screen flex items-center justify-center">
      <div className="p-4 rounded-lg border-1 border-brand shadow-lg">
        <pre className="font-mono text-brand text-xl">
          <code>{displayText}</code>
        </pre>
      </div>
    </div>
  )
}
