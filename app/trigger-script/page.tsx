// app/trigger-script/page.tsx
'use client'
import { useState } from 'react'

export default function TriggerScriptPage() {
  const [copied, setCopied] = useState(false)

  const triggerScriptCode = `#!/usr/bin/env node

/**
 * Jackpot Protocol Draw Trigger Script
 * 开奖触发脚本 - 让用户自主运行竞争5%奖励
 * 
 * 使用方法:
 * 1. 安装依赖: npm install @solana/web3.js @coral-xyz/anchor
 * 2. 配置钱包: 设置 PRIVATE_KEY 环境变量
 * 3. 运行脚本: node trigger-draw.js --pool weekly
 */

const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const { Program, AnchorProvider } = require('@coral-xyz/anchor');
const { readFileSync } = require('fs');

// 配置信息
const CONFIG = {
  RPC_URL: 'https://api.devnet.solana.com',
  POOL_PROGRAM: '9F8ezXUnTAKUXqvxSUBwrZqLZuRD96kURp323GHt91hU',
  POOL_WEEKLY: '2wsXkzJtM7wnbotZ2sjNHiQzjSWiVHwqnackGHpWXdVQ',
  POOL_MONTHLY: 'Fy1begTbD5YGKYYouX8KRE2AbWQ5ADSewM1vmRXeHm3N',
};

// IDL (从项目获取最新版本)
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
  // 简化的IDL，实际使用时需要完整IDL
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
      console.log('🎯 开始触发开奖...');
      
      const poolAddress = new PublicKey(
        this.poolType === 'weekly' ? CONFIG.POOL_WEEKLY : CONFIG.POOL_MONTHLY
      );

      console.log('📝 准备交易...');
      console.log('池子地址:', poolAddress.toString());
      console.log('触发者:', this.wallet.publicKey.toString());

      // 调用 draw_winner 指令
      const transaction = await this.program.methods
        .drawWinner()
        .accounts({
          pool: poolAddress,
          triggerer: this.wallet.publicKey,
        })
        .transaction();

      // 设置最新区块哈希
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = this.wallet.publicKey;

      console.log('🔄 发送交易...');

      // 签名并发送交易
      const signedTx = await this.provider.wallet.signTransaction(transaction);
      const signature = await this.connection.sendRawTransaction(signedTx.serialize());

      console.log('⏳ 等待确认...', signature);

      // 等待确认
      const confirmation = await this.connection.confirmTransaction(signature, 'confirmed');
      
      if (confirmation.value.err) {
        throw new Error('交易失败: ' + JSON.stringify(confirmation.value.err));
      }

      console.log('✅ 开奖触发成功!');
      console.log('交易签名:', signature);
      console.log('📊 查看交易: https://explorer.solana.com/tx/' + signature + '?cluster=devnet');
      
      return signature;

    } catch (error) {
      console.error('❌ 触发失败:', error.message);
      throw error;
    }
  }

  // 检查触发资格
  async checkEligibility() {
    const now = new Date();
    const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    
    // 计算下一次开奖时间（周五 UTC 12:00）
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

// 命令行界面
if (require.main === module) {
  const args = process.argv.slice(2);
  const poolType = args.includes('--pool') ? args[args.indexOf('--pool') + 1] : 'weekly';
  
  if (!process.env.PRIVATE_KEY) {
    console.error('❌ 请设置 PRIVATE_KEY 环境变量');
    console.log('💡 使用方法: PRIVATE_KEY=your_base64_private_key node trigger-draw.js --pool weekly');
    process.exit(1);
  }

  const trigger = new DrawTrigger(process.env.PRIVATE_KEY, poolType);
  
  // 检查资格然后触发
  trigger.checkEligibility()
    .then(eligibility => {
      console.log('📅 触发资格检查:');
      console.log('   是否可以触发:', eligibility.canTrigger ? '✅ 是' : '❌ 否');
      console.log('   下次开奖时间:', eligibility.nextDrawTime.toUTCString());
      console.log('   触发窗口:', eligibility.triggerWindowStart.toUTCString(), '到', eligibility.triggerWindowEnd.toUTCString());
      
      if (!eligibility.canTrigger) {
        console.log('⏰ 请等待触发窗口开启，剩余时间:', eligibility.timeUntilStart);
        process.exit(0);
      }
      
      console.log('🎯 触发窗口已开启，开始竞争5%奖励...');
      return trigger.triggerDraw();
    })
    .catch(error => {
      console.error('💥 脚本执行失败:', error);
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
      console.error('复制失败:', err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          🔧 开奖触发脚本
        </h1>
        <p className="text-xl text-gray-300">
          完全开源的触发脚本 - 让用户自主运行竞争5%奖励
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">🎯 去中心化开奖触发</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">为什么提供源代码？</h3>
            <ul className="text-gray-300 space-y-2">
              <li>✅ <strong>真正的去中心化</strong> - 不依赖项目方服务器</li>
              <li>✅ <strong>完全透明</strong> - 代码开源可审查</li>
              <li>✅ <strong>公平竞争</strong> - 所有用户平等机会</li>
              <li>✅ <strong>抗审查</strong> - 无法被单一实体阻止</li>
              <li>✅ <strong>社区驱动</strong> - 用户主动参与协议运行</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">奖励机制</h3>
            <ul className="text-gray-300 space-y-2">
              <li>🏆 <strong>5% 奖励</strong> - 给第一个成功触发者</li>
              <li>⏰ <strong>时间窗口</strong> - 每周五 12:00-13:00 UTC</li>
              <li>⚡ <strong>速度竞争</strong> - 最快确认的交易获胜</li>
              <li>🔧 <strong>自主运行</strong> - 用户控制自己的节点</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-green-900/20 border border-green-700 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-green-400 mb-4">🚀 快速开始</h2>
        <div className="space-y-4">
          <div className="bg-black rounded-lg p-4">
            <code className="text-green-400 text-sm">
              {`# 1. 安装依赖\nnpm install @solana/web3.js @coral-xyz/anchor\n\n# 2. 保存脚本为 trigger-draw.js\n# 3. 设置私钥环境变量\nexport PRIVATE_KEY=your_base64_private_key\n\n# 4. 运行脚本\nnode trigger-draw.js --pool weekly`}
            </code>
          </div>
        </div>
      </div>

      {/* Script Code */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">📜 触发脚本源代码</h2>
          <button
            onClick={copyToClipboard}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            {copied ? '✅ 已复制!' : '📋 复制代码'}
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
        <h2 className="text-2xl font-bold text-white mb-4">⚡ 高级用法</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Docker 部署 */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-3">🐳 Docker 部署</h3>
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

          {/* 自动化脚本 */}
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-3">🤖 自动化运行</h3>
            <div className="bg-black rounded-lg p-4">
              <code className="text-purple-400 text-sm">
{`# 使用 cron 定时任务
# 每周五 11:55 UTC 开始准备
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
        <h2 className="text-2xl font-bold text-red-400 mb-4">🔒 安全注意事项</h2>
        <ul className="text-gray-300 space-y-2">
          <li>⚠️ <strong>保护私钥</strong> - 永远不要分享你的私钥</li>
          <li>⚠️ <strong>环境变量</strong> - 使用环境变量存储敏感信息</li>
          <li>⚠️ <strong>验证代码</strong> - 运行前审查源代码</li>
          <li>⚠️ <strong>独立环境</strong> - 在隔离环境中运行</li>
          <li>⚠️ <strong>Gas 费用</strong> - 准备足够的 SOL 支付交易费</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">❓ 常见问题</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">如何获取私钥？</h3>
            <p className="text-gray-300">
              从你的 Solana 钱包导出私钥。注意：私钥必须保密，泄露会导致资金损失。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">如何提高获胜几率？</h3>
            <p className="text-gray-300">
              使用低延迟的 RPC 节点、设置更高的优先费、在多个地区部署节点。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">如果多人同时触发？</h3>
            <p className="text-gray-300">
              区块链会确认第一个被打包的交易。获胜者获得 5% 奖励，其他触发者不会获得奖励但也不会损失资金（除了 Gas 费）。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
