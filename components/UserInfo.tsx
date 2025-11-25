'use client'

import { PublicKey } from '@solana/web3.js'

interface UserInfoProps {
  publicKey: PublicKey
}

export default function UserInfo({ publicKey }: UserInfoProps) {
  const userBalance = 50000
  const userWeight = 50000
  const winProbability = 0.15

  return (
    <div className="bg-emerald-900 bg-opacity-50 rounded-lg p-6 border border-emerald-700">
      <h3 className="text-xl font-bold mb-4 text-emerald-100">👤 Your Position</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-300">
            {userBalance.toLocaleString()}
          </div>
          <div className="text-emerald-200">JACKPOT Balance</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-300">
            {userWeight.toLocaleString()}
          </div>
          <div className="text-emerald-200">Voting Weight</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-300">
            {(winProbability * 100).toFixed(2)}%
          </div>
          <div className="text-emerald-200">Win Probability</div>
        </div>
      </div>

      {/* 中奖状态显示 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg text-center">
        <div className="text-xl font-bold">🎉 You are a Winner! 🎉</div>
        <div className="mt-2 text-emerald-50">Click the button below to claim your prize!</div>
        <button className="mt-4 bg-white text-emerald-700 px-6 py-2 rounded-lg font-bold hover:bg-emerald-50">
          Claim Prize
        </button>
      </div>
    </div>
  )
}
