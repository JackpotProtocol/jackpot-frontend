// components/PoolCard.tsx
'use client'
import { useState } from 'react'
import { usePoolBalance } from '../hooks/usePoolBalance'
import { usePoolInfo } from '../hooks/usePoolInfo'
import { useDrawTrigger } from '../hooks/useDrawTrigger'
import { useTriggerEligibility } from '../hooks/useTriggerEligibility'
import { useClaimPrize } from '../hooks/useClaimPrize'
import { useWallet } from '@solana/wallet-adapter-react'
import { Coins, Trophy, Clock, Zap } from 'lucide-react'
import { WALAWOW_API } from '../config/api'

interface PoolCardProps {
  title: string
  poolType: 'weekly' | 'monthly'
  nextDraw: string
  accent?: 'purple' | 'gold' // 新增：主题色选择
}

export default function PoolCard({ title, poolType, nextDraw, accent = 'purple' }: PoolCardProps) {
  const { poolVaultBalance, stagingVaultBalance, loading: balanceLoading, error: balanceError } = usePoolBalance(poolType)
  const { poolInfo, loading: infoLoading, error: infoError } = usePoolInfo(poolType)
  const { triggerDraw, triggering, error: triggerError, success: triggerSuccess } = useDrawTrigger(poolType)
  const { canTrigger, timeUntilTrigger, isWithinTriggerWindow } = useTriggerEligibility(poolType)
  const { claimPrize, claiming, error: claimError, success: claimSuccess, canClaim } = useClaimPrize()
  const { publicKey } = useWallet()
  const [claimFormError, setClaimFormError] = useState<string | null>(null)

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
    if (!date) return 'Schedule not available'

    const now = new Date()
    const windowEnd = new Date(date.getTime() + poolInfo.drawWindow * 1000)

    if (now >= date && now <= windowEnd) return 'In draw window'
    if (now > windowEnd) return 'Awaiting next round'

    const label = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    })
    return `${label} UTC`
  }

  const formatTokenAmount = (raw: string, decimals = 9) => {
    try {
      const amount = BigInt(raw)
      if (amount === BigInt(0)) return '0'

      let base = BigInt(1)
      for (let i = 0; i < decimals; i += 1) {
        base *= BigInt(10)
      }
      const whole = amount / base
      const fraction = amount % base
      const wholeText = whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      if (fraction === BigInt(0)) return wholeText

      const fractionText = fraction
        .toString()
        .padStart(decimals, '0')
        .slice(0, 2)
        .replace(/0+$/, '')

      return fractionText ? `${wholeText}.${fractionText}` : wholeText
    } catch {
      return '--'
    }
  }

  const getTriggerButtonText = () => {
    if (!publicKey) return 'Connect Wallet to Trigger'
    if (triggering) return 'Triggering Draw...'
    if (!isWithinTriggerWindow) {
      return timeUntilTrigger.includes('Awaiting') ? 'Awaiting next round' : `Opens in ${timeUntilTrigger}`
    }
    const rewardPct = (poolInfo.feeBpsTriggerer / 100).toFixed(2)
    return `Trigger Draw & Earn ${rewardPct}%`
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

  const getPrizeStatus = () => {
    if (poolVaultBalance > 0 && poolInfo.poolState === 'ReadyToClaim') return 'Unclaimed'
    if (poolInfo.lastPrizeAmount > 0 && poolInfo.lastPaidAmount >= poolInfo.lastPrizeAmount) return 'Claimed'
    return 'Pending'
  }

  const parseProof = (raw: unknown) => {
    if (!Array.isArray(raw)) throw new Error('Merkle proof is required')
    return raw.map((item) => {
      if (typeof item === 'string') {
        const hex = item.startsWith('0x') ? item.slice(2) : item
        if (hex.length !== 64) throw new Error('Each proof element must be 32-byte hex')
        const bytes = new Uint8Array(32)
        for (let i = 0; i < 32; i += 1) {
          const byte = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16)
          if (Number.isNaN(byte)) throw new Error('Invalid hex value in proof')
          bytes[i] = byte
        }
        return bytes
      }
      if (Array.isArray(item)) {
        if (item.length !== 32) throw new Error('Each proof element must be 32 bytes')
        return Uint8Array.from(item)
      }
      throw new Error('Unsupported proof element format')
    })
  }

  const handleClaim = async () => {
    if (!publicKey) {
      setClaimFormError('Connect wallet to claim.')
      return
    }

    setClaimFormError(null)
    try {
      const url = `${WALAWOW_API.BASE_URL}${WALAWOW_API.ENDPOINTS.CLAIM_PROOF}?pool=${poolType}&winner=${publicKey.toBase58()}`
      const response = await fetch(url)
      const raw = await response.text()
      let payload: any = null
      if (raw) {
        try {
          payload = JSON.parse(raw)
        } catch {
          payload = null
        }
      }
      if (!response.ok) {
        const message = payload?.error || payload?.message || 'Claim data not available. Please try again later.'
        throw new Error(message)
      }
      const claimData = payload?.data ?? payload
      const winnerLeafAmount = claimData?.winnerLeafAmount ?? claimData?.winner_leaf_amount
      const cumulativeWeightUntil = claimData?.cumulativeWeightUntil ?? claimData?.cumulative_weight_until
      const proof = claimData?.proof

      if (winnerLeafAmount == null || cumulativeWeightUntil == null || !proof) {
        throw new Error('Claim data not available. Please try again later.')
      }

      const normalizedProof = parseProof(proof)
      await claimPrize({
        poolType,
        winner: publicKey,
        winnerLeafAmount: BigInt(winnerLeafAmount),
        cumulativeWeightUntil: BigInt(cumulativeWeightUntil),
        proof: normalizedProof,
      })
    } catch (err: any) {
      setClaimFormError(err?.message || 'Invalid claim input.')
    }
  }

  const canAttemptClaim = poolInfo.poolState === 'ReadyToClaim' && poolVaultBalance > 0

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
            Draw triggered successfully! You may receive {(poolInfo.feeBpsTriggerer / 100).toFixed(2)}% if you're first.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {/* 资金展示 */}
        <div className="grid grid-cols-1 gap-4">
          <div className={`p-4 rounded-xl ${theme.bg} border ${theme.border}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Coins className={`h-5 w-5 ${theme.light}`} />
                <span className="data-label">Accumulated (Staging)</span>
              </div>
            </div>
            <div className={`text-2xl font-bold ${theme.light}`}>
              ${stagingVaultBalance.toLocaleString()}
            </div>
          </div>
          <div className="glass-card p-4 border border-walawow-neutral-border/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-walawow-gold" />
                <span className="data-label">Current Prize (Pool Vault)</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-walawow-neutral-card border border-walawow-neutral-border text-walawow-neutral-text-secondary">
                {getPrizeStatus()}
              </span>
            </div>
            <div className="text-2xl font-bold text-walawow-gold">
              ${poolVaultBalance.toLocaleString()}
            </div>
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
              {isWithinTriggerWindow
                ? '⚡ OPEN NOW'
                : timeUntilTrigger.includes('Awaiting')
                ? 'Awaiting next round'
                : `in ${timeUntilTrigger}`}
            </span>
          </div>
        </div>

        {/* 触发按钮 */}
        <div className="pt-4">
          <button 
            className={`w-full py-3.5 rounded-xl font-semibold transition-all ${getTriggerButtonStyle()}`}
            onClick={() => triggerDraw()}
            disabled={!publicKey || triggering || !isWithinTriggerWindow}
          >
            {getTriggerButtonText()}
          </button>

          {/* 触发奖励信息 */}
          <div className="text-xs text-center mt-3">
            <p className="text-walawow-neutral-text-secondary">
              Trigger reward: <span className="text-walawow-gold font-bold">{(poolInfo.feeBpsTriggerer / 100).toFixed(2)}%</span>
              <span className="block text-walawow-gold-light">
                (${(poolVaultBalance * (poolInfo.feeBpsTriggerer / 10000)).toLocaleString()})
              </span>
            </p>
          </div>

          {(poolInfo.lastWinner || poolInfo.lastTriggerer) && (
            <div className="text-xs text-center mt-3 pt-3 border-t border-walawow-neutral-border/50 space-y-1">
              {poolInfo.lastWinner && (
                <p className="text-walawow-neutral-text-secondary">
                  Winner: <span className="text-walawow-gold-light font-mono font-semibold">
                    {poolInfo.lastWinner.slice(0, 4)}...{poolInfo.lastWinner.slice(-4)}
                  </span>
                </p>
              )}
              {poolInfo.lastTriggerer && (
                <p className="text-walawow-neutral-text-secondary">
                  Triggerer: <span className="text-walawow-gold-light font-mono">
                    {poolInfo.lastTriggerer.slice(0, 4)}...{poolInfo.lastTriggerer.slice(-4)}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* 领奖按钮 */}
        <div className="pt-4 border-t border-walawow-neutral-border/50">
          <button
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              !publicKey || claiming || !canAttemptClaim
                ? 'bg-walawow-neutral-card border border-walawow-neutral-border text-walawow-neutral-text-secondary cursor-not-allowed'
                : 'btn-gold hover:shadow-lg hover:scale-[1.01]'
            }`}
            onClick={handleClaim}
            disabled={!publicKey || claiming || !canAttemptClaim}
          >
            {claiming ? 'Claiming Prize...' : claimSuccess ? 'Prize Claimed' : 'Claim Prize'}
          </button>
          <p className="text-xs text-walawow-neutral-text-secondary text-center mt-2">
            Claim data is fetched automatically for the connected wallet.
            Triggerer rewards are paid together when the winner claims.
          </p>

          {(claimFormError || claimError) && (
            <div className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 mt-4">
              {claimFormError || claimError}
            </div>
          )}
          {claimSuccess && (
            <div className="text-xs text-green-300 bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2 mt-4">
              Prize claimed successfully.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
