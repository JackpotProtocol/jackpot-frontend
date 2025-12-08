// merkle.ts（前端版）

import { PublicKey } from '@solana/web3.js'
import crypto from 'crypto'

export interface Holder {
  pubkey: PublicKey
  amount: bigint
}

export interface MerkleSnapshot {
  root: Buffer
  totalWeight: bigint
  holders: Holder[]
  layers: Buffer[][]
}

// ✅ 生成叶子：SHA256(pubkey || amount_u128_le)
export function leafHash(address: PublicKey, amount: bigint): Buffer {
  const h = crypto.createHash('sha256')
  h.update(address.toBuffer())

  const buf = Buffer.alloc(16)
  buf.writeBigUInt64LE(amount & BigInt('0xffffffffffffffff'), 0)
  buf.writeBigUInt64LE(amount >> BigInt(64), 8)

  h.update(buf)
  return h.digest()
}

// ✅ 生成 Merkle 证明路径
export function generateMerkleProof(
  holder: Holder,
  snapshot: MerkleSnapshot
): Buffer[] {
  const leaf = leafHash(holder.pubkey, holder.amount)

  const proof: Buffer[] = []

  let currentIndex = snapshot.holders.findIndex(
    (h) =>
      h.pubkey.equals(holder.pubkey) &&
      h.amount === holder.amount
  )

  if (currentIndex === -1) {
    throw new Error('Holder not found in snapshot')
  }

  for (let layer = 0; layer < snapshot.layers.length - 1; layer++) {
    const currentLayer = snapshot.layers[layer]
    const siblingIndex =
      currentIndex % 2 === 0
        ? currentIndex + 1
        : currentIndex - 1

    if (siblingIndex < currentLayer.length) {
      proof.push(currentLayer[siblingIndex])
    }

    currentIndex = Math.floor(currentIndex / 2)
  }

  return proof
}
