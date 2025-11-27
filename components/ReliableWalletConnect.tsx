'use client'
import dynamic from 'next/dynamic'
import { useWallet } from '@solana/wallet-adapter-react'
import { useAnchorProgram } from '../hooks/useAnchorProgram'; // 新加这行
import { JACKPOT_PROTOCOL_ADDRESSES } from '../config/addresses'; // 新加这行
import { useState } from 'react'; // 新加这行

// 动态导入官方钱包按钮，确保只在客户端渲染
const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  {
    ssr: false,
    loading: () => (
      <button
        disabled
        className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold opacity-50"
      >
        Loading Wallet...
      </button>
    )
  }
)

export default function ReliableWalletConnect() {
  const { connected, publicKey } = useWallet()
  const program = useAnchorProgram('pool'); // 新加：用pool合约
  const [loading, setLoading] = useState(false); // 新加
  const [error, setError] = useState<string | null>(null); // 新加

  const handleDrawWinner = async () => { // 新加这个函数
    if (!program) return alert('请先连接钱包！');

    setLoading(true);
    setError(null);

    try {
      const tx = await program.methods
        .drawWinner()
        .accounts({
          pool: JACKPOT_PROTOCOL_ADDRESSES.POOL_CONFIG, // 用你的地址
          triggerer: publicKey,
        })
        .rpc();

      alert('触发成功！Tx签名: ' + tx);
    } catch (err: any) {
      console.error(err);
      setError('触发失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {connected && publicKey && (
        <div className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-lg">
          已连接: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </div>
      )}
      <WalletMultiButton
        style={{
          backgroundColor: '#15803d',
          backgroundImage: 'linear-gradient(to right, #111827, #22c55e)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'opacity 0.2s'
        }}
      />
      {/* 新加按钮 */}
      <button
        onClick={handleDrawWinner}
        disabled={loading || !connected}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        {loading ? '触发中...' : '触发开奖 (测试用)'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}
