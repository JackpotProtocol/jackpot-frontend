// app/how-it-works/page.tsx
'use client'
import { Zap, Users, Target, Shield, Cpu, GitBranch, Coins, TrendingUp, Lock, Globe, Code, CheckCircle } from 'lucide-react'

export default function HowItWorks() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 px-4 py-8">
      {/* Hero Section - 华丽标题 */}
      <div className="text-center relative">
        <div className="absolute -top-10 left-1/4 h-40 w-40 bg-walawow-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-1/4 h-32 w-32 bg-walawow-gold/5 rounded-full blur-3xl"></div>
        
        <h1 className="title-gradient text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          How WalaWow Works
        </h1>
        <p className="text-xl text-walawow-neutral-text-secondary max-w-3xl mx-auto leading-relaxed">
          Experience the magic of <span className="text-walawow-gold font-semibold">provably fair surprises</span> on Solana. 
          Every interaction holds the potential for a <span className="text-walawow-purple-light font-semibold">WOW moment</span>.
        </p>
      </div>

      {/* Participation Section */}
      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-purple-dark flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">✨ How to Experience the Magic</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Coins className="h-6 w-6" />,
              title: "1. Acquire $WALAWOW",
              description: "Get $WALAWOW tokens from supported decentralized exchanges",
              color: "from-walawow-purple/20 to-walawow-purple/5",
              iconColor: "text-walawow-purple-light"
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: "2. Join the Community",
              description: "Hold tokens in your wallet and become part of our explorer community",
              color: "from-walawow-gold/20 to-walawow-gold/5",
              iconColor: "text-walawow-gold"
            },
            {
              icon: <Target className="h-6 w-6" />,
              title: "3. Automatically Entered",
              description: "You're automatically eligible for all surprise draws - no extra steps needed",
              color: "from-walawow-purple/15 to-walawow-gold/10",
              iconColor: "text-walawow-purple-light"
            }
          ].map((step, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 
                group-hover:scale-110 transition-all duration-300 border ${step.iconColor.replace('text', 'border')}/30`}>
                <div className={step.iconColor}>
                  {step.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-walawow-neutral-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The Magic Flow */}
      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-gold to-walawow-gold-dark flex items-center justify-center">
            <GitBranch className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">The Surprise Mechanism</h2>
        </div>
        
        <div className="space-y-10">
          {[
            {
              step: "1",
              title: "Snapshot & Enchantment",
              icon: <Cpu className="h-5 w-5" />,
              items: [
                "Every Friday UTC 11:00 - Magical snapshot of all token holders",
                "Exclusively includes genuine community explorers",
                "Enchanted Merkle tree built with (address, balance) data",
                "Merkle root sealed on-chain for eternal verification"
              ],
              accent: "purple"
            },
            {
              step: "2",
              title: "Community Spellcasting",
              icon: <Zap className="h-5 w-5" />,
              items: [
                "Every Friday UTC 12:00 - Spellcasting window opens",
                "Any community member can cast the trigger spell",
                "First successful spellcaster earns 5% of the treasure",
                "Powered by Chainlink VRF for provably random magic"
              ],
              accent: "gold"
            },
            {
              step: "3",
              title: "Random Revelation",
              icon: <Target className="h-5 w-5" />,
              items: [
                "Chainlink VRF conjures cryptographically secure randomness",
                "Weighted selection based on your magical contribution",
                "Your chance = Your tokens ÷ Total community tokens",
                "Completely transparent and independently verifiable"
              ],
              accent: "purple"
            },
            {
              step: "4",
              title: "Treasure Distribution",
              icon: <Coins className="h-5 w-5" />,
              items: [
                "Lucky explorer receives 95% of the treasure pool",
                "Spellcaster rewarded with 5% bonus treasure",
                "Automatic USDC transfer to the winner's wallet",
                "Complete magical transaction history preserved on-chain"
              ],
              accent: "gold"
            }
          ].map((section, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-start gap-6 p-6 rounded-2xl 
              ${section.accent === 'purple' ? 'bg-walawow-purple/5' : 'bg-walawow-gold/5'} 
              border ${section.accent === 'purple' ? 'border-walawow-purple/20' : 'border-walawow-gold/20'}`}>
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl 
                ${section.accent === 'purple' ? 
                  'bg-gradient-to-br from-walawow-purple to-walawow-purple-dark' : 
                  'bg-gradient-to-br from-walawow-gold to-walawow-gold-dark'} 
                flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{section.step}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${section.accent === 'purple' ? 'bg-walawow-purple/15' : 'bg-walawow-gold/15'}`}>
                    <div className={section.accent === 'purple' ? 'text-walawow-purple-light' : 'text-walawow-gold'}>
                      {section.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full mt-2 ${section.accent === 'purple' ? 'bg-walawow-purple-light' : 'bg-walawow-gold'}`}></div>
                      <span className="text-walawow-neutral-text-secondary leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Details */}
      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-gold flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Magical Foundations</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-purple/20 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-walawow-purple-light" />
                </div>
                <span className="title-gradient text-lg">Fairness Guarantees</span>
              </h3>
              <ul className="space-y-3">
                {["Chainlink VRF - Provably random magic", "Merkle Proofs - Verifiable participation", 
                  "Weighted Selection - Proportional chances", "Open Source - Fully transparent spells", 
                  "On-chain Verification - No dark arts"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-gold"></div>
                    <span className="text-walawow-neutral-text-secondary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-gold/20 flex items-center justify-center">
                  <Lock className="h-4 w-4 text-walawow-gold" />
                </div>
                <span className="title-gradient text-lg">Security Enchantments</span>
              </h3>
              <ul className="space-y-3">
                {["Solana Program Derived Addresses", "Multi-signature treasury guardians", 
                  "Time-locked administrative spells", "Comprehensive error wards", 
                  "Regular security scroll reviews"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-purple-light"></div>
                    <span className="text-walawow-neutral-text-secondary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Magic Distribution */}
      <section className="glass-card p-8 md:p-10 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple-light to-walawow-gold flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Spell Component Distribution</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-purple/30">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-purple/30 flex items-center justify-center">
                  <span className="text-walawow-purple-light text-sm font-bold">V1</span>
                </div>
                <span className="text-walawow-purple-light">Current Incantation</span>
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Weekly Surprise Pool", value: "35%", color: "bg-walawow-purple" },
                  { label: "Monthly Spectacular", value: "25%", color: "bg-walawow-purple-light" },
                  { label: "Liquidity Enchantment", value: "25%", color: "bg-walawow-purple/70" },
                  { label: "V2 Development Scroll", value: "5%", color: "bg-walawow-gold/80" },
                  { label: "Ecosystem Grimoire", value: "10%", color: "bg-walawow-gold" }
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
            <div className="glass-card p-6 rounded-2xl border border-walawow-gold/30">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-gold/30 flex items-center justify-center">
                  <span className="text-walawow-gold text-sm font-bold">V2</span>
                </div>
                <span className="text-walawow-gold">Future Evolution</span>
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Weekly Surprise Pool", value: "30%", color: "bg-walawow-purple" },
                  { label: "Monthly Spectacular", value: "20%", color: "bg-walawow-purple-light" },
                  { label: "Liquidity Enchantment", value: "20%", color: "bg-walawow-purple/70" },
                  { label: "Staking Rewards", value: "20%", color: "bg-walawow-gold" },
                  { label: "Ecosystem Grimoire", value: "10%", color: "bg-walawow-gold/80" }
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

      {/* Call to Action */}
      <div className="text-center py-8">
        <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl 
          bg-gradient-to-br from-walawow-purple/10 via-walawow-purple/5 to-walawow-gold/10 
          border border-walawow-purple/30 max-w-2xl">
          <div className="text-5xl animate-float">🎁</div>
          <h3 className="text-2xl font-bold text-white">Ready for Your WOW Moment?</h3>
          <p className="text-walawow-neutral-text-secondary">
            Join thousands of explorers already experiencing the magic
          </p>
          <button className="btn-gold px-8 py-3 mt-4">
            Start Exploring Now →
          </button>
        </div>
      </div>
    </div>
  )
}
