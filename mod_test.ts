import { describe, expect, it, run } from 'https://deno.land/x/tincan@0.2.2/mod.ts'
import { Zrx, endpoints } from './mod.ts'

const zrx = new Zrx()

describe('networks', () => {
  it('should be set to mainnet by default', () => {
    expect(zrx.network).toBe('mainnet')
    expect(zrx.base).toBe(endpoints['mainnet'])
  })
  it('should set network with switchNetwork(network)', () => {
    zrx.switchNetwork('avax')
    expect(zrx.network).toBe('avax')
    expect(zrx.base).toBe(endpoints['avax'])
  })
  it('should set network from constructor', () => {
    const zrx = new Zrx('polygon')
    expect(zrx.network).toBe('polygon')
    expect(zrx.base).toBe(endpoints['polygon'])
  })
})

describe('API endpoints', () => {
  it('tokens()', async () => {
    const tokens = await zrx.tokens()

    expect(Array.isArray(tokens)).toBe(true)
    const token = tokens[0]

    expect(typeof token.address).toBe('string')
    expect(typeof token.decimals).toBe('number')
    expect(typeof token.name).toBe('string')
    expect(typeof token.symbol).toBe('string')
  })
  it('quote({ from, to, amount })', async () => {
    zrx.switchNetwork('polygon')
    const quote = await zrx.quote({ from: 'USDC', to: 'USDT', amount: 1_000_000 })

    expect(quote.sellAmount).toBe('1000000')
    expect(quote.buyTokenAddress).toBe('0xc2132d05d31c914a87c6611c10748aeb04b58e8f')
    expect(quote.sellTokenAddress).toBe('0x2791bca1f2de4661ed88a30c99a7a9449aa84174')
  })
})

run()
