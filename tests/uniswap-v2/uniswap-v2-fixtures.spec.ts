import { describe, expect, it } from 'vitest';

import { uniswapV2Module } from '../../src/uniswap/v2';

import { capturedUniswapV2Fixture } from './captured-fixture';

describe('Uniswap V2 fixture regressions', () => {
  it('matches a captured Tycho next-state fixture after applying a pool update', () => {
    const updatedRuntime = uniswapV2Module.reducer.init(capturedUniswapV2Fixture.info, capturedUniswapV2Fixture.state);
    const changed = uniswapV2Module.reducer.applyUpdates(updatedRuntime, capturedUniswapV2Fixture.update);
    const expectedRuntime = uniswapV2Module.reducer.init(
      capturedUniswapV2Fixture.info,
      capturedUniswapV2Fixture.nextState,
    );

    expect(changed).toBe(true);
    expect(updatedRuntime).toEqual(expectedRuntime);
  });
});
