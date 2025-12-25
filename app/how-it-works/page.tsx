// app/how-it-works/page.tsx
import Link from 'next/link'
import { ScrollText, Target, Shield, Rocket } from 'lucide-react'

export default function HowItWorks() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 px-4 py-8">
      <div className="text-center relative">
        <div className="absolute -top-10 left-1/4 h-32 w-32 bg-walawow-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-1/4 h-28 w-28 bg-walawow-gold/5 rounded-full blur-3xl"></div>

        <div className="flex items-center justify-center gap-3 mb-4">
          <ScrollText className="h-10 w-10 text-walawow-purple-light" />
          <h1 className="title-gradient text-4xl md:text-5xl font-bold">
            How It Works
          </h1>
        </div>
        <p className="text-lg text-walawow-neutral-text-secondary max-w-3xl mx-auto">
          This content has been merged into the Whitepaper for a single, complete view of the protocol.
        </p>
      </div>

      <section className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-6 w-6 text-walawow-gold" />
          <h2 className="section-title text-2xl !border-0 !pl-0">Start with the Whitepaper</h2>
        </div>
        <p className="text-walawow-neutral-text-secondary mb-6">
          The Whitepaper now covers participation, economics, draw timing, distribution rules, and technical architecture.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/whitepaper" className="btn-gold px-6 py-3">
            Open Whitepaper →
          </Link>
          <Link href="/draw-logic" className="btn-outline px-6 py-3">
            Draw Logic Details →
          </Link>
        </div>
      </section>

      <section className="glass-card p-8 rounded-3xl border border-walawow-neutral-border">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-6 w-6 text-walawow-purple-light" />
          <h2 className="section-title text-2xl !border-0 !pl-0">Need a Quick Start?</h2>
        </div>
        <ul className="text-walawow-neutral-text-secondary space-y-2">
          <li>Hold $WALAWOW to qualify for draw snapshots.</li>
          <li>Trigger the draw during the on-chain draw window to earn a trigger reward.</li>
          <li>Claim prizes via the official claim flow described in the Whitepaper.</li>
        </ul>
      </section>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-walawow-purple/20 to-walawow-gold/20 border border-walawow-purple/30">
          <Rocket className="h-5 w-5 text-walawow-gold" />
          <span className="text-white font-semibold">Everything in one place, updated regularly.</span>
        </div>
      </div>
    </div>
  )
}
