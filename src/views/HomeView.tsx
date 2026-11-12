import React, { useState } from 'react';
import { HeroArtwork } from '../components/HeroArtwork';
import { PageId, WalletState } from '../types';
import { 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Sparkles, 
  Lock, 
  RefreshCw, 
  BarChart3, 
  Coins, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { calculateStakingRewards, formatUsd, formatTokenAmount } from '../utils/ptmMath';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  wallet: WalletState;
  onOpenWalletModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  wallet,
  onOpenWalletModal,
}) => {
  // Interactive mini-calculator on home page
  const [calcAmount, setCalcAmount] = useState<number>(5000);
  const [calcDays, setCalcDays] = useState<number>(90);

  const stakingResult = calculateStakingRewards(calcAmount, calcDays);

  const partners = [
    { name: 'Arbitrum One', type: 'Layer 2 Rollup' },
    { name: 'Ethereum', type: 'Settlement Layer' },
    { name: 'Chainlink', type: 'Decentralized Oracle' },
    { name: 'CertiK', type: 'Security & Audits' },
    { name: 'Optimism', type: 'Superchain Network' },
    { name: 'Solana', type: 'High-Speed Bridge' },
  ];

  return (
    <div className="w-full space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-8 lg:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: 3D Metallic Sculpture Monument */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <HeroArtwork className="w-full max-w-md" />
          </div>

          {/* Right Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left order-1 lg:order-2">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full gold-badge text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F5BA42]" />
              <span>Next-Gen Decentralized Liquidity & Execution</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              Unleash Maximum Alpha with{' '}
              <span className="gold-gradient-text block mt-1">PTM Protocol</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Experience institutional execution depth, ultra-low 0.01% slippage, and algorithmic vault strategies powered by the high-performance $PTM ecosystem.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('app')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl gold-btn-gradient text-sm font-bold flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Launch Terminal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-[#F5BA42]/30 text-sm font-semibold flex items-center justify-center gap-2 transition"
              >
                <span>Architecture & Tokenomics</span>
              </button>
            </div>

            {/* Key Stats Row */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Total Value Locked</div>
                <div className="font-display font-bold text-xl sm:text-2xl text-white mt-0.5">$420.5M+</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Lowest Slippage</div>
                <div className="font-display font-bold text-xl sm:text-2xl text-[#F5BA42] mt-0.5">0.01%</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Active Traders</div>
                <div className="font-display font-bold text-xl sm:text-2xl text-white mt-0.5">180,000+</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Protocol Uptime</div>
                <div className="font-display font-bold text-xl sm:text-2xl text-emerald-400 mt-0.5">99.99%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER / ECOSYSTEM STRIP */}
      <section className="border-y border-[#F5BA42]/15 bg-[#0A0C11]/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-slate-400 font-medium mb-6">
            Institutional Ecosystem & Infrastructure Partners
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#F5BA42]/30 flex flex-col items-center justify-center text-center transition group"
              >
                <span className="font-display font-bold text-sm text-slate-200 group-hover:text-[#F5BA42] transition">
                  {partner.name}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {partner.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE PILLARS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full gold-badge text-xs font-semibold uppercase tracking-wider">
            <span>Engineered Superiority</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            Designed for Quantitative Yield & Speed
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Every layer of PTM Protocol is constructed to deliver uncompromising security, deep cross-chain liquidity, and algorithmic capital efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl dark-glass-card dark-glass-card-hover space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-[#F5BA42]/10 border border-[#F5BA42]/30 text-[#F5BA42] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white group-hover:text-[#F5BA42] transition">
              Algorithmic Vaults
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Automated rebalancing strategies that continuously harvest yield across concentrated liquidity pools, delivering benchmark-beating compound returns.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#F5BA42]">
              <span>Up to 28.4% Net APY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl dark-glass-card dark-glass-card-hover space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-[#F5BA42]/10 border border-[#F5BA42]/30 text-[#F5BA42] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white group-hover:text-[#F5BA42] transition">
              Smart Order Routing
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Intelligent multi-hop aggregation across decentralized order books and AMMs ensures your swaps always execute with negligible price impact.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#F5BA42]">
              <span>Split Routing Enabled</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl dark-glass-card dark-glass-card-hover space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-[#F5BA42]/10 border border-[#F5BA42]/30 text-[#F5BA42] flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white group-hover:text-[#F5BA42] transition">
              Non-Custodial Security
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Triple audited by CertiK and OpenZeppelin. Multi-sig governance time-locks protect treasury assets with zero centralized point of failure.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>CertiK Verified (98/100)</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SHOWCASE & STAKING ESTIMATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 dark-glass-card border border-[#F5BA42]/25 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5BA42]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left explanation */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full gold-badge text-xs font-semibold uppercase">
                <Coins className="w-3.5 h-3.5" />
                <span>Yield Simulator</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Simulate Your $PTM Staking Rewards
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Stake $PTM tokens into our automated liquidity protocol. Choose a lockup timeframe to unlock compound multipliers up to 3.5x effective APY.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-[#F5BA42]/20 flex items-center justify-center text-[#F5BA42]">
                    ✓
                  </div>
                  <span>Real-time continuous rewards distribution per block</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-[#F5BA42]/20 flex items-center justify-center text-[#F5BA42]">
                    ✓
                  </div>
                  <span>Zero deposit or withdrawal protocol penalties</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-[#F5BA42]/20 flex items-center justify-center text-[#F5BA42]">
                    ✓
                  </div>
                  <span>Automated compounding vault integration</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('app')}
                  className="px-6 py-3 rounded-xl gold-btn-gradient text-sm font-bold flex items-center gap-2"
                >
                  <span>Go to Staking Desk</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right interactive slider panel */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-black/50 border border-white/10 space-y-6">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Stake Amount</span>
                  <span className="font-display font-bold text-white text-base">
                    {formatTokenAmount(calcAmount)} PTM
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full accent-[#F5BA42] bg-white/10 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>500 PTM</span>
                  <span>25,000 PTM</span>
                  <span>50,000 PTM</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Lock Duration</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { days: 30, label: '30 Days', mult: '1.25x' },
                    { days: 90, label: '90 Days', mult: '1.6x' },
                    { days: 180, label: '180 Days', mult: '2.2x' },
                    { days: 365, label: '365 Days', mult: '3.5x' },
                  ].map((tier) => (
                    <button
                      key={tier.days}
                      onClick={() => setCalcDays(tier.days)}
                      className={`p-2.5 rounded-xl text-center border transition ${
                        calcDays === tier.days
                          ? 'bg-[#F5BA42]/15 border-[#F5BA42] text-white font-bold shadow-[0_0_15px_rgba(245,186,66,0.2)]'
                          : 'bg-white/[0.03] border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs">{tier.label}</div>
                      <div className="text-[10px] text-[#F5BA42] font-semibold mt-0.5">{tier.mult}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculator Output */}
              <div className="p-4 rounded-xl bg-[#F5BA42]/10 border border-[#F5BA42]/25 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Effective Dynamic APY</span>
                  <span className="font-display font-bold text-lg text-[#F5BA42]">
                    {stakingResult.effectiveApy}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Estimated Rewards</span>
                  <span className="font-display font-bold text-base text-white">
                    +{formatTokenAmount(stakingResult.projectedReward)} PTM
                  </span>
                </div>
                <div className="pt-2 border-t border-[#F5BA42]/20 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Projected Total Balance</span>
                  <span className="font-display font-bold text-lg text-white">
                    {formatTokenAmount(stakingResult.totalAtEnd)} PTM (~{formatUsd(stakingResult.totalAtEnd * 1.30)})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 sm:p-16 bg-gradient-to-r from-[#12141C] via-[#1A1D27] to-[#12141C] border border-[#F5BA42]/30 text-center space-y-6 overflow-hidden">
          <div className="absolute inset-0 bg-radial from-[#F5BA42]/10 to-transparent blur-2xl pointer-events-none" />
          
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Ready to Experience Institutional DeFi?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Connect your Web3 wallet and start trading with 0.01% slippage, high APY vaults, and deep cross-chain liquidity today.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('app')}
              className="px-8 py-4 rounded-xl gold-btn-gradient text-sm font-bold flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Trading Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenWalletModal}
              className="px-7 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 text-sm font-semibold transition"
            >
              <span>{wallet.isConnected ? 'Manage Wallet' : 'Connect Wallet'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
