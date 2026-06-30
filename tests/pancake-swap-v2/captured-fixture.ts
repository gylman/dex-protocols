import type { PancakeSwapV2PoolInfo, PancakeSwapV2PoolState, PancakeSwapV2PoolUpdate } from '../../src/pancake-swap/v2/types';

export const capturedPancakeSwapV2Fixture = {
  source: {
    chainId: 1,
    blockNumber: "25427966",
    pool: "0x17c1ae82d99379240059940093762c5e4539aba5",
  },
  info: {
    feeBps: 30,
    token0: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    token1: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  } satisfies PancakeSwapV2PoolInfo,
  state: {
    reserve0: 76511724374213196563n,
    reserve1: 121777394382n,
  } satisfies PancakeSwapV2PoolState,
  update: {
    reserve0: 76518272131782451626n,
    reserve1: 121766999799n,
  } satisfies PancakeSwapV2PoolUpdate,
  nextState: {
    reserve0: 76518272131782451626n,
    reserve1: 121766999799n,
  } satisfies PancakeSwapV2PoolState,
} as const;
