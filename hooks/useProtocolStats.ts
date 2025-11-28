// hooks/useProtocolStats.ts
'use client'
import { PublicKey, Connection } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { JACKPOT_PROTOCOL_ADDRESSES } from '../config/addresses'

interface ProtocolStats {
  totalDistributed: number
  totalWinners: number
  activeHolders: number
  transactionTax: number
}

export function useProtocolStats() {
  const [stats, setStats] = useState<ProtocolStats>({
    totalDistributed: 0,
    totalWinners: 0,
    activeHolders: 0,
    transactionTax: 10 // 10% as per whitepaper
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 模拟数据 - 在实际中会从链上事件中统计
        const mockStats: ProtocolStats = {
          totalDistributed: 1250000,
          totalWinners: 15,
          activeHolders: 2840,
          transactionTax: 10
        }
        setStats(mockStats)
      } catch (err) {
        console.error('Error fetching protocol stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 60000) // 1分钟刷新一次
    return () => clearInterval(interval)
  }, [])

  return { stats, loading }
}
