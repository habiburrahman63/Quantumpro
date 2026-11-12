import React from 'react';
import { X, CheckCircle2, ExternalLink, ShieldCheck, Wallet, ArrowUpRight, Copy, Check } from 'lucide-react';
import { WalletState } from '../types';
import { formatUsd, formatTokenAmount } from '../utils/ptmMath';
import confetti from 'canvas-confetti';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
}

const WALLET_OPTIONS = [
  {
    id: 'metamask',
    name: 'MetaMask',
    iconBg: '#FFF0E6',
    popular: true,
    desc: 'Connect using browser extension or mobile app',
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    iconBg: '#EBF4FF',
    popular: false,
    desc: 'Self-custody crypto wallet by Coinbase',
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    iconBg: '#EAF8FF',
    popular: true,
    desc: 'Connect with 300+ mobile wallets via QR code',
  },
  {
    id: 'rabby',
    name: 'Rabby Wallet',
    iconBg: '#EFF0FE',
    popular: false,
    desc: 'Game-changing Web3 wallet for DeFi users',
  },
];

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onConnect,
  onDisconnect,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnectWallet = () => {
    onConnect();
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F5BA42', '#FFF3C4', '#D48812'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md p-6 rounded-2xl bg-[#0F1117] border border-[#F5BA42]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,186,66,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#F5BA42]/10 border border-[#F5BA42]/30 text-[#F5BA42]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {wallet.isConnected ? 'Connected Account' : 'Connect a Wallet'}
              </h3>
              <p className="text-xs text-slate-400">
                {wallet.isConnected ? 'Manage your Web3 session' : 'Choose your preferred provider'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {wallet.isConnected ? (
          <div className="py-5 space-y-4">
            {/* Account Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Network</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {wallet.network}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Address</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-white font-medium">
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </span>
                  <button 
                    onClick={handleCopy}
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition"
                    title="Copy address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">Total Balance</span>
                <span className="font-display font-bold text-base text-[#F5BA42]">
                  {formatUsd(wallet.balanceUsd)}
                </span>
              </div>
            </div>

            {/* Token Balances */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-slate-400">PTM Balance</div>
                <div className="font-semibold text-white mt-1">
                  {formatTokenAmount(wallet.ptmBalance)} PTM
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-slate-400">USDT Balance</div>
                <div className="font-semibold text-white mt-1">
                  {formatTokenAmount(wallet.usdtBalance)} USDT
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={onDisconnect}
                className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition"
              >
                Disconnect
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-black bg-[#F5BA42] hover:bg-[#FAD77A] transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-2.5">
            {WALLET_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={handleConnectWallet}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-[#F5BA42]/10 border border-white/5 hover:border-[#F5BA42]/30 transition group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E232E] to-[#12151C] border border-[#F5BA42]/20 flex items-center justify-center font-bold text-sm text-[#F5BA42] shadow-inner">
                    {opt.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-sm text-white group-hover:text-[#F5BA42] transition">
                        {opt.name}
                      </span>
                      {opt.popular && (
                        <span className="text-[10px] font-medium text-[#F5BA42] bg-[#F5BA42]/10 px-1.5 py-0.5 rounded border border-[#F5BA42]/20">
                          Popular
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 block line-clamp-1">
                      {opt.desc}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#F5BA42] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </button>
            ))}

            <div className="pt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#F5BA42]" />
              <span>Audited smart contracts by CertiK & OpenZeppelin</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
