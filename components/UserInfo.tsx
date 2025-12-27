// components/UserInfo.tsx
'use client'
import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { useUserBalance } from '../hooks/useUserBalance'
import { User, Coins, Scale, Target, AlertCircle } from 'lucide-react'
import { WALAWOW_API } from '../config/api'

interface UserInfoProps {
  publicKey: PublicKey
}

export default function UserInfo({ publicKey }: UserInfoProps) {
  const { userBalance, loading: balanceLoading, error: balanceError } = useUserBalance()
  const [totalSupply, setTotalSupply] = useState(0)
  const [snapshotWeight, setSnapshotWeight] = useState(0)
  const [loadingSupply, setLoadingSupply] = useState(true)

  // 计算权重和概率
  const userWeight = snapshotWeight
  const winProbability = totalSupply > 0 ? (snapshotWeight / totalSupply) * 100 : 0
  
  // 生成用户头像颜色
  const userColor = `#${publicKey.toString().slice(0, 6)}`

  useEffect(() => {
    const fetchTotalSupply = async () => {
      try {
        const response = await fetch(`${WALAWOW_API.BASE_URL}${WALAWOW_API.ENDPOINTS.LATEST_SNAPSHOT}`)
        if (!response.ok) throw new Error('Failed to fetch snapshot')
        const payload = await response.json()
        const totalWeightRaw = payload?.data?.total_weight
        if (totalWeightRaw == null) throw new Error('Snapshot total weight missing')

        const totalWeight = Number(totalWeightRaw)
        const totalWeightUi = Number.isFinite(totalWeight) ? totalWeight / 1e9 : 0
        setTotalSupply(totalWeightUi)
      } catch (err) {
        console.error('Error fetching total supply:', err)
        setTotalSupply(0)
      } finally {
        setLoadingSupply(false)
      }
    }

    fetchTotalSupply()
  }, [])

  useEffect(() => {
    const fetchSnapshotWeight = async () => {
      if (!publicKey) return
      try {
        const response = await fetch(
          `${WALAWOW_API.BASE_URL}${WALAWOW_API.ENDPOINTS.SNAPSHOT_HOLDER}?owner=${publicKey.toBase58()}`
        )
        if (!response.ok) throw new Error('Failed to fetch holder snapshot weight')
        const payload = await response.json()
        const weightRaw = payload?.data?.weight ?? '0'
        const weight = Number(weightRaw)
        const weightUi = Number.isFinite(weight) ? weight / 1e9 : 0
        setSnapshotWeight(weightUi)
      } catch (err) {
        console.error('Error fetching snapshot weight:', err)
        setSnapshotWeight(0)
      }
    }

    fetchSnapshotWeight()
  }, [publicKey])

  // 骨架屏加载状态
  if (balanceLoading || loadingSupply) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 bg-walawow-neutral-border rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-5 bg-walawow-neutral-border rounded w-32"></div>
            <div className="h-3 bg-walawow-neutral-border rounded w-24"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-walawow-neutral-border rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="notranslate glass-card p-6 hover:glow-purple transition-all duration-500">
      {/* 用户身份区域 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-walawow-neutral-border">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div 
            className="h-14 w-14 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{ 
              background: `linear-gradient(135deg, ${userColor}30, ${userColor}60)`,
              border: `2px solid ${userColor}`
            }}
          >
            <User className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Your WalaWow Explorer</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-mono text-walawow-neutral-text-secondary">
                {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-6)}
              </span>
              <span className="h-2 w-2 rounded-full bg-walawow-gold animate-pulse"></span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:items-end">
          <span className="text-sm text-walawow-neutral-text-secondary">Member Since</span>
          <span className="text-walawow-gold-light font-medium">Recent Explorer</span>
        </div>
      </div>

      {/* 错误提示 */}
      {balanceError && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="text-red-300 text-sm">Balance data temporarily unavailable</p>
          </div>
        </div>
      )}

      {/* 核心数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Snapshot 权重 */}
        <div className="glass-card p-5 hover:scale-[1.02] transition-all duration-300 border border-walawow-neutral-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-walawow-gold/30 to-walawow-gold/10 flex items-center justify-center">
              <Scale className="h-6 w-6 text-walawow-gold" />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded bg-walawow-gold/10 text-walawow-gold">
              {userWeight > 10000 ? 'Whale' : userWeight > 1000 ? 'Dolphin' : 'Minnow'}
            </span>
          </div>
          <div className="data-value mb-1">{userWeight.toLocaleString()}</div>
          <div className="data-label">Snapshot Weight</div>
          <div className="text-xs text-walawow-neutral-text-secondary mt-2">
            Your eligible weight for draws
          </div>
        </div>

        {/* WALAWOW 余额 */}
        <div className="glass-card p-5 hover:scale-[1.02] transition-all duration-300 border border-walawow-neutral-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-walawow-purple/30 to-walawow-purple/10 flex items-center justify-center">
              <Coins className="h-6 w-6 text-walawow-purple-light" />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded bg-walawow-purple/10 text-walawow-purple-light">
              Balance
            </span>
          </div>
          <div className="data-value mb-1">{userBalance.toLocaleString()}</div>
          <div className="data-label">WALAWOW Balance</div>
          <div className="text-xs text-walawow-neutral-text-secondary mt-2">
            Current wallet balance
          </div>
        </div>

        {/* 获胜概率 */}
        <div className="glass-card p-5 hover:scale-[1.02] transition-all duration-300 border border-walawow-neutral-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-walawow-purple/20 to-walawow-gold/10 flex items-center justify-center">
              <Target className="h-6 w-6 text-walawow-purple-light" />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              winProbability > 0.1 ? 'bg-green-500/10 text-green-400' : 
              winProbability > 0.01 ? 'bg-yellow-500/10 text-yellow-400' : 
              'bg-walawow-neutral-border text-walawow-neutral-text-secondary'
            }`}>
              {winProbability > 0.1 ? 'High' : winProbability > 0.01 ? 'Medium' : 'Low'}
            </span>
          </div>
          <div className="data-value mb-1">{winProbability.toFixed(6)}%</div>
          <div className="data-label">WALAWOW Probability</div>
          <div className="text-xs text-walawow-neutral-text-secondary mt-2">
            Chance per draw cycle
          </div>
        </div>
      </div>

      {/* 进度条：获胜概率可视化 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="data-label">Your Surprise Potential</span>
          <span className="text-walawow-purple-light text-sm font-medium">
            Top {totalSupply > 0 ? ((userWeight / totalSupply) * 100).toFixed(2) : '0.00'}% holder
          </span>
        </div>
        <div className="h-3 bg-walawow-neutral-card rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-walawow-purple to-walawow-gold rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(winProbability * 10, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-walawow-neutral-text-secondary mt-1">
          <span>0%</span>
          <span>Current: {winProbability.toFixed(6)}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* 行动提示 */}
      {userBalance === 0 ? (
        <div className="p-4 rounded-xl bg-gradient-to-r from-walawow-purple/10 to-walawow-gold/10 border border-walawow-purple/30 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-walawow-purple to-walawow-gold flex items-center justify-center">
              <span className="text-white text-lg">🎯</span>
            </div>
            <div>
              <p className="text-walawow-gold-light font-medium mb-1">
                Ready for Your First WOW?
              </p>
              <p className="text-sm text-walawow-neutral-text-secondary">
                Acquire WALAWOW tokens to start participating in surprise draws!
              </p>
            </div>
            <button className="btn-outline px-6 py-2 mt-3 sm:mt-0">
              Get Tokens →
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/30">
          <div className="flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
              <span className="text-white text-xl">✅</span>
            </div>
            <div>
              <p className="text-green-300 font-medium">
                You're all set for surprises!
              </p>
              <p className="text-sm text-green-300/70">
                With {userBalance.toLocaleString()} tokens, you're in the game.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 统计小字 */}
      <div className="text-center mt-6 pt-4 border-t border-walawow-neutral-border/50">
        <p className="text-xs text-walawow-neutral-text-secondary">
          Data updates in real-time • Based on snapshot total {totalSupply.toLocaleString()}
        </p>
      </div>
    </div>
  )
}
