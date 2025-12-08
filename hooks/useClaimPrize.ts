import { useCallback, useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

import poolIdl from "@/idl/jackpot_pool.json"; // 你的 walawow_pool idl
import { ADDRESSES } from "@/config/addresses";
import { generateMerkleProof } from '../merkle';

export function useClaimPrize() {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState<string | null>(null);

  const claimPrize = useCallback(
    async (poolPda: PublicKey, snapshot: any) => {
      if (!wallet) throw new Error("Wallet not connected");

      try {
        setLoading(true);

        const provider = new anchor.AnchorProvider(connection, wallet, {
          commitment: "confirmed",
        });

        const program = new anchor.Program(
          poolIdl as any,
          ADDRESSES.POOL_PROGRAM_ID,
          provider
        );

        // ✅ 1️⃣ 取 pool 状态
        const poolAccount: any = await program.account.poolConfig.fetch(poolPda);

        const winner = poolAccount.lastWinner;
        const winningIndex = poolAccount.lastWinningIndex.toString();

        // ✅ 2️⃣ 找到快照中对应的 holder
        const holder = snapshot.holders.find((h: any) =>
          new PublicKey(h.pubkey).equals(new PublicKey(winner))
        );

        if (!holder) {
          throw new Error("你不是本轮的中奖者");
        }

        // ✅ 3️⃣ 生成 Merkle Proof
        const proof = generateMerkleProof(holder, snapshot);

        // ✅ 4️⃣ 推导你的 USDC 账户
        const winnerTokenAccount = holder.usdcAccount; // 你前端已有用户 USDC 账户
        const triggererTokenAccount = holder.usdcAccount; // 若你是触发者，也用这个账户

        const poolAuthority = PublicKey.findProgramAddressSync(
          [Buffer.from("pool-authority"), poolPda.toBuffer()],
          ADDRESSES.POOL_PROGRAM_ID
        )[0];

        const vault = PublicKey.findProgramAddressSync(
          [Buffer.from("pool-vault"), poolPda.toBuffer()],
          ADDRESSES.POOL_PROGRAM_ID
        )[0];

        // ✅ 5️⃣ 发起 claim_prize 交易
        const sig = await program.methods
          .claimPrize(
            new PublicKey(holder.pubkey),
            new anchor.BN(holder.amount.toString()),
            new anchor.BN(holder.cumulativeWeightUntil.toString()),
            proof
          )
          .accounts({
            pool: poolPda,
            poolAuthority,
            vault,
            usdcMintAccount: poolAccount.usdcMint,
            winnerTokenAccount,
            triggererTokenAccount,
            tokenProgram: TOKEN_2022_PROGRAM_ID,
          })
          .rpc();

        setTx(sig);
        return sig;
      } finally {
        setLoading(false);
      }
    },
    [wallet, connection]
  );

  return {
    claimPrize,
    loading,
    tx,
  };
}
