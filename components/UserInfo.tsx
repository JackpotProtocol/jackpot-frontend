'use client'
import { PublicKey, Connection } from '@solana/web3.js'
import { useAnchorProgram } from '../hooks/useAnchorProgram' // 新加
import { JACKPOT_PROTOCOL_ADDRESSES } from '../config/addresses' // 新加
import { useEffect, useState } from 'react' // 新加

interface UserInfoProps {
  publicKey: PublicKey
}

export default function UserInfo({ publicKey }: UserInfoProps) {
  const program = useAnchorProgram('pool'); // 用pool读总权重
  const [userBalance, setUserBalance] = useState(0); // JACKPOT余额
  const [userWeight, setUserWeight] = useState(0); // 同余额
  const [winProbability, setWinProbability] = useState(0); // 概率
  const [isWinner, setIsWinner] = useState(false); // 赢家状态
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const connection = new Connection(JACKPOT_PROTOCOL_ADDRESSES.RPC_URL, 'confirmed');

        // 读用户JACKPOT余额
        const jackpotMint = new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.JACKPOT_MINT);
        const userAccounts = await connection.getTokenAccountsByOwner(publicKey, { mint: jackpotMint });
        const balance = userAccounts.value.length > 0 
          ? await connection.getTokenAccountBalance(userAccounts.value[0].pubkey)
          : { value: { uiAmount: 0 } };
        const uiBalance = balance.value.uiAmount || 0;
        setUserBalance(uiBalance);
        setUserWeight(uiBalance); // 权重=余额

        // 读总供应（mint supply）
        const mintInfo = await connection.getParsedAccountInfo(jackpotMint);
        const totalSupply = (mintInfo.value?.data as any).parsed.info.supply / 10** (mintInfo.value?.data as any).parsed.info.decimals;

        // 概率近似 = 余额 / 总供应
        const prob = totalSupply > 0 ? (uiBalance / totalSupply) * 100 : 0;
        setWinProbability(prob);

        // 赢家状态：检查pool.lastWinner == publicKey (假设weekly)
        if (program) {
          const poolConfig = new PublicKey(JACKPOT_PROTOCOL_ADDRESSES.POOL_WEEKLY); // 或monthly
          const data = await program.account.poolConfig.fetch(poolConfig);
          setIsWinner(data.lastWinner.equals(publicKey));
        } else {
          setIsWinner(false); // 默认
        }

      } catch (err: any) {
        console.error(err);
        setError('加载失败: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [publicKey, program]);

  if (loading) return <div className="bg-gray-800 p-6 rounded-lg">加载中...</div>;
  if (error) return <div className="bg-red-500 p-6 rounded-lg">{error}</div>;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Your Position</h3>
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 持仓信息 */}
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {userBalance.toLocaleString()}
          </div>
          <div className="text-gray-400">OPENPOOL Balance</div>
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
