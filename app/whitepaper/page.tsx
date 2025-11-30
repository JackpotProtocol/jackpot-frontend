// app/whitepaper/page.tsx
export default function Whitepaper() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          Jackpot Protocol Whitepaper
        </h1>
        <p className="text-xl text-gray-300">
          The Perpetual Wealth Aggregator on Solana
        </p>
      </div>

      {/* Abstract */}
      <section className="bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">1. Abstract: Token Value</h2>
        <div className="text-gray-300 space-y-4">
          <p>
            Jackpot Protocol is not an ordinary Meme token. It is an on-chain wealth aggregation protocol 
            driven by smart contracts on Solana. This is an experiment in on-chain wealth aggregation and 
            redistribution through transaction taxes, featuring an exquisite positive economic cycle that 
            transforms market trading activities into periodic capital gains for token holders.
          </p>
        </div>
      </section>

      {/* Core Vision */}
      <section className="bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">2. Core Vision: From Entertainment to Financial Infrastructure</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1">
              <span className="text-xs font-bold">V1</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-400">Wealth Effect Phase</h3>
              <p className="text-gray-300">
                Ignite market attention through extremely attractive aggregated wealth, establishing strong 
                community consensus and liquidity foundation.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
              <span className="text-xs font-bold">V2</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400">Value Consolidation Phase</h3>
              <p className="text-gray-300">
                Introduce staking dividend system to provide continuous value support and income sources 
                for token, meeting the needs of long-term holders.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
              <span className="text-xs font-bold">V3</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400">Perpetual Protocol Phase</h3>
              <p className="text-gray-300">
                Gradually transfer protocol control rights to the community through DAO, ultimately achieving 
                complete decentralization and unmanned governance, becoming an on-chain eternal wealth creation machine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Economic Model */}
      <section className="bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">3. Economic Model: Perpetual Wealth Circulation Engine</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">3.1 Source of Wealth: Transaction Tax</h3>
          <p className="text-gray-300 mb-4">
            The protocol imposes a 10% transaction tax on all $JACKPOT trades, automatically converted to USDC 
            to ensure value stability and clarity. This tax is the fuel for the protocol's wealth aggregation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-green-400 mb-3">V1 Distribution</h4>
            <div className="space-y-2 text-gray-300">
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
            <h4 className="text-lg font-semibold text-blue-400 mb-3">V2 Distribution</h4>
            <div className="space-y-2 text-gray-300">
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

      {/* Token Information */}
      <section className="bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">3.2 Token Information: Fair Launch</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Basic Information</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Name:</span>
                <span className="font-semibold">$JACKPOT</span>
              </div>
              <div className="flex justify-between">
                <span>Total Supply:</span>
                <span className="font-semibold">1,000,000,000</span>
              </div>
              <div className="flex justify-between">
                <span>Blockchain:</span>
                <span className="font-semibold">Solana</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Distribution</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Initial Liquidity:</span>
                <span className="font-semibold">80%</span>
              </div>
              <div className="flex justify-between">
                <span>Airdrop & Marketing:</span>
                <span className="font-semibold">10%</span>
              </div>
              <div className="flex justify-between">
                <span>Team & Future Development:</span>
                <span className="font-semibold">10%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">5. Roadmap</h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">P1</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">Phase 1: Launch</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Complete smart contract deployment and security audit</li>
                <li>• Fair launch, create initial liquidity and burn LP tokens</li>
                <li>• V1 aggregation pool system online</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">P2</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Phase 2: Development & Consolidation</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Launch staking functionality (V2), share transaction tax dividends</li>
                <li>• Mobile trigger and NFT ecosystem</li>
                <li>• Establish community governance prototype</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">P3</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">Phase 3: Autonomy & Perpetuity</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Launch decentralized autonomous organization (DAO)</li>
                <li>• Gradually transfer smart contract permissions to community</li>
                <li>• Fully host frontend on decentralized network</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-red-900/20 border border-red-700 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">6. Disclaimer & Risk Warning</h2>
        <div className="text-gray-300 space-y-4">
          <p>
            Cryptocurrency investment involves high risks. Jackpot Protocol is an experimental protocol. 
            Users should participate based on their own risk tolerance after fully understanding the 
            project mechanism and risks.
          </p>
          <p className="text-yellow-400 font-semibold">
            🚨 Important: Never invest more than you can afford to lose. The protocol is experimental 
            and carries inherent risks of smart contracts and market volatility.
          </p>
        </div>
      </section>
    </div>
  )
}
