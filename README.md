# zrx

> I'm building [Flash](https://flash-dev.vercel.app) - a service to deploy websites and apps on the new decentralized stack.
>
> If you'd like to try or collab, [dm](https://t.me/v_1rtl) or [email](mailto:yo@v1rtl.site)

An unofficial 0x Protocol API client for Deno.

```ts
import { Zrx } from 'https://deno.land/x/zrx/mod.ts'

const client = new Zrx('polygon')

const tx = await client.quote({
  from: 'USDC',
  to: 'USDT',
  amount: 1_000_000, // $1
})
```
