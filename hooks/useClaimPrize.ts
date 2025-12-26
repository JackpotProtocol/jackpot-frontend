// hooks/useClaimPrize.ts
'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useConnection } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import { WALAWOW_PROTOCOL_ADDRESSES } from '../config/addresses'
import { usePoolProgram } from '../utils/programs'
import { getPoolAuthorityPDA, getPoolVaultPDA } from '../utils/programs'
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from '@solana/spl-token'
import BN from 'bn.js'

export interface ClaimPrizeParams {
  poolType: 'weekly' | 'monthly'
  winner: PublicKey
  winnerLeafAmount: bigint | number
  cumulativeWeightUntil: bigint | number
  proof: Uint8Array[] | Buffer[]
}

export function useClaimPrize() {
  const { connection } = useConnection()
  const { publicKey, wallet } = useWallet()
  const program = usePoolProgram()
  const [claiming, setClaiming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const claimPrize = async (params: ClaimPrizeParams) => {
    if (!publicKey || !wallet || !program) {
      setError('Wallet not connected or program not initialized')
      return
    }

    setClaiming(true)
    setError(null)
    setSuccess(false)

    try {
      console.log(`🎁 Claiming prize for ${params.poolType} pool...`)

      // 获取池地址
      const poolAddress = new PublicKey(
        params.poolType === 'weekly' 
          ? WALAWOW_PROTOCOL_ADDRESSES.POOL_WEEKLY
          : WALAWOW_PROTOCOL_ADDRESSES.POOL_MONTHLY
      )

      // 计算 PDAs
      const [poolAuthorityPDA] = getPoolAuthorityPDA(poolAddress)
      const [vaultPDA] = getPoolVaultPDA(poolAddress)

      const poolAccount = await (program.account as any).poolConfig.fetch(poolAddress) as any
      const lastTriggerer: PublicKey | undefined = poolAccount?.lastTriggerer

      // 获取 USDC mint
      const usdcMint = new PublicKey(WALAWOW_PROTOCOL_ADDRESSES.USDC_MINT)

      // 获取或创建 winner 的 USDC token account
      const winnerTokenAccount = getAssociatedTokenAddressSync(
        usdcMint,
        params.winner
      )

      // 获取或创建 triggerer 的 USDC token account (如果 last_triggerer 不是 default)
      let triggererTokenAccount = winnerTokenAccount
      if (lastTriggerer && !lastTriggerer.equals(PublicKey.default)) {
        triggererTokenAccount = getAssociatedTokenAddressSync(
          usdcMint,
          lastTriggerer,
          true
        )
      }

      console.log('📝 Preparing claim transaction...')
      console.log('Pool:', poolAddress.toString())
      console.log('Winner:', params.winner.toString())
      console.log('Vault:', vaultPDA.toString())

      const winnerLeafAmount = new BN(params.winnerLeafAmount.toString())
      const cumulativeWeightUntil = new BN(params.cumulativeWeightUntil.toString())

      // 使用 Anchor 调用 claim_prize 指令
      const signature = await program.methods
        .claimPrize(
          params.winner,
          winnerLeafAmount,
          cumulativeWeightUntil,
          params.proof
        )
        .accounts({
          pool: poolAddress,
          poolAuthority: poolAuthorityPDA,
          vault: vaultPDA,
          usdcMintAccount: usdcMint,
          winnerTokenAccount: winnerTokenAccount,
          triggererTokenAccount: triggererTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc()

      console.log('⏳ Confirming transaction...', signature)

      // 等待确认
      await connection.confirmTransaction(signature, 'confirmed')

      console.log(`✅ Prize claimed successfully!`, signature)
      setSuccess(true)

      // 5秒后重置成功状态
      setTimeout(() => setSuccess(false), 5000)

    } catch (err: any) {
      console.error(`❌ Error claiming prize:`, err)
      
      // 提供更友好的错误信息
      let errorMessage = err.message || 'Failed to claim prize'
      
      // 解析 Anchor 错误
      if (err.error) {
        const errorCode = err.error.errorCode
        if (errorCode) {
          switch (errorCode.code) {
            case 6003:
            case 6004:
              errorMessage = 'Invalid Merkle proof. Please verify your proof is correct.'
              break
            case 6007:
              errorMessage = 'Vault is empty. No prize available.'
              break
            case 6012:
              errorMessage = 'Sorry, you are not the winner for this round.'
              break
            case 6010:
              errorMessage = 'Unauthorized to claim this prize.'
              break
            default:
              errorMessage = err.error.errorMessage || errorMessage
          }
        }
      }

      // 检查常见错误消息
      if (err.message?.includes('InvalidMerkleProof') || err.message?.includes('InvalidMerkleRoot')) {
        errorMessage = 'Invalid Merkle proof. Please verify your proof is correct.'
      } else if (err.message?.includes('EmptyVault')) {
        errorMessage = 'Vault is empty. No prize available.'
      } else if (err.message?.includes('NotWinner')) {
        errorMessage = 'Sorry, you are not the winner for this round.'
      } else if (err.message?.includes('Unauthorized')) {
        errorMessage = 'Unauthorized to claim this prize.'
      }

      setError(errorMessage)
    } finally {
      setClaiming(false)
    }
  }

  return { 
    claimPrize, 
    claiming, 
    error, 
    success,
    canClaim: !!publicKey && !!wallet && !!program
  }
}
