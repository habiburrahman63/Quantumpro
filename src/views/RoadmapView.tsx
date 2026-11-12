import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  CircleDot, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Layers, 
  Zap,
  ChevronRight
} from 'lucide-react';

interface RoadmapViewProps {
  onNavigate: (page: PageId) => void;
}

interface MilestonePhase {
  phase: string;
  quarter: string;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  progress: number;
  items: { text: string; done: boolean; tag?: string }[];
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'All' | 'Completed' | 'In Progress' | 'Upcoming'>('All');

  const phases: MilestonePhase[] = [
    {
      phase: 'Phase 01',
      quarter: 'Genesis • Q1-Q2',
      title: 'Protocol Inception & Security Audits',
      description: 'Foundational smart contract architecture, rigorous mathematical testing, and security verification.',
      status: 'Completed',
      progress: 100,
      items: [
        { text: 'Core PTM AMM & Routing Contract Architecture', done: true },
        { text: 'CertiK Formal Verification & Comprehensive Audit (Score: 98/100)', done: true, tag: 'CertiK' },
        { text: 'Multi-Sig Gnosis Treasury Setup (4/7 Distributed Keys)', done: true },
        { text: 'Seed Liquidity Bootstrapping & Whitelist Phase', done: true },
      ],
    },
    {
      phase: 'Phase 02',
      quarter: 'Mainnet Alpha • Q3-Q4',
      title: 'Automated Vaults & Staking Engine',
      description: 'Mainnet deployment on Arbitrum One with automated yield-generating algorithmic vaults.',
      status: 'Completed',
      progress: 100,
      items: [
        { text: 'Mainnet Deployment on Arbitrum One L2', done: true },
        { text: 'Concentrated Liquidity Auto-Compounding Vaults Launch', done: true },
        { text: 'Dynamic Staking Multipliers (Up to 3.5x for 365 Days)', done: true },
        { text: 'Surpassed $250M Total Value Locked milestone', done: true, tag: 'Milestone' },
      ],
    },
    {
      phase: 'Phase 03',
      quarter: 'Scale & Governance • Active',
      title: 'Liquidity Expansion & DAO Portal',
      description: 'Decentralized autonomous governance rollout, institutional API connectivity, and cross-margin perps.',
      status: 'In Progress',
      progress: 75,
      items: [
        { text: 'DAO Governance Portal with on-chain Snapshot voting', done: true },
        { text: 'Cross-Margin Perpetuals Testnet with 50x leverage', done: true, tag: 'Testnet' },
        { text: 'Institutional WebSocket feeds and sub-millisecond API', done: false },
        { text: 'Base and Optimism Superchain multi-network deployment', done: false },
      ],
    },
    {
      phase: 'Phase 04',
      quarter: 'Q3-Q4 Horizon',
      title: 'ZK-Rollup & Autonomous Trading Bots',
      description: 'Layer-2 Zero Knowledge execution layer and programmatic execution strategies.',
      status: 'Upcoming',
      progress: 20,
      items: [
        { text: 'Native PTM Zero-Knowledge Rollup testnet for zero-gas swaps', done: false },
        { text: 'Algorithmic Vault Bot Marketplace for strategy creators', done: false, tag: 'Alpha' },
        { text: 'Mobile Application release for iOS and Android', done: false },
        { text: 'Cross-Chain Liquidity Syndication with Solana and Avalanche', done: false },
      ],
    },
    {
      phase: 'Phase 05',
      quarter: 'Future Horizon',
      title: 'Decentralized Sovereign Liquidity Layer',
      description: 'Autonomous financial infrastructure serving global institutional capital.',
      status: 'Upcoming',
      progress: 0,
      items: [
        { text: 'Decentralized Prime Brokerage with under-collateralized credit', done: false },
        { text: 'Algorithmic Stability Reserve for foreign exchange swaps', done: false },
        { text: 'Permissionless Multi-Chain Liquidity Mesh', done: false },
      ],
    },
  ];

  const filteredPhases = phases.filter((p) => {
    if (filter === 'All') return true;
    return p.status === filter;
  });

  return (
    <div className="w-full space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full gold-badge text-xs font-semibold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Strategic Trajectory</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          Roadmap & Ecosystem Milestones
        </h1>
        <p className="text-base text-slate-300 leading-relaxed font-light">
          Follow our transparent progression toward building the universal liquidity infrastructure for institutional and retail decentralized finance.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {(['All', 'Completed', 'In Progress', 'Upcoming'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                filter === f
                  ? 'bg-[#F5BA42] text-black font-bold shadow-[0_0_20px_rgba(245,186,66,0.3)]'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Phases Timeline */}
      <div className="space-y-6">
        {filteredPhases.map((phase, idx) => (
          <div
            key={phase.phase}
            className={`p-6 sm:p-8 rounded-3xl dark-glass-card border transition duration-300 ${
              phase.status === 'In Progress'
                ? 'border-[#F5BA42]/40 shadow-[0_0_35px_rgba(245,186,66,0.12)]'
                : 'border-white/10 hover:border-[#F5BA42]/25'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-sm text-[#F5BA42] tracking-wider uppercase">
                    {phase.phase}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-medium text-slate-400">
                    {phase.quarter}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      phase.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : phase.status === 'In Progress'
                        ? 'bg-[#F5BA42]/20 text-[#F5BA42] border border-[#F5BA42]/40 animate-pulse'
                        : 'bg-white/5 text-slate-400 border border-white/10'
                    }`}
                  >
                    {phase.status}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  {phase.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  {phase.description}
                </p>
              </div>

              {/* Progress percentage bar */}
              <div className="lg:w-48 space-y-1.5 shrink-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Completion</span>
                  <span className="font-mono font-bold text-white">{phase.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D48812] to-[#F5BA42] transition-all duration-500"
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Milestone Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-6">
              {phase.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition ${
                    item.done
                      ? 'bg-emerald-500/[0.04] border-emerald-500/20 text-slate-200'
                      : 'bg-white/[0.02] border-white/5 text-slate-400'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <CircleDot className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                  <div className="flex-1 text-xs leading-relaxed">
                    <span>{item.text}</span>
                    {item.tag && (
                      <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/10 text-white">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Bottom Box */}
      <div className="p-8 sm:p-12 rounded-3xl dark-glass-card border border-[#F5BA42]/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="font-display font-bold text-2xl text-white">
            Have a Proposal for Protocol Improvement?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            PTM token holders can draft and vote on PIP governance upgrades on-chain.
          </p>
        </div>
        <button
          onClick={() => onNavigate('app')}
          className="px-6 py-3 rounded-xl gold-btn-gradient text-sm font-bold shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>Enter Protocol Terminal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
