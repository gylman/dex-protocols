import { describe, expect, it } from 'vitest';

import { pancakeSwapV2Module } from '../../src/pancake-swap/v2';

import { capturedPancakeSwapV2Fixture } from './captured-fixture';

describe('PancakeSwap V2 fixture regressions', () => {
  it('matches a captured Tycho next-state fixture after applying a pool update', () => {
    const updatedRuntime = pancakeSwapV2Module.reducer.init(
      capturedPancakeSwapV2Fixture.info,
      capturedPancakeSwapV2Fixture.state,
    );
    const changed = pancakeSwapV2Module.reducer.applyUpdates(updatedRuntime, capturedPancakeSwapV2Fixture.update);
    const expectedRuntime = pancakeSwapV2Module.reducer.init(
      capturedPancakeSwapV2Fixture.info,
      capturedPancakeSwapV2Fixture.nextState,
    );

    expect(changed).toBe(true);
    expect(updatedRuntime).toEqual(expectedRuntime);
  });
});
