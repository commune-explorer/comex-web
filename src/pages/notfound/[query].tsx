import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const findNavigation = (query: string, urls: string[]): string | null => {
  const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '')

  return (
    urls.find((url) => {
      const normalizedUrl = url
        .toLowerCase()
        .replace('/blockchain', '')
        .replace(/[^a-z0-9]/g, '')
      return (
        normalizedUrl.includes(normalizedQuery) ||
        normalizedQuery.includes(normalizedUrl) ||
        (normalizedUrl.endsWith('s') && normalizedQuery === normalizedUrl.slice(0, -1)) ||
        (normalizedQuery.endsWith('s') && normalizedUrl === normalizedQuery.slice(0, -1))
      )
    }) || null
  )
}

export default function Index() {
  const query = useParams().query ?? ''
  const navigate = useNavigate()

  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    //add more here if necessary
    const routes = [
      '/blockchain/accounts',
      '/blockchain/transfers',
      '/blockchain/blocks',
      '/blockchain/delegations',
      '/subnets/0',
    ]
    const nav = findNavigation(query, routes)

    if (nav) {
      navigate(nav)
    } else {
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
    }
  }, [query, navigate])

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
