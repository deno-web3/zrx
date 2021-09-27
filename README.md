# zrx

An unofficial 0x Protocol API client for Deno.

```ts
import { Zrx } from 'https://deno.land/x/zrx/mod.ts'

const client = new Zrx('polygon')

const tx = await client.quote({
  from: 'USDC',
  to: 'USDT',
  amount: 1_000_000 // $1
})
```
