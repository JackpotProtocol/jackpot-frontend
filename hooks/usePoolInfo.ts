// hooks/usePoolInfo.ts
'use client'
import { PublicKey, Connection } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { useConnection } from '@solana/wallet-adapter-react'
import { WALAWOW_PROTOCOL_ADDRESSES } from '../config/addresses'
import { getPoolPDA, getPoolProgram, getProvider } from '../utils/programs'
import { AnchorProvider } from '@coral-xyz/anchor'

export interface PoolInfo {
  nextDrawTime: Date | null
  lastWinner: string | null
  lastPrizeAmount: number
  poolState: string
  totalWeight: number
  canTrigger: boolean
  paused: boolean
  drawPeriod: number
  drawWindow: number
}

// Pool State 枚举
const POOL_STATE = {
  Open: 0,
  WaitingForVrf: 1,
  Processing: 2,
  Closed: 3,
}

export function usePoolInfo(poolType: 'weekly' | 'monthly') {
  const { connection } = useConnection()
  const [poolInfo, setPoolInfo] = useState<PoolInfo>({
    nextDrawTime: null,
    lastWinner: null,
    lastPrizeAmount: 0,
    poolState: 'unknown',
    totalWeight: 0,
    canTrigger: false,
    paused: false,
    drawPeriod: 0,
    drawWindow: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPoolInfo = async () => {
      try {
        setLoading(true)
        setError(null)

        // 获取池地址
        const poolAddress = new PublicKey(
          poolType === 'weekly' 
            ? WALAWOW_PROTOCOL_ADDRESSES.POOL_WEEKLY
            : WALAWOW_PROTOCOL_ADDRESSES.POOL_MONTHLY
        )

        // 创建只读 provider（使用 null wallet 用于读取）
        const readOnlyWallet = {
          publicKey: null,
          signTransaction: async () => { throw new Error('Read-only') },
          signAllTransactions: async () => { throw new Error('Read-only') },
        }
        
        try {
          const provider = getProvider(connection, readOnlyWallet as any)
          const program = getPoolProgram(provider)
          
          // 读取 PoolConfig 账户
          // 使用类型断言来访问账户，因为 Anchor 生成的类型可能不完全匹配
          const poolAccount = await (program.account as any).poolConfig.fetch(poolAddress) as any
          
          const stateNames = ['Open', 'WaitingForVrf', 'Processing', 'Closed']
          const poolState = stateNames[poolAccount.state] || 'unknown'
          
          const info: PoolInfo = {
            nextDrawTime: poolAccount.nextDrawTime ? new Date(poolAccount.nextDrawTime.toNumber() * 1000) : null,
            lastWinner: poolAccount.lastWinner && !poolAccount.lastWinner.equals(PublicKey.default) 
              ? poolAccount.lastWinner.toString() 
              : null,
            lastPrizeAmount: poolAccount.lastPrizeAmount ? poolAccount.lastPrizeAmount.toNumber() : 0,
            poolState,
            totalWeight: poolAccount.totalWeight ? Number(poolAccount.totalWeight.toString()) : 0,
            canTrigger: poolAccount.state === POOL_STATE.Open && !poolAccount.paused,
            paused: poolAccount.paused,
            drawPeriod: poolAccount.drawPeriod ? poolAccount.drawPeriod.toNumber() : 0,
            drawWindow: poolAccount.drawWindow ? poolAccount.drawWindow.toNumber() : 0,
          }

          setPoolInfo(info)
        } catch (fetchError: any) {
          // 如果账户不存在或读取失败，使用模拟数据作为降级
          console.warn(`⚠️ Could not fetch pool info from chain, using fallback:`, fetchError.message)
          const mockInfo: PoolInfo = {
            nextDrawTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            lastWinner: null,
            lastPrizeAmount: 0,
            poolState: 'Open',
            totalWeight: 0,
            canTrigger: false,
            paused: false,
            drawPeriod: 0,
            drawWindow: 0,
          }
          setPoolInfo(mockInfo)
        }

      } catch (err: any) {
        console.error(`❌ Error fetching ${poolType} pool info:`, err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPoolInfo()
    const interval = setInterval(fetchPoolInfo, 30000) // 每30秒刷新
    return () => clearInterval(interval)
  }, [poolType, connection])

  return { poolInfo, loading, error }
}
