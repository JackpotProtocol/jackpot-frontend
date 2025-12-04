// app/winners/page.tsx
'use client'
import { useState } from 'react'
import { Trophy, Crown, Sparkles, Gift, Zap, Users, TrendingUp, Star, Medal, Award, Coins, Calendar } from 'lucide-react'

// Mock data - in real implementation, this would come from on-chain events
const mockWinners = [
  {
    id: 1,
    pool: 'weekly',
    winner: '9xN1DcpQeA3HzShZiiGq7kafuQPzU88gV86bsMo77iwp',
    amount: 125000,
    date: '2024-01-12',
    triggerer: '7s4aBc8dE9fG2hJ3kL5mN6pQ8rS9tU2vW4xY6zA',
    triggerReward: 6250,
    magicalName: 'Sparkling Enchanter'
  },
  {
    id: 2,
    pool: 'weekly',
    winner: '5yM2nB4vC6x8zA1bD3eF5gH7jK9lM2oP4qR6sT8u',
    amount: 98000,
    date: '2024-01-05',
    triggerer: '3wE5rT7yU9iO1pA3sD5fG7hJ9kL2mN4qP6rS8tU',
    triggerReward: 4900,
    magicalName: 'Lucky Star Gazer'
  },
  {
    id: 3,
    pool: 'monthly',
    winner: '2aB4cD6eF8gH0jK2lM4nO6pQ8rS0tU2wX4yZ6aB',
    amount: 450000,
    date: '2023-12-29',
    triggerer: '8dF3gH5jK7lM9oP1qR3sT5uV7wX9yZ1bC3dE5f',
    triggerReward: 22500,
    magicalName: 'Grand Sorcerer'
  },
  {
    id: 4,
    pool: 'weekly',
    winner: '4xK8jH2nM6pR1tV3wY5zA7cE9gH2jL4nP6rT8vX0',
    amount: 156000,
    date: '2023-12-22',
    triggerer: '2fG4hJ6kM8oP0rS2tU4wX6yZ8bC0dE2fG4hJ',
    triggerReward: 7800,
    magicalName: 'Mystical Dreamer'
  },
  {
    id: 5,
    pool: 'monthly',
    winner: '7zA1cD3fG5hJ7kL9nO2pQ4rS6tU8wX0yZ2bD4',
    amount: 520000,
    date: '2023-11-24',
    triggerer: '9qR1sT3uV5wX7yZ9bC1dE3fG5hJ7kL9nO1',
    triggerReward: 26000,
    magicalName: 'Cosmic Weaver'
  }
]

