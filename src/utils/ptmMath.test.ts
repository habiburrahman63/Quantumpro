import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateStakingRewards,
  calculateSwapQuote,
  formatUsd,
  formatTokenAmount,
  TOKENS
} from './ptmMath';

test('calculateStakingRewards returns 0 for non-positive amount', () => {
  const result = calculateStakingRewards(0, 30);
  assert.equal(result.projectedReward, 0);
  assert.equal(result.totalAtEnd, 0);
});

test('calculateStakingRewards applies lockup multipliers properly', () => {
  const flexible = calculateStakingRewards(1000, 365, 20); // 365 days multiplier is 3.5
  assert.equal(flexible.multiplier, 3.5);
  assert.equal(flexible.effectiveApy, 70); // 20 * 3.5 = 70%
  assert.equal(flexible.projectedReward, 700);
  assert.equal(flexible.totalAtEnd, 1700);
});

test('calculateSwapQuote handles valid inputs with fee deduction and slippage', () => {
  const quote = calculateSwapQuote(100, 'USDT', 'PTM', 0.5);
  assert.ok(quote.amountOut > 0);
  assert.ok(quote.minimumReceived < quote.amountOut);
  assert.ok(quote.rate > 0);
  assert.equal(quote.route.length, 3);
});

test('calculateSwapQuote handles 0 amount gracefully', () => {
  const quote = calculateSwapQuote(0, 'ETH', 'USDT');
  assert.equal(quote.amountOut, 0);
  assert.equal(quote.minimumReceived, 0);
});

test('formatUsd formats values correctly', () => {
  assert.equal(formatUsd(1234.5), '$1,234.50');
  assert.equal(formatUsd(420500000, true), '$420.50M');
  assert.equal(formatUsd(1500000000, true), '$1.50B');
});

test('formatTokenAmount formats decimals cleanly', () => {
  assert.equal(formatTokenAmount(0), '0.00');
  assert.equal(formatTokenAmount(14500.25), '14,500.25');
  assert.equal(formatTokenAmount(400000000, 0), '400,000,000');
});
