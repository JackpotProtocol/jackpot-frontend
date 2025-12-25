// app/whitepaper/page.tsx
import Link from 'next/link'
import { ScrollText, Sparkles, Target, TrendingUp, Coins, Globe, Zap, Shield, Users, Rocket, Lock, Gift } from 'lucide-react'

export default function Whitepaper() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 px-4 py-8">
      {/* Protocol Header */}
      <div className="text-center relative">
        <div className="absolute -top-12 left-1/3 h-48 w-48 bg-walawow-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute top-8 right-1/4 h-36 w-36 bg-walawow-gold/5 rounded-full blur-3xl"></div>
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <ScrollText className="h-12 w-12 text-walawow-purple-light" />
          <h1 className="title-gradient text-5xl md:text-6xl font-bold">
            Walawow Protocol Overview
          </h1>
          <Sparkles className="h-12 w-12 text-walawow-gold" />
        </div>
        <p className="text-2xl text-walawow-neutral-text-secondary max-w-3xl mx-auto">
          The Protocol of Surprise & Delight on <span className="text-walawow-purple-light font-semibold">Solana</span>
        </p>
      </div>

      {/* Abstract: Surprise-Driven Protocol */}
      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-purple-dark flex items-center justify-center">
            <Target className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">1. Surprise-Driven Protocol</h2>
        </div>
        
        <div className="text-walawow-neutral-text-secondary space-y-6 text-lg leading-relaxed">
          <p>
            Walawow is not merely another token in the vast crypto cosmos. It is an <span className="text-walawow-gold font-semibold">on-chain surprise protocol</span> 
            powered by smart contracts on Solana. This is an experiment in creating moments of delight through decentralized mechanisms—transforming 
            everyday interactions into periodic surprise outcomes.
          </p>
          <p>
            Unlike traditional financial protocols that focus solely on yield, Walawow introduces the element of <span className="text-walawow-purple-light font-semibold">unexpected joy</span>. 
            Every transaction, every hold, every community interaction carries the potential for a <span className="text-walawow-gold font-semibold">WOW moment</span>.
          </p>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-walawow-purple/10 to-walawow-gold/10 border border-walawow-purple/30">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-6 w-6 text-walawow-gold" />
              <h3 className="text-lg font-semibold text-white">Core Philosophy</h3>
            </div>
            <p className="text-walawow-neutral-text-secondary">
              We believe that decentralized technologies should not only create wealth but also create <span className="text-walawow-gold">joy</span>, 
              foster <span className="text-walawow-purple-light">community</span>, and deliver <span className="text-walawow-gold">surprises</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Protocol Evolution */}
      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-gold to-walawow-gold-dark flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">2. Three-Phase Evolution</h2>
        </div>
        
        <div className="space-y-8">
          {[
            {
              version: "V1",
              title: "Surprise Ignition Phase",
              color: "from-walawow-purple to-walawow-purple-dark",
              icon: <Sparkles className="h-5 w-5" />,
              description: "Ignite community excitement through surprise moments, establishing strong bonds and liquidity foundations through participation rather than pure utility.",
              features: ["Weekly & Monthly Surprise Pools", "Community Trigger Mechanics", "Treasure Accumulation"]
            },
            {
              version: "V2",
              title: "Sustainable Delight Phase",
              color: "from-walawow-gold to-walawow-gold-dark",
              icon: <Coins className="h-5 w-5" />,
              description: "Introduce staking systems to provide continuous rewards and value appreciation, creating sustainable incentives for long-term community members.",
              features: ["Staking Rewards", "Surprise Multiplier Mechanics", "Enhanced Distribution"]
            },
            {
              version: "V3",
              title: "Protocol Autonomy Phase",
              color: "from-walawow-purple-light to-walawow-gold",
              icon: <Globe className="h-5 w-5" />,
              description: "Gradually transfer protocol governance to the community, achieving decentralization and a sustainable surprise ecosystem.",
              features: ["Decentralized Governance", "Fully Community-Owned Protocol", "Self-Sustaining Distribution Mechanism"]
            }
          ].map((phase, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-start gap-6 p-6 rounded-2xl bg-gradient-to-br ${phase.color}/10 border ${phase.color.replace('from-', 'border-')}/30`}>
              <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${phase.color} flex flex-col items-center justify-center`}>
                <div className="text-white font-bold text-xl">{phase.version}</div>
                <div className="text-white/80 text-xs">Phase</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${phase.color}/20`}>
                    <div className="text-white">{phase.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                </div>
                <p className="text-walawow-neutral-text-secondary mb-4 leading-relaxed">
                  {phase.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {phase.features.map((feature, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium bg-walawow-neutral-card border border-walawow-neutral-border text-walawow-neutral-text-secondary">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Protocol Economics */}
      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-gold flex items-center justify-center">
            <Coins className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">3. Protocol Economics</h2>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-walawow-purple/20 flex items-center justify-center">
              <Zap className="h-4 w-4 text-walawow-purple-light" />
            </div>
            <span className="title-gradient text-xl">3.1 Source of Funds: The Transfer Tax</span>
          </h3>
          <p className="text-walawow-neutral-text-secondary text-lg leading-relaxed">
            The protocol applies a 10% transfer tax on all $WALAWOW trades using Token-2022 Transfer Fee. Taxes are harvested on-chain,
            swapped to USDC off-chain, then forwarded to the distributor vault for on-chain allocation across pools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-purple/30 mb-6">
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-purple/30 flex items-center justify-center">
                  <span className="text-walawow-purple-light text-sm font-bold">V1</span>
                </div>
                <span className="text-walawow-purple-light">Current Allocation</span>
              </h4>
              <div className="space-y-4">
                {[
                  { label: "Weekly Surprise Pool", value: "35%", color: "bg-walawow-purple" },
                  { label: "Monthly Spectacular", value: "25%", color: "bg-walawow-purple-light" },
                  { label: "Liquidity Allocation", value: "25%", color: "bg-walawow-purple/70" },
                  { label: "V2 Development", value: "5%", color: "bg-walawow-gold/80" },
                  { label: "Ecosystem Fund", value: "10%", color: "bg-walawow-gold" }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-walawow-neutral-text-secondary">{item.label}</span>
                      <span className="font-semibold text-white">{item.value}</span>
                    </div>
                    <div className="h-2 bg-walawow-neutral-card rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: item.value }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-gold/30 mb-6">
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-gold/30 flex items-center justify-center">
                  <span className="text-walawow-gold text-sm font-bold">V2</span>
                </div>
                <span className="text-walawow-gold">Future Evolution</span>
              </h4>
              <div className="space-y-4">
                {[
                  { label: "Weekly Surprise Pool", value: "30%", color: "bg-walawow-purple" },
                  { label: "Monthly Spectacular", value: "20%", color: "bg-walawow-purple-light" },
                  { label: "Liquidity Allocation", value: "20%", color: "bg-walawow-purple/70" },
                  { label: "Staking Rewards", value: "20%", color: "bg-walawow-gold" },
                  { label: "Ecosystem Fund", value: "10%", color: "bg-walawow-gold/80" }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-walawow-neutral-text-secondary">{item.label}</span>
                      <span className="font-semibold text-white">{item.value}</span>
                    </div>
                    <div className="h-2 bg-walawow-neutral-card rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: item.value }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Token Details */}
      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-gold to-walawow-gold-dark flex items-center justify-center">
            <Gift className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">3.2 Token Details: Fair Launch</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-purple/20 flex items-center justify-center">
                  <ScrollText className="h-4 w-4 text-walawow-purple-light" />
                </div>
                <span className="title-gradient text-lg">Token Properties</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-walawow-purple/10">
                  <span className="text-walawow-neutral-text-secondary">Name:</span>
                  <span className="font-bold text-walawow-purple-light">$WALAWOW</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-walawow-gold/10">
                  <span className="text-walawow-neutral-text-secondary">Standard:</span>
                  <span className="font-bold text-walawow-gold">Token-2022</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-walawow-gold/10">
                  <span className="text-walawow-neutral-text-secondary">Total Supply:</span>
                  <span className="font-bold text-walawow-gold">1,000,000,000</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-walawow-purple/10">
                  <span className="text-walawow-neutral-text-secondary">Blockchain:</span>
                  <span className="font-bold text-walawow-purple-light">Solana</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-gold/20 flex items-center justify-center">
                  <Users className="h-4 w-4 text-walawow-gold" />
                </div>
                <span className="title-gradient text-lg">Community Distribution</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-walawow-neutral-text-secondary">Initial Liquidity:</span>
                    <span className="font-bold text-white">80%</span>
                  </div>
                  <div className="h-2 bg-walawow-neutral-card rounded-full overflow-hidden">
                    <div className="h-full bg-walawow-purple rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-walawow-neutral-text-secondary">Community & Incentives:</span>
                    <span className="font-bold text-white">10%</span>
                  </div>
                  <div className="h-2 bg-walawow-neutral-card rounded-full overflow-hidden">
                    <div className="h-full bg-walawow-gold rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-walawow-neutral-text-secondary">Development:</span>
                    <span className="font-bold text-white">10%</span>
                  </div>
                  <div className="h-2 bg-walawow-neutral-card rounded-full overflow-hidden">
                    <div className="h-full bg-walawow-purple-light rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple-light to-walawow-gold flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">4. Technical Architecture</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-walawow-neutral-text-secondary">
          {[
            {
              title: 'Token (Token-2022 + Transfer Fee)',
              desc: 'Transfer Fee withheld on Token-2022 accounts.'
            },
            {
              title: 'Harvest',
              desc: 'Batch harvests withheld fees to mint and withdraws to swap_tax_vault.'
            },
            {
              title: 'Swap',
              desc: 'Off-chain WALAWOW -> USDC swap; on-chain forward_usdc routes USDC to distributor_vault.'
            },
            {
              title: 'Distributor',
              desc: 'Allocates USDC by BPS into weekly/monthly staging vaults and other pools; releases staging in snapshot window.'
            },
            {
              title: 'Pool',
              desc: 'Handles snapshots, draw window, Switchboard VRF randomness, claim, and unclaimed recycle.'
            },
            {
              title: 'Off-chain Indexer & Keeper',
              desc: 'Builds Merkle snapshots, triggers harvest/swap/distribution, and provides draw fallback.'
            }
          ].map((item, index) => (
            <div key={index} className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
              <div className="font-semibold text-white mb-2">{item.title}</div>
              <div className="text-sm">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-walawow-neutral-text-secondary">
          For a step-by-step breakdown, see{' '}
          <Link href="/draw-logic" className="text-walawow-gold hover:underline">
            开奖逻辑详解
          </Link>
          .
        </div>
      </section>

      {/* Roadmap */}
      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-purple-dark flex items-center justify-center">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">5. Roadmap</h2>
        </div>
        
        <div className="space-y-8">
          {[
            {
              phase: "P1",
              title: "Launch Phase",
              color: "from-walawow-purple to-walawow-purple-dark",
              achievements: [
                "Complete contract deployment and security audits",
                "Fair launch with initial liquidity",
                "V1 surprise pool system goes live"
              ]
            },
            {
              phase: "P2",
              title: "Growth Phase",
              color: "from-walawow-gold to-walawow-gold-dark",
              achievements: [
                "Launch staking with surprise multipliers",
                "Mobile trigger tools and NFT ecosystem",
                "Establish community governance"
              ]
            },
            {
              phase: "P3",
              title: "Protocol Autonomy",
              color: "from-walawow-purple-light to-walawow-gold",
              achievements: [
                "Launch decentralized governance (DAO)",
                "Gradual transfer of governance controls to the community",
                "Host frontend on decentralized networks"
              ]
            }
          ].map((journey, index) => (
            <div key={index} className="flex items-start gap-6">
              <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${journey.color} flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{journey.phase}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">{journey.title}</h3>
                <ul className="space-y-2">
                  {journey.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className={`h-2 w-2 rounded-full mt-2 ${journey.color.includes('purple') ? 'bg-walawow-purple-light' : 'bg-walawow-gold'}`}></div>
                      <span className="text-walawow-neutral-text-secondary">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="glass-card p-8 md:p-10 rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-600/10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">6. Important Risk Warnings</h2>
        </div>
        
        <div className="text-walawow-neutral-text-secondary space-y-6 text-lg leading-relaxed">
          <p>
            Crypto participation involves significant risks. Walawow is an experimental protocol. 
            Community members should participate only after understanding the mechanisms and potential risks.
          </p>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-yellow-400">Critical Risk Notice</h3>
            </div>
            <p className="text-yellow-300 font-semibold">
              🚨 Never invest more than you can afford to lose. The protocol is experimental 
              and carries inherent risks of smart contracts and market volatility.
            </p>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-walawow-neutral-card border border-walawow-neutral-border">
            <Sparkles className="h-5 w-5 text-walawow-purple-light" />
            <p className="text-sm">
              Remember: Value comes from community participation, transparent mechanics, and shared outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call */}
      <div className="text-center py-8">
        <div className="inline-flex flex-col items-center gap-6 p-10 rounded-3xl 
          bg-gradient-to-br from-walawow-purple/20 via-walawow-purple/10 to-walawow-gold/20 
          border border-walawow-purple/30 max-w-2xl">
          <div className="text-6xl animate-float">📜</div>
          <h3 className="text-3xl font-bold text-white">Ready for Surprise Rewards?</h3>
          <p className="text-walawow-neutral-text-secondary text-lg">
            Join the community building transparent, on-chain reward moments together.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button className="btn-gold px-8 py-3">
              Begin Your Journey →
            </button>
            <button className="btn-outline px-8 py-3">
              Read Community Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
