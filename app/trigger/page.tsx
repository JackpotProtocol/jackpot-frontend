// app/trigger/page.tsx
'use client'
import { useDrawTrigger } from '../../hooks/useDrawTrigger'
import { useTriggerEligibility } from '../../hooks/useTriggerEligibility'
import { useWallet } from '@solana/wallet-adapter-react'

export default function TriggerPage() {
  const { publicKey } = useWallet()
  const weeklyEligibility = useTriggerEligibility('weekly')
  const monthlyEligibility = useTriggerEligibility('monthly')
  const { triggerDraw, triggering, error, success } = useDrawTrigger()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          🎯 Trigger Jackpot Draw
        </h1>
        <p className="text-xl text-gray-300">
          Be the first to trigger the draw and earn 5% of the prize pool!
        </p>
      </div>

      {/* How it Works */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">How Triggering Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="font-semibold mb-2">Timing</h3>
            <p className="text-gray-400 text-sm">Every Friday 12:00-13:00 UTC</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="font-semibold mb-2">Reward</h3>
            <p className="text-gray-400 text-sm">5% of prize pool to first trigger</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold mb-2">Speed</h3>
            <p className="text-gray-400 text-sm">Fastest transaction wins</p>
          </div>
        </div>
      </div>

      {/* Trigger Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Weekly Pool Trigger */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Weekly Jackpot</h3>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              Weekly
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-2">
                {weeklyEligibility.isWithinTriggerWindow ? 'OPEN' : 'CLOSED'}
              </div>
              <div className="text-gray-400 text-sm">
                {weeklyEligibility.isWithinTriggerWindow 
                  ? 'Trigger window is open!' 
                  : `Opens in ${weeklyEligibility.timeUntilTrigger}`
                }
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Next Trigger:</span>
                <span className="text-white">Friday 12:00 UTC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Window Closes:</span>
                <span className="text-white">Friday 13:00 UTC</span>
              </div>
            </div>

            <button
              onClick={() => triggerDraw('weekly')}
              disabled={!publicKey || triggering || !weeklyEligibility.isWithinTriggerWindow}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                !publicKey || triggering || !weeklyEligibility.isWithinTriggerWindow
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
              }`}
            >
              {triggering ? 'Triggering...' : 'Trigger Weekly Draw'}
            </button>
          </div>
        </div>

        {/* Monthly Pool Trigger */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Monthly Jackpot</h3>
            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
              Monthly
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-2">
                {monthlyEligibility.isWithinTriggerWindow ? 'OPEN' : 'CLOSED'}
              </div>
              <div className="text-gray-400 text-sm">
                {monthlyEligibility.isWithinTriggerWindow 
                  ? 'Trigger window is open!' 
                  : `Opens in ${monthlyEligibility.timeUntilTrigger}`
                }
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Next Trigger:</span>
                <span className="text-white">Last Friday 12:00 UTC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Window Closes:</span>
                <span className="text-white">Last Friday 13:00 UTC</span>
              </div>
            </div>

            <button
              onClick={() => triggerDraw('monthly')}
              disabled={!publicKey || triggering || !monthlyEligibility.isWithinTriggerWindow}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                !publicKey || triggering || !monthlyEligibility.isWithinTriggerWindow
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
              }`}
            >
              {triggering ? 'Triggering...' : 'Trigger Monthly Draw'}
            </button>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="bg-red-900 border border-red-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-2">Error</h3>
          <p className="text-red-200">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-900 border border-green-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-2">Success!</h3>
          <p className="text-green-200">
            🎉 Draw triggered successfully! If your transaction was the first to be confirmed, 
            you'll receive 5% of the prize pool as a reward.
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-yellow-900/20 border border-yellow-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-yellow-400 mb-4">Trigger Instructions</h3>
        <ul className="text-gray-300 space-y-2">
          <li>• Connect your wallet before the trigger window opens</li>
          <li>• Be ready exactly at 12:00 UTC Friday</li>
          <li>• Use a wallet with low latency connection</li>
          <li>• Consider setting higher priority fee for faster confirmation</li>
          <li>• Only the first confirmed transaction wins the 5% reward</li>
        </ul>
      </div>
    </div>
  )
}
