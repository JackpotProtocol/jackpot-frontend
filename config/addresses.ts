// 从 IDL 导入程序地址
import poolIdl from '../idl/walawow_pool.json'
import distributorIdl from '../idl/walawow_distributor.json'
import harvestIdl from '../idl/walawow_harvest.json'
import swapIdl from '../idl/walawow_swap.json'

export const WALAWOW_PROTOCOL_ADDRESSES = {
  // 程序ID (从 IDL 获取)
  HARVEST_PROGRAM: harvestIdl.address,
  SWAP_PROGRAM: swapIdl.address,
  DISTRIBUTOR_PROGRAM: distributorIdl.address,
  POOL_PROGRAM: poolIdl.address,
 
  // 代币Mint
  WALAWOW_MINT: "2NJNex7ThdND7UaxFrzcYwkmPSzDB8pkUnhmtefMhoRQ",
  USDC_MINT: "6M34eZ2N5WrxCPVE1ayxdqEyqjXyqddSQ5WA88Gv8fhr",
 
  // Harvest合约
  HARVEST_CONFIG: "HkXQFqCE44bYzVT7ZmpPd6pwWoBWFxf88R1uzDMTTuur",
  HARVEST_AUTHORITY: "ERDT2g5DvrgBGL8RvTGTJYvZwPeECmNhQvahaiTZpiyj",
  SWAP_TAX_ACCOUNT: "7sQDtbBmUAknEV5aAWkHNWA5zCp52PdC6yVSfgB6Wtot",
 
  // Swap合约
  SWAP_CONFIG: "6cXShfgVvxm5Hu5qviReAkStSw94kxUZgDX5R7TDXF9F",
  SWAP_AUTHORITY: "DyD4TCu9QkaMUcyEkfnb2t9nxA42p1NLnGuCu4QRYzru",
  SWAP_USDC_VAULT: "9eSN2gHJJrT5b4FiUqYM84UA8TaZLRxX1qceyqaDuqaZ",
 
  // Distributor合约
  DISTRIBUTOR_CONFIG: "HGRGLD6qMEBdqeVBNvxNjfB4BjfjGCFdVCBxVUi1FAwt",
  DISTRIBUTOR_AUTHORITY: "61xj8N3gmo5gHrMV1ZEzPdS3fQipgHjMb7RtyNFapR1s",
  DISTRIBUTOR_VAULT: "322km4dLrB4y6ABFLoy9SwebdnvSjT4QE5ASTjbKu8RA",
 
  // 资金池地址
  POOL_WEEKLY: "FjzkKi1a4p7mHz2msiDDejzrNhsaSbEGGE72PacyRctx",
  POOL_MONTHLY: "26x4erQyZiekCJgZpqh47ngeVhfNjUcEMBq3pEHqgKmJ",
  POOL_STAKING: "4zUgpEHSvcYLnKihYMDARv5rS4NLFxTZxhAQLRkBjonF",
  POOL_LIQUIDITY: "J9Pj7vz29UK5BvNM5bLxrjbVMuhFwijQbWjjbeMnLZuR",
  POOL_TEAM: "eH6frZVeQioT4xcLgpwsg4JWjiBMfQ2vCv41Jxfu7DF",
 
  // Pool合约
  POOL_CONFIG: "bjsM5BL5i7ET9zU1UEhepr6t8xnm3pVm3fnZcm2XEq9",
  POOL_VAULT: "AdLiZUMbaMEB4xpBoceNLbzfChwvDbgDTxe4MdXT5sfc",
  POOL_AUTHORITY: "41KhXosQc9kzAZhtUpgXSwQXFVBqCTQ19YGJNFPkCK5r",
 
  // 管理员地址
  OWNER: "HifRke4NrpDcget6FRwW2aryZDWgdiURVh8ewduaoepx",
  // 添加 RPC_URL
  RPC_URL: "https://api.devnet.solana.com",
} as const;

// 新加：Solana devnet RPC URL
export const RPC_URL = 'https://api.devnet.solana.com';
