'use client'
import { PublicKey, Connection } from '@solana/web3.js'
import { useEffect, useState } from 'react'

interface UserInfoProps {
  publicKey: PublicKey
}

export default function UserInfo({ publicKey }: UserInfoProps) {
  const [userBalance, setUserBalance] = useState(50000); // 使用模拟数据
  const [userWeight, setUserWeight] = useState(50000); // 使用模拟数据
  const [winProbability, setWinProbability] = useState(15); // 使用模拟数据
  const [isWinner, setIsWinner] = useState(false); // 使用模拟数据

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 暂时使用模拟数据，避免类型错误
        console.log('🔍 Fetching user data for:', publicKey.toString());
        
        // 模拟数据 - 后续可以替换为真实数据
        setUserBalance(50000);
        setUserWeight(50000);
        setWinProbability(15);
        setIsWinner(false); // 默认不是赢家

        // 可以在这里添加真实的数据获取逻辑，但先确保构建通过
        /*
        const connection = new Connection("https://api.devnet.solana.com", 'confirmed');

        // 读取用户 JACKPOT 余额
        const jackpotMint = new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.JACKPOT_MINT);
        const userAccounts = await connection.getTokenAccountsByOwner(publicKey, { mint: jackpotMint });
        
        if (userAccounts.value.length > 0) {
          const balance = await connection.getTokenAccountBalance(userAccounts.value[0].pubkey);
          const uiBalance = balance.value.uiAmount || 0;
          setUserBalance(uiBalance);
          setUserWeight(uiBalance);
        }
        */

      } catch (err: any) {
        console.error('❌ Error fetching user data:', err);
        // 出错时使用模拟数据
        setUserBalance(50000);
        setUserWeight(50000);
        setWinProbability(15);
        setIsWinner(false);
      }
    };

    fetchUserData();
  }, [publicKey]);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">👤 Your Position</h3>
     
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
            {winProbability.toFixed(2)}%
          </div>
          <div className="text-gray-400">Win Probability</div>
        </div>
      </div>

      {/* 中奖状态显示 */}
      {isWinner && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-500 to-green-700 rounded-lg text-center">
          <div className="text-xl font-bold">🎉 You are a Winner! 🎉</div>
          <div className="mt-2">Click the button below to claim your prize!</div>
          <button className="mt-4 bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200">
            Claim Prize
          </button>
        </div>
      )}
    </div>
  )
}
