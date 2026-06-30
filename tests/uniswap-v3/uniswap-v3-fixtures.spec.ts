import { describe, expect, it } from 'vitest';

import { uniswapV3Module } from '../../src/uniswap/v3';
import type { UniswapV3PoolRuntime } from '../../src/uniswap/v3/types';

import { capturedUniswapV3Fixture } from './captured-fixture';
import { simpleUniswapV3Fixture } from './fixtures';

function normalizeRuntime(runtime: UniswapV3PoolRuntime) {
  return {
    info: runtime.info,
    state: {
      ...runtime.state,
      ticks: [...runtime.state.ticks.entries()].sort(([a], [b]) => a - b),
    },
    tickBitmap: [...runtime._temp.tickBitmap.entries()].sort(([a], [b]) => a - b),
  };
}

describe('Uniswap V3 fixture regressions', () => {
  it('quotes fixed cases from a pool-state fixture', () => {
    for (const quoteCase of simpleUniswapV3Fixture.quotes) {
      const runtime = uniswapV3Module.reducer.init(simpleUniswapV3Fixture.info, simpleUniswapV3Fixture.state);

      const quote = uniswapV3Module.quoter.quote({
        runtime,
        amountIn: quoteCase.amountIn,
        zeroForOne: quoteCase.zeroForOne,
        sqrtPriceLimitX96: 0n,
      });

      expect(quote).toEqual(quoteCase.expected);
    }
  });

  it('matches a next-state fixture after applying a pool update', () => {
    const updatedRuntime = uniswapV3Module.reducer.init(simpleUniswapV3Fixture.info, simpleUniswapV3Fixture.state);
    const changed = uniswapV3Module.reducer.applyUpdates(updatedRuntime, simpleUniswapV3Fixture.update);
    const expectedRuntime = uniswapV3Module.reducer.init(simpleUniswapV3Fixture.info, simpleUniswapV3Fixture.nextState);

    expect(changed).toBe(true);
    expect(normalizeRuntime(updatedRuntime)).toEqual(normalizeRuntime(expectedRuntime));
  });

  it('matches a captured Tycho next-state fixture after applying a pool update', () => {
    const updatedRuntime = uniswapV3Module.reducer.init(capturedUniswapV3Fixture.info, capturedUniswapV3Fixture.state);
    const changed = uniswapV3Module.reducer.applyUpdates(updatedRuntime, capturedUniswapV3Fixture.update);
    const expectedRuntime = uniswapV3Module.reducer.init(
      capturedUniswapV3Fixture.info,
      capturedUniswapV3Fixture.nextState,
    );

    expect(changed).toBe(true);
    expect(normalizeRuntime(updatedRuntime)).toEqual(normalizeRuntime(expectedRuntime));
  });
});
