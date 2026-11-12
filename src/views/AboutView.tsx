import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  ShieldCheck, 
  Coins, 
  PieChart, 
  Layers, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  Cpu, 
  TrendingUp, 
  Activity, 
  Flame 
} from 'lucide-react';
import { calculateStakingRewards, formatTokenAmount, formatUsd } from '../utils/ptmMath';

interface AboutViewProps {
  onNavigate: (page: PageId) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const [selectedTokenTab, setSelectedTokenTab] = useState<'distribution' | 'utility' | 'vesting'>('distribution');

  const tokenomicsData = [
    { name: 'Community & Liquidity Mining', percent: 40, tokens: 400_000_000, color: '#F5BA42', vest: 'Emitted over 48 months' },
    { name: 'Protocol Treasury & Reserves', percent: 20, tokens: 200_000_000, color: '#D48812', vest: 'DAO governed, multi-sig' },
    { name: 'Core Contributors & Team', percent: 15, tokens: 150_000_000, color: '#E5A93C', vest: '12-mo cliff, 36-mo linear vest' },
    { name: 'Ecosystem & Grants Fund', percent: 15, tokens: 150_000_000, color: '#8A5104', vest: 'Released per milestone roadmap' },
    { name: 'Public Sale & Community Bootstrapping', percent: 10, tokens: 100_000_000, color: '#FFE082', vest: '100% unlocked at TGE' },
  ];

