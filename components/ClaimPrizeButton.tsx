'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useClaimPrize } from '@/hooks/useClaimPrize'

interface ClaimPrizeButtonProps {
  poolPda: PublicKey

  // 这些数据你之后会从 snapshot + userInfo 里喂进来
  winner: PublicKey
  winnerAmount: bigint
  cumulativeWeight: bigint
  proof: number[][]

  winnerTokenAccount: PublicKey
  triggererTokenAccount: PublicKey

  // 当前池子状态
  poolState: number // 0 Open | 1 WaitingForVrf | 2 ReadyToClaim
}

export default function ClaimPrizeButton({
  poolPda,
  winner,
  winnerAmount,
  cumulativeWeight,
  proof,
  winnerTokenAccount,
  triggererTokenAccount,
  poolState
}: ClaimPrizeButtonProps) {
  const { publicKey } = useWallet()
  const { claimPrize, loading, error, success } = useClaimPrize()

  const canClaim = publicKey && poolState === 2 // ReadyToClaim

  const handleClaim = async () => {
    if (!canClaim) return

    await claimPrize({
      poolPda,
      winner,
      winnerAmount,
      cumulativeWeight,
      proof,
      winnerTokenAccount,
      triggererTokenAccount
    })
  }

  return (
    <div className="w-full mt-4">
      <button
        onClick={handleClaim}
        disabled={!canClaim || loading}
        className={`w-full py-3 rounded-xl font-bold transition-all ${
          canClaim
            ? 'bg-gradient-to-r from-walawow-gold to-walawow-gold-dark text-black hover:scale-105'
            : 'bg-walawow-neutral-card text-walawow-neutral-text-secondary cursor-not-allowed'
        }`}
      >
        {loading
          ? 'Claiming...'
          : success
          ? '✅ Claimed'
          : canClaim
          ? '🎁 Claim Prize'
          : 'Prize Not Claimable'}
      </button>

      {error && (
        <p className="text-red-400 text-xs mt-2 text-center">{error}</p>
      )}
    </div>
  )
}
