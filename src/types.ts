export type PageId = 'home' | 'about' | 'roadmap' | 'app' | 'figma-artboards';

export interface WalletState {
  isConnected: boolean;
  address: string;
  network: string;
  balanceUsd: number;
  ptmBalance: number;
  usdtBalance: number;
  ethBalance: number;
}

export interface TransactionRecord {
  id: string;
  type: 'SWAP' | 'STAKE' | 'CLAIM' | 'UNSTAKE';
  description: string;
  amount: string;
  valueUsd: number;
  timestamp: string;
  status: 'Completed' | 'Pending';
  txHash: string;
}

export interface ChartDataPoint {
  time: string;
  price: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  close: number;
}
