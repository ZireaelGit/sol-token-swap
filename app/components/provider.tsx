"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { config } from "../config/wagmi";

const queryClient = new QueryClient();

const customTheme = {
  ...darkTheme(),
  colors: {
    ...darkTheme().colors,
    accentColor: "#3181a0", // Purple color
    accentColorForeground: "#f8ede5",
    // You can customize more colors if needed
  },
};

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>
          <div className="min-h-screen bg-[linear-gradient(to_bottom,_#016180_10%,_#F8EDE5)]">
            {children}
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Providers;
