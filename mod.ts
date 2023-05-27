export type Network = 'mainnet' | 'bsc' | 'ropsten' | 'polygon' | 'avax'

export const endpoints = {
  mainnet: 'https://api.0x.org',
  bsc: 'https://bsc.api.0x.org',
  ropsten: 'https://ropsten.api.0x.org',
  polygon: 'https://polygon.api.0x.org',
  avax: 'https://avalanche.api.0x.org',
}

export type SwapOptions =
  & {
    from: string
    to: string
    amount: number
  }
  & Partial<{
    slippage: string
    takerAddress: string
    affiliateAddress: string
    feeRecipient: string
    tokenFee: string
  }>

export type SwapTransaction = {
  price: string
  guaranteedPrice: string
  to: string
  data: string
  value: string
  gas: string
  estimatedGas: string
  gasPrice: string
  protocolFee: string
  minimumProtocolFee: string
  buyTokenAddress: string
  sellTokenAddress: string
  buyAmount: string
  sellAmount: string
  estimatedGasTokenRefund: string
  sources: {
    name: string
    proportion: string
  }[]
  allowanceTarget: string
}

export class Zrx {
  network: Network = 'mainnet'
  base = endpoints[this.network]

  constructor(network: Network = 'mainnet') {
    this.network = network
    this.base = endpoints[network]
  }
  switchNetwork(network: Network) {
    this.network = network
    this.base = endpoints[network]
  }
  async quote({ from, to, amount, ...opts }: SwapOptions): Promise<SwapTransaction> {
    const params = new URLSearchParams({
      ...opts,
      buyToken: to,
      sellToken: from,
      sellAmount: amount.toString(),
    })

    const res = await fetch(`${this.base}/swap/v1/quote?${params.toString()}`)

    const json = await res.json()

    return json
  }
  async prices(token: string): Promise<
    {
      symbol: string
      price: string
    }[]
  > {
    const res = await fetch(`${this.base}/swap/v1/prices?sellToken=${token}`)

    const { records } = await res.json()

    return records
  }
  async price({ from, to, amount, ...opts }: SwapOptions): Promise<SwapTransaction> {
    const params = new URLSearchParams({
      ...opts,
      buyToken: to,
      sellToken: from,
      sellAmount: amount.toString(),
    })

    const res = await fetch(`${this.base}/swap/v1/price?${params.toString()}`)

    const json = await res.json()

    return json
  }
}
