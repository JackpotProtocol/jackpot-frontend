// app/trigger/page.tsx
'use client'
import { useTriggerEligibility } from '../../hooks/useTriggerEligibility'
import { usePoolInfo } from '../../hooks/usePoolInfo'
import { Zap, Trophy, Clock, Target, CheckCircle, Sparkles, Timer, Award } from 'lucide-react'

export default function TriggerPage() {
  const weeklyEligibility = useTriggerEligibility('weekly')
  const monthlyEligibility = useTriggerEligibility('monthly')
  const { poolInfo: weeklyPoolInfo } = usePoolInfo('weekly')
  const { poolInfo: monthlyPoolInfo } = usePoolInfo('monthly')

  const formatUtcDate = (date: Date | null) => {
    if (!date) return 'Schedule not available'
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    }) + ' UTC'
  }

  const formatWindowEnd = (date: Date | null, drawWindow: number) => {
    if (!date || drawWindow <= 0) return 'Schedule not available'
    const end = new Date(date.getTime() + drawWindow * 1000)
    return formatUtcDate(end)
  }

  const formatWindowStatus = (isOpen: boolean, timeUntil: string) => {
    if (isOpen) return 'The trigger window is open. Submit your trigger now.'
    if (timeUntil.includes('Awaiting')) return 'Awaiting the next round.'
    return `The window opens in ${timeUntil}`
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 px-4 py-8">
      {/* Trigger Header */}
      <div className="text-center relative">
        <div className="absolute -top-10 left-1/4 h-40 w-40 bg-walawow-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-1/4 h-32 w-32 bg-walawow-gold/5 rounded-full blur-3xl"></div>
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <Zap className="h-10 w-10 text-walawow-purple-light animate-pulse" />
          <h1 className="title-gradient text-4xl md:text-5xl font-bold">
            Trigger the Surprise Draw
          </h1>
          <Zap className="h-10 w-10 text-walawow-gold animate-pulse" />
        </div>
        <p className="text-xl text-walawow-neutral-text-secondary max-w-3xl mx-auto">
          Be the first to trigger the draw and earn <span className="text-walawow-gold font-semibold">5% of the prize pool</span> as your reward!
        </p>
      </div>

      {/* How Triggering Works */}
      <div className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-purple-dark flex items-center justify-center">
            <Target className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">How Triggering Works</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: <Clock className="h-8 w-8" />,
              title: "Trigger Window",
              description: "Trigger window follows the pool schedule",
              color: "from-walawow-purple/20 to-walawow-purple/5",
              iconColor: "text-walawow-purple-light"
            },
            {
              icon: <Trophy className="h-8 w-8" />,
              title: "Trigger Reward",
              description: "Configured share of the prize pool to the first triggerer",
              color: "from-walawow-gold/20 to-walawow-gold/5",
              iconColor: "text-walawow-gold"
            },
            {
              icon: <Zap className="h-8 w-8" />,
              title: "First Confirmation Wins",
              description: "Fastest valid trigger wins the reward",
              color: "from-walawow-purple/15 to-walawow-gold/10",
              iconColor: "text-walawow-purple-light"
            }
          ].map((item, index) => (
            <div key={index} className="group">
              <div className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 
                group-hover:scale-110 transition-all duration-300 border ${item.iconColor.replace('text', 'border')}/30`}>
                <div className={item.iconColor}>
                  {item.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-walawow-neutral-text-secondary text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trigger Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Weekly Pool */}
        <div className={`glass-card p-8 rounded-3xl border ${weeklyEligibility.isWithinTriggerWindow ? 'border-walawow-gold/50 glow-gold' : 'border-walawow-neutral-border'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 notranslate" translate="no">Weekly Surprise</h3>
              <p className="text-walawow-neutral-text-secondary text-sm">Trigger the weekly draw</p>
            </div>
            <span className="bg-gradient-to-r from-walawow-purple to-walawow-purple-dark text-white px-4 py-2 rounded-full text-sm font-bold">
              Weekly Draw
            </span>
          </div>
          
          <div className="space-y-6">
            {/* Status Display */}
            <div className={`text-center p-5 rounded-2xl ${weeklyEligibility.isWithinTriggerWindow ? 'bg-walawow-gold/10 border border-walawow-gold/30' : 'bg-walawow-purple/10 border border-walawow-purple/30'}`}>
              <div className={`text-3xl font-bold mb-2 ${weeklyEligibility.isWithinTriggerWindow ? 'text-walawow-gold animate-pulse' : 'text-walawow-purple-light'}`}>
                {weeklyEligibility.isWithinTriggerWindow
                  ? '⚡ TRIGGER WINDOW OPEN'
                  : weeklyEligibility.timeUntilTrigger.includes('Awaiting')
                  ? '🌀 WINDOW CLOSED'
                  : '🕒 WINDOW OPENS SOON'}
              </div>
              <div className="text-walawow-neutral-text-secondary">
                {weeklyEligibility.isWithinTriggerWindow 
                  ? 'The trigger window is open. Submit your trigger now.' 
                  : formatWindowStatus(false, weeklyEligibility.timeUntilTrigger)
                }
              </div>
            </div>

            {/* Timing Info */}
            <div className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Timer className="h-5 w-5 text-walawow-neutral-text-secondary" />
                <h4 className="font-semibold text-white">Draw Schedule</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-walawow-neutral-text-secondary">Next Trigger Window:</span>
                  <span className="text-white font-medium">{formatUtcDate(weeklyEligibility.nextTriggerTime)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-walawow-neutral-text-secondary">Window Closes:</span>
                  <span className="text-white font-medium">{formatWindowEnd(weeklyEligibility.nextTriggerTime, weeklyPoolInfo.drawWindow)}</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-walawow-neutral-border/50 text-center">
              <p className="text-sm text-walawow-neutral-text-secondary">
                Triggering is available on the Dashboard during the open window.
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Pool */}
        <div className={`glass-card p-8 rounded-3xl border ${monthlyEligibility.isWithinTriggerWindow ? 'border-walawow-gold/50 glow-gold' : 'border-walawow-neutral-border'} hover:glow-gold`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 notranslate" translate="no">Monthly Spectacular</h3>
              <p className="text-walawow-neutral-text-secondary text-sm">Trigger the monthly draw</p>
            </div>
            <span className="bg-gradient-to-r from-walawow-gold to-walawow-gold-dark text-walawow-neutral-bg px-4 py-2 rounded-full text-sm font-bold">
              Monthly Draw
            </span>
          </div>
          
          <div className="space-y-6">
            {/* Status Display */}
            <div className={`text-center p-5 rounded-2xl ${monthlyEligibility.isWithinTriggerWindow ? 'bg-walawow-gold/10 border border-walawow-gold/30' : 'bg-walawow-purple/10 border border-walawow-purple/30'}`}>
              <div className={`text-3xl font-bold mb-2 ${monthlyEligibility.isWithinTriggerWindow ? 'text-walawow-gold animate-pulse' : 'text-walawow-purple-light'}`}>
                {monthlyEligibility.isWithinTriggerWindow
                  ? '⚡ TRIGGER WINDOW OPEN'
                  : monthlyEligibility.timeUntilTrigger.includes('Awaiting')
                  ? '🌀 WINDOW CLOSED'
                  : '🕒 WINDOW OPENS SOON'}
              </div>
              <div className="text-walawow-neutral-text-secondary">
                {monthlyEligibility.isWithinTriggerWindow 
                  ? 'The monthly trigger window is open. Submit your trigger now.' 
                  : formatWindowStatus(false, monthlyEligibility.timeUntilTrigger)
                }
              </div>
            </div>

            {/* Timing Info */}
            <div className="glass-card p-5 rounded-2xl border border-walawow-neutral-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Timer className="h-5 w-5 text-walawow-neutral-text-secondary" />
                <h4 className="font-semibold text-white">Grand Schedule</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-walawow-neutral-text-secondary">Next Trigger Window:</span>
                  <span className="text-white font-medium">{formatUtcDate(monthlyEligibility.nextTriggerTime)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-walawow-neutral-text-secondary">Window Closes:</span>
                  <span className="text-white font-medium">{formatWindowEnd(monthlyEligibility.nextTriggerTime, monthlyPoolInfo.drawWindow)}</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-walawow-neutral-border/50 text-center">
              <p className="text-sm text-walawow-neutral-text-secondary">
                Triggering is available on the Dashboard during the open window.
              </p>
            </div>
          </div>
        </div>
      </div>

      {weeklyTrigger.success && (
        <div className="glass-card p-6 rounded-3xl border border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-600/10">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <h3 className="text-lg font-semibold text-green-400">Trigger Submitted!</h3>
          </div>
          <p className="text-green-300">
            🎉 Your trigger transaction was submitted successfully. If it was the first confirmed trigger, 
            you'll receive <span className="text-walawow-gold font-bold">the configured share of the prize pool</span> as your reward.
          </p>
        </div>
      )}

      {monthlyTrigger.success && (
        <div className="glass-card p-6 rounded-3xl border border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-600/10">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <h3 className="text-lg font-semibold text-green-400">Trigger Submitted!</h3>
          </div>
          <p className="text-green-300">
            🎉 Your trigger transaction was submitted successfully. If it was the first confirmed trigger, 
            you'll receive <span className="text-walawow-gold font-bold">the configured share of the prize pool</span> as your reward.
          </p>
        </div>
      )}

      {/* Trigger Instructions */}
      <div className="glass-card p-8 rounded-3xl border border-walawow-gold/30 bg-gradient-to-br from-walawow-gold/5 to-walawow-gold/10">
        <div className="flex items-center gap-3 mb-6">
          <Award className="h-8 w-8 text-walawow-gold" />
          <h3 className="text-2xl font-bold text-white">Trigger Guide</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-walawow-gold mb-4">Preparation Steps</h4>
            <ul className="space-y-3">
              {[
                "Connect your wallet before the window opens",
                "Be ready right when the trigger window opens",
                "Use a wallet with a low-latency connection",
                "Consider setting a higher priority fee for faster confirmation"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-walawow-gold mt-2 flex-shrink-0"></div>
                  <span className="text-walawow-neutral-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-walawow-purple-light mb-4">Winning Conditions</h4>
            <ul className="space-y-3">
              {[
                "Only the first confirmed trigger wins the configured reward share",
                "Multiple trigger attempts are allowed but only one can succeed",
                "Network conditions affect confirmation speed",
                "Monitor transaction status on the explorer"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-walawow-purple-light mt-2 flex-shrink-0"></div>
                  <span className="text-walawow-neutral-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="mt-8 pt-6 border-t border-walawow-gold/20 text-center">
          <p className="text-walawow-neutral-text-secondary mb-4">
            Ready to become a top triggerer?
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-walawow-purple/20 to-walawow-gold/20 border border-walawow-purple/30">
            <Zap className="h-5 w-5 text-walawow-gold" />
            <span className="text-white font-semibold">Join the Weekly Trigger Competition</span>
            <Sparkles className="h-5 w-5 text-walawow-purple-light" />
          </div>
        </div>
      </div>
    </div>
  )
}
