import { http, createConfig } from '@wagmi/core'
import { mainnet, arbitrum } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [arbitrum],
  transports: {
    [arbitrum.id]: http(),
  },
})