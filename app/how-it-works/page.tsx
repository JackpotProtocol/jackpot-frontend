// app/how-it-works/page.tsx
export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          How Jackpot Protocol Works
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          A completely transparent, provably fair wealth distribution mechanism on Solana
        </p>
      </div>

      {/* Participation Section */}
      <section className="bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">🚀 How to Participate</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">1. Acquire $JACKPOT</h3>
            <p className="text-gray-400">Purchase $JACKPOT tokens on supported DEXs</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👛</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">2. Hold in Wallet</h3>
            <p className="text-gray-400">Keep tokens in your non-custodial wallet</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">3. Automatically Entered</h3>
            <p className="text-gray-400">You're automatically entered into all draws</p>
          </div>
        </div>
      </section>

      {/* Draw Mechanism Flow */}
      <section className="bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-8">🔄 The Draw Mechanism</h2>
        
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">1</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Snapshot & Merkle Tree</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Every Friday UTC 11:00 - Blockchain snapshot of all holders</li>
                <li>• Excludes LP pools, CEX addresses, and team wallets</li>
                <li>• Merkle tree built with (address, balance) data</li>
                <li>• Merkle root stored on-chain for verification</li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">2</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Community Trigger</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Every Friday UTC 12:00 - Open for triggering</li>
                <li>• Any user can run open-source trigger script</li>
                <li>• First successful trigger gets 5% of prize pool</li>
                <li>• Uses Chainlink VRF for provable randomness</li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">3</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Random Selection</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Chainlink VRF generates cryptographically secure random number</li>
                <li>• Weighted selection based on token holdings</li>
                <li>• Your probability = Your tokens ÷ Total tokens</li>
                <li>• Completely transparent and verifiable</li>
              </ul>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">4</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Prize Distribution</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Winner receives 95% of prize pool (or 100% if keeper triggered)</li>
                <li>• Triggerer receives 5% bonus</li>
                <li>• Automatic USDC transfer to winner's wallet</li>
                <li>• Full transaction history on-chain</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">🔧 Technical Foundation</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Fairness Guarantees</h3>
            <ul className="text-gray-300 space-y-2">
              <li>✅ Chainlink VRF - Provably random</li>
              <li>✅ Merkle Proofs - Verifiable participation</li>
              <li>✅ Weighted Selection - Proportional chances</li>
              <li>✅ Open Source - Fully transparent</li>
              <li>✅ On-chain Verification - No manipulation</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Security Features</h3>
            <ul className="text-gray-300 space-y-2">
              <li>🔒 Solana Program Derived Addresses</li>
              <li>🔒 Multi-signature treasury management</li>
              <li>🔒 Time-locked administrative functions</li>
              <li>🔒 Comprehensive error handling</li>
              <li>🔒 Regular security audits</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tax Distribution */}
      <section className="bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">📊 Transaction Tax Distribution</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">V1 Distribution (Current)</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Weekly Pool:</span>
                <span className="font-semibold">35%</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Pool:</span>
                <span className="font-semibold">25%</span>
              </div>
              <div className="flex justify-between">
                <span>Liquidity Pool:</span>
                <span className="font-semibold">25%</span>
              </div>
              <div className="flex justify-between">
                <span>V2 Development:</span>
                <span className="font-semibold">5%</span>
              </div>
              <div className="flex justify-between">
                <span>Ecosystem Fund:</span>
                <span className="font-semibold">10%</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">V2 Distribution (Future)</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Weekly Pool:</span>
                <span className="font-semibold">30%</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Pool:</span>
                <span className="font-semibold">20%</span>
              </div>
              <div className="flex justify-between">
                <span>Liquidity Pool:</span>
                <span className="font-semibold">20%</span>
              </div>
              <div className="flex justify-between">
                <span>Staking Rewards:</span>
                <span className="font-semibold">20%</span>
              </div>
              <div className="flex justify-between">
                <span>Ecosystem Fund:</span>
                <span className="font-semibold">10%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
