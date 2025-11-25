'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import PoolCard from './PoolCard'
import UserInfo from './UserInfo'

export default function Dashboard() {
  const { publicKey } = useWallet()

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PoolCard 
          title="Weekly Jackpot" 
          poolType="weekly"
          nextDraw="Friday 12:00 UTC"
        />
        <PoolCard 
          title="Monthly Jackpot" 
          poolType="monthly"
          nextDraw="Last Friday of Month"
        />
      </div>

      {publicKey && <UserInfo publicKey={publicKey} />}

      {/* 协议统计信息 */}
      <div className="bg-emerald-900 bg-opacity-50 rounded-lg p-6 border border-emerald-700">
        <h3 className="text-xl font-bold mb-4 text-emerald-100">📊 Protocol Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-300">$---</div>
            <div className="text-emerald-200 text-sm">Total Distributed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-300">---</div>
            <div className="text-emerald-200 text-sm">Winners</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-300">---</div>
            <div className="text-emerald-200 text-sm">Active Holders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-300">10%</div>
            <div className="text-emerald-200 text-sm">Transaction Tax</div>
          </div>
        </div>
      </div>
    </div>
  )
}
