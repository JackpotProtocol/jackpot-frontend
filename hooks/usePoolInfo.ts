// hooks/usePoolInfo.ts
'use client'
import { PublicKey, Connection } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { JACKPOT_PROTOCOL_ADDRESSES } from '../config/addresses'

export interface PoolInfo {
  nextDrawTime: Date | null
  lastWinner: string | null
  lastPrizeAmount: number
  poolState: string
  totalWeight: number
  canTrigger: boolean
}

export function usePoolInfo(poolType: 'weekly' | 'monthly') {
  const [poolInfo, setPoolInfo] = useState<PoolInfo>({
    nextDrawTime: null,
    lastWinner: null,
    lastPrizeAmount: 0,
    poolState: 'unknown',
    totalWeight: 0,
    canTrigger: false
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPoolInfo = async () => {
      try {
        setLoading(true)
        setError(null)

        // 模拟数据 - 在实际中这里会读取 PoolConfig 账户
        const mockInfo: PoolInfo = {
          nextDrawTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2天后
          lastWinner: '9xN1DcpQeA3HzShZiiGq7kafuQPzU88gV86bsMo77iwp',
          lastPrizeAmount: poolType === 'weekly' ? 50000 : 200000,
          poolState: 'open',
          totalWeight: poolType === 'weekly' ? 1000000 : 2500000,
          canTrigger: true
        }

        setPoolInfo(mockInfo)

      } catch (err: any) {
        console.error(`❌ Error fetching ${poolType} pool info:`, err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPoolInfo()
    const interval = setInterval(fetchPoolInfo, 30000)
    return () => clearInterval(interval)
  }, [poolType])

  return { poolInfo, loading, error }
}
