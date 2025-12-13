'use client'

import { useEffect, useState } from 'react'

export default function HydrationFix({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎰</div>
          <h1 className="text-2xl font-bold text-white">Walawow Protocol</h1>
          <p className="text-gray-400 mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
