import React, { useState, useMemo } from 'react';
import { PageId, WalletState, TransactionRecord, ChartDataPoint } from '../types';
import { 
  TOKENS, 
  calculateSwapQuote, 
  calculateStakingRewards, 
  formatUsd, 
  formatTokenAmount 
} from '../utils/ptmMath';
import { 
  ArrowDownUp, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  Fuel, 
  Settings, 
  Coins, 
  ArrowRight,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Wallet
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AppDashboardViewProps {
  wallet: WalletState;
  onUpdateWallet: (updater: (prev: WalletState) => WalletState) => void;
  onOpenWalletModal: () => void;
}

// Generate realistic mock chart historical data for timeframes
const generateChartData = (basePrice: number, points: number = 30): ChartDataPoint[] => {
  const result: ChartDataPoint[] = [];
  let current = basePrice * 0.88;
  const now = Date.now();

  for (let i = 0; i < points; i++) {
    const timeDelta = (points - i) * 3600 * 1000 * 2;
    const timeStr = new Date(now - timeDelta).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const change = (Math.random() - 0.46) * (basePrice * 0.04);
    const open = current;
    current = Math.max(0.1, current + change);
    const close = current;
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.02);
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.02);
    const volume = Math.floor(200000 + Math.random() * 800000);

    result.push({
      time: timeStr,
      price: Number(close.toFixed(4)),
      volume,
      open: Number(open.toFixed(4)),
      high: Number(high.toFixed(4)),
      low: Number(low.toFixed(4)),
      close: Number(close.toFixed(4)),
    });
  }
  return result;
};

