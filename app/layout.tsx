import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientWalletProvider from '../components/ClientWalletProvider'

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
        <ClientWalletProvider>
          <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900">
            {children}
          </div>
        </ClientWalletProvider>
      </body>
    </html>
  )
}
