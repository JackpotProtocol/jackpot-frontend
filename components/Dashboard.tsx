'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import PoolCard from './PoolCard'
import UserInfo from './UserInfo'
import { useAnchorProgram } from '../hooks/useAnchorProgram' // 新加
import { JACKPOT_PROTOCOL_ADDRESSES } from '../config/addresses' // 新加
import { useEffect, useState } from 'react' // 新加
import { PublicKey } from '@solana/web3.js' // 新加

export default function Dashboard() {
  const { publicKey } = useWallet()
  const distributorProgram = useAnchorProgram('distributor'); // 新加
  const [totalDistributed, setTotalDistributed] = useState(0); // 链上
  const [winners, setWinners] = useState(0); // 模拟
  const [activeHolders, setActiveHolders] = useState(0); // 模拟
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!distributorProgram) return;

      setLoadingStats(true);

      try {
        const configAddress = new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.DISTRIBUTOR_CONFIG);
        const data = await distributorProgram.account.distributorConfig.fetch(configAddress);
        // Total Distributed近似last distribute total，真实需sum事件
        setTotalDistributed(data.total || 0); // 调整如果有历史sum

        // winners/activeHolders暂模拟
        setWinners(0); // 后面可从pool事件count
        setActiveHolders(0); // 从索引器

      } catch (err) {
        console.error(err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [distributorProgram]);

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
        {loadingStats ? <p>加载统计中...</p> : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-400">${totalDistributed.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Distributed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{winners}</div>
              <div className="text-sm text-gray-400">Winners</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{activeHolders}</div>
              <div className="text-sm text-gray-400">Active Holders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-400">10%</div>
              <div className="text-sm text-gray-400">Transaction Tax</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
