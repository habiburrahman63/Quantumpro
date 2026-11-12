/**
 * PTM Protocol Pure Financial & Swap Logic
 */

export interface TokenInfo {
  symbol: string;
  name: string;
  priceUsd: number;
  decimals: number;
  iconColor: string;
}

export const TOKENS: Record<string, TokenInfo> = {
  PTM: { symbol: 'PTM', name: 'PTM Token', priceUsd: 1.30, decimals: 18, iconColor: '#EFA727' },
  USDT: { symbol: 'USDT', name: 'Tether USD', priceUsd: 1.00, decimals: 6, iconColor: '#26A17B' },
  USDC: { symbol: 'USDC', name: 'USD Coin', priceUsd: 1.00, decimals: 6, iconColor: '#2775CA' },
  ETH: { symbol: 'ETH', name: 'Ethereum', priceUsd: 3450.00, decimals: 18, iconColor: '#627EEA' },
  SOL: { symbol: 'SOL', name: 'Solana', priceUsd: 185.00, decimals: 9, iconColor: '#14F195' },
};

/**
 * Calculates staking rewards based on lockup period and multiplier.
 */
export function calculateStakingRewards(
  principalAmount: number,
  durationDays: number,
  baseApyPercent: number = 24.5
): {
  projectedReward: number;
  effectiveApy: number;
  totalAtEnd: number;
  multiplier: number;
} {
  if (principalAmount <= 0) {
    return { projectedReward: 0, effectiveApy: baseApyPercent, totalAtEnd: 0, multiplier: 1 };
  }

  // Duration multipliers: flexible (1x), 30d (1.25x), 90d (1.6x), 180d (2.2x), 365d (3.5x)
  let multiplier = 1.0;
  if (durationDays >= 365) multiplier = 3.5;
  else if (durationDays >= 180) multiplier = 2.2;
  else if (durationDays >= 90) multiplier = 1.6;
  else if (durationDays >= 30) multiplier = 1.25;

  const effectiveApy = baseApyPercent * multiplier;
  const yearFraction = durationDays / 365;
  const projectedReward = principalAmount * (effectiveApy / 100) * yearFraction;
  const totalAtEnd = principalAmount + projectedReward;

  return {
    projectedReward: Number(projectedReward.toFixed(4)),
    effectiveApy: Number(effectiveApy.toFixed(2)),
    totalAtEnd: Number(totalAtEnd.toFixed(4)),
    multiplier,
  };
}

/**
 * Calculates swap execution price, fee, price impact, and minimum received.
 */
export function calculateSwapQuote(
  amountIn: number,
  fromTokenSymbol: string,
  toTokenSymbol: string,
  slippageTolerancePercent: number = 0.5,
  protocolFeeRate: number = 0.0015 // 0.15% fee
): {
  amountOut: number;
  minimumReceived: number;
  rate: number;
  feeAmount: number;
  priceImpactPercent: number;
  route: string[];
} {
  const fromToken = TOKENS[fromTokenSymbol] || TOKENS.USDT;
  const toToken = TOKENS[toTokenSymbol] || TOKENS.PTM;

  if (amountIn <= 0) {
    return {
      amountOut: 0,
      minimumReceived: 0,
      rate: fromToken.priceUsd / toToken.priceUsd,
      feeAmount: 0,
      priceImpactPercent: 0,
      route: [fromTokenSymbol, toTokenSymbol],
    };
  }

  const grossValueUsd = amountIn * fromToken.priceUsd;
  const feeValueUsd = grossValueUsd * protocolFeeRate;
  const netValueUsd = grossValueUsd - feeValueUsd;

  // Simulate shallow automated market maker depth: price impact increases with trade size
  const poolDepthUsd = 5_000_000;
  const priceImpactPercent = Math.min((grossValueUsd / poolDepthUsd) * 100, 5.0);
  const finalValueUsd = netValueUsd * (1 - priceImpactPercent / 100);

  const rawAmountOut = finalValueUsd / toToken.priceUsd;
  const minimumReceived = rawAmountOut * (1 - slippageTolerancePercent / 100);
  const rate = (amountIn > 0 && rawAmountOut > 0) ? rawAmountOut / amountIn : fromToken.priceUsd / toToken.priceUsd;

  return {
    amountOut: Number(rawAmountOut.toFixed(6)),
    minimumReceived: Number(minimumReceived.toFixed(6)),
    rate: Number(rate.toFixed(6)),
    feeAmount: Number((feeValueUsd / fromToken.priceUsd).toFixed(6)),
    priceImpactPercent: Number(priceImpactPercent.toFixed(3)),
    route: [fromTokenSymbol, 'PTM Pool', toTokenSymbol],
  };
}

/**
 * Format currency with compact notation for high values.
 */
export function formatUsd(amount: number, compact: boolean = false): string {
  if (compact) {
    if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(2)}B`;
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
    if (amount >= 1_000) return `$${(amount / 1_000).toFixed(2)}K`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format token quantities with appropriate decimal precision.
 */
export function formatTokenAmount(amount: number, maxDecimals: number = 4): string {
  if (amount === 0) return maxDecimals === 0 ? '0' : '0.00';
  const minDec = Math.min(2, maxDecimals);
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: minDec,
    maximumFractionDigits: maxDecimals,
  }).format(amount);
}
