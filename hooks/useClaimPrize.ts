'use client'

import { useState } from 'react'
import * as anchor from '@coral-xyz/anchor'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import idl from '@/idl/jackpot_pool.json'
import { addresses } from '@/config/addresses'

export function useClaimPrize() {
  const { publicKey, signTransaction, signAllTransactions } = useWallet()
  const { connection } = useConnection()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const claimPrize = async (params: {
    poolPda: PublicKey
    winner: PublicKey
    winnerAmount: bigint
    cumulativeWeight: bigint
    proof: number[][]
    winnerTokenAccount: PublicKey
    triggererTokenAccount: PublicKey
  }) => {
    if (!publicKey) {
      setError('Wallet not connected')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const provider = new anchor.AnchorProvider(
        connection,
        {
          publicKey,
          signTransaction: signTransaction!,
          signAllTransactions: signAllTransactions!
        } as any,
        { commitment: 'confirmed' }
      )

      const program = new anchor.Program(
        idl as any,
        addresses.programs.pool,
        provider
      )

      const tx = await program.methods
        .claimPrize(
          params.winner,
          new anchor.BN(params.winnerAmount.toString()),
          new anchor.BN(params.cumulativeWeight.toString()),
          params.proof
        )
        .accounts({
          pool: params.poolPda,
          poolAuthority: addresses.pdas.poolAuthority,
          vault: addresses.pdas.poolVault,
          usdcMintAccount: addresses.tokens.usdc,
          winnerTokenAccount: params.winnerTokenAccount,
          triggererTokenAccount: params.triggererTokenAccount,
          tokenProgram: addresses.programs.token2022
        })
        .rpc()

      console.log('✅ Claim tx:', tx)
      setSuccess(true)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Claim failed')
    } finally {
      setLoading(false)
    }
  }

  return {
    claimPrize,
    loading,
    error,
    success
  }
}
