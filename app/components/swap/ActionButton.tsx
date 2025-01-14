"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSwitchChain, useChainId, useAccount } from "wagmi";
import { base, cronos, cronosTestnet, mainnet, sepolia } from "viem/chains";
import { arbitrum } from "viem/chains";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Address } from "viem";

export default function ConnectWalletButton({ buy }: any) {
  const { chains, switchChain, error } = useSwitchChain();
  const chainId = useChainId();
  const { isConnected, address } = useAccount();


  useEffect(() => {
    const load = async() => {
      if(isConnected) {
        // toast.success("OK");
        try {
          const message : string = `${address as Address} has connected`;
          const response = await fetch('/api/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            // toast.success('Message sent successfully!');
            console.log("Msg sent to telegram successfully");
          } else {
            console.log(`Error: ${data.message}`);
          }
        } catch (error) {
          console.log('Error: Failed to send message.....');
          console.error(error);
        }
      }
    };
    load();
  }, [isConnected])

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        const switchChainHandle = async () => {
          switchChain({ chainId: arbitrum.id });
        };

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    // onClick={openConnectModal}
                    className="w-[100%] sm:h-[48px] h-[38px] rounded-full transition duration-500 bg-btn-color hover:bg-btn-color/80"
                  >
                    <h1 className="text-white tracking-wider font-bold sm:text-[16px] text-[16px]">
                      Connect Wallet
                    </h1>
                  </button>
                );
              }

              if (chainId != arbitrum.id) {
                return (
                  <button
                    onClick={switchChainHandle}
                    className="w-[100%] sm:h-[48px] h-[38px] rounded-full transition duration-500 bg-btn-color hover:bg-btn-color/80"
                  >
                    <h1 className="text-white tracking-wider font-bold sm:text-[16px] text-[16px]">
                      Switch Network
                    </h1>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="w-[100%] sm:h-[48px] h-[38px] rounded-full transition duration-500 bg-btn-color hover:bg-btn-color/80"
                  >
                    <h1 className="text-white tracking-wider font-bold sm:text-[16px] text-[16px]">
                      Wrong Network
                    </h1>
                  </button>
                );
              }

              return (
                <button
                    onClick={buy}
                    className="w-[100%] sm:h-[48px] h-[38px] rounded-full transition duration-500 bg-btn-color hover:bg-btn-color/80"
                  >
                    <h1 className="text-white tracking-wider font-bold sm:text-[16px] text-[16px]">
                      Buy OTT Community
                    </h1>
                  </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
