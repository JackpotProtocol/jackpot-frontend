// components/UserInfo.tsx
'use client'
import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { useUserBalance } from '../hooks/useUserBalance'

interface UserInfoProps {
  publicKey: PublicKey
}

export default function UserInfo({ publicKey }: UserInfoProps) {
  const { userBalance, loading: balanceLoading, error: balanceError } = useUserBalance()
  const [totalSupply, setTotalSupply] = useState(1000000000) // 默认总供应量
  const [loadingSupply, setLoadingSupply] = useState(true)

  // 计算权重和概率
  const userWeight = userBalance // 权重 = 余额
  const winProbability = totalSupply > 0 ? (userBalance / totalSupply) * 100 : 0

  useEffect(() => {
    // 获取总供应量
    const fetchTotalSupply = async () => {
      try {
        // 这里可以添加获取真实总供应量的逻辑
        // 暂时使用固定值
        setTotalSupply(1000000000) // 10亿
      } catch (err) {
        console.error('Error fetching total supply:', err)
      } finally {
        setLoadingSupply(false)
      }
    }

    fetchTotalSupply()
  }, [])

  if (balanceLoading || loadingSupply) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">👤 Your Position</h3>
        <div className="text-center text-gray-400">Loading your data...</div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">👤 Your Position</h3>
     
      {balanceError && (
        <div className="bg-red-900 border border-red-700 rounded-lg p-3 mb-4">
          <p className="text-red-200 text-sm">Balance data unavailable</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {userBalance.toLocaleString()}
          </div>
          <div className="text-gray-400">OPENPOOL Balance</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {userWeight.toLocaleString()}
          </div>
          <div className="text-gray-400">Voting Weight</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-400">
            {winProbability.toFixed(4)}%
          </div>
          <div className="text-gray-400">Win Probability</div>
        </div>
      </div>

      {/* 提示信息 */}
      {userBalance === 0 && (
        <div className="mt-4 p-3 bg-blue-900 border border-blue-700 rounded-lg text-center">
          <p className="text-blue-200 text-sm">
            No OPENPOOL tokens found. Get some tokens to participate!
          </p>
        </div>
      )}
    </div>
  )
}
