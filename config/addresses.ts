// 从 IDL 导入程序地址
import poolIdl from '../idl/walawow_pool.json'
import distributorIdl from '../idl/walawow_distributor.json'
import harvestIdl from '../idl/walawow_harvest.json'
import swapIdl from '../idl/walawow_swap.json'

/**
 * Walawow Protocol 地址配置
 * ✅ 与当前 devnet 实际部署状态完全一致
 */
export const WALAWOW_PROTOCOL_ADDRESSES = {
  // ==================== 程序 ID ====================
  HARVEST_PROGRAM: harvestIdl.address,        // EGgcfctL62Eaq8kG6T9gPjWSjNktx3edRVXWVm4e7R2r
  SWAP_PROGRAM: swapIdl.address,              // 93gyiehkL4mAQbqJViRWj3eq2FtGusy1SzuGLefNjamZ
  DISTRIBUTOR_PROGRAM: distributorIdl.address,// G9XaeLFJbmjrZUsEoky5YiRG4Fr7j5ZQNernvfrjfX3f
  POOL_PROGRAM: poolIdl.address,              // FJxHKnBz1MrbAE4UB8LFMMniPcELYjvpwLpRaiEDuDjq

  // ==================== Token Mint ====================
  WALAWOW_MINT: "DPuHouX7yJP484mBPuSxwPn9xKZPzUEue37cPbGXpG8D", // Token-2022 (taxed)
  USDC_MINT: "ECjFKugJfzXEbLD3TkkewRAjJs38bssNpXGxEfKfKgHT",    // Token-2022 USDC

  // ==================== Pool PDA ====================
  POOL_WEEKLY: "BVmZXGSPq2z2d6V4n3tMHCi5DkLhZ24gzYRA17zp7EXQ",
  POOL_MONTHLY: "9KFBHKFqe7wiR9MTfizwGT75DrNb7dqUQVeZA1kKXV17",

  // ==================== Distributor PDA ====================
  DISTRIBUTOR_CONFIG: "Cxf2fzY7M7rUuxVyeea6tYMzeskB6NYNmhHtqawzAgvT",
  DISTRIBUTOR_AUTHORITY: "2gZMATJi6k9gNaTxWLarmv5ftoxo5dwgn7b3YSsh8a9d",
  DISTRIBUTOR_VAULT: "2DMad4xrWx5DJn7GVX8AsgAL72rgcP2myqqaDKHYrdBD",

  // Distributor 分配池（USDC vaults）
  DISTRIBUTOR_POOL_WEEKLY_VAULT: "8qvntR8JsWMFB29ya9zN7GhpwLDpMtWe5eQoo3nHmHWG",
  DISTRIBUTOR_POOL_MONTHLY_VAULT: "3rjPZTvFNCFiHNxLjtF9EqqHpD8KAZzaoYXyzFYf9Bpz",
  DISTRIBUTOR_POOL_STAKING_VAULT: "Fm5z6iNzjuCdozMf6MbD337egkcQKg7y9ucYub26spuA",
  DISTRIBUTOR_POOL_LIQUIDITY_VAULT: "93cUizoZA1sCBhL9cJb33dD4z1JzBvYx5j68speQmEhh",
  DISTRIBUTOR_POOL_TEAM_VAULT: "2TXdjfZp9C2yd6oggdC3WmKVaqRadpJopS99nbXLhAxB",

  // ==================== Harvest PDA ====================
  HARVEST_CONFIG: "5YBroUkpWqFyRLiRDpZ5FB3yrmb7RmUE12677yDU8cYG",
  HARVEST_AUTHORITY: "GYraorLj8MkAYZCmuXoQ15Fgd4cdm4enV5X2edHpWnKa",

  // ==================== Swap PDA ====================
  SWAP_CONFIG: "6xdVadzBTnMWNTPEiagdFsLQrEngMYYrjxKu4BcgEcZJ",
  SWAP_AUTHORITY: "6vKksMUCvdvkF8dFrWYJpkhjJSSAJLuNXkDjCsHrj5xB",
  SWAP_TAX_VAULT: "DqiFpRhw3mSf9e7ZGVWS64giHnmWsgzGW5awwypXLdCP", // WALAWOW tax
  SWAP_USDC_VAULT: "24WFYqUAcVbm4pMHBUJp6Ch56ewJ7dp2eq2wqDsEUfjS",

  // ==================== VRF / Keeper ====================
  VRF_COORDINATOR: "HifRke4NrpDcget6FRwW2aryZDWgdiURVh8ewduaoepx",

  // ==================== RPC ====================
  RPC_URL: "https://devnet.helius-rpc.com/?api-key=ea4c9b26-b295-4bcb-bba4-9a1ab1007184",
} as const;

// 向后兼容
export const RPC_URL = WALAWOW_PROTOCOL_ADDRESSES.RPC_URL;
