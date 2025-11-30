// app/api/trigger-script/route.ts
export async function GET() {
  const scriptCode = `#!/usr/bin/env node
/**
 * Jackpot Protocol Draw Trigger Script
 * 完全开源的去中心化开奖触发脚本
 */

const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const { Program, AnchorProvider } = require('@coral-xyz/anchor');

// 配置 - 更新为最新的合约地址
const CONFIG = {
  RPC_URL: 'https://api.devnet.solana.com',
  POOL_PROGRAM: '9F8ezXUnTAKUXqvxSUBwrZqLZuRD96kURp323GHt91hU',
  POOL_WEEKLY: '2wsXkzJtM7wnbotZ2sjNHiQzjSWiVHwqnackGHpWXdVQ',
  POOL_MONTHLY: 'Fy1begTbD5YGKYYouX8KRE2AbWQ5ADSewM1vmRXeHm3N',
};

class DrawTrigger {
  constructor(privateKey, poolType = 'weekly') {
    this.connection = new Connection(CONFIG.RPC_URL, 'confirmed');
    this.wallet = Keypair.fromSecretKey(Buffer.from(privateKey, 'base64'));
    this.poolType = poolType;
    // ... 完整代码
  }

  // ... 完整的方法实现
}

// 使用示例
if (require.main === module) {
  // 从环境变量获取私钥
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    console.error('请设置 PRIVATE_KEY 环境变量');
    process.exit(1);
  }
  
  const trigger = new DrawTrigger(privateKey, 'weekly');
  trigger.triggerDraw().catch(console.error);
}

module.exports = DrawTrigger;`

  return new Response(scriptCode, {
    headers: {
      'Content-Type': 'application/javascript',
      'Content-Disposition': 'attachment; filename="jackpot-trigger.js"'
    }
  })
}