  return (
    <div className="w-full space-y-24 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header / Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full gold-badge text-xs font-semibold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          <span>Architecture & Core Foundation</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          Architected for Precision, Engineered for Scale
        </h1>
        <p className="text-base text-slate-300 leading-relaxed font-light">
          PTM Protocol introduces an institutional-grade liquidity aggregation layer that decouples capital efficiency from market volatility through automated algorithmic market making.
        </p>
      </div>

      {/* SECTION 1: LIQUIDITY ENGINE (Split Row) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#F5BA42] tracking-wider uppercase">
            <span>01 • High-Throughput Matching</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            Decentralized Liquidity Engine
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Standard decentralized exchanges suffer from fragmented liquidity pools and excessive slippage during market turbulence. PTM resolves this by pooling depth dynamically across concentrated ticks and routing trades via optimal sub-second pathways.
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center gap-2 font-display font-semibold text-white text-sm">
                <Activity className="w-4 h-4 text-[#F5BA42]" />
                <span>Dynamic Slip-Curve Optimization</span>
              </div>
              <p className="text-xs text-slate-400">
                Adjusts spread algorithms in real-time based on order volatility, protecting liquidity providers from impermanent loss.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center gap-2 font-display font-semibold text-white text-sm">
                <TrendingUp className="w-4 h-4 text-[#F5BA42]" />
                <span>Multi-Hop Order Aggregation</span>
              </div>
              <p className="text-xs text-slate-400">
                Routes high-volume orders across multiple Layer-2 liquidity sources with atomic transaction execution.
              </p>
            </div>
          </div>
        </div>

        {/* Right 3D Orb / Token Graphic */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-3xl dark-glass-card p-8 flex flex-col items-center justify-center text-center border border-[#F5BA42]/30 shadow-[0_0_40px_rgba(245,186,66,0.15)] group">
            <div className="absolute inset-0 bg-radial from-[#F5BA42]/20 via-transparent to-transparent blur-2xl" />

            {/* Glowing 3D Gold Coin Sculpture */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_10px_25px_rgba(245,186,66,0.4)]">
                <defs>
                  <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF9E6" />
                    <stop offset="35%" stopColor="#F5BA42" />
                    <stop offset="75%" stopColor="#C48216" />
                    <stop offset="100%" stopColor="#5C3402" />
                  </linearGradient>
                  <radialGradient id="coinRim" cx="50%" cy="50%" r="50%">
                    <stop offset="85%" stopColor="#F5BA42" />
                    <stop offset="100%" stopColor="#9C5D08" />
                  </radialGradient>
                </defs>
                <circle cx="80" cy="80" r="70" fill="url(#coinGrad)" stroke="#FFF" strokeWidth="1.5" />
                <circle cx="80" cy="80" r="62" fill="#141820" stroke="url(#coinGrad)" strokeWidth="2" />
                <polygon points="80,35 115,55 115,105 80,125 45,105 45,55" fill="none" stroke="url(#coinGrad)" strokeWidth="2" />
                <text x="80" y="88" textAnchor="middle" fill="url(#coinGrad)" fontSize="28" fontWeight="800" fontFamily="sans-serif">
                  PTM
                </text>
              </svg>
            </div>

            <div className="font-display font-bold text-lg text-white">
              Native Liquidity Core
            </div>
            <div className="text-xs text-slate-400 mt-1">
              1,000,000,000 Fixed Token Supply
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TOKENOMICS & ALLOCATION (Inverted Split) */}
      <section className="p-8 sm:p-12 rounded-3xl dark-glass-card border border-[#F5BA42]/20 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs font-semibold text-[#F5BA42] tracking-wider uppercase mb-1">
              02 • Economic Architecture
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              $PTM Token Distribution & Utility
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              100% non-inflationary fixed supply. All platform fees, governance rights, and staking incentives derive from sustainable protocol usage.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 rounded-xl bg-black/40 border border-white/10">
            <button
              onClick={() => setSelectedTokenTab('distribution')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedTokenTab === 'distribution'
                  ? 'bg-[#F5BA42] text-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Distribution
            </button>
            <button
              onClick={() => setSelectedTokenTab('utility')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedTokenTab === 'utility'
                  ? 'bg-[#F5BA42] text-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Utility Pillars
            </button>
          </div>
        </div>

        {selectedTokenTab === 'distribution' ? (
          <div className="space-y-6">
            {/* Visual Bar Spectrum */}
            <div className="w-full h-4 rounded-full bg-white/5 overflow-hidden flex shadow-inner">
              {tokenomicsData.map((item) => (
                <div
                  key={item.name}
                  style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  title={`${item.name}: ${item.percent}%`}
                  className="h-full hover:opacity-85 transition-opacity"
                />
              ))}
            </div>

            {/* Allocation Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {tokenomicsData.map((item) => (
                <div
                  key={item.name}
                  className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-[#F5BA42]/30 transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-display font-semibold text-white text-sm">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-display font-bold text-base text-[#F5BA42]">
                      {item.percent}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-white/5">
                    <span>Allocation</span>
                    <span className="font-mono text-white font-medium">
                      {formatTokenAmount(item.tokens, 0)} PTM
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 italic">
                    Vesting: {item.vest}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <Coins className="w-6 h-6 text-[#F5BA42]" />
              <h4 className="font-display font-bold text-white text-base">Fee Sharing</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                100% of trading protocol fees are converted to PTM and distributed automatically to stakers in real time.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#F5BA42]" />
              <h4 className="font-display font-bold text-white text-base">DAO Governance</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vote on protocol upgrades, fee switches, liquidity pool incentives, and treasury deployments.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <Flame className="w-6 h-6 text-[#F5BA42]" />
              <h4 className="font-display font-bold text-white text-base">Deflationary Burn</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A fraction of liquidation penalties and bridge fees are burned permanently, reducing circulating supply.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <Lock className="w-6 h-6 text-[#F5BA42]" />
              <h4 className="font-display font-bold text-white text-base">Vault Priority</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stakers get tier-based access to high-yield alpha vaults and private syndicate liquidity pools.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 3: MULTI-TIER SECURITY */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
          <div className="p-6 rounded-2xl dark-glass-card border border-emerald-500/20 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-base">CertiK Security Verified</div>
                <div className="text-xs text-emerald-400">Formal Verification Completed • Score: 98/100</div>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Zero critical or high vulnerabilities identified in smart contract execution and vault logic.
            </p>
          </div>

          <div className="p-6 rounded-2xl dark-glass-card border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#F5BA42]/10 text-[#F5BA42]">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-base">Gnosis Safe 4/7 Multi-Sig</div>
                <div className="text-xs text-slate-400">Time-locked 48-Hour Delay on Upgrades</div>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Treasury contracts and parameter adjustments require distributed multisig approval across independent validators.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
          <div className="text-xs font-semibold text-[#F5BA42] tracking-wider uppercase">
            03 • Defense in Depth
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            Security-First Architectural Posture
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            We operate with the assumption that smart contracts will face adversarial market conditions. Every vault, router, and governance mechanism undergoes continuous automated verification and real-time on-chain risk monitoring.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('app')}
              className="px-6 py-3 rounded-xl gold-btn-gradient text-sm font-bold flex items-center gap-2"
            >
              <span>Trade with Verified Security</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('roadmap')}
              className="px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 text-sm font-semibold transition"
            >
              <span>View Security Roadmap</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
