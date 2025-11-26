'use client'

interface PoolCardProps {
  title: string
  poolType: 'weekly' | 'monthly'
  nextDraw: string
}

export default function PoolCard({ title, poolType, nextDraw }: PoolCardProps) {
  // 这里暂时使用模拟数据，后续会连接真实链上数据
  const poolBalance = 12500 // 模拟数据：$12,500
  const totalWinners = 8 // 模拟数据：8位获奖者

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="text-sm bg-green-300 text-black px-2 py-1 rounded-full">
          {poolType === 'weekly' ? 'Weekly' : 'Monthly'}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-3xl font-bold text-yellow-400 mb-2">
            ${poolBalance.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Current Prize Pool</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-white">{totalWinners}</div>
            <div className="text-gray-400 text-sm">Total Winners</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-white">---</div>
            <div className="text-gray-400 text-sm">Your Chance</div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Next Draw:</span>
            <span className="text-white">{nextDraw}</span>
          </div>
        </div>

        <button 
          className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          onClick={() => {
            // 后续这里可以触发开奖或者查看详情
            alert('This feature will be implemented soon!')
          }}
        >
          Check Details
        </button>
      </div>
    </div>
  )
}
