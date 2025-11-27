'use client';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { JACKPOT_PROTOCOL_ADDRESSES, RPC_URL } from '../config/addresses';

// 加distributor IDL
import jackpotPoolIDL from '../idl/jackpot_pool.json';
import jackpotDistributorIDL from '../idl/jackpot_distributor.json'; // 新加

export function useAnchorProgram(programName: 'harvest' | 'swap' | 'distributor' | 'pool') {
  const wallet = useWallet();
  const connection = useMemo(() => new Connection(RPC_URL, 'confirmed'), []);

  return useMemo(() => {
    if (!wallet.publicKey || !wallet.signTransaction) return null;

    const provider = new AnchorProvider(connection, wallet, { commitment: 'confirmed' });

    let idl: any;
    let programId: string;
    switch (programName) {
      case 'pool':
        idl = jackpotPoolIDL;
        programId = JACKPOT_PROTOCOL_ADDRESSES.POOL_PROGRAM;
        break;
      case 'distributor': // 新加
        idl = jackpotDistributorIDL;
        programId = JACKPOT_PROTOCOL_ADDRESSES.DISTRIBUTOR_PROGRAM;
        break;
      // 加其他如果需要
      default:
        return null;
    }

    return new Program(idl, new PublicKey(programId), provider);
  }, [wallet.publicKey, connection, programName]);
}
