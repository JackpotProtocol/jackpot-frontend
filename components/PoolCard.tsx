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
    <div className="bg-gradient-to-br from-emerald-800 to-green-900 rounded-xl p-6 shadow-lg border border-emerald-700 green-glow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="text-sm bg-emerald-500 text-white px-2 py-1 rounded-full">
          {poolType === 'weekly' ? 'Weekly' : 'Monthly'}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-3xl font-bold text-emerald-300 mb-2">
            ${poolBalance.toLocaleString()}
          </div>
          <div className="text-emerald-200 text-sm">Current Prize Pool</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-white">{totalWinners}</div>
            <div className="text-emerald-200 text-sm">Total Winners</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-white">---</div>
            <div className="text-emerald-200 text-sm">Your Chance</div>
          </div>
        </div>

        <div className="pt-4 border-t border-emerald-700">
          <div className="flex justify-between text-sm">
            <span className="text-emerald-300">Next Draw:</span>
            <span className="text-white">{nextDraw}</span>
          </div>
        </div>

        <button 
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl hover:translate-y-[-1px]"
          onClick={() => alert('This feature will be implemented soon!')}
        >
          Check Details
        </button>
      </div>
    </div>
  )
}
