// hooks/usePoolBalance.ts
import { useState, useEffect } from 'react';

export function usePoolBalance(poolType: 'weekly' | 'monthly') {
  const [poolBalance, setPoolBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoolBalance = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 模拟 API 调用或区块链数据获取
        // 这里替换为实际的合约调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模拟数据 - 替换为实际的合约调用
        const mockBalance = poolType === 'weekly' ? 125000 : 480000;
        setPoolBalance(mockBalance);
      } catch (err) {
        console.error('Error fetching pool balance:', err);
        setError('Failed to fetch pool balance');
      } finally {
        setLoading(false);
      }
    };

    fetchPoolBalance();
  }, [poolType]);

  return { poolBalance, loading, error };
}
