import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientWalletProvider from '../components/ClientWalletProvider'
import HydrationFix from '../components/HydrationFix'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jackpot Protocol - The Perpetual Wealth Aggregator on Solana',
  description: 'A smart contract-driven on-chain wealth aggregation protocol on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HydrationFix>
          <ClientWalletProvider>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
              {children}
            </div>
          </ClientWalletProvider>
        </HydrationFix>
      </body>
    </html>
  )
}
