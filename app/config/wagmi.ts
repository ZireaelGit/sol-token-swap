import {
  mainnet,
  polygon,
  arbitrum,
  base,
  sepolia,
  cronos,
} from "wagmi/chains";
import { connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { trustWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { createConfig } from "wagmi";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [trustWallet, metaMaskWallet],
    },
  ],
  {
    appName: "RainbowKit text",
    projectId: "51a8a52bcc0730097ea92eed587f88cb",
  }
);

export const config = getDefaultConfig({
  appName: "RainbowKit text",
  // projectId: 'YOUR_PROJECT_ID'
  projectId: "51a8a52bcc0730097ea92eed587f88cb",
  chains: [mainnet, polygon, arbitrum, base, sepolia, cronos],
  ssr: true,
});

// export const config = createConfig({
//   connectors
// });