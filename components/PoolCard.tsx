// components/PoolCard.tsx
'use client'
import { usePoolBalance } from '../hooks/usePoolBalance'
import { usePoolInfo } from '../hooks/usePoolInfo'
import { useDrawTrigger } from '../hooks/useDrawTrigger'
import { useWallet } from '@solana/wallet-adapter-react'

interface PoolCardProps {
  title: string
  poolType: 'weekly' | 'monthly'
  nextDraw: string
}

export default function PoolCard({ title, poolType, nextDraw }: PoolCardProps) {
  const { poolBalance, loading: balanceLoading, error: balanceError } = usePoolBalance(poolType)
  const { poolInfo, loading: infoLoading, error: infoError } = usePoolInfo(poolType)
  const { triggerDraw, triggering, error: triggerError } = useDrawTrigger()
  const { publicKey } = useWallet()

  const loading = balanceLoading || infoLoading
  const error = balanceError || infoError

  const formatNextDrawTime = (date: Date | null) => {
    if (!date) return nextDraw
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

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
        <div className="text-sm bg-green-300 text-black px-2 py-1 rounded-full">
          {poolType === 'weekly' ? 'Weekly' : 'Monthly'}
        </div>
      </div>

      {(error || triggerError) && (
        <div className="bg-red-900 border border-red-700 rounded-lg p-2 mb-4">
          <p className="text-red-200 text-xs">{error || triggerError}</p>
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
            <div className="text-lg font-semibold text-white">
              {poolInfo.totalWeight > 0 ? (poolInfo.totalWeight / 1000).toLocaleString() + 'K' : '--'}
            </div>
            <div className="text-gray-400 text-sm">Total Weight</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-white">
              {poolInfo.lastWinner ? '1' : '--'}
            </div>
            <div className="text-gray-400 text-sm">Last Winner</div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Next Draw:</span>
            <span className="text-white">{formatNextDrawTime(poolInfo.nextDrawTime)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Status:</span>
            <span className={`text-${poolInfo.poolState === 'open' ? 'green' : 'yellow'}-400 capitalize`}>
              {poolInfo.poolState}
            </span>
          </div>
        </div>

        <button 
          className={`w-full py-3 rounded-lg font-semibold transition-opacity ${
            !publicKey || triggering || !poolInfo.canTrigger
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-400 to-green-600 text-white hover:opacity-90'
          }`}
          onClick={() => triggerDraw(poolType)}
          disabled={!publicKey || triggering || !poolInfo.canTrigger}
        >
          {triggering ? 'Triggering...' : 'Trigger Draw'}
        </button>

        {poolInfo.lastWinner && (
          <div className="text-xs text-gray-400 text-center">
            Last winner: {poolInfo.lastWinner.slice(0, 4)}...{poolInfo.lastWinner.slice(-4)}
          </div>
        )}
      </div>
    </div>
  )
}
