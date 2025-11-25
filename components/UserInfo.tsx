'use client'

import { PublicKey } from '@solana/web3.js'

interface UserInfoProps {
  publicKey: PublicKey
}

export default function UserInfo({ publicKey }: UserInfoProps) {
  // 模拟用户数据
  const userBalance = 50000 // JACKPOT tokens
  const userWeight = 50000 // 持仓权重
  const winProbability = 0.15 // 15% 获奖概率

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">👤 Your Position</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 持仓信息 */}
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {userBalance.toLocaleString()}
          </div>
          <div className="text-gray-400">JACKPOT Balance</div>
        </div>

        {/* 持仓权重 */}
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {userWeight.toLocaleString()}
          </div>
          <div className="text-gray-400">Voting Weight</div>
        </div>

        {/* 中奖概率 */}
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {(winProbability * 100).toFixed(2)}%
          </div>
          <div className="text-gray-400">Win Probability</div>
        </div>
      </div>

      {/* 中奖状态显示 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500 to-red-500 rounded-lg text-center winner-glow">
        <div className="text-xl font-bold">🎉 You are a Winner! 🎉</div>
        <div className="mt-2">Click the button below to claim your prize!</div>
        <button className="mt-4 bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200">
          Claim Prize
        </button>
      </div>
    </div>
  )
}
