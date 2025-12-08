// components/PoolCard.tsx
'use client'
import { usePoolBalance } from '../hooks/usePoolBalance'
import { usePoolInfo } from '../hooks/usePoolInfo'
import { useDrawTrigger } from '../hooks/useDrawTrigger'
import { useTriggerEligibility } from '../hooks/useTriggerEligibility'
import { useWallet } from '@solana/wallet-adapter-react'
import { Coins, Trophy, Clock, Zap } from 'lucide-react'
import ClaimPrizeButton from './ClaimPrizeButton'

interface PoolCardProps {
  title: string
  poolType: 'weekly' | 'monthly'
  nextDraw: string
  accent?: 'purple' | 'gold' // 新增：主题色选择
}

export default function PoolCard({ title, poolType, nextDraw, accent = 'purple' }: PoolCardProps) {
  const { poolBalance, loading: balanceLoading, error: balanceError } = usePoolBalance(poolType)
  const { poolInfo, loading: infoLoading, error: infoError } = usePoolInfo(poolType)
  const poolPda = poolInfo?.poolPda
  const snapshot = poolInfo?.snapshot
  const { triggerDraw, triggering, error: triggerError, success: triggerSuccess } = useDrawTrigger()
  const { canTrigger, timeUntilTrigger, isWithinTriggerWindow } = useTriggerEligibility(poolType)
  const { publicKey } = useWallet()

  const loading = balanceLoading || infoLoading

  // 根据accent选择主题色
  const theme = {
    purple: {
      gradient: 'from-walawow-purple/20 to-walawow-purple-dark/10',
      light: 'text-walawow-purple-light',
      DEFAULT: 'text-walawow-purple',
      bg: 'bg-walawow-purple/15',
      border: 'border-walawow-purple/30',
      badge: 'bg-gradient-to-r from-walawow-purple to-walawow-purple-dark'
    },
    gold: {
      gradient: 'from-walawow-gold/20 to-walawow-gold-dark/10',
      light: 'text-walawow-gold-light',
      DEFAULT: 'text-walawow-gold',
      bg: 'bg-walawow-gold/15',
      border: 'border-walawow-gold/30',
      badge: 'bg-gradient-to-r from-walawow-gold to-walawow-gold-dark'
    }
  }[accent]

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

  const getTriggerButtonStyle = () => {
    if (!publicKey) {
      return 'bg-walawow-neutral-card border border-walawow-neutral-border text-walawow-neutral-text-secondary cursor-not-allowed'
    }
    if (triggering) {
      return 'bg-walawow-neutral-card border border-walawow-neutral-border text-walawow-neutral-text-secondary cursor-wait'
    }
    if (!isWithinTriggerWindow) {
      return 'bg-walawow-neutral-card border border-walawow-neutral-border text-walawow-neutral-text-secondary cursor-not-allowed'
    }
    if (triggerSuccess) {
      return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-not-allowed animate-pulse-glow'
    }
    // 激活状态：使用金色渐变
    return 'btn-gold hover:shadow-lg hover:scale-[1.02] active:scale-95'
  }

  // 骨架屏加载状态
  if (loading) {
    return (
      <div className={`glass-card p-6 animate-pulse ${theme.border}`}>
        <div className="flex justify-between items-start mb-6">
          <div className="h-7 bg-walawow-neutral-border rounded w-1/2"></div>
          <div className="h-6 bg-walawow-neutral-border rounded w-1/4"></div>
        </div>
        <div className="space-y-6">
          <div className="h-10 bg-walawow-neutral-border rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-walawow-neutral-border rounded-xl"></div>
            <div className="h-16 bg-walawow-neutral-border rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`glass-card p-6 hover:glow-${accent} notranslate transition-all duration-500 border ${theme.border} hover:scale-[1.01]`}>
      {/* 标题和徽章 */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-sm text-walawow-neutral-text-secondary">
            Your chance for a <span className={theme.light}>surprise reward</span>
          </p>
        </div>
        <div className={`${theme.badge} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1`}>
          {poolType === 'weekly' ? (
            <>
              <Clock className="h-3 w-3" /> Weekly
            </>
          ) : (
            <>
              <Trophy className="h-3 w-3" /> Monthly
            </>
          )}
        </div>
      </div>

      {/* 错误/成功提示 */}
      {(balanceError || infoError || triggerError) && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4">
          <p className="text-red-300 text-sm">{balanceError || infoError || triggerError}</p>
        </div>
      )}

      {triggerSuccess && (
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-3 mb-4">
          <p className="text-green-300 text-sm flex items-center gap-2">
            <span className="text-xl">🎉</span>
            Draw triggered successfully! You may receive 5% reward if you're first.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {/* 当前奖金池 */}
        <div className={`p-4 rounded-xl ${theme.bg} border ${theme.border}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Coins className={`h-5 w-5 ${theme.light}`} />
              <span className="data-label">Current Prize Pool</span>
            </div>
            <div className="h-2 w-2 rounded-full bg-walawow-gold animate-pulse"></div>
          </div>
          <div className={`text-3xl font-bold ${theme.light}`}>
            ${poolBalance.toLocaleString()}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 text-center border border-walawow-neutral-border/50">
            <div className="data-value text-lg">
              {poolInfo.totalWeight > 0 ? (poolInfo.totalWeight / 1000).toLocaleString() + 'K' : '--'}
            </div>
            <div className="data-label mt-1">Total Weight</div>
          </div>
          <div className="glass-card p-4 text-center border border-walawow-neutral-border/50">
            <div className="data-value text-lg">
              {poolInfo.lastWinner ? '🏆' : '--'}
            </div>
            <div className="data-label mt-1">Last Winner</div>
          </div>
        </div>

        {/* 开奖信息 */}
        <div className="space-y-3 pt-4 border-t border-walawow-neutral-border">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-walawow-neutral-text-secondary" />
              <span className="data-label">Next Draw</span>
            </div>
            <span className="text-white font-medium">{formatNextDrawTime(poolInfo.nextDrawTime)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-walawow-neutral-text-secondary" />
              <span className="data-label">Trigger Window</span>
            </div>
            <span className={`font-bold ${isWithinTriggerWindow ? 'text-walawow-gold animate-pulse' : 'text-walawow-purple-light'}`}>
              {isWithinTriggerWindow ? '⚡ OPEN NOW' : `in ${timeUntilTrigger}`}
            </span>
          </div>
        </div>

        {/* 触发按钮 */}
        <div className="pt-4">
          <button 
            className={`w-full py-3.5 rounded-xl font-semibold transition-all ${getTriggerButtonStyle()}`}
            onClick={() => triggerDraw(poolType)}
            disabled={!publicKey || triggering || !isWithinTriggerWindow}
          >
            {getTriggerButtonText()}
          </button>

          {/* 触发奖励信息 */}
          <div className="text-xs text-center mt-3">
            {isWithinTriggerWindow ? (
              <p className="text-walawow-neutral-text-secondary">
                First trigger gets <span className="text-walawow-gold font-bold">5% reward</span> 
                <span className="block text-walawow-gold-light">(${(poolBalance * 0.05).toLocaleString()})</span>
              </p>
            ) : (
              <p className="text-walawow-neutral-text-secondary">
                Trigger window: <span className="text-walawow-purple-light">Friday 12:00-13:00 UTC</span>
              </p>
            )}
          </div>

          {/* 上次获胜者 */}
          {poolInfo.lastWinner && (
            <div className="text-xs text-center mt-3 pt-3 border-t border-walawow-neutral-border/50">
              <p className="text-walawow-neutral-text-secondary">
                Last winner: <span className="text-walawow-gold-light font-mono">
                  {poolInfo.lastWinner.slice(0, 4)}...{poolInfo.lastWinner.slice(-4)}
                </span>
              </p>
            </div>
          )}
          {/* ✅ 领取奖励按钮（赢家 / 触发者共用） */}
          {poolPda && (
            <ClaimPrizeButton
              poolPda={poolPda}
              snapshot={snapshot}
            />
          )}
        </div>
      </div>
    </div>
  )
}
