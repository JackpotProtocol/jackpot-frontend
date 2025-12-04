// app/trigger-script/page.tsx
'use client'
import { useState } from 'react'
import { Code2, Cpu, Zap, Target, BookOpen, Search, Trophy, Globe, Timer, Shield, Rocket } from 'lucide-react'

export default function TriggerScriptPage() {
  const [activeTab, setActiveTab] = useState('instruction')

  const instructionCode = `// Core Spell Casting
const spell = await program.methods
  .castSurpriseSpell()
  .accounts({
    magicPool: poolAddress,      // Weekly or Monthly magic pool address
    spellcaster: publicKey,      // Your wallet public key (the caster)
  })
  .rpc();`

  const poolAddresses = `// Magic Pool Addresses (Magic Testnet)
const WEEKLY_MAGIC_POOL = "2wsXkzJtM7wnbotZ2sjNHiQzjSWiVHwqnackGHpWXdVQ";
const MONTHLY_MAGIC_POOL = "Fy1begTbD5YGKYYouX8KRE2AbWQ5ADSewM1vmRXeHm3N";
const MAGIC_PROGRAM = "9F8ezXUnTAKUXqvxSUBwrZqLZuRD96kURp323GHt91hU";`

  const errorHandling = `// Common Spell Backlash Handling
try {
  await castSpell();
} catch (magicError) {
  if (magicError.message.includes('TooEarlyToCast')) {
    console.log('⏰ Spell timing not yet ready');
  } else if (magicError.message.includes('MagicPoolExhausted')) {
    console.log('💫 Magic pool energy depleted');
  } else if (magicError.message.includes('SpellInterrupted')) {
    console.log('🌀 Spell unexpectedly interrupted');
  }
}`

  const pythonExample = `# Python Spell Example
from solders.pubkey import Pubkey
from anchorpy import Program, Context

async def cast_surprise_spell():
    magic_program = await Program.connect(MAGIC_PROGRAM_ID)
    spell_transaction = await magic_program.rpc["cast_surprise_spell"](
        ctx=Context(
            accounts={
                "magicPool": weekly_magic_pool,
                "spellcaster": wallet.pubkey,
            }
        )
    )
    return spell_transaction`

  const rustExample = `// Rust Spell Example
use anchor_lang::prelude::*;

#[program]
pub mod magic_spellbook {
    use super::*;

    pub fn cast_surprise_spell(ctx: Context<CastSpell>) -> Result<()> {
        let spell_context = CpiContext::new(
            ctx.accounts.magic_program.to_account_info(),
            walawow_magic::cpi::accounts::CastSurpriseSpell {
                magic_pool: ctx.accounts.magic_pool.to_account_info(),
                spellcaster: ctx.accounts.spellcaster.to_account_info(),
            }
        );
        walawow_magic::cpi::cast_surprise_spell(spell_context)?;
        Ok(())
    }
}`

  return (
    <div className="max-w-6xl mx-auto space-y-12 px-4 py-8">
      {/* Magic Header */}
      <div className="text-center relative">
        <div className="absolute -top-8 left-1/3 h-32 w-32 bg-walawow-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute top-4 right-1/3 h-24 w-24 bg-walawow-gold/5 rounded-full blur-3xl"></div>
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <Code2 className="h-10 w-10 text-walawow-purple-light" />
          <h1 className="title-gradient text-4xl md:text-5xl font-bold">
            Magic Spell Integration Guide
          </h1>
          <Cpu className="h-10 w-10 text-walawow-gold" />
        </div>
        <p className="text-xl text-walawow-neutral-text-secondary max-w-3xl mx-auto">
          Build your own surprise trigger spell and compete for <span className="text-walawow-gold font-semibold">5% magic rewards</span>
        </p>
      </div>

      {/* Why Build Your Magic Spell */}
      <div className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-purple-dark flex items-center justify-center">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">✨ Why Build Your Magic Spell?</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-purple/20 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-walawow-purple-light" />
                </div>
                <span className="title-gradient text-lg">Spellcaster Advantages</span>
              </h3>
              <ul className="space-y-3">
                {["Full Control - Customize spells to your needs", "Performance Optimization - Maximize winning chances", 
                  "Learn & Experiment - Deep Solana magic development experience", "Competitive Edge - Unique strategies and optimizations"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-gold mt-2 flex-shrink-0"></div>
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
                  <Trophy className="h-4 w-4 text-walawow-gold" />
                </div>
                <span className="title-gradient text-lg">Reward Opportunities</span>
              </h3>
              <ul className="space-y-3">
                {["5% Magic Reward - First successful spellcaster wins", "Weekly Competition - Every Friday 12:00-13:00 UTC", 
                  "Global Scale - Compete with developers worldwide", "Community Recognition - Earn honors in the Hall of Spellcasters"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-purple-light mt-2 flex-shrink-0"></div>
                    <span className="text-walawow-neutral-text-secondary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Magic Spell Tabs */}
      <div className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-gold flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Magic Spell Guide</h2>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: 'instruction', label: 'Core Spell', icon: Zap },
            { id: 'addresses', label: 'Pool Addresses', icon: Cpu },
            { id: 'errors', label: 'Spell Backlash', icon: Shield },
            { id: 'examples', label: 'Spell Examples', icon: Code2 }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id 
                    ? 'btn-gold shadow-gold' 
                    : 'bg-walawow-neutral-card border border-walawow-neutral-border text-walawow-neutral-text-secondary hover:bg-walawow-purple/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Spell Content Area */}
        <div className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50 bg-gradient-to-br from-walawow-neutral-card to-walawow-neutral-card/50">
          {activeTab === 'instruction' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-5 w-5 text-walawow-purple-light" />
                <h3 className="text-lg font-semibold text-white">Core Spell Call</h3>
              </div>
              <pre className="text-walawow-purple-light text-sm overflow-x-auto p-4 rounded-lg bg-black/50 border border-walawow-purple/30">
                {instructionCode}
              </pre>
              <div className="mt-4 p-4 rounded-lg bg-walawow-purple/10 border border-walawow-purple/20">
                <h4 className="text-walawow-gold-light font-semibold mb-2">Spell Parameters:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-purple-light"></div>
                    <code className="text-sm">magicPool</code>
                    <span className="text-walawow-neutral-text-secondary text-sm">Magic pool address (weekly or monthly)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-gold"></div>
                    <code className="text-sm">spellcaster</code>
                    <span className="text-walawow-neutral-text-secondary text-sm">Your wallet public key (must be transaction signer)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Cpu className="h-5 w-5 text-walawow-purple-light" />
                <h3 className="text-lg font-semibold text-white">Magic Pool Addresses (Magic Testnet)</h3>
              </div>
              <pre className="text-walawow-gold-light text-sm overflow-x-auto p-4 rounded-lg bg-black/50 border border-walawow-gold/30">
                {poolAddresses}
              </pre>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-walawow-purple/10 border border-walawow-purple/20">
                  <div className="text-walawow-gold-light font-semibold">Network</div>
                  <div className="text-walawow-neutral-text-secondary text-sm">Solana Magic Testnet</div>
                </div>
                <div className="p-3 rounded-lg bg-walawow-gold/10 border border-walawow-gold/20">
                  <div className="text-walawow-gold-light font-semibold">RPC Endpoint</div>
                  <div className="text-walawow-neutral-text-secondary text-sm">https://api.devnet.solana.com</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'errors' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-walawow-purple-light" />
                <h3 className="text-lg font-semibold text-white">Common Spell Backlash Handling</h3>
              </div>
              <pre className="text-red-300 text-sm overflow-x-auto p-4 rounded-lg bg-black/50 border border-red-500/30">
                {errorHandling}
              </pre>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { error: "TooEarlyToCast", desc: "Spell cast outside 1-hour magic window", color: "text-yellow-400" },
                  { error: "MagicPoolExhausted", desc: "Magic pool energy depleted", color: "text-red-400" },
                  { error: "SpellInterrupted", desc: "Spell unexpectedly interrupted", color: "text-purple-400" },
                  { error: "UnauthorizedSpell", desc: "Invalid spellcasting permissions", color: "text-blue-400" }
                ].map((err, i) => (
                  <div key={i} className="p-3 rounded-lg bg-walawow-neutral-card border border-walawow-neutral-border">
                    <code className={`text-sm font-mono ${err.color}`}>{err.error}</code>
                    <div className="text-walawow-neutral-text-secondary text-sm mt-1">{err.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400 text-sm font-bold">Py</span>
                  </div>
                  <h4 className="text-md font-semibold text-blue-400">Python Spell Example</h4>
                </div>
                <pre className="text-green-400 text-sm overflow-x-auto p-4 rounded-lg bg-black/50 border border-blue-500/30">
                  {pythonExample}
                </pre>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <span className="text-orange-400 text-sm font-bold">Rs</span>
                  </div>
                  <h4 className="text-md font-semibold text-orange-400">Rust Spell Example</h4>
                </div>
                <pre className="text-yellow-300 text-sm overflow-x-auto p-4 rounded-lg bg-black/50 border border-orange-500/30">
                  {rustExample}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Winning Strategies */}
      <div className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-gold to-walawow-gold-dark flex items-center justify-center">
            <Target className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Winning Strategies</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-purple/20 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-walawow-purple-light" />
                </div>
                <span className="title-gradient text-lg">Technical Optimizations</span>
              </h3>
              <ul className="space-y-3">
                {["Low Latency RPC - Use geographically close RPC endpoints", "Priority Fees - Set higher compute unit price", 
                  "Multi-region Deployment - Deploy spell bots in different regions", "Pre-signed Transactions - Prepare transaction before window opens"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-purple-light mt-2 flex-shrink-0"></div>
                    <span className="text-walawow-neutral-text-secondary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <div className="glass-card p-6 rounded-2xl border border-walawow-neutral-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-walawow-gold/20 flex items-center justify-center">
                  <Timer className="h-4 w-4 text-walawow-gold" />
                </div>
                <span className="title-gradient text-lg">Timing Strategies</span>
              </h3>
              <ul className="space-y-3">
                {["Clock Synchronization - Use NTP for precise timing", "Network Monitoring - Monitor Solana network congestion", 
                  "Retry Logic - Implement smart retry mechanisms", "Block Monitoring - Track latest block hashes"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-walawow-gold mt-2 flex-shrink-0"></div>
                    <span className="text-walawow-neutral-text-secondary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Development Resources */}
      <div className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-walawow-purple to-walawow-purple-dark flex items-center justify-center">
            <Search className="h-5 w-5 text-white" />
          </div>
          <h2 className="section-title text-2xl md:text-3xl !border-0 !pl-0">Magic Scroll Resources</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "📖", title: "Solana Magic Scrolls", desc: "Official Solana documentation", link: "https://docs.solana.com", color: "bg-walawow-purple/20" },
            { icon: "⚓", title: "Anchor Framework", desc: "Solana Sealevel framework", link: "https://www.anchor-lang.com", color: "bg-walawow-gold/20" },
            { icon: "🔍", title: "Magic Explorer", desc: "View contract transactions", link: "https://explorer.solana.com", color: "bg-walawow-purple/20" }
          ].map((resource, index) => (
            <a 
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 text-center group hover:scale-[1.02] transition-all duration-300 border border-walawow-neutral-border/50 hover:border-walawow-purple/50"
            >
              <div className={`w-14 h-14 ${resource.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{resource.icon}</span>
              </div>
              <h3 className="font-semibold text-white mb-2">{resource.title}</h3>
              <p className="text-walawow-neutral-text-secondary text-sm mb-3">{resource.desc}</p>
              <span className="inline-flex items-center gap-1 text-walawow-purple-light text-sm font-medium">
                Visit Scroll <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Spellcaster Community Call */}
      <div className="text-center py-8">
        <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl 
          bg-gradient-to-br from-walawow-purple/15 via-walawow-purple/10 to-walawow-gold/15 
          border border-walawow-purple/30 max-w-2xl">
          <div className="flex items-center justify-center gap-3">
            <Globe className="h-8 w-8 text-walawow-purple-light" />
            <h3 className="text-2xl font-bold text-white">Join the Global Spellcaster Competition</h3>
            <Globe className="h-8 w-8 text-walawow-gold" />
          </div>
          <p className="text-walawow-neutral-text-secondary max-w-xl">
            Build, optimize, and compete with developers worldwide. Share strategies, learn from others, 
            and become part of the decentralized magic spell ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {[
              { label: "🏆 Weekly Competition", color: "bg-walawow-gold/20 text-walawow-gold border-walawow-gold/30" },
              { label: "💰 5% Magic Reward", color: "bg-walawow-purple/20 text-walawow-purple-light border-walawow-purple/30" },
              { label: "🌍 Global Scale", color: "bg-walawow-gold/20 text-walawow-gold border-walawow-gold/30" }
            ].map((badge, i) => (
              <div key={i} className={`px-4 py-2 rounded-lg border ${badge.color}`}>
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
