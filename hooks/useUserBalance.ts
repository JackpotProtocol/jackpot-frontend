// hooks/useUserBalance.ts
'use client'
import { PublicKey, Connection } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { JACKPOT_PROTOCOL_ADDRESSES } from '../config/addresses'

export function useUserBalance() {
  const { publicKey } = useWallet()
  const [userBalance, setUserBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const connection = new Connection("https://api.devnet.solana.com", 'confirmed')
        const jackpotMint = new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.JACKPOT_MINT)
        
        console.log('🔍 Fetching token accounts for:', publicKey.toString())
        
        // 获取用户的所有 JACKPOT token 账户
        const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
          mint: jackpotMint
        })

        console.log('📋 Found token accounts:', tokenAccounts.value.length)

        let totalBalance = 0
        
        if (tokenAccounts.value.length > 0) {
          // 读取每个账户的余额
          for (const accountInfo of tokenAccounts.value) {
            const balance = await connection.getTokenAccountBalance(accountInfo.pubkey)
            totalBalance += balance.value.uiAmount || 0
          }
        }

        console.log('💰 Total user balance:', totalBalance)
        setUserBalance(totalBalance)

      } catch (err: any) {
        console.error('❌ Error fetching user balance:', err)
        setError(err.message)
        // 出错时保持为0，而不是模拟数据
        setUserBalance(0)
      } finally {
        setLoading(false)
      }
    }

    fetchBalance()
  }, [publicKey])

  return { userBalance, loading, error }
}
