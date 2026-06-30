import type { UniswapV2PoolInfo, UniswapV2PoolState, UniswapV2PoolUpdate } from '../../src/uniswap/v2/types';

export const capturedUniswapV2Fixture = {
  source: {
    chainId: 1,
    blockNumber: "25427927",
    pool: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
  },
  info: {
    feeBps: 30,
    token0: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  } satisfies UniswapV2PoolInfo,
  state: {
    reserve0: 8062927572977n,
    reserve1: 5071308830382487616208n,
  } satisfies UniswapV2PoolState,
  update: {
    reserve0: 8062930285152n,
    reserve1: 5071307129634282993765n,
  } satisfies UniswapV2PoolUpdate,
  nextState: {
    reserve0: 8062930285152n,
    reserve1: 5071307129634282993765n,
  } satisfies UniswapV2PoolState,
} as const;
