// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import ClientWalletProvider from '../components/ClientWalletProvider'
import Navigation from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jackpot Protocol - Perpetual Wealth Aggregator on Solana',
  description: 'The revolutionary wealth distribution protocol on Solana blockchain',
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
          <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
            <Navigation />
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </ClientWalletProvider>
      </body>
    </html>
  )
}
