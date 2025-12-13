'use client'

import { useEffect, useState } from 'react'

export default function StrictHydrationFix({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // 双重保障：设置超时和立即设置
    setIsMounted(true)
    
    // 额外的清理和重试机制
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="text-6xl mb-4">🎰</div>
          <h1 className="text-3xl font-bold text-white mb-2">Walawow Protocol</h1>
          <p className="text-gray-400">Loading...</p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto rounded-full"></div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
