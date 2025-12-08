'use client'

import { useState } from 'react'
import * as anchor from '@coral-xyz/anchor'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Connection } from '@solana/web3.js'

import idl from '@/idl/jackpot_pool.json'
import { JACKPOT_PROTOCOL_ADDRESSES, RPC_URL } from '@/config/addresses'

interface ClaimPrizeParams {
  winner: string
  winnerAmount: bigint
  cumulativeWeight: bigint
  proof: number[][]
  winnerTokenAccount: string
  triggererTokenAccount: string
}

export function useClaimPrize() {
  const { publicKey, signTransaction } = useWallet()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const claimPrize = async (params: ClaimPrizeParams) => {
    if (!publicKey) {
      setError('Wallet not connected')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const connection = new Connection(RPC_URL, 'confirmed')

      const provider = new anchor.AnchorProvider(
        connection,
        {
          publicKey,
          signTransaction,
          signAllTransactions: async (txs) => txs,
        } as any,
        { commitment: 'confirmed' }
      )

      const program = new anchor.Program(
        idl as anchor.Idl,
        new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.POOL_PROGRAM),
        provider
      )

      const poolPda = new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.POOL_CONFIG)
      const poolAuthority = new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.POOL_AUTHORITY)
      const poolVault = new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.POOL_VAULT)
      const usdcMint = new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.USDC_MINT)

      const tx = await program.methods
        .claimPrize(
          new PublicKey(params.winner),
          new anchor.BN(params.winnerAmount.toString()),
          new anchor.BN(params.cumulativeWeight.toString()),
          params.proof
        )
        .accounts({
          pool: poolPda,
          poolAuthority,
          vault: poolVault,
          usdcMintAccount: usdcMint,
          winnerTokenAccount: new PublicKey(params.winnerTokenAccount),
          triggererTokenAccount: new PublicKey(params.triggererTokenAccount),
          tokenProgram: anchor.utils.token.TOKEN_2022_PROGRAM_ID,
        })
        .rpc()

      console.log('✅ claim_prize tx:', tx)
      setSuccess(true)
    } catch (e: any) {
      console.error(e)
      setError(e.message || 'Claim failed')
    } finally {
      setLoading(false)
    }
  }

  return {
    claimPrize,
    loading,
    error,
    success,
  }
}
