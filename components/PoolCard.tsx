'use client'

interface PoolCardProps {
  title: string
  poolType: 'weekly' | 'monthly'
  nextDraw: string
}

export default function PoolCard({ title, poolType, nextDraw }: PoolCardProps) {
  const poolBalance = 12500
  const totalWinners = 8

  return (
    {/* 修改背景和边框颜色 */}
    <div className="bg-gradient-to-br from-green-800 to-emerald-900 rounded-xl p-6 shadow-lg border border-green-700">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {/* 修改标签颜色 */}
        <div className="text-sm bg-green-500 text-white px-2 py-1 rounded-full">
          {poolType === 'weekly' ? 'Weekly' : 'Monthly'}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          {/* 修改金额颜色 */}
          <div className="text-3xl font-bold text-green-300 mb-2">
            ${poolBalance.toLocaleString()}
          </div>
          <div className="text-green-200 text-sm">Current Prize Pool</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-white">{totalWinners}</div>
            <div className="text-green-200 text-sm">Total Winners</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-white">---</div>
            <div className="text-green-200 text-sm">Your Chance</div>
          </div>
        </div>

        <div className="pt-4 border-t border-green-700">
          <div className="flex justify-between text-sm">
            <span className="text-green-300">Next Draw:</span>
            <span className="text-white">{nextDraw}</span>
          </div>
        </div>

        {/* 修改按钮颜色 */}
        <button 
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          onClick={() => alert('This feature will be implemented soon!')}
        >
          Check Details
        </button>
      </div>
    </div>
  )
}