export const AppDashboardView: React.FC<AppDashboardViewProps> = ({
  wallet,
  onUpdateWallet,
  onOpenWalletModal,
}) => {
  // Trading desk state
  const [activeDeskTab, setActiveDeskTab] = useState<'swap' | 'stake'>('swap');
  const [selectedPair, setSelectedPair] = useState<string>('PTM/USDT');
  const [chartType, setChartType] = useState<'area' | 'candle'>('area');
  const [chartTimeframe, setChartTimeframe] = useState<string>('24H');
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);

  // Swap Form
  const [fromToken, setFromToken] = useState<string>('USDT');
  const [toToken, setToToken] = useState<string>('PTM');
  const [swapAmountIn, setSwapAmountIn] = useState<string>('500');
  const [slippage, setSlippage] = useState<number>(0.5);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);

  // Staking Form
  const [stakeAmount, setStakeAmount] = useState<string>('2000');
  const [stakeDuration, setStakeDuration] = useState<number>(90);
  const [isStaking, setIsStaking] = useState<boolean>(false);
  const [unclaimedRewards, setUnclaimedRewards] = useState<number>(420.50);

  // Bottom table state
  const [activeTableTab, setActiveTableTab] = useState<'transactions' | 'orders' | 'pools'>('transactions');
  const [copiedTx, setCopiedTx] = useState<string | null>(null);

  // Initial transactions
  const [transactions, setTransactions] = useState<TransactionRecord[]>([
    {
      id: 'tx-1',
      type: 'SWAP',
      description: 'Swap 1,000 USDT for 769.23 PTM',
      amount: '+769.23 PTM',
      valueUsd: 1000.0,
      timestamp: '2 mins ago',
      status: 'Completed',
      txHash: '0x8f2c...41e9',
    },
    {
      id: 'tx-2',
      type: 'STAKE',
      description: 'Stake 5,000 PTM in 90-Day Vault',
      amount: '5,000 PTM',
      valueUsd: 6500.0,
      timestamp: '1 hour ago',
      status: 'Completed',
      txHash: '0x3a91...b721',
    },
    {
      id: 'tx-3',
      type: 'CLAIM',
      description: 'Claim 142.30 PTM Yield',
      amount: '+142.30 PTM',
      valueUsd: 184.99,
      timestamp: 'Yesterday',
      status: 'Completed',
      txHash: '0x17d4...90ec',
    },
    {
      id: 'tx-4',
      type: 'SWAP',
      description: 'Swap 0.5 ETH for 1,326.92 PTM',
      amount: '+1,326.92 PTM',
      valueUsd: 1725.0,
      timestamp: '2 days ago',
      status: 'Completed',
      txHash: '0x99e2...05a8',
    },
  ]);

  // Chart data
  const chartData = useMemo(() => {
    return generateChartData(1.30, 28);
  }, [selectedPair, chartTimeframe]);

  // Calculate swap quote
  const parsedSwapAmount = parseFloat(swapAmountIn) || 0;
  const swapQuote = useMemo(() => {
    return calculateSwapQuote(parsedSwapAmount, fromToken, toToken, slippage);
  }, [parsedSwapAmount, fromToken, toToken, slippage]);

  // Calculate staking calculations
  const parsedStakeAmount = parseFloat(stakeAmount) || 0;
  const stakingEstimate = useMemo(() => {
    return calculateStakingRewards(parsedStakeAmount, stakeDuration);
  }, [parsedStakeAmount, stakeDuration]);

  // Handle Swap action
  const handleExecuteSwap = () => {
    if (!wallet.isConnected) {
      onOpenWalletModal();
      return;
    }
    if (parsedSwapAmount <= 0) return;

    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);

      // Update wallet balance
      onUpdateWallet((prev) => {
        if (fromToken === 'USDT' && toToken === 'PTM') {
          return {
            ...prev,
            usdtBalance: Math.max(0, prev.usdtBalance - parsedSwapAmount),
            ptmBalance: prev.ptmBalance + swapQuote.amountOut,
          };
        }
        if (fromToken === 'PTM' && toToken === 'USDT') {
          return {
            ...prev,
            ptmBalance: Math.max(0, prev.ptmBalance - parsedSwapAmount),
            usdtBalance: prev.usdtBalance + swapQuote.amountOut,
          };
        }
        return prev;
      });

      // Record transaction
      const newTx: TransactionRecord = {
        id: `tx-${Date.now()}`,
        type: 'SWAP',
        description: `Swap ${parsedSwapAmount} ${fromToken} for ${swapQuote.amountOut} ${toToken}`,
        amount: `+${swapQuote.amountOut} ${toToken}`,
        valueUsd: parsedSwapAmount * (TOKENS[fromToken]?.priceUsd || 1),
        timestamp: 'Just now',
        status: 'Completed',
        txHash: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
      };
      setTransactions((prev) => [newTx, ...prev]);

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F5BA42', '#FFF3C4', '#D48812'],
        });
      } catch {}
    }, 900);
  };

  // Handle Staking action
  const handleExecuteStake = () => {
    if (!wallet.isConnected) {
      onOpenWalletModal();
      return;
    }
    if (parsedStakeAmount <= 0) return;

    setIsStaking(true);
    setTimeout(() => {
      setIsStaking(false);

      onUpdateWallet((prev) => ({
        ...prev,
        ptmBalance: Math.max(0, prev.ptmBalance - parsedStakeAmount),
      }));

      const newTx: TransactionRecord = {
        id: `tx-${Date.now()}`,
        type: 'STAKE',
        description: `Stake ${parsedStakeAmount} PTM in ${stakeDuration}-Day Vault`,
        amount: `${parsedStakeAmount} PTM`,
        valueUsd: parsedStakeAmount * 1.30,
        timestamp: 'Just now',
        status: 'Completed',
        txHash: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
      };
      setTransactions((prev) => [newTx, ...prev]);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#F5BA42', '#22C55E', '#FFF'],
        });
      } catch {}
    }, 800);
  };

  // Handle Claim Rewards
  const handleClaimYield = () => {
    if (!wallet.isConnected) {
      onOpenWalletModal();
      return;
    }
    if (unclaimedRewards <= 0) return;

    const claimed = unclaimedRewards;
    setUnclaimedRewards(0);
    onUpdateWallet((prev) => ({
      ...prev,
      ptmBalance: prev.ptmBalance + claimed,
    }));

    const newTx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      type: 'CLAIM',
      description: `Claimed ${claimed} PTM Yield Rewards`,
      amount: `+${claimed} PTM`,
      valueUsd: claimed * 1.30,
      timestamp: 'Just now',
      status: 'Completed',
      txHash: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedTx(hash);
    setTimeout(() => setCopiedTx(null), 2000);
  };

  // Compute SVG chart coordinates
  const minPrice = Math.min(...chartData.map((d) => d.low));
  const maxPrice = Math.max(...chartData.map((d) => d.high));
  const priceRange = maxPrice - minPrice || 1;
  const svgWidth = 720;
  const svgHeight = 280;

  const pointsString = chartData
    .map((d, i) => {
      const x = (i / (chartData.length - 1)) * svgWidth;
      const y = svgHeight - ((d.close - minPrice) / priceRange) * (svgHeight - 40) - 20;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPolygon = `0,${svgHeight} ${pointsString} ${svgWidth},${svgHeight}`;

  return (
    <div className="w-full space-y-8 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* TOP PORTFOLIO & METRIC STATS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl dark-glass-card border border-[#F5BA42]/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Portfolio Value</span>
            <span className="flex items-center gap-1 font-semibold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              +12.4% (24h)
            </span>
          </div>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            {formatUsd(wallet.balanceUsd)}
          </div>
          <div className="text-[11px] text-slate-400">
            Liquid assets across Arbitrum One
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl dark-glass-card border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Staked $PTM</span>
            <span className="text-[#F5BA42] font-semibold">Tier 3 Lock</span>
          </div>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            14,500 <span className="text-sm font-normal text-slate-400">PTM</span>
          </div>
          <div className="text-[11px] text-slate-400">
            ~{formatUsd(14500 * 1.30)} locked in vaults
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl dark-glass-card border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Unclaimed Yield</span>
            <button
              onClick={handleClaimYield}
              disabled={unclaimedRewards <= 0}
              className="text-[10px] font-bold text-black bg-[#F5BA42] hover:bg-[#FAD77A] px-2 py-0.5 rounded transition disabled:opacity-40"
            >
              Claim All
            </button>
          </div>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5BA42]">
            {formatTokenAmount(unclaimedRewards)} <span className="text-sm font-normal text-slate-400">PTM</span>
          </div>
          <div className="text-[11px] text-slate-400">
            ~{formatUsd(unclaimedRewards * 1.30)} available to claim
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl dark-glass-card border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Staking APY</span>
            <span className="text-emerald-400 font-semibold">Compounding</span>
          </div>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            28.4%
          </div>
          <div className="text-[11px] text-slate-400">
            Base 20% + 1.42x average lock multiplier
          </div>
        </div>
      </div>

      {/* MAIN TRADING WORKSPACE: CHART (LEFT) + TRADING DESK (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: INTERACTIVE CHART (8 COLS) */}
        <div className="lg:col-span-8 p-6 rounded-3xl dark-glass-card border border-[#F5BA42]/20 space-y-6">
          {/* Chart Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E232E] to-[#12151C] border border-[#F5BA42]/30 flex items-center justify-center font-bold text-[#F5BA42]">
                PTM
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-lg text-white">
                    {selectedPair}
                  </h3>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    +12.4%
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                  <span className="font-mono text-white text-base font-bold">$1.3045</span>
                  <span>24h Vol: $42.8M</span>
                  <span>24h High: $1.3410</span>
                </div>
              </div>
            </div>

            {/* Timeframe & Chart Style Toggles */}
            <div className="flex items-center gap-2">
              <div className="flex p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
                {['1H', '24H', '1W', '1M', 'ALL'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setChartTimeframe(tf)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                      chartTimeframe === tf
                        ? 'bg-[#F5BA42] text-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <div className="flex p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
                <button
                  onClick={() => setChartType('area')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    chartType === 'area'
                      ? 'bg-[#F5BA42]/20 text-[#F5BA42] border border-[#F5BA42]/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Area
                </button>
                <button
                  onClick={() => setChartType('candle')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    chartType === 'candle'
                      ? 'bg-[#F5BA42]/20 text-[#F5BA42] border border-[#F5BA42]/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Candles
                </button>
              </div>
            </div>
          </div>

          {/* SVG Price Chart Surface */}
          <div className="relative w-full h-72 sm:h-80 select-none">
            {hoveredPoint && (
              <div className="absolute top-2 left-2 z-10 p-2.5 rounded-xl bg-black/80 border border-[#F5BA42]/30 text-xs space-y-1">
                <div className="text-slate-400">Time: {hoveredPoint.time}</div>
                <div className="font-mono text-white font-bold">Price: ${hoveredPoint.close}</div>
                <div className="text-[11px] text-slate-400">Vol: {hoveredPoint.volume.toLocaleString()}</div>
              </div>
            )}

            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGoldArea" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F5BA42" stopOpacity="0.35" />
                  <stop offset="80%" stopColor="#F5BA42" stopOpacity="0.02" />
                  <stop offset="100%" stopColor="#F5BA42" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="chartLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFE082" />
                  <stop offset="50%" stopColor="#F5BA42" />
                  <stop offset="100%" stopColor="#D48812" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
                <line
                  key={ratio}
                  x1="0"
                  y1={svgHeight * ratio}
                  x2={svgWidth}
                  y2={svgHeight * ratio}
                  stroke="rgba(255,255,255,0.06)"
                  strokeDasharray="4 4"
                />
              ))}

              {chartType === 'area' ? (
                <>
                  {/* Area Gradient Fill */}
                  <polygon points={areaPolygon} fill="url(#chartGoldArea)" />
                  {/* Golden Trendline */}
                  <polyline
                    points={pointsString}
                    fill="none"
                    stroke="url(#chartLineGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Pulse Dot at Current Price */}
                  {chartData.length > 0 && (
                    <circle
                      cx={svgWidth}
                      cy={svgHeight - ((chartData[chartData.length - 1].close - minPrice) / priceRange) * (svgHeight - 40) - 20}
                      r="4"
                      fill="#FFF"
                      stroke="#F5BA42"
                      strokeWidth="2"
                    />
                  )}
                </>
              ) : (
                /* Candlestick Mode */
                chartData.map((d, i) => {
                  const x = (i / (chartData.length - 1)) * (svgWidth - 20) + 10;
                  const isUp = d.close >= d.open;
                  const candleHighY = svgHeight - ((d.high - minPrice) / priceRange) * (svgHeight - 40) - 20;
                  const candleLowY = svgHeight - ((d.low - minPrice) / priceRange) * (svgHeight - 40) - 20;
                  const bodyTopY = svgHeight - ((Math.max(d.open, d.close) - minPrice) / priceRange) * (svgHeight - 40) - 20;
                  const bodyBottomY = svgHeight - ((Math.min(d.open, d.close) - minPrice) / priceRange) * (svgHeight - 40) - 20;
                  const bodyHeight = Math.max(2, bodyBottomY - bodyTopY);

                  return (
                    <g key={i} onMouseEnter={() => setHoveredPoint(d)} onMouseLeave={() => setHoveredPoint(null)}>
                      {/* Wick */}
                      <line
                        x1={x}
                        y1={candleHighY}
                        x2={x}
                        y2={candleLowY}
                        stroke={isUp ? '#22C55E' : '#EF4444'}
                        strokeWidth="1.2"
                      />
                      {/* Body */}
                      <rect
                        x={x - 4}
                        y={bodyTopY}
                        width="8"
                        height={bodyHeight}
                        fill={isUp ? '#22C55E' : '#EF4444'}
                        rx="1"
                      />
                    </g>
                  );
                })
              )}
            </svg>
          </div>

          {/* Quick Pairs Ticker Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-white/5">
            <div className="flex items-center gap-4">
              <span className="text-slate-400">Popular Pairs:</span>
              {['PTM/USDT', 'ETH/USDT', 'BTC/USDT', 'SOL/USDT'].map((pair) => (
                <button
                  key={pair}
                  onClick={() => setSelectedPair(pair)}
                  className={`hover:text-[#F5BA42] transition font-medium ${
                    selectedPair === pair ? 'text-[#F5BA42] font-bold' : 'text-slate-300'
                  }`}
                >
                  {pair}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5BA42]" />
              <span>Chainlink Decentralized Oracle Verified</span>
            </div>
          </div>
        </div>

        {/* RIGHT: TRADING & STAKING DESK (4 COLS) */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl dark-glass-card border border-[#F5BA42]/30 space-y-6 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          {/* Mode Tabs */}
          <div className="flex p-1 rounded-xl bg-black/40 border border-white/10">
            <button
              onClick={() => setActiveDeskTab('swap')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeDeskTab === 'swap'
                  ? 'bg-[#F5BA42] text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ArrowDownUp className="w-3.5 h-3.5" />
              <span>Instant Swap</span>
            </button>
            <button
              onClick={() => setActiveDeskTab('stake')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeDeskTab === 'stake'
                  ? 'bg-[#F5BA42] text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Vault Staking</span>
            </button>
          </div>

          {activeDeskTab === 'swap' ? (
            /* SWAP DESK */
            <div className="space-y-4">
              {/* Pay Input */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>You Pay</span>
                  <span>
                    Bal: {formatTokenAmount(fromToken === 'USDT' ? wallet.usdtBalance : wallet.ptmBalance)} {fromToken}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="number"
                    value={swapAmountIn}
                    onChange={(e) => setSwapAmountIn(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-transparent font-display font-bold text-2xl text-white outline-none"
                  />
                  <select
                    value={fromToken}
                    onChange={(e) => setFromToken(e.target.value)}
                    className="bg-[#1A1D27] text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 outline-none cursor-pointer"
                  >
                    <option value="USDT">USDT</option>
                    <option value="PTM">PTM</option>
                    <option value="ETH">ETH</option>
                    <option value="USDC">USDC</option>
                  </select>
                </div>
              </div>

              {/* Invert Button */}
              <div className="flex justify-center -my-2 relative z-10">
                <button
                  onClick={() => {
                    setFromToken(toToken);
                    setToToken(fromToken);
                  }}
                  className="w-8 h-8 rounded-full bg-[#1A1E29] border border-[#F5BA42]/40 hover:border-[#F5BA42] text-[#F5BA42] flex items-center justify-center transition-transform hover:rotate-180 duration-300 shadow-md"
                  aria-label="Invert tokens"
                >
                  <ArrowDownUp className="w-4 h-4" />
                </button>
              </div>

              {/* Receive Output */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>You Receive (Estimated)</span>
                  <span>
                    Bal: {formatTokenAmount(toToken === 'PTM' ? wallet.ptmBalance : wallet.usdtBalance)} {toToken}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="font-display font-bold text-2xl text-white">
                    {formatTokenAmount(swapQuote.amountOut)}
                  </div>
                  <select
                    value={toToken}
                    onChange={(e) => setToToken(e.target.value)}
                    className="bg-[#1A1D27] text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 outline-none cursor-pointer"
                  >
                    <option value="PTM">PTM</option>
                    <option value="USDT">USDT</option>
                    <option value="ETH">ETH</option>
                    <option value="USDC">USDC</option>
                  </select>
                </div>
              </div>

              {/* Slippage Settings */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Slippage Tolerance</span>
                <div className="flex gap-1.5">
                  {[0.1, 0.5, 1.0].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSlippage(s)}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                        slippage === s
                          ? 'bg-[#F5BA42]/20 text-[#F5BA42] border border-[#F5BA42]/40'
                          : 'bg-white/5 hover:text-white'
                      }`}
                    >
                      {s}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Route breakdown details */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Rate</span>
                  <span className="font-mono text-white">1 {fromToken} = {swapQuote.rate} {toToken}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Minimum Received</span>
                  <span className="font-mono text-white">{swapQuote.minimumReceived} {toToken}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Price Impact</span>
                  <span className="text-emerald-400 font-mono">{'< 0.02%'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Protocol Fee</span>
                  <span className="font-mono text-white">0.15% (~$0.45)</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleExecuteSwap}
                disabled={isSwapping}
                className="w-full py-4 rounded-xl gold-btn-gradient text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSwapping ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Routing Swap on Arbitrum...</span>
                  </>
                ) : wallet.isConnected ? (
                  <span>Execute Swap</span>
                ) : (
                  <span>Connect Wallet to Swap</span>
                )}
              </button>
            </div>
          ) : (
            /* STAKE DESK */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Stake Amount</span>
                  <span>Avail: {formatTokenAmount(wallet.ptmBalance)} PTM</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent font-display font-bold text-2xl text-white outline-none"
                  />
                  <span className="text-sm font-bold text-[#F5BA42]">PTM</span>
                </div>
                {/* Quick percentage buttons */}
                <div className="flex gap-2 pt-1">
                  {[25, 50, 75, 100].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setStakeAmount(String(Math.floor((wallet.ptmBalance * pct) / 100)))}
                      className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-semibold text-slate-300 hover:text-white"
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Lockup Selection */}
              <div>
                <label className="text-xs text-slate-400 block mb-2">Vault Lockup Period</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { days: 30, label: '30 Days', mult: '1.25x' },
                    { days: 90, label: '90 Days', mult: '1.60x' },
                    { days: 180, label: '180 Days', mult: '2.20x' },
                    { days: 365, label: '365 Days', mult: '3.50x' },
                  ].map((tier) => (
                    <button
                      key={tier.days}
                      onClick={() => setStakeDuration(tier.days)}
                      className={`p-3 rounded-xl border text-left transition ${
                        stakeDuration === tier.days
                          ? 'bg-[#F5BA42]/15 border-[#F5BA42] text-white font-bold'
                          : 'bg-white/[0.03] border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-semibold">{tier.label}</div>
                      <div className="text-[10px] text-[#F5BA42] font-semibold mt-0.5">{tier.mult} Multiplier</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Yield Breakdown */}
              <div className="p-3.5 rounded-xl bg-[#F5BA42]/10 border border-[#F5BA42]/20 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Vault APY</span>
                  <span className="font-bold text-[#F5BA42]">{stakingEstimate.effectiveApy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Estimated Yield</span>
                  <span className="font-bold text-white">+{formatTokenAmount(stakingEstimate.projectedReward)} PTM</span>
                </div>
              </div>

              {/* Stake Button */}
              <button
                onClick={handleExecuteStake}
                disabled={isStaking}
                className="w-full py-4 rounded-xl gold-btn-gradient text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isStaking ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Confirming Staking Vault...</span>
                  </>
                ) : wallet.isConnected ? (
                  <span>Deposit & Stake PTM</span>
                ) : (
                  <span>Connect Wallet to Stake</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM DATA TABLES: TRANSACTIONS & ACTIVE ORDERS */}
      <div className="p-6 sm:p-8 rounded-3xl dark-glass-card border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <h3 className="font-display font-bold text-lg text-white">
              Activity & Liquidity Positions
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
              Arbitrum One
            </span>
          </div>

          <div className="flex p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
            <button
              onClick={() => setActiveTableTab('transactions')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTableTab === 'transactions'
                  ? 'bg-[#F5BA42] text-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Transaction History
            </button>
            <button
              onClick={() => setActiveTableTab('pools')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTableTab === 'pools'
                  ? 'bg-[#F5BA42] text-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Top Yield Pools
            </button>
          </div>
        </div>

        {activeTableTab === 'transactions' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 uppercase tracking-wider border-b border-white/5">
                <tr>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Value</th>
                  <th className="py-3 px-4">Tx Hash</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-3 px-4">
                      <span className="font-display font-bold px-2 py-0.5 rounded text-[10px] bg-[#F5BA42]/15 text-[#F5BA42] border border-[#F5BA42]/30">
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-white">{tx.description}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-[#F5BA42]">{tx.amount}</td>
                    <td className="py-3 px-4 font-mono text-slate-300">{formatUsd(tx.valueUsd)}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleCopyHash(tx.txHash)}
                        className="font-mono text-slate-400 hover:text-white flex items-center gap-1.5"
                      >
                        <span>{tx.txHash}</span>
                        {copiedTx === tx.txHash ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-400">{tx.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 uppercase tracking-wider border-b border-white/5">
                <tr>
                  <th className="py-3 px-4">Liquidity Pool</th>
                  <th className="py-3 px-4">Total Liquidity</th>
                  <th className="py-3 px-4">24h Volume</th>
                  <th className="py-3 px-4">Base APY</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { pair: 'PTM / USDT', tvl: '$128.4M', vol: '$42.8M', apy: '32.5%' },
                  { pair: 'PTM / ETH', tvl: '$94.2M', vol: '$28.1M', apy: '28.1%' },
                  { pair: 'ETH / USDC', tvl: '$180.5M', vol: '$65.4M', apy: '14.8%' },
                  { pair: 'PTM / SOL', tvl: '$17.4M', vol: '$6.2M', apy: '41.2%' },
                ].map((pool) => (
                  <tr key={pool.pair} className="hover:bg-white/[0.02] transition">
                    <td className="py-3 px-4 font-display font-bold text-white text-sm">{pool.pair}</td>
                    <td className="py-3 px-4 font-mono text-slate-300">{pool.tvl}</td>
                    <td className="py-3 px-4 font-mono text-slate-300">{pool.vol}</td>
                    <td className="py-3 px-4 font-display font-bold text-[#F5BA42]">{pool.apy}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedPair(pool.pair);
                          setActiveDeskTab('swap');
                        }}
                        className="px-3 py-1 rounded-lg gold-btn-gradient text-[11px] font-bold"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
