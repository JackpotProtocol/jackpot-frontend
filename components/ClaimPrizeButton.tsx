"use client";

import { PublicKey } from "@solana/web3.js";
import { useClaimPrize } from "@/hooks/useClaimPrize";
import { useState } from "react";

export default function ClaimPrizeButton({
  poolPda,
  snapshot,
}: {
  poolPda: PublicKey;
  snapshot: any;
}) {
  const { claimPrize, loading, tx } = useClaimPrize();
  const [error, setError] = useState<string | null>(null);

  const onClick = async () => {
    try {
      setError(null);
      await claimPrize(poolPda, snapshot);
    } catch (e: any) {
      setError(e.message || "Claim failed");
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={onClick}
        disabled={loading}
        className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
      >
        {loading ? "Claiming..." : "🎉 领取奖励"}
      </button>

      {tx && (
        <div className="mt-2 text-xs text-green-400 break-all">
          Tx: {tx}
        </div>
      )}

      {error && (
        <div className="mt-2 text-xs text-red-500">
          {error}
        </div>
      )}
    </div>
  );
}
