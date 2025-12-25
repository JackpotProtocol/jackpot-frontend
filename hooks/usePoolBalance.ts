// hooks/usePoolBalance.ts
'use client'
import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { useConnection } from '@solana/wallet-adapter-react'
import { WALAWOW_PROTOCOL_ADDRESSES } from '../config/addresses'
import { getPoolVaultPDA } from '../utils/programs'

export function usePoolBalance(poolType: 'weekly' | 'monthly') {
  const { connection } = useConnection()
  const [poolVaultBalance, setPoolVaultBalance] = useState(0)
  const [stagingVaultBalance, setStagingVaultBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPoolBalance = async () => {
      try {
        setLoading(true)
        setError(null)

        // 获取池地址
        const poolAddress = new PublicKey(
          poolType === 'weekly' 
            ? WALAWOW_PROTOCOL_ADDRESSES.POOL_WEEKLY
            : WALAWOW_PROTOCOL_ADDRESSES.POOL_MONTHLY
        )

        // 计算 pool vault PDA
        const [vaultPDA] = getPoolVaultPDA(poolAddress)

        console.log(`🔍 Fetching ${poolType} pool vault:`, vaultPDA.toString())

        try {
          // 获取 vault token 账户余额
          const vaultBalance = await connection.getTokenAccountBalance(vaultPDA)
          const balance = vaultBalance.value.uiAmount || 0
          console.log(`💰 ${poolType} pool balance:`, balance)
          setPoolVaultBalance(balance)
        } catch (vaultErr: any) {
          // 如果 vault 不存在或读取失败，尝试降级方案
          console.warn(`⚠️ Could not fetch vault balance, using fallback:`, vaultErr.message)
          
          // 尝试从 USDC mint 获取余额（如果 vault 是 USDC token account）
          try {
            const usdcMint = new PublicKey(WALAWOW_PROTOCOL_ADDRESSES.USDC_MINT)
            // 这里可以添加其他降级逻辑
            setPoolVaultBalance(0)
          } catch {
            // 最终降级：使用 0
            setPoolVaultBalance(0)
          }
        }

        // 获取 staging vault 余额
        const stagingVault = new PublicKey(
          poolType === 'weekly'
            ? WALAWOW_PROTOCOL_ADDRESSES.WEEKLY_STAGING_VAULT
            : WALAWOW_PROTOCOL_ADDRESSES.MONTHLY_STAGING_VAULT
        )
        try {
          const stagingBalance = await connection.getTokenAccountBalance(stagingVault)
          const balance = stagingBalance.value.uiAmount || 0
          setStagingVaultBalance(balance)
        } catch (stagingErr: any) {
          console.warn(`⚠️ Could not fetch staging balance, using fallback:`, stagingErr.message)
          setStagingVaultBalance(0)
        }

      } catch (err: any) {
        console.error(`❌ Error fetching ${poolType} pool balance:`, err)
        setError(err.message)
        setPoolVaultBalance(0)
        setStagingVaultBalance(0)
      } finally {
        setLoading(false)
      }
    }

    fetchPoolBalance()

    // 设置定时刷新
    const interval = setInterval(fetchPoolBalance, 30000) // 30秒刷新一次
    return () => clearInterval(interval)
  }, [poolType, connection])

  return { poolVaultBalance, stagingVaultBalance, loading, error }
}
