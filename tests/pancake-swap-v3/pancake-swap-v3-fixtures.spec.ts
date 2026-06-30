import { describe, expect, it } from 'vitest';

import { pancakeSwapV3Module } from '../../src/pancake-swap/v3';
import type { PancakeSwapV3PoolRuntime } from '../../src/pancake-swap/v3/types';

import { capturedPancakeSwapV3Fixture } from './captured-fixture';

function normalizeRuntime(runtime: PancakeSwapV3PoolRuntime) {
  return {
    info: runtime.info,
    state: {
      ...runtime.state,
      ticks: [...runtime.state.ticks.entries()].sort(([a], [b]) => a - b),
    },
    tickBitmap: [...runtime._temp.tickBitmap.entries()].sort(([a], [b]) => a - b),
  };
}

describe('PancakeSwap V3 fixture regressions', () => {
  it('matches a captured Tycho next-state fixture after applying a pool update', () => {
    const updatedRuntime = pancakeSwapV3Module.reducer.init(
      capturedPancakeSwapV3Fixture.info,
      capturedPancakeSwapV3Fixture.state,
    );
    const changed = pancakeSwapV3Module.reducer.applyUpdates(updatedRuntime, capturedPancakeSwapV3Fixture.update);
    const expectedRuntime = pancakeSwapV3Module.reducer.init(
      capturedPancakeSwapV3Fixture.info,
      capturedPancakeSwapV3Fixture.nextState,
    );

    expect(changed).toBe(true);
    expect(normalizeRuntime(updatedRuntime)).toEqual(normalizeRuntime(expectedRuntime));
  });
});
