// hooks/useDrawTrigger.ts
'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useConnection } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import { WALAWOW_PROTOCOL_ADDRESSES } from '../config/addresses'
import { usePoolProgram } from '../utils/programs'

export function useDrawTrigger() {
  const { connection } = useConnection()
  const { publicKey, wallet } = useWallet()
  const program = usePoolProgram()
  const [triggering, setTriggering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const triggerDraw = async (poolType: 'weekly' | 'monthly') => {
    if (!publicKey || !wallet || !program) {
      setError('Wallet not connected or program not initialized')
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
          ? WALAWOW_PROTOCOL_ADDRESSES.POOL_WEEKLY
          : WALAWOW_PROTOCOL_ADDRESSES.POOL_MONTHLY
      )

      console.log('📝 Preparing draw transaction...')
      console.log('Pool:', poolAddress.toString())
      console.log('Triggerer:', publicKey.toString())

      // 使用 Anchor 调用 draw_winner 指令
      const signature = await program.methods
        .drawWinner()
        .accounts({
          pool: poolAddress,
          triggerer: publicKey,
        })
        .rpc()

      console.log('⏳ Confirming transaction...', signature)

      // 等待确认
      await connection.confirmTransaction(signature, 'confirmed')

      console.log(`✅ ${poolType} draw triggered successfully!`, signature)
      setSuccess(true)

      // 5秒后重置成功状态
      setTimeout(() => setSuccess(false), 5000)

    } catch (err: any) {
      console.error(`❌ Error triggering ${poolType} draw:`, err)
      
      // 提供更友好的错误信息
      let errorMessage = err.message || 'Failed to trigger draw'
      
      // 解析 Anchor 错误
      if (err.error) {
        const errorCode = err.error.errorCode
        if (errorCode) {
          switch (errorCode.code) {
            case 6000:
              errorMessage = 'Not in draw window. Please wait until the scheduled time.'
              break
            case 6001:
              errorMessage = 'Snapshot not available yet. Please wait until the snapshot window.'
              break
            case 6002:
              errorMessage = 'Too early to draw. Please wait until the draw window opens.'
              break
            case 6003:
              errorMessage = 'Pool state does not allow drawing.'
              break
            case 6014:
              errorMessage = 'Unauthorized to trigger draw.'
              break
            case 6015:
              errorMessage = 'Contract is currently paused.'
              break
            default:
              errorMessage = err.error.errorMessage || errorMessage
          }
        }
      }

      // 检查常见错误消息
      if (err.message?.includes('TooEarlyToDraw') || err.message?.includes('NotInDrawWindow')) {
        errorMessage = 'Too early to trigger draw. Please wait until the scheduled time.'
      } else if (err.message?.includes('InvalidState')) {
        errorMessage = 'Pool is not in a state that allows drawing.'
      } else if (err.message?.includes('Paused')) {
        errorMessage = 'Contract is currently paused.'
      } else if (err.message?.includes('Unauthorized')) {
        errorMessage = 'Unauthorized to trigger draw.'
      } else if (err.message?.includes('AlreadyTriggered')) {
        errorMessage = 'Draw already triggered. Please wait for the next cycle.'
      }

      setError(errorMessage)
    } finally {
      setTriggering(false)
    }
  }

  return { 
    triggerDraw, 
    triggering, 
    error, 
    success,
    canTrigger: !!publicKey && !!wallet && !!program
  }
}
