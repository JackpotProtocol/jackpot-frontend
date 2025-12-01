// hooks/useProtocolStats.ts
'use client'
import { useEffect, useState } from 'react'
import { fetchJackpotAPI, JACKPOT_API } from '../config/api'

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
    transactionTax: 10
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 从API获取真实数据
        const snapshotData = await fetchJackpotAPI(JACKPOT_API.ENDPOINTS.LATEST_SNAPSHOT)
        
        const realStats: ProtocolStats = {
          totalDistributed: 1250000, // 暂时保持模拟
          totalWinners: 15, // 暂时保持模拟
          activeHolders: snapshotData.data?.total_holders || 0, // 真实数据
          transactionTax: 10
        }
        setStats(realStats)
      } catch (err) {
        console.error('Error fetching protocol stats:', err)
        // API失败时用模拟数据
        const mockStats: ProtocolStats = {
          totalDistributed: 1250000,
          totalWinners: 15,
          activeHolders: 2840,
          transactionTax: 10
        }
        setStats(mockStats)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 60000)
    return () => clearInterval(interval)
  }, [])

  return { stats, loading }
}
