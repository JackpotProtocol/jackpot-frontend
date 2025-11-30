// hooks/useDrawTrigger.ts
'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'
import { useConnection } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import { JACKPOT_PROTOCOL_ADDRESSES } from '../config/addresses'

export function useDrawTrigger() {
  const { connection } = useConnection()
  const { publicKey, wallet, sendTransaction } = useWallet()
  const [triggering, setTriggering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const triggerDraw = async (poolType: 'weekly' | 'monthly') => {
    if (!publicKey || !wallet) {
      setError('Wallet not connected')
      return
    }

    setTriggering(true)
    setError(null)
    setSuccess(false)

    try {
      console.log(`🎯 Triggering ${poolType} draw...`)

      // 获取奖池地址
      const poolAddress = new PublicKey(
        poolType === 'weekly' 
          ? JACKPOT_PROTOCOL_ADDRESSES.POOL_WEEKLY
          : JACKPOT_PROTOCOL_ADDRESSES.POOL_MONTHLY
      )

      console.log('📝 Preparing draw transaction...')
      console.log('Pool:', poolAddress.toString())
      console.log('Triggerer:', publicKey.toString())

      // 这里简化实现，直接构建交易
      // 在实际部署中，你需要使用正确的程序IDL和指令数据
      const transaction = new Transaction().add({
        keys: [
          { pubkey: poolAddress, isSigner: false, isWritable: true },
          { pubkey: publicKey, isSigner: true, isWritable: false },
        ],
        programId: new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.POOL_PROGRAM),
        // 注意：这里需要正确的指令数据
        // 对于 draw_winner 指令，discriminator 是 [250, 103, 118, 147, 219, 235, 169, 220]
        data: Buffer.from([250, 103, 118, 147, 219, 235, 169, 220]) // draw_winner discriminator
      })

      // 设置最新区块哈希
      const { blockhash } = await connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = publicKey

      console.log('🔄 Sending transaction...')

      // 发送交易
      const signature = await sendTransaction(transaction, connection)
      
      console.log('⏳ Confirming transaction...', signature)

      // 等待确认
      const confirmation = await connection.confirmTransaction(signature, 'confirmed')
      
      if (confirmation.value.err) {
        throw new Error('Transaction failed: ' + JSON.stringify(confirmation.value.err))
      }

      console.log(`✅ ${poolType} draw triggered successfully!`, signature)
      setSuccess(true)

      // 5秒后重置成功状态
      setTimeout(() => setSuccess(false), 5000)

    } catch (err: any) {
      console.error(`❌ Error triggering ${poolType} draw:`, err)
      
      // 提供更友好的错误信息
      let errorMessage = err.message
      if (err.message?.includes('TooEarlyToDraw')) {
        errorMessage = 'Too early to trigger draw. Please wait until the scheduled time.'
      } else if (err.message?.includes('InvalidState')) {
        errorMessage = 'Pool is not in a state that allows drawing.'
      } else if (err.message?.includes('Paused')) {
        errorMessage = 'Contract is currently paused.'
      } else if (err.message?.includes('Unauthorized')) {
        errorMessage = 'Unauthorized to trigger draw.'
      }

      setError(errorMessage || 'Failed to trigger draw')
    } finally {
      setTriggering(false)
    }
  }

  return { 
    triggerDraw, 
    triggering, 
    error, 
    success,
    canTrigger: !!publicKey && !!wallet
  }
}
