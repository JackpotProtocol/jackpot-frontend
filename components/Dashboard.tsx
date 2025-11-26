'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import PoolCard from './PoolCard'
import UserInfo from './UserInfo'

export default function Dashboard() {
  const { publicKey } = useWallet()

  return (
    <div className="space-y-8">
      {/* 资金池信息 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PoolCard 
          title="Weekly pool" 
          poolType="weekly"
          nextDraw="Friday 12:00 UTC"
        />
        <PoolCard 
          title="Monthly pool" 
          poolType="monthly"
          nextDraw="Last Friday of Month"
        />
      </div>

      {/* 用户信息 */}
      {publicKey && <UserInfo publicKey={publicKey} />}

      {/* 协议统计信息 */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Protocol Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-yellow-400">$---</div>
            <div className="text-sm text-gray-400">Total Distributed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">---</div>
            <div className="text-sm text-gray-400">Winners</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">---</div>
            <div className="text-sm text-gray-400">Active Holders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400">10%</div>
            <div className="text-sm text-gray-400">Transaction Tax</div>
          </div>
        </div>
      </div>
    </div>
  )
}
