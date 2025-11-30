// app/trigger-script/page.tsx
'use client'
import { useState } from 'react'

export default function TriggerScriptPage() {
  const [copied, setCopied] = useState(false)

  const triggerScriptCode = `#!/usr/bin/env node

/**
 * Jackpot Protocol Draw Trigger Script
 * Fully open-source script for decentralized draw triggering
 * 
 * Usage:
 * 1. Install dependencies: npm install @solana/web3.js @coral-xyz/anchor
 * 2. Configure wallet: Set PRIVATE_KEY environment variable
 * 3. Run script: node trigger-draw.js --pool weekly
 */

const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const { Program, AnchorProvider } = require('@coral-xyz/anchor');

// Configuration
const CONFIG = {
  RPC_URL: 'https://api.devnet.solana.com',
  POOL_PROGRAM: '9F8ezXUnTAKUXqvxSUBwrZqLZuRD96kURp323GHt91hU',
  POOL_WEEKLY: '2wsXkzJtM7wnbotZ2sjNHiQzjSWiVHwqnackGHpWXdVQ',
  POOL_MONTHLY: 'Fy1begTbD5YGKYYouX8KRE2AbWQ5ADSewM1vmRXeHm3N',
};

// IDL (get latest version from the project)
const JACKPOT_POOL_IDL = {
  "version": "0.1.0",
  "name": "jackpot_pool",
  "instructions": [
    {
      "name": "draw_winner",
      "accounts": [
        { "name": "pool", "writable": true },
        { "name": "triggerer", "signer": true }
      ],
      "args": []
    }
  ]
  // Simplified IDL, use full IDL in production
};

class DrawTrigger {
  constructor(privateKey, poolType = 'weekly') {
    this.connection = new Connection(CONFIG.RPC_URL, 'confirmed');
    this.wallet = Keypair.fromSecretKey(Buffer.from(privateKey, 'base64'));
    this.poolType = poolType;
    this.provider = new AnchorProvider(this.connection, {
      publicKey: this.wallet.publicKey,
      signTransaction: async (transaction) => {
        transaction.partialSign(this.wallet);
        return transaction;
      },
      signAllTransactions: async (transactions) => {
        return transactions.map(tx => {
          tx.partialSign(this.wallet);
          return tx;
        });
      }
    }, { commitment: 'confirmed' });
    
    this.program = new Program(
      JACKPOT_POOL_IDL,
      new PublicKey(CONFIG.POOL_PROGRAM),
      this.provider
    );
  }

  async triggerDraw() {
    try {
      console.log('🎯 Starting draw trigger...');
      
      const poolAddress = new PublicKey(
        this.poolType === 'weekly' ? CONFIG.POOL_WEEKLY : CONFIG.POOL_MONTHLY
      );

      console.log('📝 Preparing transaction...');
      console.log('Pool address:', poolAddress.toString());
      console.log('Triggerer:', this.wallet.publicKey.toString());

      // Call draw_winner instruction
      const transaction = await this.program.methods
        .drawWinner()
        .accounts({
          pool: poolAddress,
          triggerer: this.wallet.publicKey,
        })
        .transaction();

      // Set latest blockhash
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = this.wallet.publicKey;

      console.log('🔄 Sending transaction...');

      // Sign and send transaction
      const signedTx = await this.provider.wallet.signTransaction(transaction);
      const signature = await this.connection.sendRawTransaction(signedTx.serialize());

      console.log('⏳ Waiting for confirmation...', signature);

      // Wait for confirmation
      const confirmation = await this.connection.confirmTransaction(signature, 'confirmed');
      
      if (confirmation.value.err) {
        throw new Error('Transaction failed: ' + JSON.stringify(confirmation.value.err));
      }

      console.log('✅ Draw triggered successfully!');
      console.log('Transaction signature:', signature);
      console.log('📊 View transaction: https://explorer.solana.com/tx/' + signature + '?cluster=devnet');
      
      return signature;

    } catch (error) {
      console.error('❌ Trigger failed:', error.message);
      throw error;
    }
  }

  // Check trigger eligibility
  async checkEligibility() {
    const now = new Date();
    const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    
    // Calculate next draw time (Friday 12:00 UTC)
    let nextDrawTime;
    if (this.poolType === 'weekly') {
      nextDrawTime = new Date(utcNow);
      const daysUntilFriday = (5 - nextDrawTime.getDay() + 7) % 7;
      nextDrawTime.setDate(nextDrawTime.getDate() + (daysUntilFriday === 0 ? 7 : daysUntilFriday));
      nextDrawTime.setHours(12, 0, 0, 0);
    } else {
      const nextMonth = new Date(utcNow);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      nextMonth.setDate(0);
      let lastFriday = new Date(nextMonth);
      while (lastFriday.getDay() !== 5) {
        lastFriday.setDate(lastFriday.getDate() - 1);
      }
      lastFriday.setHours(12, 0, 0, 0);
      nextDrawTime = lastFriday;
    }

    const triggerWindowStart = nextDrawTime;
    const triggerWindowEnd = new Date(nextDrawTime.getTime() + 60 * 60 * 1000);

    const isWithinWindow = now >= triggerWindowStart && now <= triggerWindowEnd;
    const timeUntilStart = triggerWindowStart.getTime() - now.getTime();

    return {
      canTrigger: isWithinWindow,
      nextDrawTime,
      triggerWindowStart,
      triggerWindowEnd,
      timeUntilStart: timeUntilStart > 0 ? this.formatTime(timeUntilStart) : '0',
      isWithinWindow
    };
  }

  formatTime(ms) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return \`\${days}d \${hours}h \${minutes}m\`;
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const poolType = args.includes('--pool') ? args[args.indexOf('--pool') + 1] : 'weekly';
  
  if (!process.env.PRIVATE_KEY) {
    console.error('❌ Please set PRIVATE_KEY environment variable');
    console.log('💡 Usage: PRIVATE_KEY=your_base64_private_key node trigger-draw.js --pool weekly');
    process.exit(1);
  }

  const trigger = new DrawTrigger(process.env.PRIVATE_KEY, poolType);
  
  // Check eligibility then trigger
  trigger.checkEligibility()
    .then(eligibility => {
      console.log('📅 Trigger eligibility check:');
      console.log('   Can trigger:', eligibility.canTrigger ? '✅ Yes' : '❌ No');
      console.log('   Next draw time:', eligibility.nextDrawTime.toUTCString());
      console.log('   Trigger window:', eligibility.triggerWindowStart.toUTCString(), 'to', eligibility.triggerWindowEnd.toUTCString());
      
      if (!eligibility.canTrigger) {
        console.log('⏰ Please wait for trigger window to open. Time remaining:', eligibility.timeUntilStart);
        process.exit(0);
      }
      
      console.log('🎯 Trigger window is open! Competing for 5% reward...');
      return trigger.triggerDraw();
    })
    .catch(error => {
      console.error('💥 Script execution failed:', error);
      process.exit(1);
    });
}

module.exports = DrawTrigger;
`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(triggerScriptCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          🔧 Trigger Script Source Code
        </h1>
        <p className="text-xl text-gray-300">
          Fully open-source script for decentralized draw triggering
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">🎯 Decentralized Draw Triggering</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Why Provide Source Code?</h3>
            <ul className="text-gray-300 space-y-2">
              <li>✅ <strong>True Decentralization</strong> - No reliance on project servers</li>
              <li>✅ <strong>Full Transparency</strong> - Open source for review</li>
              <li>✅ <strong>Fair Competition</strong> - Equal opportunity for all users</li>
              <li>✅ <strong>Censorship Resistant</strong> - Cannot be stopped by single entity</li>
              <li>✅ <strong>Community Driven</strong> - Users actively participate in protocol operation</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Reward Mechanism</h3>
            <ul className="text-gray-300 space-y-2">
              <li>🏆 <strong>5% Reward</strong> - To first successful triggerer</li>
              <li>⏰ <strong>Time Window</strong> - Every Friday 12:00-13:00 UTC</li>
              <li>⚡ <strong>Speed Competition</strong> - Fastest confirmed transaction wins</li>
              <li>🔧 <strong>Self-Hosted</strong> - Users control their own nodes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-green-900/20 border border-green-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-green-400 mb-4">🚀 Quick Start</h2>
        <div className="space-y-4">
          <div className="bg-black rounded-lg p-4">
            <code className="text-green-400 text-sm">
              {`# 1. Install dependencies\nnpm install @solana/web3.js @coral-xyz/anchor\n\n# 2. Save script as trigger-draw.js\n# 3. Set private key environment variable\nexport PRIVATE_KEY=your_base64_private_key\n\n# 4. Run script\nnode trigger-draw.js --pool weekly`}
            </code>
          </div>
        </div>
      </div>

      {/* Script Code */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">📜 Trigger Script Source Code</h2>
          <button
            onClick={copyToClipboard}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            {copied ? '✅ Copied!' : '📋 Copy Code'}
          </button>
        </div>
        
        <div className="bg-black rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-sm whitespace-pre-wrap">
            {triggerScriptCode}
          </pre>
        </div>
      </div>

      {/* Advanced Usage */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">⚡ Advanced Usage</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Docker Deployment */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-3">🐳 Docker Deployment</h3>
            <div className="bg-black rounded-lg p-4">
              <code className="text-blue-400 text-sm">
{`# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY trigger-draw.js ./
CMD ["node", "trigger-draw.js", "--pool", "weekly"]`}
              </code>
            </div>
          </div>

          {/* Automation Script */}
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-3">🤖 Automated Execution</h3>
            <div className="bg-black rounded-lg p-4">
              <code className="text-purple-400 text-sm">
{`# Using cron job
# Prepare every Friday at 11:55 UTC
55 11 * * 5 /path/to/trigger-script.sh

# trigger-script.sh
#!/bin/bash
export PRIVATE_KEY=your_key
cd /path/to/script
node trigger-draw.js --pool weekly`}
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notes */}
      <div className="bg-red-900/20 border border-red-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-4">🔒 Security Notes</h2>
        <ul className="text-gray-300 space-y-2">
          <li>⚠️ <strong>Protect Private Key</strong> - Never share your private key</li>
          <li>⚠️ <strong>Environment Variables</strong> - Use env vars for sensitive data</li>
          <li>⚠️ <strong>Verify Code</strong> - Review source code before running</li>
          <li>⚠️ <strong>Isolated Environment</strong> - Run in isolated environment</li>
          <li>⚠️ <strong>Gas Fees</strong> - Have enough SOL for transaction fees</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">❓ Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">How to get private key?</h3>
            <p className="text-gray-300">
              Export private key from your Solana wallet. Important: Keep private key secure, leaking it may result in fund loss.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">How to increase winning chance?</h3>
            <p className="text-gray-300">
              Use low-latency RPC nodes, set higher priority fees, deploy nodes in multiple regions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">What if multiple users trigger simultaneously?</h3>
            <p className="text-gray-300">
              Blockchain confirms the first transaction included in a block. Winner gets 5% reward, other triggerers get no reward but only lose gas fees.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Is there any risk?</h3>
            <p className="text-gray-300">
              Only risk is gas fees if you're not the first triggerer. No risk to your JACKPOT holdings.
            </p>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-blue-900/20 border border-blue-700 rounded-2xl p-6 text-center">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">📥 Download Script</h2>
        <p className="text-gray-300 mb-4">
          Get the complete script file ready to use
        </p>
        <a 
          href="/api/trigger-script" 
          download="jackpot-trigger.js"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors inline-block"
        >
          ⬇️ Download trigger-draw.js
        </a>
      </div>
    </div>
  )
}
