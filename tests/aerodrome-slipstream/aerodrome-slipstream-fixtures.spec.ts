import { describe, expect, it } from 'vitest';

import { aerodromeSlipstreamModule } from '../../src/aerodrome-finance/slipstream';
import type { AerodromeSlipstreamPoolRuntime } from '../../src/aerodrome-finance/slipstream/types';

import { capturedAerodromeSlipstreamFixture } from './captured-fixture';

function normalizeRuntime(runtime: AerodromeSlipstreamPoolRuntime) {
  return {
    info: runtime.info,
    state: {
      ...runtime.state,
      ticks: [...runtime.state.ticks.entries()].sort(([a], [b]) => a - b),
      observationState: {
        ...runtime.state.observationState,
        observations: [...runtime.state.observationState.observations.entries()].sort(([a], [b]) => a - b),
      },
    },
    tickBitmap: [...runtime._temp.tickBitmap.entries()].sort(([a], [b]) => a - b),
  };
}

describe('Aerodrome Slipstream fixture regressions', () => {
  it('matches a captured Tycho next-state fixture after applying a pool update', () => {
    const updatedRuntime = aerodromeSlipstreamModule.reducer.init(
      capturedAerodromeSlipstreamFixture.info,
      capturedAerodromeSlipstreamFixture.state,
    );
    const changed = aerodromeSlipstreamModule.reducer.applyUpdates(
      updatedRuntime,
      capturedAerodromeSlipstreamFixture.update,
    );
    const expectedRuntime = aerodromeSlipstreamModule.reducer.init(
      capturedAerodromeSlipstreamFixture.info,
      capturedAerodromeSlipstreamFixture.nextState,
    );

    expect(changed).toBe(true);
    expect(normalizeRuntime(updatedRuntime)).toEqual(normalizeRuntime(expectedRuntime));
  });
});
