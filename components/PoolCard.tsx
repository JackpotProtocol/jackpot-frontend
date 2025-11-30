// components/PoolCard.tsx
'use client'
import { usePoolBalance } from '../hooks/usePoolBalance'
import { usePoolInfo } from '../hooks/usePoolInfo'
import { useDrawTrigger } from '../hooks/useDrawTrigger'
import { useTriggerEligibility } from '../hooks/useTriggerEligibility'
import { useWallet } from '@solana/wallet-adapter-react'

interface PoolCardProps {
  title: string
  poolType: 'weekly' | 'monthly'
  nextDraw: string
}

export default function PoolCard({ title, poolType, nextDraw }: PoolCardProps) {
  const { poolBalance, loading: balanceLoading, error: balanceError } = usePoolBalance(poolType)
  const { poolInfo, loading: infoLoading, error: infoError } = usePoolInfo(poolType)
  const { triggerDraw, triggering, error: triggerError, success: triggerSuccess } = useDrawTrigger()
  const { canTrigger, timeUntilTrigger, isWithinTriggerWindow } = useTriggerEligibility(poolType)
  const { publicKey } = useWallet()

  const loading = balanceLoading || infoLoading

  const formatNextDrawTime = (date: Date | null) => {
    if (!date) return poolType === 'weekly' ? 'Friday 12:00 UTC' : 'Last Friday of Month'
    
    const now = new Date()
    const timeDiff = date.getTime() - now.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    
    if (daysDiff < 0) {
      return 'Drawing in progress...'
    } else if (daysDiff === 0) {
      return 'Today 12:00 UTC'
    } else if (daysDiff === 1) {
      return 'Tomorrow 12:00 UTC'
    } else if (daysDiff <= 7) {
      return `${date.toLocaleDateString('en-US', { weekday: 'long' })} 12:00 UTC`
    } else {
      return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 12:00 UTC`
    }
  }

  const getTriggerButtonText = () => {
    if (!publicKey) return 'Connect Wallet to Trigger'
    if (triggering) return 'Triggering Draw...'
    if (!isWithinTriggerWindow) return `Opens in ${timeUntilTrigger}`
    return 'Trigger Draw & Earn 5%'
  }

  const getTriggerButtonColor = () => {
    if (!publicKey || triggering || !isWithinTriggerWindow) {
      return 'bg-gray-600 text-gray-400 cursor-not-allowed'
    }
    if (triggerSuccess) {
      return 'bg-green-600 text-white cursor-not-allowed'
    }
    return 'bg-gradient-to-r from-yellow-500 to-red-500 text-white hover:opacity-90'
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
        <div className="text-sm bg-yellow-500 text-black px-2 py-1 rounded-full">
          {poolType === 'weekly' ? 'Weekly' : 'Monthly'}
        </div>
      </div>

      {(balanceError || infoError || triggerError) && (
        <div className="bg-red-900 border border-red-700 rounded-lg p-2 mb-4">
          <p className="text-red-200 text-xs">{balanceError || infoError || triggerError}</p>
        </div>
      )}

      {triggerSuccess && (
        <div className="bg-green-900 border border-green-700 rounded-lg p-2 mb-4">
          <p className="text-green-200 text-xs">🎉 Draw triggered successfully! You may receive 5% reward if you're first.</p>
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
            <span className="text-gray-400">Trigger Window:</span>
            <span className={`text-${isWithinTriggerWindow ? 'green' : 'yellow'}-400`}>
              {isWithinTriggerWindow ? 'OPEN' : `in ${timeUntilTrigger}`}
            </span>
          </div>
        </div>

        {/* 触发按钮 */}
        <button 
          className={`w-full py-3 rounded-lg font-semibold transition-all ${getTriggerButtonColor()}`}
          onClick={() => triggerDraw(poolType)}
          disabled={!publicKey || triggering || !isWithinTriggerWindow}
        >
          {getTriggerButtonText()}
        </button>

        {/* 触发奖励信息 */}
        <div className="text-xs text-gray-400 text-center">
          {isWithinTriggerWindow ? (
            <>First trigger gets 5% reward (${(poolBalance * 0.05).toLocaleString()})</>
          ) : (
            <>Trigger window: Friday 12:00-13:00 UTC</>
          )}
        </div>

        {poolInfo.lastWinner && (
          <div className="text-xs text-gray-400 text-center">
            Last winner: {poolInfo.lastWinner.slice(0, 4)}...{poolInfo.lastWinner.slice(-4)}
          </div>
        )}
      </div>
    </div>
  )
}