export default function Winners() {
  const [filter, setFilter] = useState<'all' | 'weekly' | 'monthly'>('all')

  const filteredWinners = mockWinners.filter(winner => 
    filter === 'all' || winner.pool === filter
  )

  // Generate a magical color based on wallet address
  const getMagicalColor = (address: string) => {
    const hex = address.slice(2, 8)
    return `#${hex}`
  }

  // Calculate statistics
  const totalWinners = mockWinners.length
  const totalDistributed = mockWinners.reduce((sum, w) => sum + w.amount, 0)
  const totalTriggerRewards = mockWinners.reduce((sum, w) => sum + w.triggerReward, 0)
  const monthlyWinners = mockWinners.filter(w => w.pool === 'monthly').length

  return (
    <div className="max-w-6xl mx-auto space-y-16 px-4 py-8">
      {/* Magical Hall of Fame Header */}
      <div className="text-center relative">
        <div className="absolute -top-12 left-1/4 h-48 w-48 bg-walawow-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute top-8 right-1/4 h-36 w-36 bg-walawow-gold/5 rounded-full blur-3xl"></div>
        
        <div className="flex items-center justify-center gap-4 mb-6">
          <Crown className="h-12 w-12 text-walawow-gold" />
          <h1 className="title-gradient text-5xl md:text-6xl font-bold">
            Hall of Magical Surprises
          </h1>
          <Trophy className="h-12 w-12 text-walawow-purple-light" />
        </div>
        <p className="text-2xl text-walawow-neutral-text-secondary max-w-3xl mx-auto">
          Celebrating the magical explorers who discovered <span className="text-walawow-gold font-semibold">unexpected treasures</span> with Walawow
        </p>
      </div>

      {/* Magical Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            icon: <Trophy className="h-6 w-6" />,
            value: totalWinners.toString(),
            label: "Magical Discoveries",
            color: "from-walawow-purple to-walawow-purple-dark",
            description: "WOW moments created"
          },
          {
            icon: <Coins className="h-6 w-6" />,
            value: `$${totalDistributed.toLocaleString()}`,
            label: "Total Treasure Distributed",
            color: "from-walawow-gold to-walawow-gold-dark",
            description: "In magical surprises"
          },
          {
            icon: <Zap className="h-6 w-6" />,
            value: `$${totalTriggerRewards.toLocaleString()}`,
            label: "Spellcaster Rewards",
            color: "from-walawow-purple-light to-walawow-purple",
            description: "To first spellcasters"
          },
          {
            icon: <Star className="h-6 w-6" />,
            value: monthlyWinners.toString(),
            label: "Grand Sorcerers",
            color: "from-walawow-gold to-walawow-purple-light",
            description: "Monthly spectacular winners"
          }
        ].map((stat, index) => (
          <div key={index} className="glass-card p-6 text-center group hover:scale-[1.02] transition-all duration-300">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
              <div className="text-white">
                {stat.icon}
              </div>
            </div>
            <div className="data-value text-3xl mb-1">{stat.value}</div>
            <div className="data-label mb-2">{stat.label}</div>
            <div className="text-xs text-walawow-neutral-text-secondary">
              {stat.description}
            </div>
          </div>
        ))}
      </div>

      {/* Magical Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { id: 'all', label: 'All Magical Discoveries', icon: Sparkles },
          { id: 'weekly', label: 'Weekly Surprises', icon: Gift },
          { id: 'monthly', label: 'Monthly Spectaculars', icon: Crown }
        ].map((filterOption) => {
          const Icon = filterOption.icon
          return (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
                filter === filterOption.id 
                  ? 'btn-gold shadow-gold' 
                  : 'bg-walawow-neutral-card border border-walawow-neutral-border text-walawow-neutral-text-secondary hover:bg-walawow-purple/10'
              }`}
            >
              <Icon className="h-4 w-4" />
              {filterOption.label}
            </button>
          )
        })}
      </div>

      {/* Winners List */}
      <div className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-gold flex items-center justify-center">
            <Award className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Recent Magical Discoveries</h2>
        </div>
        
        {filteredWinners.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔮</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Magical Discoveries Found</h3>
            <p className="text-walawow-neutral-text-secondary">
              No winners found for the selected magical filter. Try a different filter or check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredWinners.map((winner) => {
              const magicalColor = getMagicalColor(winner.winner)
              return (
                <div key={winner.id} className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50 hover:border-walawow-gold/30 transition-all duration-300 hover:scale-[1.005]">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Winner Identity */}
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
                        style={{ 
                          background: `linear-gradient(135deg, ${magicalColor}30, ${magicalColor}60)`,
                          border: `2px solid ${magicalColor}`
                        }}
                      >
                        <Trophy className="h-8 w-8" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            winner.pool === 'weekly' 
                              ? 'bg-gradient-to-r from-walawow-purple to-walawow-purple-dark text-white' 
                              : 'bg-gradient-to-r from-walawow-gold to-walawow-gold-dark text-walawow-neutral-bg'
                          }`}>
                            {winner.pool === 'weekly' ? '✨ Weekly Surprise' : '👑 Monthly Spectacular'}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-walawow-neutral-text-secondary">
                            <Calendar className="h-3 w-3" />
                            {winner.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{winner.magicalName}</h3>
                        <div className="text-sm font-mono text-walawow-neutral-text-secondary">
                          {winner.winner.slice(0, 8)}...{winner.winner.slice(-8)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Prize Information */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Gift className="h-5 w-5 text-walawow-gold" />
                          <div className="data-value text-2xl">${winner.amount.toLocaleString()}</div>
                        </div>
                        <div className="data-label">Magical Treasure</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Zap className="h-5 w-5 text-walawow-purple-light" />
                          <div className="data-value text-xl">${winner.triggerReward.toLocaleString()}</div>
                        </div>
                        <div className="data-label">Spellcaster's Reward</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spellcaster Info */}
                  <div className="mt-6 pt-6 border-t border-walawow-neutral-border/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-walawow-neutral-text-secondary" />
                        <span className="text-sm text-walawow-neutral-text-secondary">Spell cast by:</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-walawow-gold animate-pulse"></div>
                        <span className="font-mono text-sm text-walawow-gold-light">
                          {winner.triggerer.slice(0, 8)}...{winner.triggerer.slice(-8)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Magical Insights */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-3xl border border-walawow-purple/30">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-8 w-8 text-walawow-purple-light" />
            <h3 className="text-xl font-bold text-white">Magical Statistics</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Average Weekly Surprise", value: "$112,000", change: "+15%" },
              { label: "Largest Single Discovery", value: "$520,000", change: "Grand Sorcerer" },
              { label: "Most Active Spellcaster", value: "3 spells cast", change: "Magical MVP" }
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-walawow-purple/10">
                <span className="text-walawow-neutral-text-secondary">{stat.label}</span>
                <div className="text-right">
                  <div className="font-bold text-white">{stat.value}</div>
                  <div className={`text-xs ${stat.change.includes('+') ? 'text-green-400' : 'text-walawow-gold'}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-walawow-gold/30">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-8 w-8 text-walawow-gold" />
            <h3 className="text-xl font-bold text-white">Community Magic</h3>
          </div>
          <div className="space-y-4">
            {[
              { icon: "🎯", fact: "Every holder is automatically entered into all magical draws" },
              { icon: "⚡", fact: "Spellcasting competitions happen every Friday at 12:00 UTC" },
              { icon: "💫", fact: "The more magic you hold, the higher your chances of discovery" }
            ].map((fact, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-walawow-gold/10">
                <div className="text-2xl">{fact.icon}</div>
                <p className="text-sm text-walawow-neutral-text-secondary">{fact.fact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Magical Call */}
      <div className="text-center py-8">
        <div className="inline-flex flex-col items-center gap-8 p-10 rounded-3xl 
          bg-gradient-to-br from-walawow-purple/20 via-walawow-purple/10 to-walawow-gold/20 
          border border-walawow-purple/30 max-w-2xl">
          <div className="relative">
            <div className="text-6xl animate-float">👑</div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-6 w-6 text-walawow-gold animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Your Magical Moment Awaits!
            </h3>
            <p className="text-walawow-neutral-text-secondary text-lg max-w-xl mx-auto">
              Hold $WALAWOW tokens to automatically enter every magical draw. 
              The more magic you gather, the brighter your chances of discovering <span className="text-walawow-gold font-semibold">unexpected treasures</span>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-gold px-8 py-3">
              <div className="flex items-center gap-2">
                <Medal className="h-5 w-5" />
                Discover Magic Now
              </div>
            </button>
            <button className="btn-outline px-8 py-3">
              Learn Magical Strategies
            </button>
          </div>
          <div className="text-sm text-walawow-neutral-text-secondary">
            Join thousands of magical explorers already in the adventure
          </div>
        </div>
      </div>
    </div>
  )
}
