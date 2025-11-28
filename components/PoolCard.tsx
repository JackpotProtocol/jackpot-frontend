// components/PoolCard.tsx
'use client'
import { usePoolBalance } from '../hooks/usePoolBalance'

interface PoolCardProps {
  title: string
  poolType: 'weekly' | 'monthly'
  nextDraw: string
}

export default function PoolCard({ title, poolType, nextDraw }: PoolCardProps) {
  const { poolBalance, loading, error } = usePoolBalance(poolType)

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700 animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 bg-gray-700 rounded w-1/2"></div>
          <div className="h-6 bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-700 rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-6 bg-gray-700 rounded"></div>
            <div className="h-6 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="text-sm bg-yellow-500 text-black px-2 py-1 rounded-full">
          {poolType === 'weekly' ? 'Weekly' : 'Monthly'}
        </div>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 rounded-lg p-2 mb-4">
          <p className="text-red-200 text-xs">Balance data unavailable</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <div className="text-3xl font-bold text-yellow-400 mb-2">
            ${poolBalance.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Current Prize Pool</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-white">--</div>
            <div className="text-gray-400 text-sm">Total Winners</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-white">--</div>
            <div className="text-gray-400 text-sm">Your Chance</div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Next Draw:</span>
            <span className="text-white">{nextDraw}</span>
          </div>
        </div>

        <button 
          className="w-full bg-gradient-to-r from-yellow-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          onClick={() => alert('Feature coming soon!')}
        >
          Check Details
        </button>
      </div>
    </div>
  )
}
